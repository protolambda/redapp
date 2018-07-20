import callsAT from './callsAT';
import mappedReducer from '../../util/mapped-reducer';

const initialState = {
  // no calls initially
};

/*
  cache structure:

  cache: {
    // key, or "callID", is the hex string of the soldity-sha3 hash of the arguments,
    // suffixed with "-", and then the blocknumber that was used.
    "0xDEADBEEF": {
      status: "success"/"failed"/"in-progress",
      rawValue: ...., // raw returned data
      value: ..., // decoded data, if a decoder was available
      decoder: (data) => value, // decoding function
      block: block number used, e.g. "latest", or "123"
    },
    ....more call cache entries
  }
*/

const mapping = {
  [callsAT.FORCE_CALL]: (state, { callID, blockNr, outputsABI }) => ({
    ...state,
    // Create a new cache entry if it does not already exist
    [callID]: state.cache[callID] || {
      status: 'in-progress',
      rawValue: undefined,
      value: undefined,
      outputsABI,
      blockNr // blockNr is optional
    }
  }),

  [callsAT.CALL_RETURNED]: (state, { callID, rawValue }) => ({
    ...state,
    [callID]: {
      // keep old state; blockNr is still there.
      ...state.cache[callID],
      status: 'success',
      rawValue
    }
  }),

  [callsAT.CALL_FAILED]: (state, { callID, err }) => ({
    ...state,
    [callID]: {
      // keep old state; blockNr is still there.
      ...state.cache[callID],
      status: 'failed',
      rawValue: null,
      value: null,
      err
    }
  }),

  [callsAT.CLEAR_CACHE]: () => ({
    // cache is empty now.
  }),

  [callsAT.FORGET_CALL]: (state, { callID }) => {
    const res = {...state};
    delete res[callID];
    return res;
  }
};

export default mappedReducer(mapping, initialState);
