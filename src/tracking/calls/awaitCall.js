import {put} from 'redux-saga/effects';
import callsAT from './callsAT';

/**
 * Awaits a web3 call, and fires the corresponding redux events
 *
 * @param callPromise The call promise, eventually completes with the call result, or fails.
 * @param callID The ID of the call, used in the caching system.
 * @returns {Promise} The promise, complete when the given callPromise is processed.
 */
const awaitCall = async (callPromise, callID) => {
  try {
    // TODO: should we apply a time-out here, or does the web3 provider stop it anyway?
    const callResult = await callPromise;

    put({type: callsAT.CALL_RETURNED, callID, value: callResult});
  } catch (err) {
    // Handle failure, forward error, user can check what happened.
    put({type: callsAT.CALL_FAILED, callID, err});
  }
};

export default awaitCall;
