import {
  call, put, select, takeEvery, takeLatest
} from 'redux-saga/effects';
import accountsAT from './accountsAT';

function* tryFetchAccounts(action, web3) {
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

const getAccounts = state => state.accounts;

function* tryGetBalance({account}, web3) {
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

function* getAll() {
  const accounts = yield select(getAccounts);

  for (const account of accounts) {
    yield put({type: accountsAT.ACCOUNT_GET, account});
  }
}

function* accountsSaga(web3) {
  // only take latest, doing multiple buffered updates is useless.
  yield takeLatest(accountsAT.ACCOUNTS_START_FETCH, tryFetchAccounts, web3);
  yield takeLatest(accountsAT.ACCOUNTS_GET_ALL, getAll);
  yield takeEvery(accountsAT.ACCOUNT_GET, getSingle);
  yield takeEvery(accountsAT.ACCOUNT_GET_BALANCE, tryGetBalance, web3);
}

export default accountsSaga;
