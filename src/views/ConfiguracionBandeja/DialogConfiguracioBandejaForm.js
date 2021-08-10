
import { DialogTitle, makeStyles } from '@material-ui/core'
import React, { useEffect, useState } from 'react';
import { stylesTipoBandeja } from './css/tipoBandejaForm';
import Button from "components/CustomButtons/Button.js";
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { useDispatch, useSelector } from 'react-redux';
import {bandejaStartAddNew,bandejaStartUpdate} from 'actions/tipoBandajeAction';

const useStyles = makeStyles(stylesTipoBandeja);


const initBandeja = {
    endPoint: '',
    descripcion: '',
    activo:false,
    fechaRegistro:'',
    id:''
}

export const DialogConfiguracioBandejaForm = (props) => {
    
    const classes = useStyles();    
    const [formValues, setFormValues] = useState( initBandeja);
    const { endPoint, descripcion } = formValues;

    const {activeTipoBandeja} = useSelector(state=>state.tipoBandeja);
    
    const dispatch = useDispatch();


    useEffect(() => {
        alert('tuipo');
        if(activeTipoBandeja){
            setFormValues(activeTipoBandeja);
        }else{
            setFormValues(initBandeja);
        }
    }, [activeTipoBandeja]);

    const handleInputChange = ({ target }) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        });
    }


    
    const handleClose = () => {
        props.setShowDialogForm(false);
        setFormValues(initBandeja);
    }
 
    const handleAgregar=(e)=>{
        e.preventDefault();

        if(activeTipoBandeja){
            dispatch(bandejaStartUpdate(formValues));
        }else{
            dispatch(bandejaStartAddNew(formValues));
        }
        props.setShowDialogForm(false);
    }
    return (
       
        <Dialog
                classes={{ paper: classes.paper}}
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={props.showDialogForm}
        > <form  onSubmit={handleAgregar}>     

            <DialogTitle id="form-dialog-title">{(activeTipoBandeja)?'Editar tipo bandeja':'Nuevo tipo bandeja'} </DialogTitle>
            <DialogContent>
            <TextField
                autoFocus
                margin="dense"
                id="endPoint"
                label="Endpoint"
                type="text"
                name="endPoint"
                value={endPoint}
                onChange={handleInputChange}
                fullWidth
            />
            </DialogContent>

            <DialogContent>
            <TextField
                autoFocus
                margin="dense"
                id="descripcion"
                label="Descripcion"
                type="text"
                name="descripcion"
                value={descripcion}
                onChange={handleInputChange}
                fullWidth
            />
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose} color="primary">
                Cancelar
            </Button>
            <Button  type="submit" color="primary">
                Agregar
            </Button>
            </DialogActions>
            
      </form>
      </Dialog>
    )
}
