import { combineReducers } from 'redux';

import accountsRed from './accounts/accountsRed';
import blocksRed from './blocks/blocksRed';
import transactionsRed from './transactions/transactionsRed';

const trackingRed = combineReducers({
  accounts: accountsRed,
  blocks: blocksRed,
  transactions: transactionsRed
});

export default trackingRed;
