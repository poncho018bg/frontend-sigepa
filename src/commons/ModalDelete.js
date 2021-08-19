import React, { useContext } from 'react';

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "components/CustomButtons/Button.js";
import { ModalContextDelete } from 'contexts/modalContexDelete';

export const ModalDelete = (props) => {


    const { showModalDelete, modalTitleDelete, setShowModalDelete, setModalTitleDelete }
         = useContext(ModalContextDelete);

    const handleClose = () => {
        setShowModalDelete(false)
    }
    const handleAceptar= () => {
        console.log('aceptar');
    }
    return (
        <Dialog
        open={showModalDelete}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{"Confirmación"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    ¿Deseas eliminar el elemento?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                Cancelar
                </Button>
                <Button onClick={handleClose} color="primary" autoFocus>
                Aceptar
                </Button>
            </DialogActions>
        </Dialog>
    )
}
