// eslint-disable-next-line no-unused-vars
import React from 'react';
import {connect} from 'react-redux';
import Contract from './Contract';

const ContractList = ({contracts}) => (
  <div>
    <h1>Contracts</h1>
    {contracts.map((contract, i) => (
      <Contract key={`contract-${contract}-${i}`} name={contract}/>
    ))}
  </div>
);

export default connect(state => ({
  contracts: Object.keys(state.redapp.contracts)
}))(ContractList);
