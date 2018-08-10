import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import ContractMethodInput from './ContractMethodInput';


const Contract = ({name, data}) => (
  <div>
    <h2>Contract: {name}</h2>
    <div>
      <h3>Methods</h3>
      {Object.keys(data.methods).map((methodName, i) => (
        <ContractMethodInput key={`method-${methodName}-${i}`}
                             contractName={name} methodName={methodName}/>
      ))}
      <h3>Events</h3>
      TODO list events
    </div>
  </div>
);

Contract.propTypes = {
  name: PropTypes.string.isRequired,
  // retrieved from redux store using above prop
  data: PropTypes.object.isRequired
};

export default connect((state, props) => ({
  data: state.redapp.contracts[props.name]
}))(Contract);
