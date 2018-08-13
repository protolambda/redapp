import {
  call, fork, put, select, takeEvery, takeLatest
} from 'redux-saga/effects';
import poller from '../../util/poller';
import blocksAT from './blocksAT';

/**
 * @param web3 Web3 handle.
 * @param blockHandle The hash, number,
 *  of special name ("genesis", "latest", "pending") of the block to get.
 * @returns {IterableIterator<*>} Saga generator
 */
function* getSpecificBlock(web3, {blockHandle}) {
  try {
    // Get the block, and put it into the store.
    const block = yield call(web3.eth.getBlock(web3));
    yield put({
      type: blocksAT.BLOCK_RECEIVED,
      ...block
    });
  } catch (err) {
    yield put({
      type: blocksAT.BLOCK_RETRIEVAL_ERROR,
      blockHandle,
      err
    });
  }
}

function* getLatestBlock(web3) {
  // Simply use the special 'latest' handle to get the latest block.
  yield call(getSpecificBlock, web3, {blockHashOrBlockNumber: 'latest'});
}

function* handleNewBlock(web3, getBlocksState, blockDepth, {parentHash, number}) {
  // continue looking for the ancestor blocks
  //  until we find a known older block, or got $blockDepth blocks in the store.
  const latestBlock = yield select(state => getBlocksState(state).blockNr);
  const parentBlock = yield select(state => getBlocksState(state).blocks[parentHash]);
  // If we don't know the parent block, and the current block number is within the
  //  block depth range to track, then try to get the parent block.
  // TODO: double check range
  if (!parentBlock && (latestBlock - blockDepth) < number) {
    yield call(getSpecificBlock, web3, parentHash);
  }
}

function* blocksPollWorker(web3) {
  yield call(getLatestBlock, web3);
}

function* blocksPollError(err) {
  yield put({type: blocksAT.BLOCKS_POLL_ERROR, err});
}

function* blocksSaga(web3, getBlocksState) {
  // TODO could be configurable.
  const blockDepth = 24;

  // Polling system, only intended for non-stream based RPC, e.g. metamask (over http).
  yield fork(poller(
    blocksAT.BLOCKS_START_POLLING,
    blocksAT.BLOCKS_STOP_POLLING,
    blocksPollWorker,
    blocksPollError,
    web3, getBlocksState
  ));
  yield takeEvery(blocksAT.BLOCK_RECEIVED, handleNewBlock, web3, getBlocksState, blockDepth);
  yield takeLatest(blocksAT.GET_LATEST_BLOCK, getLatestBlock, web3);
}

export default blocksSaga;
