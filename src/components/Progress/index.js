import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import useLoading from '../../hooks/useLoading';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
  preloader: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 999,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  opacityArea: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
}));

const Progress = () => {
  const classes = useStyles();
  const { isShowLoading } = useLoading();

  return (
    <div className={classes.root}>
      {isShowLoading && (
        <div className={classes.preloader}>
          <div className={classes.opacityArea}>
            <CircularProgress color="secondary" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Progress;
