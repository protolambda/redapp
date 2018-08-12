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
import EncodeABIError from 'redapp/es/errors/EncodeABIError';
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
  },
  errorText: {
    ...theme.typography.body1,
    color: '#f00'
  },
  feedItem: {
    margin: theme.spacing.unit
  }
});

class ContractMethodInput extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      txIDs: [],
      callIDs: [],
      isOpen: !!props.open,
      actionErrMsg: null
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

  getInputStateName = argName => `arg_${argName}`;

  getInputStateValid = argName => `arg_${argName}_valid`;

  onInputChange = argName => (evt) => {
    const inputValue = evt.target.value;

    // TODO we could validate the input based on the ABI type.

    try {
      const parsedInput = JSON.parse(inputValue);

      this.setState({
        [this.getInputStateName(argName)]: parsedInput,
        [this.getInputStateValid(argName)]: true
      });
    } catch (err) {
      this.setState({
        [this.getInputStateValid(argName)]: false
      });
    }
  };

  trackedSend = () => {
    const {txID, thunk} = this.props.method.trackedSend({
      // from, value, gas, gasPrice, nonce, to, networkId
    }, ...(this.props.method.inputs.map(
      ({name}) => this.state[this.getInputStateName(name)]
    )));

    // Remember the ID, so we can track the progress from this component
    this.setState(prevState => ({
      txIDs: [txID, ...prevState.txIDs]
    }));

    // Dispatch the thunk, this starts the actual sending of the transaction
    this.props.dispatch(thunk);
  };

  cacheCall = () => {
    const {callID, thunk} = this.props.method.cacheCall({
      // blockNr, to, networkId
    }, ...(this.props.method.inputs.map(
      ({name}) => this.state[this.getInputStateName(name)]
    )));

    // Remember the ID, so we can track the progress from this component
    this.setState(prevState => ({
      callIDs: [callID, ...prevState.callIDs]
    }));

    // Dispatch the thunk, this starts the actual sending of the call (but cached)
    this.props.dispatch(thunk);
  };

  forceCall = () => {
    const {callID, thunk} = this.props.method.forceCall({
      // blockNr, to, networkId
    }, ...(this.props.method.inputs.map(
      ({name}) => this.state[this.getInputStateName(name)]
    )));

    // Remember the ID, so we can track the progress from this component
    this.setState(prevState => ({
      callIDs: [callID, ...prevState.callIDs]
    }));

    // Dispatch the thunk, this starts the actual sending of the call (forced)
    this.props.dispatch(thunk);
  };

  tryAction = action => (() => {
    try {
      action();
      this.setState({
        actionErrMsg: null
      });
    } catch (err) {
      if (err instanceof EncodeABIError) {
        this.setState({
          actionErrMsg: 'Failed to encode argument(s), formatting does not conform to ABI.'
        });
      } else {
        // Unknown error, just propagate.
        throw err;
      }
    }
  });


  allArgsValid = () => this.props.method.inputs.map(
    ({name}) => !!this.state[this.getInputStateValid(name)]
  ).every(s => s);

  render() {
    const {method, classes} = this.props;

    const {txIDs, callIDs, actionErrMsg} = this.state;

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
                <Typography>ABI type hints are provided, inputs must be valid JSON.</Typography>
                {method.inputs.map(({name, type}, i) => (
                  <TextField
                    key={`input_${name}_${i}`}
                    id={`input_${name}_${i}`}
                    error={!this.state[this.getInputStateValid(name)]}
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
        {actionErrMsg && (
          <DialogContent>
            <div className={classes.errorText}>
              {actionErrMsg}
            </div>
          </DialogContent>
        )}
        <DialogActions>
          {method.trackedSend && (<Button
            variant="contained"
            className={classes.actionButton}
            disabled={!this.allArgsValid()}
            onClick={this.tryAction(this.trackedSend)}
          >
            <code>trackedSend</code>
          </Button>)}
          {method.cacheCall && (<Button
            variant="contained"
            className={classes.actionButton}
            disabled={!this.allArgsValid()}
            onClick={this.tryAction(this.cacheCall)}
          >
            <code>cacheCall</code>
          </Button>)}
          {method.forceCall && (<Button
            variant="contained"
            className={classes.actionButton}
            disabled={!this.allArgsValid()}
            onClick={this.tryAction(this.forceCall)}
          >
            <code>forceCall</code>
          </Button>)}

          <Button onClick={this.handleOpen(false)}
                  variant="contained"
                  color="primary">
            {((txIDs && txIDs.length > 0) || (callIDs && callIDs.length > 0)) ? 'Close' : 'Cancel'}
          </Button>
        </DialogActions>

        {(txIDs && txIDs.length > 0) && <DialogContent>
          <Typography variant="subheading" gutterBottom>Transactions</Typography>
          {txIDs.map((txID, i) => (
            <div key={`tx_${txID}_${i}`} className={classes.feedItem}>
              <TransactionFeedItem txID={txID}/>
            </div>))}
        </DialogContent>
        }
        {(callIDs && callIDs.length > 0) && <DialogContent>
          <Typography variant="subheading" gutterBottom>Calls</Typography>
          {callIDs.map((callID, i) => (
            <div key={`call_${callID}_${i}`} className={classes.feedItem}>
              <CallFeedItem callID={callID}/>
            </div>))}
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
