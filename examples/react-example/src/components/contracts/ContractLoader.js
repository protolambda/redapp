import React from 'react';
import {connect} from 'react-redux';
import {Typography, TextField, Button, Paper} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { addContract } from 'redapp/es/contracts/actions';
import PropTypes from 'prop-types';


// eslint-disable-next-line
const erc20ABI = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"showMeTheMoney","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"remaining","type":"uint256"}],"payable":false,"type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_owner","type":"address"},{"indexed":true,"name":"_spender","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Approval","type":"event"}];

// eslint-disable-next-line
const exampleNetworksConfig = { "3": { "address": "0x722dd3F80BAC40c951b51BdD28Dd19d435762180" } };

const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 2
  },
  addBtn: {
    margin: theme.spacing.unit * 2
  },
  abiField: {
    fontFamily: 'monospace !important'
  }
});

class ContractLoader extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      contractName: 'TST',
      contractNameInput: 'TST',
      contractNameValid: true,
      abi: erc20ABI,
      abiInput: JSON.stringify(erc20ABI, null, 4),
      abiValid: true,
      networks: exampleNetworksConfig,
      networksInput: JSON.stringify(exampleNetworksConfig, null, 4),
      networksValid: true
    };
  }

  addContract = () => this.props.dispatch(
    addContract(
      this.state.contractName,
      this.state.abi,
      this.state.networks
    )
  );

  validateName = (evt) => {
    const name = evt.target.value;
    if (/^([a-zA-Z][a-zA-Z0-9]+)$/.test(name)) {
      this.setState({
        contractName: name,
        contractNameValid: true
      });
    } else {
      this.setState({
        contractNameValid: false
      });
    }
  };


  validateJSON = stateName => ((evt) => {
    const data = evt.target.value;
    try {
      const parsed = JSON.parse(data);
      this.setState({
        [stateName]: parsed,
        [`${stateName}Valid`]: true
      });
    } catch (err) {
      this.setState({
        [`${stateName}Valid`]: false
      });
    }
  });

  render() {
    const {classes} = this.props;

    return (
      <Paper className={classes.root}>
        <Typography variant="headline" gutterBottom>Contract Loader</Typography>

        <TextField
          id="contract-name-input"
          label="Contract Name"
          defaultValue={this.state.contractName}
          onChange={this.validateName}
          margin="normal"
        />

        <Button variant="contained" disabled={
          !(this.state.contractNameValid && this.state.abiValid && this.state.networksValid)}
          onClick={this.addContract}
          className={classes.addBtn}>

          Add contract
        </Button>

        <br/>

        <TextField
          id="abi-input"
          label="Contract ABI spec"
          multiline
          fullWidth
          rowsMax="30"
          defaultValue={this.state.abiInput}
          onChange={this.validateJSON('abi')}
          margin="normal"
          InputProps={{classes: {
            input: classes.abiField}
          }}
        />

        <br/>

        <TextField
          id="networks-input"
          label="Contract networks config"
          multiline
          fullWidth
          rowsMax="10"
          defaultValue={this.state.networksInput}
          onChange={this.validateJSON('networks')}
          margin="normal"
          InputProps={{classes: {
            input: classes.abiField}
          }}
        />

      </Paper>
    );
  }
}

ContractLoader.propTypes = {
  classes: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
};

const styledContractLoader = withStyles(styles)(ContractLoader);

export default connect()(styledContractLoader);
