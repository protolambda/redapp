import transactionsAT from './transactionsAT';
import mappedReducer from '../../util/mapped-reducer';

const initialState = {
  tracker: {}
};

const mapping = {
  [transactionsAT.SEND_TX]: (state, action) => ({
    ...state,
    // TODO
  })
};

export default mappedReducer(mapping, initialState);
