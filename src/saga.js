import { all, fork } from 'redux-saga/effects';

import trackingSaga from './tracking/trackingSaga';
import contractsSaga from './contracts/contractsSaga';

/**
 *  Forks to tracking and contracts saga.
 */
export default function* root() {
  yield all([
    fork(trackingSaga),
    fork(contractsSaga)
  ]);
}
