import { all, fork } from 'redux-saga/effects';

import web3Saga from './web3/web3Saga';

/**
 *  Simply forks to all ReDApp sagas
 */
export default function* root() {
  yield all([
    // fork(todoSaga),
    fork(web3Saga)
  ]);
}
