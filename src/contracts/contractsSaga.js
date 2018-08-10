import {
  takeEvery, put
} from 'redux-saga/effects';
import Web3Utils from 'web3-utils';
import uuid4 from 'uuid/v4';
import contractsAT from './contractsAT';
import callsAT from '../tracking/calls/callsAT';
import transactionsAT from '../tracking/transactions/transactionsAT';

function* addContract(web3, defaultNetworkId, {contractName, abi, networks}) {
  // Keep contract creation extremely simple:
  //  we only use this instance to create the ABI encoded data with,
  //  transactions/calls/events will be handled by the other parts of ReDApp.
  // This generalizes the flow, and makes it easy to re-instantiate
  //  this store redux entry from persisted data.
  const web3Contract = new web3.eth.Contract(abi);

  const methods = {};

  // Create methods for each abi entry,
  //  each returning a thunk to dispatch and execute the method with.
  for (const entry of abi) {
    if (entry.type === 'function') {
      // Add ABI data to each method
      const method = {...entry};
      const encodeABI = args => web3Contract[entry.name](...args).encodeABI();

      // Constant methods don't change any state; hence, only add call functionality.
      if (entry.constant) {
        const caller = callType => (({blockNr, to, networkId}, ...args) => {
          const callData = encodeABI(args);
          // Hash it, a new call with the same exact input will hit the cache.
          // Also add the block-number, this also influences the computation.
          const callID = `${Web3Utils.soliditySha3(callData)}-${blockNr || 'latest'}`;

          // Return the callID together with the thunk,
          //  this thunk can be dispatched, and the thunk-middleware will pick it up.
          // The callID can be used to get the result.
          return {
            callID,
            thunk: (dispatch, getState) => {
              const contractAddress = to || (getState()[contractName]
                .networks[networkId || defaultNetworkId].address);
              dispatch({
                type: callType, data: callData, blockNr, callID, to: contractAddress,
                outputsABI: entry.outputs
              });
            }
          };
        });
        method.cacheCall = caller(callsAT.CACHE_CALL);
        method.forceCall = caller(callsAT.FORCE_CALL);
      } else {
        // Method is not constant, so it not for calling but for transacting.
        method.trackedSend = ({from, value, gas, gasPrice, nonce, to, networkId}, ...args) => {
          const txData = encodeABI(args);
          // Simply use an UUID, transactions are not cached like calls, uniqueness is good.
          const txID = uuid4();

          // Return the txID together with the thunk,
          //  this thunk can be dispatched, and the thunk-middleware will pick it up.
          // The txID can be used to receive status updates from the tracker.
          return {
            txID,
            thunk: (dispatch, getState) => {
              const contractAddress = to || (getState()[contractName]
                .networks[networkId || defaultNetworkId].address);
              dispatch({
                type: transactionsAT.SEND_TX, data: txData,
                from, to: contractAddress, value, gas, gasPrice, nonce
              });
            }
          };
        };
      }
      methods[entry.name] = method;
    }
  }

  // TODO: add events as well?

  yield put({type: contractsAT.CONTRACT_ADDED, contractName, methods, networks});
}


function* contractsSaga(web3, defaultNetworkId) {
  yield takeEvery(contractsAT.ADD_CONTRACT, addContract, web3, defaultNetworkId);
}

export default contractsSaga;
