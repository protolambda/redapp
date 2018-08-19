import {
  call, fork, put, select, takeEvery, takeLatest
} from 'redux-saga/effects';
import * as accountsAT from './AT';
import poller from '../../util/poller';

function* tryFetchAccounts(web3) {
  try {
    // fetch the accounts from web3
    const accounts = yield call(web3.eth.getAccounts);

    // TODO: do we like this as behavior? Or is no accounts a valid fetch result?
    if (!accounts) {
      throw new Error('No accounts available.');
    }

    // Simply create make the reducer handle the new accounts;
    //  old accounts will be filtered, new accounts added.
    yield put({type: accountsAT.ACCOUNTS_FETCH_COMPLETED, accounts});
  } catch (err) {
    yield put({type: accountsAT.ACCOUNTS_FETCH_FAILED, err});
  }
}
// TODO should accounts be fetched automatically on interval?

function* tryGetBalance(web3, {account}) {
  try {
    const balance = yield call(web3.eth.getBalance, account);

    yield put({type: accountsAT.ACCOUNT_BALANCE, balance});
  } catch (err) {
    yield put({type: accountsAT.ACCOUNT_GET_BALANCE_FAILED, err});
  }
}

function* getSingle({account}) {
  // No other data than just the balance for now.
  yield put({type: accountsAT.ACCOUNT_GET_BALANCE, account});
}

function* getAll(getAccountsState) {
  const accounts = yield select(getAccountsState);

  // Get wallet accounts
  for (const account of Object.keys(accounts.wallet)) {
    yield put({type: accountsAT.ACCOUNT_GET, account});
  }

  // Get local accounts (tracked, but not part of wallet)
  for (const account of Object.keys(accounts.local)) {
    yield put({type: accountsAT.ACCOUNT_GET, account});
  }
}

function* accountsPollWorker(web3, getAccountsState) {
  yield call(tryFetchAccounts, web3);
  yield call(getAll, getAccountsState);
}

function* accountsPollError(err) {
  yield put({type: accountsAT.ACCOUNTS_POLL_ERROR, err: err.message});
}

function* accountsSaga(web3, getAccountsState) {
  yield fork(poller(
    accountsAT.ACCOUNTS_START_POLLING,
    accountsAT.ACCOUNTS_STOP_POLLING,
    accountsPollWorker,
    accountsPollError,
    web3, getAccountsState
  ));
  // only take latest, doing multiple buffered updates is useless.
  yield takeLatest(accountsAT.ACCOUNTS_START_FETCH, tryFetchAccounts, web3);
  yield takeLatest(accountsAT.ACCOUNTS_GET_ALL, getAll, getAccountsState);
  yield takeEvery(accountsAT.ACCOUNT_GET, getSingle);
  yield takeEvery(accountsAT.ACCOUNT_GET_BALANCE, tryGetBalance, web3);
}

export default accountsSaga;
