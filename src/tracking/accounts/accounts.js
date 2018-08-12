import accountsAT from './accountsAT';

/**
 * Get data for an individual account.
 *
 * @param address The address to get the data for.
 * @returns {function(*): *} Redux thunk, dispatch to run action.
 */
const getSingleAccount = address => (dispatch => dispatch({
  type: accountsAT.ACCOUNT_GET,
  account: address,
}));

/**
 * To start updating the balance of an account
 *
 * @param address
 * @returns {function(*): *} Redux thunk, dispatch to run action.
 */
const getBalance = address => (dispatch => dispatch({
  type: accountsAT.ACCOUNT_GET_BALANCE,
  account: address,
}));

/**
 * Get data (like the balance) for each account in the tracker
 *
 * @returns {function(*): *} Redux thunk, dispatch to run action.
 */
const getAllAccounts = () => (dispatch => dispatch({
  type: accountsAT.ACCOUNTS_GET_ALL,
}));

/**
 * Update the list of wallet accounts.
 *
 * @returns {function(*): *} Redux thunk, dispatch to run action.
 */
const fetchAllAcounts = () => (dispatch => dispatch({
  type: accountsAT.ACCOUNTS_START_FETCH,
}));

/**
 * Start polling for accounts.
 * @param interval The polling interval in milliseconds.
 * @returns {function(*): *} Redux thunk, dispatch to run action.
 */
const startAccountPolling = interval => (dispatch => dispatch({
  type: accountsAT.ACCOUNTS_START_POLLING,
  interval
}));

/**
 * Stop polling for accounts.
 *
 * @returns {function(*): *} Redux thunk, dispatch to run action.
 */
const stopAccountPolling = () => (dispatch => dispatch({
  type: accountsAT.ACCOUNTS_STOP_POLLING,
}));

export default {
  getSingleAccount,
  getBalance,
  getAllAccounts,
  fetchAllAcounts,
  startAccountPolling,
  stopAccountPolling
};
