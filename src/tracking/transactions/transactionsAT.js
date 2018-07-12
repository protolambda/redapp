const transactionsAT = {
  // send a transaction, to be tracked
  SEND_TX: 'SEND_TX',
  // when a tx has been broadcast
  TX_BROADCAST: 'TX_BROADCAST',
  // when a receipt was received
  TX_RECEIPT: 'TX_RECEIPT',
  // success & failed: simple actions, fired after processing "TX_RECEIPT"
  TX_SUCCESS: 'TX_SUCCESS',
  TX_FAILED: 'TX_FAILED',
  // Remove TX from tracker
  FORGET_TX: 'FORGET_TX'
};

export default transactionsAT;
