import callsAT from './callsAT';

/**
 * Start a new call, but try to hit the cache for an existing call result first.
 * Note: the callID is used to match with a previous call:
 *  the callID should be formatted consistently, based on address, calldata, and block-number,
 *   to hit the cache properly.
 * The format used internally by ReDApp contract calls is:
 * `${to}-${Web3Utils.soliditySha3(data)}-${blockNr || 'latest'}`
 *
 * @param from The call sender address. Optional.
 * @param to The call destination address, i.e. the contract address.
 * @param data ABI encoded call-data.
 *  E.g. a method signature + encoded arguments for a regular contract function.
 * @param blockNr The block number to use, format corresponding to web3.js
 *  formatting: a number, or special value like 'latest'. Optional, web3.js defaults to 'latest'.
 * @param callID The ID to use within the tracking system.
 *  Optional, a new ID (uuid v4) is used when not set.
 * @param outputsABI The ABI spec of the expected outputs. Optional, if set,
 *  the raw resulting value will be decoded and stored with the other data in the store.
 * @returns {function(*): *} Redux thunk, dispatch to run action.
 */
const cacheCall = ({ from, to, data, blockNr, callID, outputsABI }) => (dispatch => dispatch({
  type: callsAT.CACHE_CALL,
  from,
  to,
  data,
  blockNr,
  callID,
  outputsABI,
}));

/**
 * Start a new call, ignoring previous call data, forcing an overwrite when getting the result.
 *
 * @param from The call sender address. Optional.
 * @param to The call destionation address, i.e. the contract address.
 * @param data ABI encoded call-data.
 *  E.g. a method signature + encoded arguments for a regular contract function.
 * @param blockNr The block number to use, format corresponding to web3.js
 *  formatting: a number, or special value like 'latest'. Optional, web3.js defaults to 'latest'.
 * @param callID The ID to use within the tracking system.
 *  Optional, a new ID (uuid v4) is used when not set.
 * @param outputsABI The ABI spec of the expected outputs. Optional, if set,
 *  the raw resulting value will be decoded and stored with the other data in the store.
 * @returns {function(*): *} Redux thunk, dispatch to run action.
 */
const forceCall = ({ from, to, data, blockNr, callID, outputsABI }) => (dispatch => dispatch({
  type: callsAT.FORCE_CALL,
  from,
  to,
  data,
  blockNr,
  callID,
  outputsABI,
}));

export default {
  cacheCall,
  forceCall,
};
