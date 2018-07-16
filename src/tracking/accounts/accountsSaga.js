import {
  put, takeLatest
} from 'redux-saga/effects';
import accountsAT from './accountsAT';

function* tryFetchAccounts(action) {
  // TODO fetch accounts

  yield put({ type: accountsAT.ACCOUNTS_FETCH_COMPLETED, accounts: [ /* TODO */ ] });
}

// TODO also sync accounts


function* accountsSaga() {
  yield takeLatest(accountsAT.ACCOUNTS_START_FETCH, tryFetchAccounts);
}

export default accountsSaga;
