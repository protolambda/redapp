import React from 'react';
import {connect} from 'react-redux';
import {Typography, TextField, Button} from '@material-ui/core';
import contractsAT from 'redapp/es/contracts/contractsAT';
import { withStyles } from '@material-ui/core/styles';


// eslint-disable-next-line
const erc20ABI = [{ "constant":false,"inputs":[{"name":"_owner","type":"address"}],"name":"removeOwner","outputs":[],"type":"function"},{"constant":false,"inputs":[{"name":"_addr","type":"address"}],"name":"isOwner","outputs":[{"name":"","type":"bool"}],"type":"function"},{"constant":true,"inputs":[],"name":"m_numOwners","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":true,"inputs":[],"name":"m_lastDay","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":true,"inputs":[],"name":"version","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":false,"inputs":[],"name":"resetSpentToday","outputs":[],"type":"function"},{"constant":true,"inputs":[],"name":"m_spentToday","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":false,"inputs":[{"name":"_owner","type":"address"}],"name":"addOwner","outputs":[],"type":"function"},{"constant":true,"inputs":[],"name":"m_required","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":false,"inputs":[{"name":"_h","type":"bytes32"}],"name":"confirm","outputs":[{"name":"","type":"bool"}],"type":"function"},{"constant":false,"inputs":[{"name":"_newLimit","type":"uint256"}],"name":"setDailyLimit","outputs":[],"type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"},{"name":"_data","type":"bytes"}],"name":"execute","outputs":[{"name":"_r","type":"bytes32"}],"type":"function"},{"constant":false,"inputs":[{"name":"_operation","type":"bytes32"}],"name":"revoke","outputs":[],"type":"function"},{"constant":false,"inputs":[{"name":"_newRequired","type":"uint256"}],"name":"changeRequirement","outputs":[],"type":"function"},{"constant":true,"inputs":[{"name":"_operation","type":"bytes32"},{"name":"_owner","type":"address"}],"name":"hasConfirmed","outputs":[{"name":"","type":"bool"}],"type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"}],"name":"kill","outputs":[],"type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"}],"name":"changeOwner","outputs":[],"type":"function"},{"constant":true,"inputs":[],"name":"m_dailyLimit","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"inputs":[{"name":"_owners","type":"address[]"},{"name":"_required","type":"uint256"},{"name":"_daylimit","type":"uint256"}],"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"owner","type":"address"},{"indexed":false,"name":"operation","type":"bytes32"}],"name":"Confirmation","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"owner","type":"address"},{"indexed":false,"name":"operation","type":"bytes32"}],"name":"Revoke","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"oldOwner","type":"address"},{"indexed":false,"name":"newOwner","type":"address"}],"name":"OwnerChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"newOwner","type":"address"}],"name":"OwnerAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"oldOwner","type":"address"}],"name":"OwnerRemoved","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"newRequirement","type":"uint256"}],"name":"RequirementChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"from","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"owner","type":"address"},{"indexed":false,"name":"value","type":"uint256"},{"indexed":false,"name":"to","type":"address"},{"indexed":false,"name":"data","type":"bytes"}],"name":"SingleTransact","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"owner","type":"address"},{"indexed":false,"name":"operation","type":"bytes32"},{"indexed":false,"name":"value","type":"uint256"},{"indexed":false,"name":"to","type":"address"},{"indexed":false,"name":"data","type":"bytes"}],"name":"MultiTransact","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"operation","type":"bytes32"},{"indexed":false,"name":"initiator","type":"address"},{"indexed":false,"name":"value","type":"uint256"},{"indexed":false,"name":"to","type":"address"},{"indexed":false,"name":"data","type":"bytes"}],"name":"ConfirmationNeeded","type":"event"}];

// eslint-disable-next-line
const exampleNetworksConfigZRX = { "1": { "address": "0xe41d2489571d322189246dafa5ebde1f4699f498" } };

const styles = theme => ({
  addBtn: {
    margin: theme.spacing.unit * 2,
  },
  abiField: {
    fontFamily: 'monospace !important'
  }
});

class ContractLoader extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      contractName: 'ZRX',
      contractNameInput: 'ZRX',
      contractNameValid: true,
      abi: erc20ABI,
      abiInput: JSON.stringify(erc20ABI, null, 4),
      abiValid: true,
      networks: exampleNetworksConfigZRX,
      networksInput: JSON.stringify(exampleNetworksConfigZRX, null, 4),
      networksValid: true
    };
  }

  addContract = () => this.props.dispatch({
    type: contractsAT.ADD_CONTRACT,
    contractName: this.state.contractName,
    abi: this.state.abi,
    networks: this.state.networks
  });

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
      <div>
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

      </div>
    );
  }
}

const styledContractLoader = withStyles(styles)(ContractLoader);

export default connect()(styledContractLoader);
