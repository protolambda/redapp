// eslint-disable-next-line no-unused-vars
import React from 'react';
import ContractLoader from './contracts/ContractLoader';
import ContractList from './contracts/ContractList';
import TransactionFeed from './transactions/TransactionFeed';
import AccountList from './accounts/AccountList';

const App = () => (
  <div>
    <ContractLoader/>
    <ContractList/>
    <TransactionFeed/>
    {/* TODO also list tracked contract calls */}
    <AccountList/>
  </div>
);

export default App;
