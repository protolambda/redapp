
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
 * @type {ReduxActionType}
 */
export const ACCOUNT_GET = 'ACCOUNT_GET';

/**
 * To start updating the balance of an account.
 * @type {ReduxActionType}
 */
export const ACCOUNT_GET_BALANCE = 'ACCOUNT_GET_BALANCE';

/**
 * When balance updating fails.
 * @type {ReduxActionType}
 */
export const ACCOUNT_GET_BALANCE_FAILED = 'ACCOUNT_GET_BALANCE_FAILED';

/**
 * When an account gets a new updated balance.
 * @type {ReduxActionType}
 */
export const ACCOUNT_BALANCE = 'ACCOUNT_BALANCE';

/**
 * Start polling accounts (runs a ACCOUNTS_START_FETCH, followed by a ACCOUNTS_GET_ALL).
 * @type {ReduxActionType}
 */
export const ACCOUNTS_START_POLLING = 'ACCOUNTS_START_POLLING';

/**
 * Stop polling accounts (Polling can be resumed with ACCOUNTS_START_POLLING again).
 * @type {ReduxActionType}
 */
export const ACCOUNTS_STOP_POLLING = 'ACCOUNTS_STOP_POLLING';

/**
 * Whenever accounts polling failed, fired with "err" property containing the error.
 * @type {ReduxActionType}
 */
export const ACCOUNTS_POLL_ERROR = 'ACCOUNTS_POLL_ERROR';

/**
 * Add an account to track locally. (i.e. no interaction with the user)
 * @type {ReduxActionType}
 */
export const ADD_LOCAL_ACCOUNT = 'ADD_LOCAL_ACCOUNT';

/**
 * Forget local account.
 * @type {ReduxActionType}
 */
export const FORGET_LOCAL_ACCOUNT = 'FORGET_LOCAL_ACCOUNT';
