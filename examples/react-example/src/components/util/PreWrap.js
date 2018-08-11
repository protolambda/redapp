import React from 'react';
import PropTypes from 'prop-types';

const PreWrap = ({children}) => (
  <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
    {children}
  </pre>
);

PreWrap.propTypes = {
  children: PropTypes.any
};

export default PreWrap;
