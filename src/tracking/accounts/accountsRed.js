import * as accountsAT from './AT';
import mappedReducer from '../../util/mapped-reducer';

const initialState = {
  // The accounts fetched from web3 provider
  wallet: {
    // Empty initially
  },
  // The accounts managed locally
  local: {
    // Empty initially
  }
};

// Check if the address is part of the wallet being tracked.
const isWalletAccount = (state, address) => !!state.wallet[address];

const mapping = {
  [accountsAT.ACCOUNTS_FETCH_COMPLETED]: (state, {accounts}) => ({
    ...state,
    wallet: accounts
  }),
  [accountsAT.ACCOUNT_BALANCE]: (state, {account, balance}) => (
    isWalletAccount(state, account) ? ({
      ...state,
      wallet: {
        ...state.wallet,
        [account]: {
          ...state.wallet[account],
          balance
        }
      }
    }) : ({
      ...state,
      local: {
        ...state.local,
        [account]: {
          ...state.local[account],
          balance
        }
      }
    }))
};

const accountsRed = mappedReducer(mapping, initialState);

export default accountsRed;
