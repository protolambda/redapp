// eslint-disable-next-line no-unused-vars
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import Row from '../util/Row';
import PreWrap from '../util/PreWrap';

const CallFeedItem = ({ callID, data }) => (
  <div>
    <Row label="Call ID:"><PreWrap>{callID}</PreWrap></Row>
    {data
      ? <div>
        <Row label="Status:">{data.status}</Row>
        <Row label="Raw value:"><PreWrap>{data.rawValue}</PreWrap></Row>
        <Row label="Decoded value:"><PreWrap>{data.value}</PreWrap></Row>
        <Row label="Outputs ABI:"><PreWrap>{JSON.stringify(data.outputsABI, null, 4)}</PreWrap></Row>
        <Row label="Block number:">{data.blockNr}</Row>
      </div>
      : <Typography variant="caption">No data available</Typography>}
  </div>
);

CallFeedItem.propTypes = {
  callID: PropTypes.string.isRequired,
  data: PropTypes.object,
};

export default connect((state, props) => ({
  data: state.redapp.tracking.calls[props.callID],
}))(CallFeedItem);
