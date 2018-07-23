import { all, fork } from 'redux-saga/effects';

import accountsSaga from './accounts/accountsSaga';
// import blocksSaga from './blocks/';
import callsSaga from './calls/callsSaga';
import transactionsSaga from './transactions/transactionsSaga';

/**
 *  This saga forks into all tracking sagas.
 */
export default function* root(web3) {
  yield all([
    fork(accountsSaga, web3),
    fork(callsSaga, web3),
    fork(transactionsSaga, web3)
  ]);
}
