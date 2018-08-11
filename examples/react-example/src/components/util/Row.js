import React from 'react';
import { Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({
  root: {
    width: '100%',
    borderBottom: '1px solid #ddd'
  },
  labelCol: {
    display: 'inline-block',
    textAlign: 'right',
    width: '20%',
    ...theme.typography.body2
  },
  contentCol: {
    display: 'inline-block',
    textAlign: 'left',
    width: '80%',
    ...theme.typography.body1
  },
  colInner: {
    padding: theme.spacing.unit
  }
});

const Row = ({label, children, classes}) => (
  <div className={classes.root}>
    <div className={classes.labelCol}>
      <div className={classes.colInner}>{label}</div>
    </div>
    <div className={classes.contentCol}>
      <div className={classes.colInner}>{children}</div>
    </div>
  </div>
);

Row.propTypes = {
  label: PropTypes.string.isRequired,
  children: PropTypes.any,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Row);
