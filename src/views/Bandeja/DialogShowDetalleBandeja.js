import React from 'react';
import Dialog from '@material-ui/core/Dialog';

import { DialogTitle, makeStyles } from '@material-ui/core'
import { stylesTipoBandeja } from 'views/ConfiguracionBandeja/css/tipoBandejaForm';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from "components/CustomButtons/Button.js";

const useStyles = makeStyles(stylesTipoBandeja);

export const DialogShowDetalleBandeja = (props) => {

    const {endPoint,descripcion }= props;

    const classes = useStyles();   

   
    const handleClose = () => {
        props.setShowDialogForm(false);
    }
    return (
       
        <Dialog
                classes={{ paper: classes.paper}}
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={props.showDialogForm}
        >    

            <DialogTitle id="form-dialog-title">Detalle</DialogTitle>
            <DialogContent>
               Endpoint: {endPoint}
            </DialogContent>

            <DialogContent>
                Descripcion: {descripcion}
            </DialogContent>


            <DialogActions>
            <Button onClick={handleClose} color="primary">
                Cancelar
            </Button>
            </DialogActions>
            
      </Dialog>
    )
}
