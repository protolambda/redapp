import {
  put, takeEvery, call, take
} from 'redux-saga/effects';
import uuid4 from 'uuid/v4';
import transactionsAT from './transactionsAT';
import openTxChannel from './openTxChannel';

/**
 * Open a TX channel: this channel maps web3 events to our redux tracking system.
 *
 * @param web3 The web3 instance to use when sending the actual TX.
 * @param txID The ID of the transaction, used in the tracking system.
 * @param from Senders address, optional. (default wallet otherwise)
 * @param to Destination address, or undefined for contract creation.
 * @param value TX value in wei.
 * @param gas TX gas. Optional, can be determined later.
 * @param gasPrice TX gas price. Optional, defaults to web3.eth.gasPrice.
 * @param data Optional. TX data, i.e. abi encoded contract call,
 *              or contract code itself for contract creation.
 * @param nonce Optional, can be used to re-send a transaction (with higher gas).
 * @returns {Channel<any>} The redux saga channel.
 */
const openSendTxChannel = (web3, txID, {
  from, to, value, gas, gasPrice, data, nonce
}) => {
  // Web3 returns a "promise combined with an event emitter": we map this to redux events.
  const promiEvent = web3.eth.sendTransaction({
    from, to, value, gas, gasPrice, data, nonce
  });
  return openTxChannel(promiEvent, txID);
};


function* sendTX({from, to, value, gas, gasPrice, data, nonce, txID}, web3) {
  // If the user does not specify any ID, than create a new one (recommended).
  const id = txID || uuid4();

  // Create TX channel, firing redux events based on all promises from web3.
  const chan = yield call(openSendTxChannel, web3, id,
    {from, to, value, gas, gasPrice, data, nonce});

  // Now process the channel, and forward the events. A channel END will make it reach the finally.
  // noinspection UnreachableCodeJS
  try {
    while (true) {
      const event = yield take(chan);
      yield put(event);
    }
  } catch (err) {
    put({type: transactionsAT.SEND_TX_FAILED, err});
  } finally {
    chan.close();
  }
}


function* transactionsSaga(web3) {
  yield takeEvery(transactionsAT.SEND_TX, sendTX, web3);
}

export default transactionsSaga;
