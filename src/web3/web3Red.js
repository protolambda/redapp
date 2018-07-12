import web3AT from './web3AT';
import mappedReducer from '../util/mapped-reducer';

const initialState = {
  tracker: {}
};

const mapping = {
  [web3AT.WEB3_INIT_COMPLETED]: (state, action) => ({
    ...state,
    // TODO
  })
};

export default mappedReducer(mapping, initialState);
