// eslint-disable-next-line no-unused-vars
import React from 'react';
import {connect} from 'react-redux';
import TransactionFeedItem from './TransactionFeedItem';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    minHeight: 250
  },
  outerEntry: {
    padding: theme.spacing.unit * 2,
  }
});

const TransactionFeed = ({transactions, classes}) => (
  <div className={classes.root}>
    <Typography variant="headline" gutterBottom>Transactions</Typography>
    {transactions.map((tx, i) => (
      <TransactionFeedItem key={`transaction-${tx}-${i}`} txID={tx}/>
    ))}
    {Object.keys(transactions).length === 0
      && <Typography variant="subheading">No transactions in tracking system.</Typography>}
  </div>
);

TransactionFeed.propTypes = {
  classes: PropTypes.object.isRequired,
  transactions: PropTypes.array.isRequired
};

const styledTransactionFeed = withStyles(styles)(TransactionFeed);

export default connect(state => ({
  transactions: Object.keys(state.redapp.tracking.transactions)
}))(styledTransactionFeed);
