import { all, fork } from 'redux-saga/effects';

import trackingSaga from './tracking/trackingSaga';
import contractsSaga from './contracts/contractsSaga';

/**
 * Forks to tracking and contracts saga.
 * @param web3 The web3js 1.0 instance to use.
 * @param defaultNetworkId The network ID to resort to when no specific
 *  network ID is specified in an action.
 * @param getRootState A state selector (E.g. `(state) => state.redapp`)
 *  that points to the root of the ReDApp state. This pattern repeats for each saga,
 *  enabling you to compose custom state structures.
 * @returns {IterableIterator<*>} The raw Saga.
 */
export default function* root(web3, defaultNetworkId, getRootState) {
  yield all([
    fork(trackingSaga, web3, state => getRootState(state).tracking),
    fork(contractsSaga, web3, defaultNetworkId, state => getRootState(state).contracts)
  ]);
}
