import {
  call, fork, put, select, takeEvery, takeLatest
} from 'redux-saga/effects';
import poller from '../../util/poller';
import subber from '../../util/subber';
import * as blocksAT from './AT';

/**
 * @param web3 Web3 handle.
 * @param action The action to handle.
 * @param action.blockHandle The hash, number,
 *  of special name ("genesis", "latest", "pending") of the block to get.
 * @returns {ReduxSaga} Saga generator
 */
function* getSpecificBlock(web3, {blockHandle}) {
  try {
    // Get the block, and put it into the store.
    const block = yield call(web3.eth.getBlock, blockHandle);
    yield put({
      type: blocksAT.BLOCK_RECEIVED,
      // isolate block data from the action, i.e. add as payload named 'block'
      block
    });
  } catch (err) {
    yield put({
      type: blocksAT.BLOCK_RETRIEVAL_ERROR,
      blockHandle,
      err: err.message
    });
  }
}

function* getLatestBlock(web3) {
  // Simply use the special 'latest' handle to get the latest block.
  yield call(getSpecificBlock, web3, {blockHandle: 'latest'});
}

function* handleNewBlock(web3, getBlocksState, blockDepth, {block: {parentHash, number}}) {
  // continue looking for the ancestor blocks
  //  until we find a known older block, or got $blockDepth blocks in the store.
  const latestBlock = yield select(state => getBlocksState(state).latest.number);
  const parentBlock = yield select(state => getBlocksState(state).blocks[parentHash]);
  // If we don't know the parent block, and the current block number is within the
  //  block depth range to track, then try to get the parent block.
  // TODO: double check range
  if (!parentBlock && (latestBlock - blockDepth) < number) {
    yield put({type: blocksAT.GET_BLOCK, blockHandle: parentHash});
  }
}

function* blocksPollWorker(web3, getBlocksState) {
  const reportedNumber = yield call(web3.eth.getBlockNumber);
  const stateNumber = yield select(state => getBlocksState(state).latest.number);
  // Retrieve the data of the block if we know the block will be higher than we already have.
  if (reportedNumber > stateNumber) {
    // We know the exact block number, but try get the latest anyway.
    // Maybe we are lagging behind badly,
    //  and then it's better to just skip and back-fill only the necessary depth.
    // Also, duplicate GET_LATEST_BLOCK actions are reduced to only the latest.
    yield put({type: blocksAT.GET_LATEST_BLOCK});
  }
}

function* blocksPollError(err) {
  yield put({type: blocksAT.BLOCKS_POLL_ERROR, err: err.message});
}

function* blocksSubWorker(web3, getBlocksState, {number, hash}) {
  // if it has no hash, than we got a pending block. Ignore it.
  if (!hash) return;

  // "number": the block-number from the block-header received from the subscription.
  const stateNumber = yield select(state => getBlocksState(state).latest.number);
  // Retrieve the data of the block if we know the block will be higher than we already have.
  if (number > stateNumber) {
    yield call(getLatestBlock, web3);
  }
}

/**
 * Handles ReDApp block background processing.
 * @param web3 The web3js 1.0 instance to use.
 * @param {ReduxStateSelector} getBlocksState Gets blocks state
 *  (obj. incl. both `blocks` and `latest`)
 * @return {ReduxSaga} Blocks saga.
 */
function* blocksSaga(web3, getBlocksState) {
  // Get block depth from the store.
  const blockDepth = (yield select(state => getBlocksState(state).maxBlockDepth)) || 24;

  // Polling system, only intended for non-stream based RPC, e.g. metamask (over http).
  yield fork(poller(
    blocksAT.BLOCKS_START_POLLING,
    blocksAT.BLOCKS_STOP_POLLING,
    blocksPollWorker,
    blocksPollError,
    web3, getBlocksState
  ));

  yield fork(subber(
    blocksAT.BLOCKS_START_LISTENING,
    blocksAT.BLOCKS_STOP_LISTENING,
    // Get the full block, the header has slightly less data (Compared to getBlock without TXs)
    blocksAT.BLOCKS_SUB_NEW_BLOCK_CHECK,
    // "changed" events are never fired by block-headers subscription, bad generalization of web3js
    null,
    blocksAT.BLOCKS_LISTEN_ERROR,
    () => web3.eth.subscribe('newBlockHeaders')
  ));
  yield takeEvery(blocksAT.BLOCK_RECEIVED, handleNewBlock, web3, getBlocksState, blockDepth);
  yield takeLatest(blocksAT.GET_LATEST_BLOCK, getLatestBlock, web3);
  yield takeEvery(blocksAT.GET_BLOCK, getSpecificBlock, web3);
  yield takeEvery(blocksAT.BLOCKS_SUB_NEW_BLOCK_CHECK, blocksSubWorker, web3, getBlocksState);
}

export default blocksSaga;
