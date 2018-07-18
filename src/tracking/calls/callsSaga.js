import {
  takeEvery, call, select, put
} from 'redux-saga/effects';
import uuid4 from 'uuid/v4';
import callsAT from './callsAT';
import awaitCall from './awaitCall';

/**
 * Initiate a web3 call, it starts waiting for a promise that is mapped
 *  to our redux call system.
 *
 * @param web3 The web3 instance to use when sending the actual TX.
 * @param callID The ID of the transaction, used in the tracking system.
 * @param blockNr The block number to use in the computation of the call.
 *                (Optional, web3 defaults to the "latest" block).
 * @param from Senders address, optional. (default wallet otherwise)
 * @param to Destination address, or undefined for contract creation.
 * @param data Optional. TX data, i.e. abi encoded contract call,
 *              or contract code itself for contract creation. (99% of calls should have it though.)
 * @returns {Channel<any>} The redux saga channel.
 */
const initiateCall = (web3, callID, blockNr, {from, to, data}) => {
  // Web3 returns a simple promise here, no complex emitter object.
  // Now all we have to do is wait for it to complete, and then fire the corresponding event.
  const callPromise = web3.eth.call({from, to, data}, blockNr);

  // simply return the wrapped promise, it will be handled as a single-element iterable
  return awaitCall(callPromise, callID);
};


function* forceCall({from, to, data, blockNr, callID}, web3) {
  // If the user does not specify any ID, than create a new one.
  // This new ID is formatted differently from than the one used by contracts making cache-calls;
  //  users should use their own ID when sending direct raw transactions (recommended).
  // If none was provided, then a random one will be sufficient
  //  (i.e. user can search for it in the redux store).
  const id = callID || uuid4();

  // Create TX channel, firing redux events based on all promises from web3.
  yield call(initiateCall, web3, id, blockNr, {from, to, data});
}


function* cacheCall({from, to, data, blockNr, callID}) {
  const id = callID || uuid4();

  // check if we hit the cache.
  const cached = yield select(state => state.cache[id]);

  if (!cached) {
    yield put(callsAT.FORCE_CALL, {from, to, data, blockNr, callID});
  }
  // TODO: the else case: we could fire a "cache is hit" event, but we probably don't need it.
}


function* callsSaga(web3) {
  yield takeEvery(callsAT.CACHE_CALL, cacheCall);
  yield takeEvery(callsAT.FORCE_CALL, forceCall, web3);
}

export default callsSaga;
