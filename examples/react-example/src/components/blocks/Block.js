// eslint-disable-next-line no-unused-vars
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Typography,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Row from '../util/Row';
import PreWrap from '../util/PreWrap';

const Block = ({ blockHash, data }) => (
  <ExpansionPanel>
    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
      <Row label="Block hash:"><PreWrap>{blockHash}</PreWrap></Row>
    </ExpansionPanelSummary>
    <ExpansionPanelDetails>
      {data
        ? <div style={{width: '100%'}}>
            <Row label="Height:">{data.number}</Row>
          </div>
        : <Typography variant="caption">No data available</Typography>}
    </ExpansionPanelDetails>
  </ExpansionPanel>
);

Block.propTypes = {
  blockHash: PropTypes.string.isRequired,
  data: PropTypes.object
};

export default connect((state, props) => ({
  data: state.redapp.tracking.blocks.blocks[props.blockHash],
}))(Block);
