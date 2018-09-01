import {
  put, takeEvery, call, take
} from 'redux-saga/effects';
import uuid4 from 'uuid/v4';
import * as transactionsAT from './AT';
import openTxChannel from './openTxChannel';

/**
 *
 * Web3 returns a "promise combined with an event emitter": we map this to redux events.
 *
 * @param web3 The web3 instance to use when sending the actual TX.
 * @param txID The ID of the transaction, used in the tracking system.
 * @param txParams The transaction parameters.
 * @param txParams.from Senders address, optional. (default wallet otherwise)
 * @param txParams.to Destination address, or undefined for contract creation.
 * @param txParams.value TX value in wei.
 * @param txParams.gas TX gas. Optional, can be determined later.
 * @param txParams.gasPrice TX gas price. Optional, defaults to web3.eth.gasPrice.
 * @param txParams.data Optional. TX data, i.e. abi encoded contract call,
 *              or contract code itself for contract creation.
 * @param txParams.nonce Optional, can be used to re-send a transaction (with higher gas).
 * @returns {PromiEvent<TransactionReceipt>} The redux saga channel.
 */
const createTransactionPromiEvent = (web3, txID, {
  from, to, value, gas, gasPrice, data, nonce
}) => web3.eth.sendTransaction({
  from, to, value, gas, gasPrice, data, nonce
});


function* sendTX(web3, {from, to, value, gas, gasPrice, data, nonce, txID}) {
  // If the user does not specify any ID, than create a new one (recommended).
  const id = txID || uuid4();

  let promiEvent;
  try {
    promiEvent = createTransactionPromiEvent(web3, id,
      {from, to, value, gas, gasPrice, data, nonce});
  } catch (err) {
    yield put({type: transactionsAT.SEND_TX_FAILED, txID: id, err: err.message});
    return;
  }

  // Open a TX channel: this channel maps web3 events to our redux tracking system.
  const chan = yield call(openTxChannel, promiEvent, id);

  yield put({type: transactionsAT.TX_SENT, txID: id});

  try {
    // Now process the channel, and forward the events.
    // A channel END will make it reach the finally.
    while (true) {
      const event = yield take(chan);
      yield put(event);
    }
  } finally {
    chan.close();
  }
}

/**
 * Handles ReDApp transaction background processing.
 * @param web3 The web3js 1.0 instance to use.
 * @param {ReduxStateSelector} getTransactionsState Gets transactions state.
 * @return {ReduxSaga} Transactions saga.
 */
// getTransactionsState is unused, but there for future compability, if necessary.
// Also more consistent with other saga signatures.
// eslint-disable-next-line no-unused-vars
function* transactionsSaga(web3, getTransactionsState) {
  yield takeEvery(transactionsAT.SEND_TX, sendTX, web3);
}

export default transactionsSaga;
