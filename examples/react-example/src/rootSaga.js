import { all, fork } from 'redux-saga/effects';
import redappSaga from 'redapp/es/saga';

const getRedappState = rootState => rootState.redapp;

export default function* root(web3) {
  yield all([
    fork(redappSaga, web3, 3, getRedappState) // Set default network ID to ropsten (ID = 3)
    // Add your sagas
  ]);
}
