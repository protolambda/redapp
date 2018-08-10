// eslint-disable-next-line no-unused-vars
import React from 'react';
import {connect} from 'react-redux';
import TransactionFeedItem from './TransactionFeedItem';
import PropTypes from 'prop-types';

const TransactionFeed = ({transactions}) => (
  <div>
    <h1>Transactions</h1>
    {transactions.map((tx, i) => (
      <TransactionFeedItem key={`transaction-${tx}-${i}`} txID={tx}/>
    ))}
  </div>
);

TransactionFeed.propTypes = {
  transactions: PropTypes.array.isRequired
};

export default connect(state => ({
  transactions: Object.keys(state.redapp.tracking.transactions)
}))(TransactionFeed);
