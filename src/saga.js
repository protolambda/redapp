import { all, fork } from 'redux-saga/effects';

import trackingSaga from './tracking/trackingSaga';
import contractsSaga from './contracts/contractsSaga';

/**
 *  Forks to tracking and contracts saga.
 */
export default function* root(web3) {
  yield all([
    fork(trackingSaga, web3),
    fork(contractsSaga, web3)
  ]);
}
