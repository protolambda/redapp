// eslint-disable-next-line no-unused-vars
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Typography,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails, Button,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import transactionsAT from 'redapp/es/tracking/transactions/transactionsAT';
import Row from '../util/Row';
import PreWrap from '../util/PreWrap';

const TransactionFeedItem = ({ txID, data, dispatch }) => (
  <ExpansionPanel>
    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
      <Row label="TX ID:"><PreWrap>{txID}</PreWrap></Row>
    </ExpansionPanelSummary>
    <ExpansionPanelDetails>
      {data
        ? <div style={{width: '100%'}}>
          <Row label="Hash:"><PreWrap>{data.hash}</PreWrap></Row>
          <Row label="Status:">{data.status}</Row>
          <Row label="Receipt:"><PreWrap>{JSON.stringify(data.receipt, null, 4)}</PreWrap></Row>
          <Button onClick={() => dispatch({
            type: transactionsAT.FORGET_TX,
            txID
          })}>Forget this TX</Button>
        </div>
        : <Typography variant="caption">No data available</Typography>}
    </ExpansionPanelDetails>
  </ExpansionPanel>
);

TransactionFeedItem.propTypes = {
  txID: PropTypes.string.isRequired,
  data: PropTypes.object,
  dispatch: PropTypes.func.isRequired
};

export default connect((state, props) => ({
  data: state.redapp.tracking.transactions[props.txID],
}))(TransactionFeedItem);
