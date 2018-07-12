const accountsAT = {
  ACCOUNTS_START_FETCH: 'ACCOUNTS_START_FETCH',
  ACCOUNTS_FETCH_COMPLETED: 'ACCOUNTS_FETCH_COMPLETED',
  ACCOUNTS_FETCH_FAILED: 'ACCOUNTS_FETCH_FAILED',
  // When the existing accounts are being synced; e.g. balances are being retrieved.
  ACCOUNTS_SYNC_START: 'ACCOUNTS_SYNC_START',
  // When accounts are updated; e.g. new balances are available
  ACCOUNTS_SYNC_COMPLETED: 'ACCOUNTS_SYNC_COMPLETED',
  ACCOUNTS_SYNC_FAILED: 'ACCOUNTS_SYNC_FAILED'
};

export default accountsAT;
