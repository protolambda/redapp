import accountsAT from './accountsAT';
import mappedReducer from '../../util/mapped-reducer';

const initialState = {
  accountsMap: {}
  // TODO also track which of these is the default account?
};

const mapping = {
  [accountsAT.ACCOUNTS_FETCH_COMPLETED]: (state, action) => ({
    ...state,
    accountsMap: action.accountsMap
  }),
  [accountsAT.ACCOUNTS_SYNC_COMPLETED]: (state, action) => {
    const newAccMap = state.accountsMap;

    for (const key of action.accountsMap) {
      const value = action.accountsMap[key];
      // Merge in new updated data.
      newAccMap[key] = {
        ...newAccMap[key],
        value
      };
    }
    return ({
      ...state,
      accountsMap: state.accountsMap
    });
  }
};

export default mappedReducer(mapping, initialState);
