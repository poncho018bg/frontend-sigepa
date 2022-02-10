import React from "react";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "components/CustomButtons/Button.js";
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-dashboard-pro-react/components/tableStyle";

export const DialogSolicitudEmbozo = (props) => {
  const {
    showGenerarLayoutDialog,
    setShowGenerarLayoutDialog,
    guardarLayout,
  } = props;
  const useStyles = makeStyles(styles);
  const classes = useStyles();

  const handleClose = () => {
    setShowGenerarLayoutDialog(false);
  };

  const onClick = () => {
    console.log("entro al onclik de layout");
    guardarLayout();
  };

  return (
    <Dialog
      classes={{ paper: classes.paper }}
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={showGenerarLayoutDialog}
    >
      <DialogTitle id="alert-dialog-title">{"Confirmación"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          ¿Estas seguro de generar el layout para la emisión de tarjetas?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          No
        </Button>
        <Button onClick={onClick} color="primary" autoFocus>
          Sí
        </Button>
      </DialogActions>
    </Dialog>
  );
};
