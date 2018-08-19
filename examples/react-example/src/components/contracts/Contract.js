import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton
} from '@material-ui/core';
import TxIcon from '@material-ui/icons/Publish';
import CallIcon from '@material-ui/icons/RemoveRedEye';
import DeleteIcon from '@material-ui/icons/Delete';
import ContractMethodInput from './ContractMethodInput';
import { forgetContract } from 'redapp/es/contracts/actions';


class Contract extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  forgetThisContract = () => this.props.dispatch(
    forgetContract(
      this.state.contractName,
      this.state.abi,
      this.state.networks
    )
  );

  render() {
    const {name, data} = this.props;

    return (
      <div>
        <Typography variant="headline">Contract: {name}</Typography>
        <IconButton onClick={this.forgetThisContract} className={classes.button} aria-label="Delete">
          <DeleteIcon />
        </IconButton>
        <div>
          <Typography variant="title">Methods</Typography>
          <List component="nav">
            {Object.keys(data.methods).map((methodName, i) => {
              const stateOpenName = `dialogOpen_${methodName}_${i}`;
              const closeHandler = open => (
                () => {
                  this.setState({[stateOpenName]: open});
                });
              const inputs = data.methods[methodName].inputs;
              const inputCountTxt = (!inputs || inputs.length === 0)
                ? 'No inputs' : (inputs.length === 1 ? '1 input' : `${inputs.length} inputs`);
              const inputTypes = (!inputs || inputs.length === 0)
                ? '' : inputs.map(({type}) => type).join(', ');
              return (
                <div key={`method-${methodName}-${i}`}>
                  <ListItem button
                            onClick={closeHandler(true)}>
                    <ListItemIcon>
                      {data.methods[methodName].trackedSend ? <TxIcon/> : <CallIcon/>}
                    </ListItemIcon>
                    <ListItemText inset primary={methodName}
                                  secondary={`${inputCountTxt}: ${inputTypes}`}/>
                  </ListItem>

                  { /* Separate dialog from button-typed list item, to prevent double toggle */ }
                  <ContractMethodInput
                    contractName={name}
                    methodName={methodName}
                    open={this.state[stateOpenName]}
                    onClose={closeHandler(false)}
                  />
                </div>
              );
            })}
          </List>
          { /* TODO list events */}
        </div>
      </div>
    );
  }

}

Contract.propTypes = {
  name: PropTypes.string.isRequired,
  // retrieved from redux store using above prop
  data: PropTypes.object.isRequired
};

export default connect((state, props) => ({
  data: state.redapp.contracts[props.name]
}))(Contract);
