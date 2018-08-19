// eslint-disable-next-line no-unused-vars
import React from 'react';
import {connect} from 'react-redux';
import Account from './Account';
import { Typography, Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    minHeight: 250
  },
  account: {
    marginTop: theme.spacing.unit,
    padding: theme.spacing.unit
  },
  accountListSection: {
    marginBottom: theme.spacing.unit * 4
  }
});

const AccountList = ({walletAccounts, localAccounts, classes}) => (
  <div className={classes.root}>
    <div className={classes.accountListSection}>
      <Typography variant="headline" gutterBottom>Accounts (Wallet)</Typography>
      {walletAccounts.map((account, i) => (
        <Paper key={`wallet-account-${account}-${i}`} className={classes.account}>
          <Account address={account} accountSpace="wallet"/>
        </Paper>
      ))}
    </div>
    <div className={classes.accountListSection}>
      <Typography variant="headline" gutterBottom>Accounts (Local)</Typography>
      {localAccounts.map((account, i) => (
        <Paper key={`local-account-${account}-${i}`} className={classes.account}>
          <Account address={account} accountSpace="local"/>
        </Paper>
      ))}
    </div>
  </div>
);

const styledAccountList = withStyles(styles)(AccountList);

export default connect(state => ({
  walletAccounts: Object.keys(state.redapp.tracking.accounts.wallet),
  localAccounts: Object.keys(state.redapp.tracking.accounts.local),
}))(styledAccountList);
