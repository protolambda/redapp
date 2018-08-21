import {combineReducers} from 'redux';

import redappReducer from 'redapp/es/reducer';

const rootReducer = combineReducers({
  // Insert redapp reducers,
  // or alternatively, insert the different parts (contracts, tracking, etc.) separately
  redapp: redappReducer,
  // Add your reducers
});

export default rootReducer;
