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
  [accountsAT.ACCOUNTS_FETCH_COMPLETED]: (state, {accounts}) => {
    // Enforce lowercase storage of addresses.
    const accountsLowercase = accounts.map(addr => addr.toLowerCase());
    return ({
      ...state,
      // Retain any existing account data if it can be found in the fetched account list.
      // Remove the other accounts from the state.
      // Add any new accounts.
      wallet: Object.assign({},
        ...accountsLowercase.map(address => ({[address]: {}})),
        ...Object.entries(state.wallet)
          .filter(([address, data]) => (accountsLowercase.indexOf(address) >= 0))
          .map(([address, data]) => ({[address]: data})))
    });
  },
  [accountsAT.ACCOUNT_BALANCE]: (state, {account, balance}) => {
    const addressLowercase = account.toLowerCase();
    return ({
      ...state,
      ...(isWalletAccount(state, addressLowercase) && ({
        wallet: {
          ...state.wallet,
          [addressLowercase]: {
            ...state.wallet[addressLowercase],
            balance
          }
        }
      })),
      ...(isLocalAccount(state, addressLowercase) && ({
        local: {
          ...state.local,
          [addressLowercase]: {
            ...state.local[addressLowercase],
            balance
          }
        }
      }))
    });
  },
  [accountsAT.ADD_LOCAL_ACCOUNT]: (state, {account}) => ({
    ...state,
    local: {
      ...state.local,
      [account.toLowerCase()]: {
        // Fresh data, forget possible existing entry for account.
      }
    }
  }),
  [accountsAT.FORGET_LOCAL_ACCOUNT]: (state, {account}) => {
    const res = {...state, local: {...state.local}};
    delete res.local[account.toLowerCase()];
    return res;
  }
};

const accountsRed = mappedReducer(mapping, initialState);

export default accountsRed;
