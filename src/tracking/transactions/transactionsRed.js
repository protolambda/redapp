import transactionsAT from './transactionsAT';
import mappedReducer from '../../util/mapped-reducer';

const initialState = {
  tracker: {}
};

// TX flow:
//
// *creation* -> [broadcast] -> *pending* -> *confirmation* -> [receipt] -> [failed/success]
//
// *something* = implicit state, no events
// [something] = explicit, fires an event
//
// Note that pending is an implicit state,
//  and that the first confirmation won't be noticed before getting the first receipt,
//  hence it not being a Redux event.

// simple util function that replicates previous state and replace the specific transaction state.
const updateTx = (state, trackingId, txState) => ({
  ...state,
  tracker: {
    ...state.tracker,
    [trackingId]: txState
  }
});

const mapping = {
  [transactionsAT.TX_BROADCAST]: (state, { trackingId }) => updateTx(state, trackingId,
    {...state.tracker[trackingId], status: 'broadcast'}),

  [transactionsAT.TX_FAILED]: (state, { trackingId }) => updateTx(state, trackingId,
    {...state.tracker[trackingId], status: 'failed'}),

  [transactionsAT.TX_SUCCESS]: (state, { trackingId }) => updateTx(state, trackingId,
    {...state.tracker[trackingId], status: 'success'}),

  [transactionsAT.TX_RECEIPT]: (state, { trackingId, receipt }) => updateTx(state, trackingId,
    {...state.tracker[trackingId], receipt}),

  [transactionsAT.FORGET_TX]: (state, { trackingId }) => {
    const res = {...state};
    delete res.tracker[trackingId];
    return res;
  }
};

export default mappedReducer(mapping, initialState);
