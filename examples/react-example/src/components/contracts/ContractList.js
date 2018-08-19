// eslint-disable-next-line no-unused-vars
import React from 'react';
import {connect} from 'react-redux';
import {Typography, Paper} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Contract from './Contract';

const styles = theme => ({
  root: {
    minHeight: 250
  },
  outerContract: {
    padding: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit * 4
  }
});

const ContractList = ({contracts, classes}) => (
  <div className={classes.root}>
    <Typography variant="headline" gutterBottom>Contracts</Typography>
    {contracts.map((contract, i) => (
      <Paper key={`contract-${contract}-${i}`} className={classes.outerContract}>
        <Contract name={contract}/>
      </Paper>
    ))}
    {Object.keys(contracts).length === 0 && <Typography variant="subheading">No contracts loaded.</Typography>}
  </div>
);

ContractList.propTypes = {
  classes: PropTypes.object.isRequired,
  contracts: PropTypes.array.isRequired
};

const styledContractList = withStyles(styles)(ContractList);

export default connect(state => ({
  contracts: Object.keys(state.redapp.contracts)
}))(styledContractList);
