// eslint-disable-next-line no-unused-vars
import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

const TransactionFeedItem = ({txID, data}) => (
  <div>
    <h2>TX id: {txID}</h2>
    {data
      ? <div>
          Hash: {data.hash}<br/>
          Status: {data.status}<br/>
          Receipt: {JSON.stringify(data.receipt)}
        </div>
      : <div> No data available </div>}
  </div>
);

TransactionFeedItem.propTypes = {
  txID: PropTypes.string.isRequired,
  data: PropTypes.object
};

export default connect((state, props) => ({
  data: state.redapp.tracking.transactions[props.txID]
}))(TransactionFeedItem);
