import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import TransactionFeedItem from '../transactions/TransactionFeedItem';
import CallFeedItem from '../calls/CallFeedItem';


class ContractMethodInput extends React.Component {

  constructor() {
    super();
    this.state = {
      txIDs: [],
      callIDs: []
    };
  }

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
    this.setState((prevState) => ({
      callIDs: [callID, ...prevState.callIDs]
    }));

    // Dispatch the thunk, this starts the actual sending of the call (forced)
    this.props.dispatch(thunk);
  };


  render() {
    const {method} = this.props;

    const {txIDs, callIDs} = this.state;

    return (
      <div>
        <h4>{method.name}</h4>
        <div>
          {method.inputs.map(({name, type}, i) => (
            <div key={`input_${name}_${i}`}>Type: {type}<br/>
              Input: <input type="text" name={name} onChange={this.onInputChange(name)}/>
            </div>))
          }
        </div>
        <div>
          {method.trackedSend && (<button onClick={this.trackedSend}>
            Send (Tracked)
          </button>)}
          {method.cacheCall && (<button onClick={this.cacheCall}>
            Call (Tracked, Cached)
          </button>)}
          {method.forceCall && (<button onClick={this.forceCall}>
            Call (Tracked, Force)
          </button>)}
        </div>
        <div>
          {(txIDs && txIDs.length > 0) && <div>
            <h5>Transactions</h5>
            {txIDs.map((txID, i) => (<TransactionFeedItem key={`tx_${txID}_${i}`} txID={txID}/>))}
          </div>
          }
          {(callIDs && callIDs.length > 0) && <div>
            <h5>Calls</h5>
            {callIDs.map((callID, i) => (<CallFeedItem key={`tx_${callID}_${i}`} callID={callID}/>))}
          </div>
          }
        </div>
      </div>
    );
  }
}

ContractMethodInput.propTypes = {
  contractName: PropTypes.string.isRequired,
  methodName: PropTypes.string.isRequired,
  // retrieved from redux store using above props
  method: PropTypes.object.isRequired
};

export default connect((state, props) => ({
  method: state.redapp.contracts[props.contractName].methods[props.methodName]
}))(ContractMethodInput);
