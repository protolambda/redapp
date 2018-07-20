import { combineReducers } from 'redux';

import trackingRed from './tracking/trackingRed';
import contractsRed from './contracts/contractsRed';

const reducer = combineReducers({
  tracking: trackingRed,
  contracts: contractsRed
});

export default reducer;
