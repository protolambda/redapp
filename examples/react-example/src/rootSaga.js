import { all, fork } from 'redux-saga/effects';
import redappSaga from 'redapp/es/saga';

const getRedappState = rootState => rootState.redapp;

export default function* root(web3) {
  yield all([
    fork(redappSaga, web3, 1, getRedappState) // Set default network ID to main-net (ID = 1)
    // Add your sagas
  ]);
}
