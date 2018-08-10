// eslint-disable-next-line no-unused-vars
import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

const Contract = ({name, data}) => (
  <div>
    <h2>Contract: {name}</h2>
    <div>
      <h3>Methods</h3>
      {Object.keys(data.methods).map((name, i) => (
        <div key={`method-${name}-${i}`}>
          <h4>{name}</h4>
          <p>
            // TODO method caller
          </p>
        </div>
      ))}
      <h3>Events</h3>
      // TODO list events
    </div>
  </div>
);

Contract.propTypes = {
  name: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired
};

export default connect((state, props) => ({
  data: state.redapp.contracts[props.name]
}))(Contract);
