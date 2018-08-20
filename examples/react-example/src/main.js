/* eslint-disable no-unused-vars */
import '@babel/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { applyMiddleware, createStore, compose } from 'redux';
import { Provider } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import createSagaMiddleware from 'redux-saga';
import thunkMiddleware from 'redux-thunk';
import initWeb3 from 'redapp/es/initWeb3';
import { startAccountPolling } from 'redapp/es/tracking/accounts/actions';
import { startPolling } from 'redapp/es/tracking/blocks/actions';
import rootReducer from './rootReducer';
import rootSaga from './rootSaga';
import App from './components/App';
const sagaMiddleware = createSagaMiddleware();

// Redux DevTools
// eslint-disable-next-line no-underscore-dangle
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(thunkMiddleware, sagaMiddleware)
  )
);

const web3 = initWeb3();

sagaMiddleware.run(rootSaga, web3);

// Start polling for accounts, with an interval of 5 seconds.
store.dispatch(startAccountPolling(5000));

// TODO; if we are using a web-socket,
//  choose to go for subscription-based block tracking.
// Start polling for blocks, with an interval of 10 seconds.
store.dispatch(startPolling(10000));

function render() {
  ReactDOM.render(
    <div>
      <CssBaseline />
      <Provider store={store}>
        <App/>
      </Provider>
    </div>,
    document.getElementById('root'),
  );
}

render();
store.subscribe(render);
