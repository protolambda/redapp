// eslint-disable-next-line no-unused-vars
import React from 'react';
import {connect} from 'react-redux';
import CallFeedItem from './CallFeedItem';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const styles = theme => ({
  root: {
    minHeight: 250
  },
  outerEntry: {
    padding: theme.spacing.unit * 2,
  }
});

const CallFeed = ({calls, classes}) => (
  <div className={classes.root}>
    <Typography variant="headline" gutterBottom>calls</Typography>
    {calls.map((callID, i) => (
      <CallFeedItem key={`call-${callID}-${i}`} callID={callID}/>
    ))}
    {Object.keys(calls).length === 0
      && <Typography variant="subheading">No calls in tracking system.</Typography>}
  </div>
);

CallFeed.propTypes = {
  classes: PropTypes.object.isRequired,
  calls: PropTypes.array.isRequired
};

const styledCallFeed = withStyles(styles)(CallFeed);

export default connect(state => ({
  calls: Object.keys(state.redapp.tracking.calls)
}))(styledCallFeed);
