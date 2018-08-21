import { all, fork } from 'redux-saga/effects';
import redappSaga from 'redapp/es/saga';
import exampleSaga from './exampleSaga';

const getRedappState = rootState => rootState.redapp;

// Minimal root-saga, you can re-structure redapp however you like by forking the sagas yourself,
//  and providing functions that get the necessary parts within the state.
export default function* root(web3) {
  yield all([
    fork(redappSaga, web3, 3, getRedappState), // Set default network ID to ropsten (ID = 3)
    // Add your sagas
    // You can pass the web3 instance to your saga,
    //  but it likely won't be necessary when you use the web3 redux-interface provided by redapp.
    fork(exampleSaga)
  ]);
}
