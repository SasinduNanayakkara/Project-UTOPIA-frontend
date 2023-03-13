import React, { useState } from 'react'
import { Snackbar, makeStyles} from '@material-ui/core';
import { Alert } from '@material-ui/lab';

const useStyles = makeStyles((theme) => ({
    root: {
        top: theme.spacing(9)
    }
}));

function Notification(props) {
    const [notify, setNotify] = props;
    const classes = useStyles();

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setNotify({
            ...notify,
            isOpen: false
        });
    }

  return (
    <Snackbar className={classes.root} onClose={handleClose} open={notify.isOpen} autoHideDuration={2000} anchorOrigin={{vertical: 'top', horizontal: 'right'}} >
        <Alert onClose={handleClose} severity={notify.type}>
            {notify.message}
        </Alert>
    </Snackbar>
  )
}

export default Notification