import { applyMiddleware, createStore, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import thunkMiddleware from 'redux-thunk';
import createCLILogger from 'redux-cli-logger';
import Web3 from 'web3';
import { startAccountPolling } from 'redapp/es/tracking/accounts/actions';
import { startPolling, startListening } from 'redapp/es/tracking/blocks/actions';
import rootReducer from './rootReducer';
import rootSaga from './rootSaga';

const sagaMiddleware = createSagaMiddleware();

// Log every redux thing with this middleware, to make clear what happens in the example
const logger = createCLILogger();

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunkMiddleware, sagaMiddleware, logger)
  )
);

// Change the Web3 connection here
// Note: don't forget to change the network ID in your rootSaga to correspond with the network.
const web3 = new Web3('wss://ropsten.infura.io/ws');

sagaMiddleware.run(rootSaga, web3);

/* Optional, would be used in a real application
---------------------------------------------------------------

// Start polling for accounts, with an interval of 5 seconds.
store.dispatch(startAccountPolling(5000));

// Start polling for blocks, with an interval of 10 seconds.
store.dispatch(startPolling(10000));

// Start listening for blocks
// *Disabled*, try commenting the block polling above, and uncommenting this,
//  if you are using a web3 provider that supports subscriptions.
// store.dispatch(startListening());

*/
