import { Button, Dialog, DialogContent, FormHelperText, Grid, TextField, MenuItem } from '@material-ui/core';
import React, { useEffect, useState, useContext } from 'react';

import { useFormik } from 'formik'
import * as Yup from 'yup'
import { FirmasContext } from 'contexts/catalogos/firmasContext';
import { ModalContext } from 'contexts/modalContex';
import UserService from "../../../servicios/UserService";

import { makeStyles, withStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import NativeSelect from '@material-ui/core/NativeSelect';



const BootstrapInput = withStyles((theme) => ({
    root: {
        'label + &': {
            marginTop: theme.spacing(3),
        },
    },
    input: {
        borderRadius: 4,
        position: 'relative',
        backgroundColor: theme.palette.background.paper,
        border: '1px solid #ced4da',
        fontSize: 16,
        padding: '10px 26px 10px 12px',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        // Use the system font instead of the default Roboto font.
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        '&:focus': {
            borderRadius: 4,
            borderColor: '#80bdff',
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
        },
    },
}))(InputBase);

export const FirmasForm = () => {

    const { registrarFirmas, getProgramas, programaList } = useContext(FirmasContext);
    const { setShowModal } = useContext(ModalContext);

    useEffect(() => {
        getProgramas();
    }, []);

    const formik = useFormik({
        initialValues: {
            dscomentario: '',
            dsautoriza: '',
            idPrograma: '',
            dspuesto: '',
        },
        validationSchema: Yup.object({
            dsautoriza: Yup.string()
                .required('Es obligatorio poner la persona que autoriza'),
            idPrograma: Yup.string()
                .required('El programa de apoyo es obligatorio'),
            dspuesto: Yup.string()
                .required('Es obligatorio poner el puesto'),

        }),
        onSubmit: async valores => {

            const { idPrograma, dsautoriza, dspuesto, dscomentario } = valores

            console.log("datos ---> ", idPrograma, dsautoriza, dspuesto, dscomentario);


            let Firmas = {
                dsautoriza: dsautoriza,
                dspuesto: dspuesto,
                dscomentario: dscomentario,
                programas: `${process.env.REACT_APP_API_URL}programas/${idPrograma}`,
                boactivo: true
            }
            registrarFirmas(Firmas);
            setShowModal(false);
        }
    })


    return (
        <form
            onSubmit={formik.handleSubmit}
        >
            <DialogContent>
                <TextField
                    id="idPrograma"
                    variant="outlined"
                    label="Programa de Apoyo"
                    select
                    fullWidth
                    name="idPrograma"
                    onChange={formik.handleChange}
                    value={formik.values.idPrograma}
                >
                    <MenuItem value="0">
                        <em>Ninguno</em>
                    </MenuItem>
                    {
                        programaList.map(
                            item => (
                                <MenuItem
                                    key={item.id}
                                    value={item.id}>
                                    {item.dsprograma}
                                </MenuItem>
                            )
                        )
                    }
                </TextField>
                {formik.touched.idPrograma && formik.errors.idPrograma ? (
                    <FormHelperText error={formik.errors.idPrograma}>{formik.errors.idPrograma}</FormHelperText>
                ) : null}
                <TextField
                    id="dsautoriza"
                    label="Nombre del funcionario que autoriza"
                    variant="outlined"
                    name="dsautoriza"
                    fullWidth
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.dsautoriza}
                />
                {formik.touched.dsautoriza && formik.errors.dsautoriza ? (
                    <FormHelperText error={formik.errors.dsautoriza}>{formik.errors.dsautoriza}</FormHelperText>
                ) : null}
                <TextField
                    id="dspuesto"
                    label="Puesto"
                    variant="outlined"
                    name="dspuesto"
                    fullWidth
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.dspuesto}
                />
                {formik.touched.dspuesto && formik.errors.dspuesto ? (
                    <FormHelperText error={formik.errors.dspuesto}>{formik.errors.dspuesto}</FormHelperText>
                ) : null}
                <TextField
                    id="dscomentario"
                    label="Comentarios (opcional)"
                    variant="outlined"
                    name="dscomentario"
                    fullWidth
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.dscomentario}
                />
                {formik.touched.dscomentario && formik.errors.dscomentario ? (
                    <FormHelperText error={formik.errors.dscomentario}>{formik.errors.dscomentario}</FormHelperText>
                ) : null}
            </DialogContent>

            <DialogContent >
                <Grid container justify="flex-end">
                    <Button variant="contained" color="primary" type='submit'>
                        Enviar
                    </Button>
                </Grid>
            </DialogContent>
        </form>

    )
}