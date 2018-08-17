import transactionsAT from './transactionsAT';
import mappedReducer from '../../util/mapped-reducer';

const initialState = {
  // empty initially
};

// TX flow:
//
//     *creation*         = User calls tx method
//  -> [send]             = TX_SEND is started
//  -> [sent]             = tx is added into tracker store, TX_SENT.
//                           Web3provider needs to broadcast now
//                           (e.g. user signs+sends with Metamask)
//  -> [broadcast]        = Web3provider answered, we have a hash now, TX is in pool. TX_BROADCAST.
//  -> *pending*          = Waiting for tx to get mined
//  -> *confirmation*     = TX is mined, now we have to wait for the web3 provider to tell us.
//  -> [receipt]          = Web3provider tells us the tx was processed.
//                           Receipt is handled with TX_RECEIPT.
//                           The receipt is being processed now.
//  -> [failed/success]   = ReDApp fires an TX_SUCCESS/TX_FAILED depending on the receipt.
//                           Note: TX_FAILED can also be fired without receipt,
//                           meaning that the TX failed before being processed.
//                           It fails with receipt when it ran out of gas.
//  -> *more blocks mined on top*
//  -> [confirmation, for each block] = Receipt may change, web3 tells us about the next 12 blocks.
//                           But what we're really interested in is if the receipt changes,
//                           in which case there should be another confirmation
//                           from web3 with number 0. In this case, the TX_RECEIPT is fired again.
//
// *something* = implicit state, no events
// [something] = explicit, fires an event
//
// Note that pending is an implicit state,
//  and that the first confirmation won't be noticed before getting the first receipt,
//  hence it not being a Redux event.

// simple util function that replicates previous state and replace the specific transaction state.
const updateTx = (state, txID, txState) => ({
  ...state,
  [txID]: txState
});

const mapping = {
  [transactionsAT.TX_SENT]: (state, { txID }) => updateTx(state, txID,
    {...state[txID], status: 'sent' }),

  [transactionsAT.SEND_TX_FAILED]: (state, { txID, err }) => updateTx(state, txID,
    {...state[txID], status: 'send_failed', err }),

  [transactionsAT.TX_BROADCAST]: (state, { txID, txHash }) => updateTx(state, txID,
    {...state[txID], status: 'broadcast', hash: txHash }),

  [transactionsAT.TX_FAILED]: (state, { txID, receipt }) => updateTx(state, txID,
    {...state[txID], status: 'failed', receipt}),

  [transactionsAT.TX_SUCCESS]: (state, { txID, receipt }) => updateTx(state, txID,
    {...state[txID], status: 'success', receipt}),

  [transactionsAT.TX_RECEIPT]: (state, { txID, receipt }) => updateTx(state, txID,
    {...state[txID], receipt}),

  [transactionsAT.FORGET_TX]: (state, { txID }) => {
    const res = {...state};
    delete res[txID];
    return res;
  }
};

/**
 * Transactions reducer of redapp.
 * @type {ReduxReducer}
 */
export default mappedReducer(mapping, initialState);
