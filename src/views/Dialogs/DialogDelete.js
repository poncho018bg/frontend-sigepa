import React from 'react';

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "components/CustomButtons/Button.js";
import { useDispatch } from 'react-redux';
import { borrarModuloAction } from 'actions/TipoApoyoAction';

export const DialogDelete = (props) => {

    const dispatch = useDispatch();

    const handleClose = () => {
        props.setOpenDialog(false);
        dispatch(borrarModuloAction(null));
    }

  
    return (
        <Dialog
        open={props.openDialog}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        >
        <DialogTitle id="alert-dialog-title">{"Confirmación"}</DialogTitle>
        <DialogContent>
            <DialogContentText id="alert-dialog-description">
            ¿Esta seguro que desea eliminar la información?
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose} color="primary">
            Cancelar
            </Button>
            <Button onClick={props.handleDeshabilitar} color="primary" autoFocus>
            Aceptar
            </Button>
        </DialogActions>
        </Dialog>
    )
}
