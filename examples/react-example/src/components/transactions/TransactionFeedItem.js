// eslint-disable-next-line no-unused-vars
import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

const TransactionFeedItem = ({name, data}) => (
  <div>
    <h2>TX id: {name}</h2>
    <div>
      Hash: {data.hash}<br/>
      Status: {data.status}<br/>
      Receipt: {JSON.stringify(data.receipt)}
    </div>
  </div>
);

TransactionFeedItem.propTypes = {
  txID: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired
};

export default connect((state, props) => ({
  data: state.redapp.tracking.transactions[props.txID]
}))(TransactionFeedItem);
