import * as transactionsAT from '../AT';

/**
 * Send a transaction, which will be tracked in the ReDApp tracking system.
 *
 * @param options Options
 * @param options.from The transaction sender address.
 * @param options.to The transaction destination address.
 *  Optional, e.g. not used for contract deployments.
 * @param options.value The value, ETH. Optional, defaults to 0.
 * @param options.gas Gas, in wei. Optional, can be calculated on the fly by web3 provider.
 * @param options.gasPrice Gas price. Optional, can be set by web3 provider later on.
 * @param options.data ABI encoded data to send with the transaction.
 *  Used for contract deploying and contract interaction.
 *  Optional, e.g. a normal ETH transfer.
 * @param options.nonce The transaction nonce.
 *  Optional, can be determined automatically by the web3 provider.
 * @param options.txID The ID to use within the tracking system.
 *  Optional, a new ID (uuid v4) is used when not set.
 * @returns {ReduxThunk} Redux thunk, dispatch to run action.
 */
export const sendTX = ({ from, to, value, gas, gasPrice, data, nonce, txID }) => (
  dispatch => dispatch({
    type: transactionsAT.SEND_TX,
    from,
    to,
    value,
    gas,
    gasPrice,
    data,
    nonce,
    txID,
  })
);

/**
 * Remove a transaction from the tracking system.
 * Note: this does not cancel the transaction if it was already sent to the web3 instance
 *  (it may still be broadcasted, if wasn't already)
 * @param txID The ID of the transaction to remove.
 * @returns {ReduxThunk} Redux thunk, dispatch to run action.
 */
export const forgetTX = txID => (dispatch => dispatch({
  type: transactionsAT.FORGET_TX,
  txID,
}));
