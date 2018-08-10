import { all, fork } from 'redux-saga/effects';

import accountsSaga from './accounts/accountsSaga';
// import blocksSaga from './blocks/';
import callsSaga from './calls/callsSaga';
import transactionsSaga from './transactions/transactionsSaga';

/**
 *  This saga forks into all tracking sagas.
 */
export default function* root(web3, getTrackingState) {
  yield all([
    fork(accountsSaga, web3, state => getTrackingState(state).accounts),
    fork(callsSaga, web3, state => getTrackingState(state).calls),
    fork(transactionsSaga, web3, state => getTrackingState(state).transactions)
  ]);
}
