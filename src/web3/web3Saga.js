import {
  call, put, takeLatest
} from 'redux-saga/effects';
import Web3 from 'web3';
import web3AT from './web3AT';

function* initWeb3({ options }) {
  let web3 = null;

  // Check for injected web3 provider.
  if (typeof window.web3 !== 'undefined') {
    web3 = new Web3(window.web3.currentProvider);
  }

  // If no web3 provider was injected into the web-page, then try to use the fallback.
  if (!web3 && options.fallback) {
    switch (options.fallback.type) {
      case 'ws': {
        const provider = new Web3.providers.WebsocketProvider(options.fallback.url);
        web3 = new Web3(provider);
        break;
      }
      // TODO add more fallback types (?)
      default:
        throw new Error(`Unknown web3 provider fallback type: ${options.fallback.type}.`);
    }
  }

  if (!web3) {
    throw new Error('No injected web3 provider or fallback option.');
  }

  // TODO: web3 object can be modified here, e.g. attach properties/functions.

  yield put({ type: web3AT.WEB3_INIT_COMPLETED });

  return web3;
}

// Tries to init web3, but dispatches a WEB3_INIT_FAILED when initialization errors.
function* tryInitWeb3(action) {
  try {
    yield call(initWeb3, { options: action.options });
  } catch (error) {
    yield put({ type: web3AT.WEB3_INIT_FAILED, error });
  }
}

function* web3Saga() {
  yield takeLatest(web3AT.WEB3_START_INIT, tryInitWeb3);
}

export default web3Saga;
