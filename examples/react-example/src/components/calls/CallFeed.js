// eslint-disable-next-line no-unused-vars
import React from 'react';
import {connect} from 'react-redux';
import CallFeedItem from './CallFeedItem';
import PropTypes from 'prop-types';

const CallFeed = ({calls}) => (
  <div>
    <h1>Calls</h1>
    {calls.map((callID, i) => (
      <CallFeedItem key={`call-${callID}-${i}`} callID={callID}/>
    ))}
  </div>
);

CallFeed.propTypes = {
  calls: PropTypes.array.isRequired
};

export default connect(state => ({
  calls: Object.keys(state.redapp.tracking.calls)
}))(CallFeed);
