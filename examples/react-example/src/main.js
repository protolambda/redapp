/* eslint-disable no-unused-vars */
import '@babel/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { applyMiddleware, createStore, compose } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import reducer from './reducers';
import rootSaga from './sagas';
import App from './components/App';
import initWeb3 from 'redapp';

const sagaMiddleware = createSagaMiddleware();

// Redux DevTools
// eslint-disable-next-line no-underscore-dangle
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  composeEnhancers(
    applyMiddleware(sagaMiddleware)
  )
);

const web3 = initWeb3();

sagaMiddleware.run(rootSaga, web3);

function render() {
  ReactDOM.render(
    <Provider store={store}>
      <App/>
    </Provider>,
    document.getElementById('root'),
  );
}

render();
store.subscribe(render);
