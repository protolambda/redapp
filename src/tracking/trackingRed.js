import { combineReducers } from 'redux';

import accountsRed from './accounts/accountsRed';
import blocksRed from './blocks/blocksRed';
import transactionsRed from './transactions/transactionsRed';
import callsRed from './calls/callsRed';

const trackingRed = combineReducers({
  accounts: accountsRed,
  blocks: blocksRed,
  transactions: transactionsRed,
  calls: callsRed
});

export default trackingRed;
