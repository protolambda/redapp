import {call, put} from 'redux-saga/effects';
import callsAT from './callsAT';

/**
 * Awaits a web3 call, and fires the corresponding redux events
 *
 * @param callPromise The call promise, eventually completes with the call result, or fails.
 * @param callID The ID of the call, used in the caching system.
 * @returns {Promise} The promise, complete when the given callPromise is processed.
 */
function* awaitCall(callPromise, callID) {
  try {
    // TODO: should we apply a time-out here, or does the web3 provider stop it anyway?

    // Note: the outer "call" being made here is a redux-saga call that makes this generator
    //  effectively await the promise, without taking away the power of orchestration
    //  (what "await ..." would do)
    // The inner call is the Web3 contract call, returning a promise.
    const callResult = yield callPromise;

    yield put({type: callsAT.CALL_RETURNED, callID, rawValue: callResult});
  } catch (err) {
    // Handle failure, forward error, user can check what happened.
    yield put({type: callsAT.CALL_FAILED, callID, err});
  }
}

export default awaitCall;
