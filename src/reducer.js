import { combineReducers } from 'redux';

import trackingRed from './tracking/trackingRed';
import contractsRed from './contracts/contractsRed';

/**
 * Root reducer of redapp.
 * @type {ReduxReducer}
 */
const reducer = combineReducers({
  tracking: trackingRed,
  contracts: contractsRed
});

export default reducer;
