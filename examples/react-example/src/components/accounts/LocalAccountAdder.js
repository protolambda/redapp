import React from 'react';
import {connect} from 'react-redux';
import {Typography, TextField, Button, Paper} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Web3Utils from 'web3-utils';
import PropTypes from 'prop-types';
import { addLocalAcount } from 'redapp/es/tracking/accounts/actions';


const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 2
  },
  addBtn: {
    display: 'inline-block',
    margin: theme.spacing.unit * 2
  },
  addressInput: {
    display: 'inline-block',
    minWidth: '70%'
  },
  addressField: {
    fontFamily: 'monospace !important'
  }
});

class LocalAccountAdder extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      address: '0x874B54A8bD152966d63F706BAE1FfeB0411921E5',
      addressInput: '0x874B54A8bD152966d63F706BAE1FfeB0411921E5',
      addressValid: true
    };
  }

  addAddress = () => this.props.dispatch(
    addLocalAcount(
      this.state.address
    )
  );

  validateAddress = (evt) => {
    const addr = evt.target.value;
    if (Web3Utils.isAddress(addr)) {
      this.setState({
        address: addr,
        addressValid: true
      });
    } else {
      this.setState({
        addressValid: false
      });
    }
  };

  render() {
    const {classes} = this.props;

    return (
      <Paper className={classes.root}>
        <Typography variant="title" gutterBottom>Add address to local tracker</Typography>

        <div>
          <div className={classes.addressInput}>
            <TextField
              id="address-input"
              label="Address"
              defaultValue={this.state.address}
              onChange={this.validateAddress}
              margin="normal"
              fullWidth
              InputProps={{classes: {
                input: classes.addressField}
              }}
            />
          </div>
          <Button variant="contained" disabled={!this.state.addressValid}
                  onClick={this.addAddress}
                  className={classes.addBtn}>
            Add address
          </Button>
        </div>
      </Paper>
    );
  }
}

LocalAccountAdder.propTypes = {
  classes: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
};

const styledLocalAccountAdder = withStyles(styles)(LocalAccountAdder);

export default connect()(styledLocalAccountAdder);
