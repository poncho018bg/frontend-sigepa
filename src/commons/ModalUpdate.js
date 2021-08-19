import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, makeStyles } from '@material-ui/core';
import { ModalContext } from 'contexts/modalContex';
import { stylesArchivo } from 'css/stylesArchivo';
import React, { useContext } from 'react'
const useStyles = makeStyles(stylesArchivo);
import CloseIcon from '@material-ui/icons/Close';
import { ModalContextUpdate } from 'contexts/modalContexUpdate';
export const ModalUpdate = (props) => {

    const { showModalUpdate, modalTitleUpdate,
        setShowModalUpdate, setModalTitleUpdate } = useContext(ModalContextUpdate);


    const classes = useStyles();    

    const handleClose = () => {
        setShowModalUpdate(false);
    }
    

    return (
        <>
        <Dialog
                classes={{ paper: classes.paper}}
                onClose={setShowModalUpdate}
                aria-labelledby="customized-dialog-title"
                open={showModalUpdate}
        >   
        <Grid container justify="flex-end">
            <IconButton aria-label="close"  onClick={handleClose}>
               <CloseIcon />
            </IconButton>
        </Grid>
            <Grid container justify="center">
                <DialogTitle id="customized-dialog-title"  onClose={handleClose}>
                        Actualizar registro
                </DialogTitle>
            </Grid>
            
            <DialogContent>
                    {props.children}
            </DialogContent>
            
        </Dialog>
        </>
    )
}