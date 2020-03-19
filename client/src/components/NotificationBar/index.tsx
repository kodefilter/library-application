import React, { useState } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import { AppState } from '../../types';

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function NotificationBar() {
  const classes = useStyles()

  const {errorMessage,successMessage} = useSelector((state: AppState) => state.notification.message)
  const [open, setOpen] = useState(false);


  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };


  if (errorMessage === '' && successMessage === '') {
    return null 
  }

  if (errorMessage){
    return (<div className={classes.root}> <Alert severity="error">{errorMessage}</Alert> </div>)
  } else {
    return (
    <div className={classes.root}>
      <Snackbar open={true} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">{successMessage}</Alert>
      </Snackbar>
    </div>)
    }
}


