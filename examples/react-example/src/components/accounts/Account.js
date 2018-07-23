// eslint-disable-next-line no-unused-vars
import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

const Account = ({address, data}) => (
  <div>
    <h2>Account: {address}</h2>
    <div>
      balance (wei): {data.balance}
    </div>
  </div>
);

Account.propTypes = {
  address: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired
};

export default connect((state, props) => ({
  data: state.accounts[props.address]
}))(Account);
