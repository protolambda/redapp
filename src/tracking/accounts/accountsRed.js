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
const isLocalAccount = (state, address) => !!state.local[address];

const mapping = {
  [accountsAT.ACCOUNTS_FETCH_COMPLETED]: (state, {accounts}) => ({
    ...state,
    wallet: Object.assign({},
      ...accounts.map(address => ({[address]: {}})),
      ...Object.entries(state.wallet)
        .filter(([address, data]) => (accounts.indexOf(address) >= 0))
        .map(([address, data]) => ({[address]: data})))
  }),
  [accountsAT.ACCOUNT_BALANCE]: (state, {account, balance}) => ({
    ...state,
    ...(isWalletAccount(state, account) && ({
      wallet: {
        ...state.wallet,
        [account]: {
          ...state.wallet[account],
          balance
        }
      }
    })),
    ...(isLocalAccount(state, account) && ({
      local: {
        ...state.local,
        [account]: {
          ...state.local[account],
          balance
        }
      }
    }))
  })
};

const accountsRed = mappedReducer(mapping, initialState);

export default accountsRed;
