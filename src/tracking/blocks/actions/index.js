import * as blocksAT from '../AT';

/**
 * Start polling blocks.
 *
 * @param interval The polling interval in milliseconds.
 * @returns {ReduxThunk} Redux thunk, dispatch to run action.
 */
export const startBlockPolling = interval => (dispatch => dispatch({
  type: blocksAT.BLOCKS_START_POLLING,
  interval,
}));

/**
 * Stop polling blocks. Polling can be resumed later with `startPolling` again.
 *
 * @returns {ReduxThunk} Redux thunk, dispatch to run action.
 */
export const stopBlockPolling = () => (dispatch => dispatch({
  type: blocksAT.BLOCKS_STOP_POLLING,
}));

/**
 * Start listening for block headers, a new header will trigger the retrieval of the latest block.

 * @returns {ReduxThunk} Redux thunk, dispatch to run action.
 */
export const startBlockListening = () => (dispatch => dispatch({
  type: blocksAT.BLOCKS_START_LISTENING,
}));

/**
 * Stop listening for block headers.
 *
 * @returns {ReduxThunk} Redux thunk, dispatch to run action.
 */
export const stopBlockListening = () => (dispatch => dispatch({
  type: blocksAT.BLOCKS_STOP_LISTENING,
}));

/**
 * Force retrieval of the latest block.
 *
 * @returns {ReduxThunk} Redux thunk, dispatch to run action.
 */
export const getLatestBlock = () => (dispatch => dispatch({
  type: blocksAT.GET_LATEST_BLOCK,
}));

/**
 * Get a specific block.
 * (Warning; block will not be inserted into the state when it's out of scope of the tracking
 * blockDepth. However, the retrieval and events will still be executed.)
 *
 * @param blockHandle The hash, number, of special name ("genesis", "latest", "pending")
 *  of the block to get.
 * @returns {ReduxThunk} Redux thunk, dispatch to run action.
 */
export const getBlock = blockHandle => (dispatch => dispatch({
  type: blocksAT.GET_LATEST_BLOCK,
  blockHandle,
}));
