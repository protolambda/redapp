import transactionsAT from './transactionsAT';

/**
 * Send a transaction, which will be tracked in the ReDApp tracking system.
 *
 * @param from The transaction sender address.
 * @param to The transaction destination address. Optional, e.g. not used for contract deployments.
 * @param value The value, ETH. Optional, defaults to 0.
 * @param gas Gas, in wei. Optional, can be calculated on the fly by web3 provider.
 * @param gasPrice Gas price. Optional, can be set by web3 provider later on.
 * @param data ABI encoded data to send with the transaction.
 *  Used for contract deploying and contract interaction.
 *  Optional, e.g. a normal ETH transfer.
 * @param nonce The transaction nonce.
 *  Optional, can be determined automatically by the web3 provider.
 * @param txID The ID to use within the tracking system.
 *  Optional, a new ID (uuid v4) is used when not set.
 * @returns {function(*): *} Redux thunk, dispatch to run action.
 */
const sendTX = ({ from, to, value, gas, gasPrice, data, nonce, txID }) => (dispatch => dispatch({
  type: transactionsAT.SEND_TX,
  from,
  to,
  value,
  gas,
  gasPrice,
  data,
  nonce,
  txID,
}));

/**
 * Remove a transaction from the tracking system.
 * Note: this does not cancel the transaction if it was already sent to the web3 instance
 *  (it may still be broadcasted, if wasn't already)
 * @param txID The ID of the transaction to remove.
 * @returns {function(*): *} Redux thunk, dispatch to run action.
 */
const forgetTX = txID => (dispatch => dispatch({
  type: transactionsAT.SEND_TX,
  txID,
}));

export default {
  sendTX,
  forgetTX,
};
