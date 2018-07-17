const transactionsAT = {
  // send a transaction, to be tracked
  SEND_TX: 'SEND_TX',
  // After starting sending a transaction to the web3provider successfully, it's not broadcast yet!
  TX_SENT: 'TX_SENT',
  // When sending errors, i.e. the web3provider fails before even broadcasting the transaction.
  SEND_TX_FAILED: 'SEND_TX_FAILED',
  // when a tx has been broadcast
  TX_BROADCAST: 'TX_BROADCAST',
  // when a receipt was received, may be multiple times in case of chain re-organization.
  TX_RECEIPT: 'TX_RECEIPT',
  // success, fired after processing "TX_RECEIPT", when the receipt shows the TX was mined.
  TX_SUCCESS: 'TX_SUCCESS',
  // failed, fired after processing "TX_RECEIPT", or on edge cases.
  // Has a "receipt" if it was a mining failure (e.g. out of gas).
  TX_FAILED: 'TX_FAILED',
  // When web3 explicitly provided us with 12 chained confirmations.
  TX_FINAL: 'TX_FINAL',
  // Remove TX from tracker
  FORGET_TX: 'FORGET_TX'
};

export default transactionsAT;
