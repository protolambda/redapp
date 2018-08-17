import contractsAt from './contractsAT';
import mappedReducer from '../util/mapped-reducer';

const initialState = {
  // empty, no contracts loaded.
};

const mapping = {
  [contractsAt.CONTRACT_ADDED]: (state, {contractName, methods, networks}) => ({
    ...state,
    // Add the contract to the state
    [contractName]: {
      methods,
      networks
    }
  }),
  [contractsAt.FORGET_CONTRACT]: (state, {contractName}) => {
    // copy the state, we don't want to alter the old state,
    //  but we do want to do a shallow copy: keep the same contract thunks alive.
    const newState = {...state};
    // remove the contract
    delete newState[contractName];
    return newState;
  }
};

/**
 * Contracts reducer of redapp.
 * @type {ReduxReducer}
 */
export default mappedReducer(mapping, initialState);
