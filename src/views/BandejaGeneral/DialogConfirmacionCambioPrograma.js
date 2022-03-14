import React from "react";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "components/CustomButtons/Button.js";
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-dashboard-pro-react/components/tableStyle";

export default function DialogConfirmacionCambioPrograma(props) {
  const { dialogConfirmar, setDialogConfirmar, guardarCambio} = props;
  const useStyles = makeStyles(styles);
  const classes = useStyles();

  const handleClose = () => {
    setDialogConfirmar(false);
  };

  const onClick = () => {
    guardarCambio();
  };
  return (
    <Dialog
      classes={{ paper: classes.paper }}
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={dialogConfirmar}
    >
      <DialogTitle id="alert-dialog-title">{"Confirmación"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          ¿Estas seguro de cambiar el programa?
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
}
