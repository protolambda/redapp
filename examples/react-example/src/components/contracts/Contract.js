import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@material-ui/core';
import TxIcon from '@material-ui/icons/Publish';
import CallIcon from '@material-ui/icons/RemoveRedEye';
import ContractMethodInput from './ContractMethodInput';


class Contract extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {name, data} = this.props;

    return (
      <div>
        <Typography variant="headline">Contract: {name}</Typography>
        <div>
          <Typography variant="title">Methods</Typography>
          <List component="nav">
            {Object.keys(data.methods).map((methodName, i) => {
              const stateOpenName = `dialogOpen_${methodName}_${i}`;
              const closeHandler = open => (
                () => {
                  console.log(`Changing open state to: ${open}`);
                  this.setState({[stateOpenName]: open});
                });
              return (
                <div key={`method-${methodName}-${i}`}>
                  <ListItem button
                            onClick={closeHandler(true)}>
                    <ListItemIcon>
                      {data.methods[methodName].trackedSend ? <TxIcon/> : <CallIcon/>}
                    </ListItemIcon>
                    <ListItemText inset primary={methodName} />
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
