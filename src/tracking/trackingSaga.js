import { all, fork } from 'redux-saga/effects';

import accountsSaga from './accounts/accountsSaga';
// import blocksSaga from './blocks/';
import callsSaga from './calls/callsSaga';
import transactionsSaga from './transactions/transactionsSaga';

/**
 *  This saga forks into all tracking sagas.
 */
export default function* root() {
  yield all([
    fork(accountsSaga),
    fork(callsSaga),
    fork(transactionsSaga)
  ]);
}
