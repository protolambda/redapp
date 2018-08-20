
/**
 * Start polling, for simple non-websocket based Web3 providers such as Metamask.
 * @type {ReduxActionType}
 */
export const BLOCKS_START_POLLING = 'BLOCKS_START_POLLING';

/**
 * Stop polling, for simple non-websocket based Web3 providers such as Metamask
 * @type {ReduxActionType}
 */
export const BLOCKS_STOP_POLLING = 'BLOCKS_STOP_POLLING';

/**
 * When an error occurs during polling for blocks.
 * @type {ReduxActionType}
 */
export const BLOCKS_POLL_ERROR = 'BLOCKS_POLL_ERROR';

/**
 * Starts listening, for websocket based Web3 providers.
 * @type {ReduxActionType}
 */
export const BLOCKS_START_LISTENING = 'BLOCKS_START_LISTENING';

/**
 * Stops listening, for websocket based Web3 providers.
 * @type {ReduxActionType}
 */
export const BLOCKS_STOP_LISTENING = 'BLOCKS_STOP_LISTENING';

/**
 * Trigger that is used to tunnel the subscription event to a block check.
 * @type {ReduxActionType}
 */
export const BLOCKS_SUB_NEW_BLOCK_CHECK = 'BLOCKS_SUB_NEW_BLOCK_CHECK';

/**
 * When an error occurs during listening for blocks.
 * @type {ReduxActionType}
 */
export const BLOCKS_LISTEN_ERROR = 'BLOCKS_LISTEN_ERROR';

/**
 * Force get latest block.
 * @type {ReduxActionType}
 */
export const GET_LATEST_BLOCK = 'GET_LATEST_BLOCK';

/**
 * Force get a specific block (passed with 'blockHandle').
 * May be removed if it is not within the allowed the block-depth.
 * @type {ReduxActionType}
 */
export const GET_BLOCK = 'GET_BLOCK';

/**
 * When retrieving a block fails.
 * @type {ReduxActionType}
 */
export const BLOCK_RETRIEVAL_ERROR = 'BLOCK_RETRIEVAL_ERROR';

/**
 * When raw block data was received.
 * @type {ReduxActionType}
 */
export const BLOCK_RECEIVED = 'BLOCK_RECEIVED';

/**
 * When block data from "BLOCK_RECEIVED" was processed successfully.
 * @type {ReduxActionType}
 */
export const BLOCK_PROCESSED = 'BLOCK_PROCESSED';

/**
 * When block data from "BLOCK_RECEIVED" could not be processed.
 * @type {ReduxActionType}
 */
export const BLOCK_FAILED = 'BLOCK_FAILED';
