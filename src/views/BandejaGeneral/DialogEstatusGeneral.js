import React from 'react';

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "components/CustomButtons/Button.js";
import { useDispatch } from 'react-redux';
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-dashboard-pro-react/components/tableStyle";


export const DialogEstatusGeneral = (props) => {
    const dispatch = useDispatch();
    const useStyles = makeStyles(styles);
    const classes = useStyles();

    const handleClose = () => {
        props.setShowDialogEstatusGeneral(false);
    }

    return (
        <Dialog
            classes={{ paper: classes.paper }}
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={props.showDialogEstatusGeneral}
        >
            <DialogTitle id="alert-dialog-title">{"Confirmación"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    ¿Esta seguro de aprobar el total de {props.totalRegistros} seleccionadas ?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    No
                </Button>
                <Button onClick={props.handleCambiarGeneral} color="primary" autoFocus>
                    Sí
                </Button>
            </DialogActions>
        </Dialog>
    )
}