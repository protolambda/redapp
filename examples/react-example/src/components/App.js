// eslint-disable-next-line no-unused-vars
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Paper, Typography } from '@material-ui/core';
import ContractLoader from './contracts/ContractLoader';
import ContractList from './contracts/ContractList';
import TransactionFeed from './transactions/TransactionFeed';
import AccountList from './accounts/AccountList';
import CallFeed from './calls/CallFeed';

const styles = theme => ({
  root: {
    position: 'relative',
    zIndex: 10,
    paddingTop: theme.spacing.unit * 8,
    paddingBottom: theme.spacing.unit * 8,
    /* Center the section */
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '100%',
    [theme.breakpoints.only('xs')]: {
      paddingLeft: 2 * theme.spacing.unit,
      paddingRight: 2 * theme.spacing.unit
    },
    [theme.breakpoints.only('sm')]: {
      paddingLeft: 4 * theme.spacing.unit,
      paddingRight: 4 * theme.spacing.unit
    },
    [theme.breakpoints.up('md')]: {
      paddingLeft: 6 * theme.spacing.unit,
      paddingRight: 6 * theme.spacing.unit
    },
    [theme.breakpoints.only('lg')]: {
      width: 820
    },
    [theme.breakpoints.only('xl')]: {
      width: 1000
    },
  },
  rootGrid: {
    flexGrow: 1,
  },
  part: {
    padding: theme.spacing.unit * 2,
  },
  headerText: {
    ...theme.typography.body1
  }
});

const App = ({classes}) => (
  <div className={classes.root}>
    <Grid container spacing={16}>
      <Grid item xs={12}>
        <Typography variant="headline" component="h1" gutterBottom>
          <strong>ReDApp</strong> React Example
        </Typography>
        <div className={classes.headerText}>
          <p>
            This is an example DApp built with ReDApp.
            It loads contracts and then provides an interface to make interactions and calls.
          </p>
          <p>
            Transactions and Calls made with the contract interface are tracked,
             and listed in feeds at the bottom. The data updates live!
          </p>
          <p>
            In addition to smart-contract interactions, transaction tracking,
             and call caching/tracking, ReDApp also tracks blocks and events.
            <br/>
            TODO: Blocks and events.
          </p>
        </div>
      </Grid>
      <Grid item xs={12}>
        <Paper className={classes.part}>
          <ContractLoader/>
        </Paper>
      </Grid>

      <Grid item xs={12}>
        <ContractList/>
      </Grid>

      <Grid item xs={12} md={6}>
        <TransactionFeed/>
      </Grid>
      <Grid item xs={12} md={6}>
        <CallFeed/>
      </Grid>

      <Grid item xs={12}>
        <Paper className={classes.part}>
          <AccountList/>
        </Paper>
      </Grid>
    </Grid>
  </div>
);


App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);
