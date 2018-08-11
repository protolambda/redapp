// eslint-disable-next-line no-unused-vars
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import Row from '../util/Row';
import PreWrap from '../util/PreWrap';

const TransactionFeedItem = ({ txID, data }) => (
  <div>
    <Row label="TX ID:"><PreWrap>{txID}</PreWrap></Row>
    {data
      ? <div>
        <Row label="Hash:"><PreWrap>{data.hash}</PreWrap></Row>
        <Row label="Status:">{data.status}</Row>
        <Row label="Receipt:"><PreWrap>{JSON.stringify(data.receipt, null, 4)}</PreWrap></Row>
      </div>
      : <Typography variant="caption">No data available</Typography>}
  </div>
);

TransactionFeedItem.propTypes = {
  txID: PropTypes.string.isRequired,
  data: PropTypes.object,
};

export default connect((state, props) => ({
  data: state.redapp.tracking.transactions[props.txID],
}))(TransactionFeedItem);
