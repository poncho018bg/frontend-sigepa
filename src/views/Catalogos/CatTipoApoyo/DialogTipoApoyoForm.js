
import { DialogTitle, FormHelperText, Grid, makeStyles, MenuItem, TextField } from '@material-ui/core'
import React, { useEffect, useState } from 'react';
import { useForm } from 'hooks/useForm';
import Button from "components/CustomButtons/Button.js";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { useDispatch, useSelector } from 'react-redux';
import { stylesArchivo } from 'css/stylesArchivo';
const useStyles = makeStyles(stylesArchivo);



const initIdioma = {
    dsidioma: '',
    dslocale: '',
    idIdioma: ''
}


export const DialogTipoApoyoForm = (props) => {

    const dispatch = useDispatch();
    const classes = useStyles();




    return (
        <></>
    )

}