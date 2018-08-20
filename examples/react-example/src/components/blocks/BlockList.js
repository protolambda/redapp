// eslint-disable-next-line no-unused-vars
import React from 'react';
import {connect} from 'react-redux';
import Block from './Block';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const styles = theme => ({
  root: {
    minHeight: 250
  }
});

const BlockList = ({blocks, classes}) => {
  const byHeight = {};
  for (const [hash, data] of Object.entries(blocks)) {
    if (byHeight[data.number] !== undefined) {
      byHeight[data.number].push(hash);
    } else {
      byHeight[data.number] = [hash];
    }
  }

  return (
    <div className={classes.root}>
      <Typography variant="headline" gutterBottom>Blocks</Typography>

      {Object.keys(byHeight).map(heightNumber => (
        <div key={`height-${heightNumber}`}>
          <Typography variant="caption">#{heightNumber}</Typography>
          {byHeight[heightNumber].map(hash => (
            <Block key={`block-${hash}`} blockHash={hash}/>
          ))}
        </div>
      ))}

      {Object.keys(byHeight).length === 0
      && <Typography variant="subheading">No blocks in tracking system.</Typography>}
    </div>
  );
};

BlockList.propTypes = {
  classes: PropTypes.object.isRequired,
  blocks: PropTypes.object.isRequired
};

const styledBlockList = withStyles(styles)(BlockList);

export default connect(state => ({
  blocks: state.redapp.tracking.blocks.blocks
}))(styledBlockList);
