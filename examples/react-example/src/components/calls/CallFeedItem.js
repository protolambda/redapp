// eslint-disable-next-line no-unused-vars
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Button,
  Typography,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import callsAT from 'redapp/es/tracking/calls/callsAT';
import Row from '../util/Row';
import PreWrap from '../util/PreWrap';

const CallFeedItem = ({ callID, data, dispatch }) => (
  <ExpansionPanel>
    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
      <Row label="Call ID:"><PreWrap>{callID}</PreWrap></Row>
    </ExpansionPanelSummary>
    <ExpansionPanelDetails>
      {data
        ? <div style={{width: '100%'}}>
          <Row label="Status:">{data.status}</Row>
          <Row label="Raw value:"><PreWrap>{data.rawValue}</PreWrap></Row>
          <Row label="Decoded value:"><PreWrap>{data.value}</PreWrap></Row>
          <Row label="Outputs ABI:">
            <PreWrap>{JSON.stringify(data.outputsABI, null, 4)}</PreWrap>
          </Row>
          <Row label="Block number:">{data.blockNr}</Row>
          <Button onClick={() => dispatch({
            type: callsAT.FORGET_CALL,
            callID
          })}>Forget this call</Button>
        </div>
        : <Typography variant="caption">No data available</Typography>}
    </ExpansionPanelDetails>
  </ExpansionPanel>
);

CallFeedItem.propTypes = {
  callID: PropTypes.string.isRequired,
  data: PropTypes.object,
  dispatch: PropTypes.func.isRequired
};

export default connect((state, props) => ({
  data: state.redapp.tracking.calls[props.callID],
}))(CallFeedItem);
