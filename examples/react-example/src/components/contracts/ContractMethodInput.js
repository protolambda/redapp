import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {
  Typography,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import TransactionFeedItem from '../transactions/TransactionFeedItem';
import CallFeedItem from '../calls/CallFeedItem';

const styles = theme => ({
  actionButton: {
    margin: theme.spacing.unit,
    textTransform: 'none',
    padding: 4
  },
  input: {
    margin: theme.spacing.unit
  }
});

class ContractMethodInput extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      txIDs: [],
      callIDs: [],
      isOpen: !!props.open
    };
  }

  componentWillReceiveProps(nextProps, nextCtx) {
    this.setState(prevState => ((prevState.isOpen === !!nextProps.open)
      ? null : {isOpen: !!nextProps.open}));
  }

  handleOpen = open => (() => {
    this.setState({
      isOpen: open,
    });
    if (!open && this.props.onClose) {
      this.props.onClose();
    }
  });

  onInputChange = (argName) => (evt) => {
    const inputValue = evt.target.value;

    // TODO we could validate the input based on the ABI type.

    this.setState({
      [`arg_${argName}`]: inputValue
    });
  };

  trackedSend = () => {
    const {txID, thunk} = this.props.method.trackedSend({
      // from, value, gas, gasPrice, nonce, to, networkId
    }, ...(this.props.method.inputs.map(
      ({name}) => this.state[`arg_${name}`]
    )));

    // Remember the ID, so we can track the progress from this component
    this.setState((prevState) => ({
      txIDs: [txID, ...prevState.txIDs]
    }));

    // Dispatch the thunk, this starts the actual sending of the transaction
    this.props.dispatch(thunk);
  };

  cacheCall = () => {
    const {callID, thunk} = this.props.method.cacheCall({
      // blockNr, to, networkId
    }, ...(this.props.method.inputs.map(
      ({name}) => this.state[`arg_${name}`]
    )));

    // Remember the ID, so we can track the progress from this component
    this.setState((prevState) => ({
      callIDs: [callID, ...prevState.callIDs]
    }));

    // Dispatch the thunk, this starts the actual sending of the call (but cached)
    this.props.dispatch(thunk);
  };

  forceCall = () => {
    const {callID, thunk} = this.props.method.forceCall({
      // blockNr, to, networkId
    }, ...(this.props.method.inputs.map(
      ({name}) => this.state[`arg_${name}`]
    )));

    // Remember the ID, so we can track the progress from this component
    this.setState(prevState => ({
      callIDs: [callID, ...prevState.callIDs]
    }));

    // Dispatch the thunk, this starts the actual sending of the call (forced)
    this.props.dispatch(thunk);
  };


  render() {
    const {method, classes} = this.props;

    const {txIDs, callIDs} = this.state;

    return (
      <Dialog
        open={this.state.isOpen}
        onClose={this.handleOpen(false)}
        aria-labelledby="dialog-title"
      >
        <DialogTitle id="dialog-title">{method.name}</DialogTitle>
        <DialogContent>
          <div>
            {(!method.inputs || method.inputs.length === 0)
              ? <Typography>No inputs.</Typography>
              : <div>
                {method.inputs.map(({name, type}, i) => (
                  <TextField
                    key={`input_${name}_${i}`}
                    id="helperText"
                    label={name}
                    fullWidth
                    defaultValue=""
                    helperText={`type: ${type}`}
                    margin="normal"
                    className={classes.input}
                    onChange={this.onInputChange(name)}
                  />
                ))}
              </div>
            }
          </div>
        </DialogContent>
        <DialogActions>
          {method.trackedSend && (<Button
            variant="contained"
            className={classes.actionButton}
            onClick={this.trackedSend}
          >
            <code>trackedSend</code>
          </Button>)}
          {method.cacheCall && (<Button
            variant="contained"
            className={classes.actionButton}
            onClick={this.cacheCall}
          >
            <code>cacheCall</code>
          </Button>)}
          {method.forceCall && (<Button
            variant="contained"
            className={classes.actionButton}
            onClick={this.forceCall}
          >
            <code>forceCall</code>
          </Button>)}

          <Button onClick={this.handleOpen(false)}
                  variant="contained"
                  color="primary">
            Cancel
          </Button>
        </DialogActions>

        {(txIDs && txIDs.length > 0) && <DialogContent>
          <Typography variant="subheading" gutterBottom>Transactions</Typography>
          {txIDs.map((txID, i) => (<TransactionFeedItem key={`tx_${txID}_${i}`} txID={txID}/>))}
        </DialogContent>
        }
        {(callIDs && callIDs.length > 0) && <DialogContent>
          <Typography variant="subheading" gutterBottom>Calls</Typography>
          {callIDs.map((callID, i) => (<CallFeedItem key={`tx_${callID}_${i}`} callID={callID}/>))}
        </DialogContent>
        }
      </Dialog>
    );
  }
}

ContractMethodInput.propTypes = {
  contractName: PropTypes.string.isRequired,
  methodName: PropTypes.string.isRequired,
  // retrieved from redux store using above props
  method: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  open: PropTypes.bool,
  onClose: PropTypes.func
};

const styledContractMethodInput = withStyles(styles)(ContractMethodInput);

export default connect((state, props) => ({
  method: state.redapp.contracts[props.contractName].methods[props.methodName]
}))(styledContractMethodInput);
