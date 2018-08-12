import {
  call, fork, put, select, takeEvery
} from 'redux-saga/effects';
import poller from '../../util/poller';
import blocksAT from './blocksAT';

function* tryFetchNewBlocks(web3, getBlocksState) {
  // TODO get latest block hash
  // TODO work back from latest hash, until we find a new block
  // TODO remove any orphaned blocks. (or keep them for reference?)
}

function* blocksPollWorker(web3, getBlocksState) {
  yield call(tryFetchNewBlocks, web3, getBlocksState);
}

function* blocksPollError(err) {
  yield put({type: blocksAT.BLOCKS_POLL_ERROR, err});
}

function* blocksSaga(web3, getBlocksState) {
  // Polling system, only intended for non-stream based RPC, e.g. metamask (over http).
  yield fork(poller(
    blocksAT.BLOCKS_START_POLLING,
    blocksAT.BLOCKS_STOP_POLLING,
    blocksPollWorker,
    blocksPollError,
    web3, getBlocksState
  ));
}

export default blocksSaga;
