import React from 'react';

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "components/CustomButtons/Button.js";
import { useDispatch } from 'react-redux';



export const DialogLogOut = (props) => {

    const dispatch = useDispatch();

    const handleClose = () => {
        props.setOpenDialog(false);
       // dispatch(obtenerModuloEliminar(null));
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
                ¿Esta seguro de cerrar sesión?
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose} color="primary">
            No
            </Button>
            <Button onClick={props.handleDeshabilitar} color="primary" autoFocus>
            Sí
            </Button>
        </DialogActions>
        </Dialog>
    )
}