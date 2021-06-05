import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Alert } from '@material-ui/lab';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

const AlertMessage = ({ severityClass, message }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Alert severity={severityClass} data-testid="alert-message">
        {message}
      </Alert>
    </div>
  );
};

export default AlertMessage;
