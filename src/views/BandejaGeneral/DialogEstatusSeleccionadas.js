import React from "react";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "components/CustomButtons/Button.js";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-dashboard-pro-react/components/tableStyle";
import { useTranslation } from "react-i18next";

export const DialogEstatusSeleccionadas = (props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const useStyles = makeStyles(styles);
  const classes = useStyles();

  const handleClose = () => {
    props.setShowDialogEstatusSeleccionadas(false);
  };

  return (
    <Dialog
      classes={{ paper: classes.paper }}
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={props.showDialogEstatusSeleccionadas}
    >
      <DialogTitle id="alert-dialog-title">{"Confirmación"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {t("msg.estasegurodeaprobarlassolicitudesseleccionadas")}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          {t("btn.no")}
        </Button>
        <Button
          onClick={props.handleCambiarEstatusSeleccionada}
          color="primary"
          autoFocus
        >
          {t("lbl.si")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
