
/**
 * Call, but try to hit local redux cache first. If not in cache, a FORCE_CALL will be fired.
 * @type {ReduxActionType}
 */
export const CACHE_CALL = 'CACHE_CALL';

/**
 * Wipe the cache.
 * @type {ReduxActionType}
 */
export const CLEAR_CACHE = 'CLEAR_CACHE';

/**
 * Remove a single call from the cache.
 * @type {ReduxActionType}
 */
export const FORGET_CALL = 'FORGET_CALL';

/**
 * Call, ignoring the cache.
 * @type {ReduxActionType}
 */
export const FORCE_CALL = 'FORCE_CALL';

/**
 * When a call promise is completed by web3, adds the raw result to the cache.
 * @type {ReduxActionType}
 */
export const CALL_RETURNED = 'CALL_RETURNED';

/**
 * When a call is decoded, after `CALL_RETURNED`.
 * @type {ReduxActionType}
 */
export const CALL_DECODE_SUCCESS = 'CALL_DECODE_SUCCESS';

/**
 * When a call failed to be decoded but was otherwise successful.
 * @type {ReduxActionType}
 */
export const CALL_DECODE_FAIL = 'CALL_DECODE_FAIL';

/**
 * When the call failed, (e.g. invalid block number).
 * @type {ReduxActionType}
 */
export const CALL_FAILED = 'CALL_FAILED';
