import { all, fork } from 'redux-saga/effects';

import accountsSaga from './accounts/accountsSaga';
import blocksSaga from './blocks/blocksSaga';
import callsSaga from './calls/callsSaga';
import transactionsSaga from './transactions/transactionsSaga';

/**
 * Forks to tracking and contracts saga.
 * @param web3 The web3js 1.0 instance to use.
 * @param getTrackingState {ReduxStateSelector} Gets tracking state.
 * @return {ReduxSaga} Tracking saga.
 */
export default function* trackingSaga(web3, getTrackingState) {
  yield all([
    fork(accountsSaga, web3, state => getTrackingState(state).accounts),
    fork(blocksSaga, web3, state => getTrackingState(state).blocks),
    fork(callsSaga, web3, state => getTrackingState(state).calls),
    fork(transactionsSaga, web3, state => getTrackingState(state).transactions)
  ]);
}
