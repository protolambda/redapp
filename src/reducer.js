import { combineReducers } from 'redux';

import web3Red from './web3/web3Red';
import trackingRed from './tracking/trackingRed';
import contractsRed from './contracts/contractsRed';

const reducer = combineReducers({
  web3: web3Red,
  tracking: trackingRed,
  contracts: contractsRed
});

export default reducer;
