import {
  put, select, race, take
} from 'redux-saga/effects';

import { addContract } from 'redapp/es/contracts/actions';
import { CONTRACT_ADDED } from 'redapp/es/contracts/AT';
import { CALL_DECODE_FAIL, CALL_DECODE_SUCCESS } from 'redapp/es/tracking/calls/AT';


// eslint-disable-next-line
const testErc20ABI = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"showMeTheMoney","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"remaining","type":"uint256"}],"payable":false,"type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_owner","type":"address"},{"indexed":true,"name":"_spender","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Approval","type":"event"}];

// eslint-disable-next-line
const testNetworksConfig = { "3": { "address": "0x722dd3F80BAC40c951b51BdD28Dd19d435762180" } };


function* exampleSaga() {
  // Load the contract interface
  yield put(addContract('TST', testErc20ABI, testNetworksConfig));

  // Wait for the contract to be loaded
  yield take(CONTRACT_ADDED);

  // Use the contract handle we provided earlier
  const contractInterface = yield select(state => state.redapp.contracts['TST']);


  const address = '0x834934700c3a643dabd2afc27079c227fd39f79d';
  // Let's check a balance
  const {callID, thunk} = contractInterface.methods.balanceOf.cacheCall({
    // call options, all optional.
    // (we already set a default network ID and provided a networks config for the contract)
  }, address);

  // Now we can track progress using the callID as reference.
  // It's location in the state will be: state.redapp.tracking.calls[callID]

  // We run the call by dispatching the thunked action
  yield put(thunk);

  // Check the redux-logger to see all events being fired in between.

  // Now we just wait for the full call to be decoded, or an error.
  // We only have one call currently running, but we can ignore other
  //  calls with a check for the callID.
  const { value, callFail, decodeErr } = race({
    value: take(action => action.type === CALL_DECODE_SUCCESS && action.callID === callID),
    callFail: take(action => action.type === CALL_DECODE_FAIL && action.callID === callID),
    decodeErr: take(action => action.type === CALL_DECODE_FAIL && action.callID === callID)
  });

  if (callFail) console.log("Oh no! The call failed. Is the Web3 connected to a RPC endpoint?");
  else if (decodeErr) console.log("Oh no! The call could not be decoded, the contract returned a " +
    "byte output which could not be interpreted using the ABI output spec.");
  else {
    // call was successfully decoded
    console.log("Balance check successfully executed! result: ", value);
  }

  // The same logic applies to transactions:
  // E.g.
  //
  // const {txID, thunk} = contractInterface.methods.showMeTheMoney.trackedSend(
  //    {from: address}, // Tx options, don't forget to set the sender of the transaction.
  //    address, amount // Arguments, will be ABI encoded
  // );
  //
  // dispatch thunk, wait for results matching txID

  // NOTE: Most of the tracking above is still a bit verbose.
  // For a real application one could also just connect to the store,
  //  and update the GUI whenever part of the state updates.

}

export default exampleSaga;
