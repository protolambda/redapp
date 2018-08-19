import * as accountsAT from '../AT';

/**
 * Get data for an individual account.
 *
 * @param address The address to get the data for.
 * @returns {ReduxThunk} Redux thunk, dispatch to run action.
 */
export const getSingleAccount = address => (dispatch => dispatch({
  type: accountsAT.ACCOUNT_GET,
  account: address,
}));

/**
 * To start updating the balance of an account
 *
 * @param address
 * @returns {ReduxThunk} Redux thunk, dispatch to run action.
 */
export const getBalance = address => (dispatch => dispatch({
  type: accountsAT.ACCOUNT_GET_BALANCE,
  account: address,
}));

/**
 * Get data (like the balance) for each account in the tracker
 *
 * @returns {ReduxThunk} Redux thunk, dispatch to run action.
 */
export const getAllAccounts = () => (dispatch => dispatch({
  type: accountsAT.ACCOUNTS_GET_ALL,
}));

/**
 * Update the list of wallet accounts.
 *
 * @returns {ReduxThunk} Redux thunk, dispatch to run action.
 */
export const fetchAllAcounts = () => (dispatch => dispatch({
  type: accountsAT.ACCOUNTS_START_FETCH,
}));

/**
 * Start polling for accounts.
 * @param interval The polling interval in milliseconds.
 * @returns {ReduxThunk} Redux thunk, dispatch to run action.
 */
export const startAccountPolling = interval => (dispatch => dispatch({
  type: accountsAT.ACCOUNTS_START_POLLING,
  interval
}));

/**
 * Stop polling for accounts.
 *
 * @returns {ReduxThunk} Redux thunk, dispatch to run action.
 */
export const stopAccountPolling = () => (dispatch => dispatch({
  type: accountsAT.ACCOUNTS_STOP_POLLING,
}));

/**
 * Add an account to track locally. (i.e. no interaction with the user)
 *
 * @param address The address of the account to start tracking.
 * @returns {ReduxThunk} Redux thunk, dispatch to run action.
 */
export const addLocalAcount = address => (dispatch => dispatch({
  type: accountsAT.ADD_LOCAL_ACCOUNT,
  account: address
}));

/**
 * Forget local account.
 *
 * @param address The address of the account to forget.
 * @returns {ReduxThunk} Redux thunk, dispatch to run action.
 */
export const forgetLocalAccount = address => (dispatch => dispatch({
  type: accountsAT.FORGET_LOCAL_ACCOUNT,
  account: address
}));
