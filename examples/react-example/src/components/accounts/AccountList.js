// eslint-disable-next-line no-unused-vars
import React from 'react';
import {connect} from 'react-redux';
import Account from './Account';

const AccountList = ({walletAccounts, localAccounts}) => (
  <div>
    <h1>Accounts (Wallet)</h1>
    {walletAccounts.map((account, i) => (
      <Account key={`account-${account}-${i}`} address={account} accountSpace="wallet"/>
    ))}
    <h1>Accounts (Local)</h1>
    {localAccounts.map((account, i) => (
      <Account key={`account-${account}-${i}`} address={account} accountSpace="local"/>
    ))}
  </div>
);

export default connect(state => ({
  walletAccounts: Object.keys(state.redapp.tracking.accounts.wallet),
  localAccounts: Object.keys(state.redapp.tracking.accounts.local),
}))(AccountList);
