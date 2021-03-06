import React, { useContext } from 'react';

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "components/CustomButtons/Button.js";
import { ModalContextConfirmacion } from 'contexts/modalContextConfirmacion';

export const ModalConfirmacion = (props) => {

    const { handleRegistrar} = props;

    const { showModalConfirmacion, setShowModalConfirmacion }
        = useContext(ModalContextConfirmacion);

    const handleClose = () => {

        setShowModalConfirmacion(false)
    }
    const handleAceptar = () => {
        console.log('aceptar confirmacion');
        handleRegistrar();
    }
    return (
        <Dialog
            open={showModalConfirmacion}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{"Confirmación"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                ¿Está seguro de guardar la información?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancelar
                </Button>
                <Button onClick={handleAceptar} color="primary" autoFocus>
                    Aceptar
                </Button>
            </DialogActions>
        </Dialog>
    )
}
