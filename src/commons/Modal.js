import {  Dialog,  DialogContent, DialogTitle, Grid, IconButton, makeStyles } from '@material-ui/core';
import { ModalContext } from 'contexts/modalContex';
import { stylesArchivo } from 'css/stylesArchivo';
import React, { useContext } from 'react'
const useStyles = makeStyles(stylesArchivo);
import CloseIcon from '@material-ui/icons/Close';
export const Modal = (props) => {

    const { showModal, setShowModal } = useContext(ModalContext);
    const classes = useStyles();    

    const handleClose = () => {
        setShowModal(false);
    }
    

    return (
        <>
        <Dialog
                classes={{ paper: classes.paper}}
                onClose={setShowModal}
                aria-labelledby="customized-dialog-title"
                open={showModal}
        >   
        <Grid container justify="flex-end">
            <IconButton aria-label="close"  onClick={handleClose}>
               <CloseIcon />
            </IconButton>
        </Grid>
            <Grid container justify="center">
                <DialogTitle id="customized-dialog-title"  onClose={handleClose}>
                       Nuevo registro
                </DialogTitle>
            </Grid>
            
            <DialogContent>
                    {props.children}
            </DialogContent>
            
        </Dialog>
        </>
    )
}
