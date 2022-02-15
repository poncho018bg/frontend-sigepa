import React from "react";
//componentes
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "components/CustomButtons/Button.js";
//styles
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-dashboard-pro-react/components/tableStyle";

export default function DialogConfirmancionSuspension(props) {
  const { mostrarConfirmacion, setMostrarConfirmacion, onClickMotivo } = props;
  const useStyles = makeStyles(styles);
  const classes = useStyles();

  const handleClose = () => {
    setMostrarConfirmacion(false);
  };

  const onClick = () => {
    console.log("entro al si");
    onClickMotivo();
  };

  return (
    <Dialog
      classes={{ paper: classes.paper }}
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={mostrarConfirmacion}
    >
      <DialogTitle id="alert-dialog-title">{"Confirmación"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          ¿Esta seguro de guardar la información?
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
