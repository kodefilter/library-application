import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Alert, AlertTitle } from '@material-ui/lab';
import { useSelector } from 'react-redux';
import { AppState } from '../../types';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    },
  }),
);

export default function NotificationBar() {
  const classes = useStyles()

  const {errorMessage,successMessage} = useSelector((state: AppState) => state.notification.message)


  if (errorMessage === '' && successMessage === '') {
    return null 
  }

  return (
    <div className={classes.root}>
      { errorMessage ? <Alert severity="error"> <AlertTitle>Error</AlertTitle>{errorMessage}</Alert>
      : <Alert severity="success"> <AlertTitle>Success</AlertTitle>{successMessage}</Alert>
      }
    </div>
  );
}


