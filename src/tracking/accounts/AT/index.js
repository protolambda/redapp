
export const ACCOUNTS_START_FETCH = 'ACCOUNTS_START_FETCH';

export const ACCOUNTS_FETCH_COMPLETED = 'ACCOUNTS_FETCH_COMPLETED';

export const ACCOUNTS_FETCH_FAILED = 'ACCOUNTS_FETCH_FAILED';

/**
 * Get data (like the balance) for each account in the tracker.
 * @type {ReduxActionType}
 */
export const ACCOUNTS_GET_ALL = 'ACCOUNTS_GET_ALL';

/**
 * Get data for an individual account.
 */
export const ACCOUNT_GET = 'ACCOUNT_GET';

/**
 * To start updating the balance of an account.
 */
export const ACCOUNT_GET_BALANCE = 'ACCOUNT_GET_BALANCE';

/**
 * When balance updating fails.
 */
export const ACCOUNT_GET_BALANCE_FAILED = 'ACCOUNT_GET_BALANCE_FAILED';

/**
 * When an account gets a new updated balance.
 */
export const ACCOUNT_BALANCE = 'ACCOUNT_BALANCE';

/**
 * Start polling accounts (runs a ACCOUNTS_START_FETCH, followed by a ACCOUNTS_GET_ALL).
 */
export const ACCOUNTS_START_POLLING = 'ACCOUNTS_START_POLLING';

/**
 * Stop polling accounts (Polling can be resumed with ACCOUNTS_START_POLLING again).
 */
export const ACCOUNTS_STOP_POLLING = 'ACCOUNTS_STOP_POLLING';

/**
 * Whenever accounts polling failed, fired with "err" property containing the error.
 */
export const ACCOUNTS_POLL_ERROR = 'ACCOUNTS_POLL_ERROR';
