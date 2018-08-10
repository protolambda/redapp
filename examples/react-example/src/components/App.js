// eslint-disable-next-line no-unused-vars
import React from 'react';
import ContractLoader from './contracts/ContractLoader';
import ContractList from './contracts/ContractList';
import TransactionFeed from './transactions/TransactionFeed';
import AccountList from './accounts/AccountList';
import CallFeed from './calls/CallFeed';

const App = () => (
  <div>
    <ContractLoader/>
    <ContractList/>
    <TransactionFeed/>
    <CallFeed/>
    {/* TODO also list tracked contract calls */}
    <AccountList/>
  </div>
);

export default App;
