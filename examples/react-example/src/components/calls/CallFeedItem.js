// eslint-disable-next-line no-unused-vars
import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

const CallFeedItem = ({callID, data}) => (
  <div>
    <h2>Call id: {callID}</h2>
    {data
      ? <div>
          Hash: {data.hash}<br/>
          Status: {data.status}<br/>
          Raw value: {data.rawValue}<br/>
          Decoded value: {data.value}<br/>
          Outputs ABI: {JSON.stringify(data.outputsABI, null, 4)}<br/>
          Block number: {data.blockNr}<br/>
        </div>
      : <div> No data available </div>
    }
  </div>
);

CallFeedItem.propTypes = {
  callID: PropTypes.string.isRequired,
  data: PropTypes.object
};

export default connect((state, props) => ({
  data: state.redapp.tracking.calls[props.callID]
}))(CallFeedItem);
