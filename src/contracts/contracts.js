import contractsAT from './contractsAT';

/**
 * Load a contract (binding it to an web3js Contract instance), and add it to the redux store.
 * The methods of the contract are also added to the store,
 * which can be called with their ABI arguments. This produces a thunk and an ID,
 * the thunk can then be dispatched to execute the method,
 * and the ID can be used to track the progress.
 *
 * @param contractName The name of the contract, to use as key in the store.
 *  Any contract with the same name will be overwritten.
 * @param abi The ABI spec (decoded object, not encoded as string).
 *  All the methods in the spec will be loaded as call/send thunk creators.
 *  (i.e. cacheCall/forceCall/trackedSend)
 * @param networks The network spec, like formatted by tools like truffle. An object,
 *  with network IDs (strings) as keys, and each value being an object with an "address" property.
 * @returns {function(*): *} Redux thunk, dispatch to run action.
 */
const addContract = (contractName, abi, networks) => (dispatch => dispatch({
  type: contractsAT.ADD_CONTRACT,
  contractName,
  abi,
  networks,
}));

/**
 * Removes the contract from the local redux store.
 * Note: this does not affect the real contract in any way.
 * @param contractName The name of the contract (key in the state tree)
 * @returns {function(*): *} Redux thunk, dispatch to run action.
 */
const forgetContract = contractName => (dispatch => dispatch({
  type: contractsAT.FORGET_CONTRACT,
  contractName,
}));

export default {
  addContract,
  forgetContract,
};
