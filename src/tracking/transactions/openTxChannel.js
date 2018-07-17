import { END, eventChannel } from 'redux-saga';
import transactionsAT from './transactionsAT';

/**
 * Open a TX channel: this channel maps web3 events to our redux tracking system.
 *
 * @param promiEvent The event emitter to read transaction status updates from.
 * @param txID The ID of the transaction, used in the tracking system.
 * @returns {Channel<any>} The redux saga channel.
 */
const openTxChannel = (promiEvent, txID) => eventChannel((emit) => {
  // Web3 returns a "promise combined with an event emitter": we map this to redux events.
  promiEvent
    .on('transactionHash', (hash) => {
      emit({type: transactionsAT.TX_BROADCAST, txID, txHash: hash});
    })
    .on('receipt', (receipt) => {
      // TODO: first receipt is probably double, as it's also the initial confirmation.
      // This can be ignored for now, but maybe we can remove this listener altogether.
      emit({type: transactionsAT.TX_RECEIPT, txID, receipt});
    })
    .on('confirmation', (confirmationNumber, receipt) => {
      // re-fire the TX_RECEIPT, it changed if the confirmation number is 0 again.
      if (confirmationNumber === 0) emit({type: transactionsAT.TX_RECEIPT, txID, receipt});
      // Some apps may find the notice that web3 provided 12 confirmations (as far it goes)
      if (confirmationNumber === 12) {
        emit({type: transactionsAT.TX_FINAL, txID, receipt});
        emit(END);
      }
    })
    .on('error', (error, receipt) => {
      emit({type: transactionsAT.TX_FAILED, txID, receipt});
      // TODO This is tricky, an out-of-gas transaction technically did not fail until it's final,
      // as it could still be orphaned, and mined with a context
      // that does not make it run out of gas.
      emit(END);
    });
  // Return unsubscribe function (wrap for future compatibility)
  return () => promiEvent.off();
});

export default openTxChannel;
