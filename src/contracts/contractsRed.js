import contractsAt from './contractsAT';
import mappedReducer from '../util/mapped-reducer';

const initialState = {
  // empty, no contracts loaded.
};

const mapping = {
  [contractsAt.CONTRACT_INIT_COMPLETED]: (state, action) => ({
    ...state,
    // Add the contract (A js object with methods for each abi entry)
    [action.contractName]: action.contract
  }),
  [contractsAt.FORGET_CONTRACT]: (state, action) => {
    // copy the state, we don't want to alter the old state,
    //  but we do want to do a shallow copy: keep the same contract instances alive.
    const newState = Object.assign({}, state);
    // remove the contract
    delete newState[action.contractName];
    return newState;
  }
};

export default mappedReducer(mapping, initialState);
