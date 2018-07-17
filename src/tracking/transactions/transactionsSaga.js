import {
  put, takeLatest, call, take
} from 'redux-saga/effects';
import {eventChannel, END} from 'redux-saga'
import transactionsAT from './transactionsAT';

/**
 * Open a TX channel: this channel maps web3 events to our redux tracking system.
 *
 * @param web3 The web3 instance to use when sending the actual TX.
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
const openSendTxChannel = (web3, {
  from, to, value, gas, gasPrice, data, nonce
}) => eventChannel((emit) => {
  // Web3 returns a "promise combined with an event emitter": we map this to redux events.
  const promiEvent = web3.eth.sendTransaction({
    from, to, value, gas, gasPrice, data, nonce
  })
    .on('transactionHash', (hash) => {
      emit({type: transactionsAT.TX_BROADCAST, txHash: hash});
    })
    .on('receipt', (receipt) => {
      // TODO: first receipt is probably double, as it's also the initial confirmation.
      // This can be ignored for now, but maybe we can remove this listener altogether.
      emit({type: transactionsAT.TX_RECEIPT, receipt});
    })
    .on('confirmation', (confirmationNumber, receipt) => {
      // re-fire the TX_RECEIPT, it changed if the confirmation number is 0 again.
      if (confirmationNumber === 0) emit({type: transactionsAT.TX_RECEIPT, receipt});
      // Some apps may find the notice that web3 provided 12 confirmations (as far it goes)
      if (confirmationNumber === 12) {
        emit({type: transactionsAT.TX_FINAL, receipt});
        emit(END);
      }
    })
    .on('error', (error, receipt) => {
      emit({type: transactionsAT.TX_FAILED, receipt});
      // TODO This is tricky, an out-of-gas transaction technically did not fail until it's final,
      // as it could still be orphaned, and mined with a context
      // that does not make it run out of gas.
      emit(END);
    });
  // Return unsubscribe function (wrap for future compatibility)
  return () => promiEvent.off();
});


function* sendTX({from, to, value, gas, gasPrice, data, nonce}, {web3}) {
  // Create TX channel, firing redux events based on all promises from web3.
  const chan = yield call(openSendTxChannel, web3, {from, to, value, gas, gasPrice, data, nonce});

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


function* transactionsSaga() {
  yield takeLatest(transactionsAT.SEND_TX, sendTX);
}

export default transactionsSaga;
