// eslint-disable-next-line no-unused-vars
import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Web3Utils from 'web3-utils';
import PreWrap from '../util/PreWrap';

const Account = ({address, data}) => (
  <div>
    <PreWrap>{address} {
      (data.balance !== null && data.balance !== undefined) && Web3Utils.fromWei(data.balance)
    } ETH</PreWrap>
  </div>
);

Account.propTypes = {
  address: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
  // "wallet" or "local"
  accountSpace: PropTypes.string.isRequired
};

export default connect((state, props) => ({
  data: state.redapp.tracking.accounts[props.accountSpace][props.address]
}))(Account);
