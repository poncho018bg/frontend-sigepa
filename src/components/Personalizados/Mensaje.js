import React from "react";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

export const Mensaje = (props) => {

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        props.setOpen(false);
    };

    return (
        
        <Snackbar open={props.open} autoHideDuration={1500} onClose={handleClose}>
        <Alert onClose={handleClose} severity={props.severity}>
          {props.message}
        </Alert>
      </Snackbar>
    )
}