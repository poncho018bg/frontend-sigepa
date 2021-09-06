import React, { useEffect, useState, useContext } from 'react';
import { Button, Dialog, DialogContent, FormHelperText, Grid, TextField } from '@material-ui/core'
import { Formik } from 'formik';
import * as Yup from 'yup';
import { DocumentosContext } from 'contexts/catalogos/documentosContext';
import { ModalContextUpdate } from 'contexts/modalContexUpdate';

import NativeSelect from '@material-ui/core/NativeSelect';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';

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


export const DocumentosEdit = ({ documentoSeleccionado }) => {

    const { setShowModalUpdate } = useContext(ModalContextUpdate);
    //const { actualizarModulo } = useContext(ModuloContext);
    const { getVigencias, todasVigencias, actualizarDocumento } = useContext(DocumentosContext);


    // Schema de validación
    const schemaValidacion = Yup.object({
        dsdocumento: Yup.string()
            .required('El nombre del documento es obligatorio')
    });

    const actualizarInfoDocumentos = async valores => {
        actualizarDocumento(valores);
        setShowModalUpdate(false);
    }


    useEffect(() => {
        getVigencias();
        // eslint-disable-next-line
        console.log("documentos", todasVigencias);
    }, []);

    return (

        <Formik
            enableReinitialize
            initialValues={documentoSeleccionado}
            validationSchema={schemaValidacion}
            onSubmit={(valores) => {
                actualizarInfoDocumentos(valores)
            }}
        >
            

            {props => {
                return (
                    <form
                        className="bg-white shadow-md px-8 pt-6 pb-8 mb-4"
                        onSubmit={props.handleSubmit}>
                        <DialogContent>
                            <TextField
                                id="dsdocumento"
                                label="Documento"
                                variant="outlined"
                                name="dsdocumento"
                                fullWidth
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                value={props.values.dsdocumento}
                            />
                            {props.touched.dsdocumento && props.errors.dsdocumento ? (
                                <FormHelperText error={props.errors.dsdocumento}>{props.errors.dsdocumento}</FormHelperText>
                            ) : null}
                            <TextField
                                id="dsdescripcion"
                                label="Descripcion del documento"
                                variant="outlined"
                                name="dsdescripcion"
                                fullWidth
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                value={props.values.dsdescripcion}
                            />
                            {props.touched.dsdescripcion && props.errors.dsdescripcion ? (
                                <FormHelperText error={props.errors.dsdescripcion}>{props.errors.dsdescripcion}</FormHelperText>
                            ) : null}

                            <NativeSelect
                                fullWidth
                                id="idVigencia"
                                name="idVigencia"
                                label="Vigencia"
                                onChange={props.handleChange}
                                input={<BootstrapInput />}
                                value={props.values.vigencias}
                            >
                                <option aria-label="Seleccionar" value="0" />
                                {
                                    todasVigencias.map((v, i) => (
                                        <option key={i}
                                            value={v.id}>
                                            {v.dsvigencia}
                                        </option>
                                    )
                                    )
                                }

                            </NativeSelect>
                        </DialogContent>

                        <DialogContent >
                            <Grid container justify="flex-end">
                                <Button variant="contained" color="primary" type='submit'>
                                    Editar
                                </Button>
                            </Grid>
                        </DialogContent>
                    </form>
                )
            }}
        </Formik>

    )

}