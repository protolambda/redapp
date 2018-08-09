import { all, fork } from 'redux-saga/effects';
import redappSaga from 'redapp/es/saga';

export default function* root(web3) {
  yield all([
    fork(redappSaga, web3)
    // Add your sagas
  ]);
}
