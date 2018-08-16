
/**
 * Send a transaction, to be tracked.
 * @type {ReduxActionType}
 */
export const SEND_TX = 'SEND_TX';

/**
 * After starting sending a transaction to the web3provider successfully, it's not broadcast yet!
 * @type {ReduxActionType}
 */
export const TX_SENT = 'TX_SENT';

/**
 * When sending errors, i.e. the web3provider fails before even broadcasting the transaction.
 * @type {ReduxActionType}
 */
export const SEND_TX_FAILED = 'SEND_TX_FAILED';

/**
 * When a tx has been broadcast.
 * @type {ReduxActionType}
 */
export const TX_BROADCAST = 'TX_BROADCAST';

/**
 * When a receipt was received, may be multiple times in case of chain re-organization.
 * @type {ReduxActionType}
 */
export const TX_RECEIPT = 'TX_RECEIPT';

/**
 * Success, fired after processing "TX_RECEIPT", when the receipt shows the TX was mined.
 * @type {ReduxActionType}
 */
export const TX_SUCCESS = 'TX_SUCCESS';

/**
 * Failed, fired after processing "TX_RECEIPT", or on edge cases.
 * @type {ReduxActionType}
 */
/**
 * Has a "receipt" if it was a mining failure (e.g. out of gas).
 * @type {ReduxActionType}
 */
export const TX_FAILED = 'TX_FAILED';

/**
 * When web3 explicitly provided us with 12 chained confirmations.
 * @type {ReduxActionType}
 */
export const TX_FINAL = 'TX_FINAL';

/**
 * Remove TX from the tracker.
 * @type {ReduxActionType}
 */
export const FORGET_TX = 'FORGET_TX';
