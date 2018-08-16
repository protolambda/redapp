
/**
 * Load a contract (binding it to an web3js Contract instance), and add it to the redux store.
 * The methods of the contract are also added to the store,
 * which can be called with their ABI arguments. This produces a thunk and an ID,
 * the thunk can then be dispatched to execute the method,
 * and the ID can be used to track the progress.
 * @type {ReduxActionType}
 */
export const ADD_CONTRACT = 'ADD_CONTRACT';

/**
 * When the contract is loaded, the reducer adds it to the store now.
 * @type {ReduxActionType}
 */
export const CONTRACT_ADDED = 'CONTRACT_ADDED';

/**
 * Remove a contract from redux store.
 * @type {ReduxActionType}
 */
export const FORGET_CONTRACT = 'FORGET_CONTRACT';
