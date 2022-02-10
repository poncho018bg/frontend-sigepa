import React from "react";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-dashboard-pro-react/components/tableStyle";

export const DialogLayoutExitoso = (props) => {
  const { showLayoutExitoso, setShowLayoutExitoso } = props;
  const useStyles = makeStyles(styles);
  const classes = useStyles();

  const handleClose = () => {
    setShowLayoutExitoso(false);
  };

  return (
    <Dialog
      classes={{ paper: classes.paper }}
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={showLayoutExitoso}
    >
      <DialogTitle id="alert-dialog-title">{"Confirmación"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          El layout se generó exitosamente
        </DialogContentText>
      </DialogContent>
      <DialogActions></DialogActions>
    </Dialog>
  );
};
