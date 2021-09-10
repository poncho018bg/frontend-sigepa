import { Button, DialogContent, FormHelperText, Grid, TextField, MenuItem } from '@material-ui/core'
import NativeSelect from '@material-ui/core/NativeSelect';
import {  withStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import React, { useEffect, useContext } from 'react';

import { useFormik } from 'formik'
import * as Yup from 'yup'
import { ModalContext } from 'contexts/modalContex';

import { DocumentosContext } from 'contexts/catalogos/documentosContext';


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

export const DocumentosForm = () => {

    const { setShowModal } = useContext(ModalContext);

    const { getVigencias, todasVigencias, registrarDocumento } = useContext(DocumentosContext);

    useEffect(() => {
        getVigencias();
        // eslint-disable-next-line
        console.log("documentos", todasVigencias);
    }, []);

    const formik = useFormik({
        initialValues: {
            idVigencia: '',
            dsdocumento: '',
            dsdescripcion: ''
        },
        validationSchema: Yup.object({
            dsdescripcion: Yup.string()
                .required('La descripcion es obligatoria'),
            dsdocumento: Yup.string()
                .required('El nombre del documento es obligatorio')

        }),
        onSubmit: async valores => {

            const { idVigencia, dsdocumento, dsdescripcion } = valores

            console.log("vemos que llega ---> ", idVigencia, dsdocumento, dsdescripcion);


            let documentosRequisitos = {
                dsdocumento: dsdocumento,
                dsdescripcion: dsdescripcion,
                vigencias: `${ process.env.REACT_APP_API_URL}vigencias/${idVigencia}`,
                boactivo: true,
                'apoyos':[]
            }
            registrarDocumento(documentosRequisitos);
            setShowModal(false);

        }
    })
    return (
        <form
            onSubmit={formik.handleSubmit}
        >
            <DialogContent>
                <TextField
                    id="dsdocumento"
                    label="Documento"
                    variant="outlined"
                    name="dsdocumento"
                    fullWidth
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.dsdocumento}
                />
                {formik.touched.dsdocumento && formik.errors.dsdocumento ? (
                    <FormHelperText error={formik.errors.dsdocumento}>{formik.errors.dsdocumento}</FormHelperText>
                ) : null}
                <TextField
                    id="dsdescripcion"
                    label="Descripcion del documento"
                    variant="outlined"
                    name="dsdescripcion"
                    fullWidth
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.dsdescripcion}
                />
                {formik.touched.dsdescripcion && formik.errors.dsdescripcion ? (
                    <FormHelperText error={formik.errors.dsdescripcion}>{formik.errors.dsdescripcion}</FormHelperText>
                ) : null}

                <NativeSelect
                    fullWidth
                    id="idVigencia"
                    name="idVigencia"
                    label="Vigencia"
                    value={formik.values.idVigencia}
                    onChange={formik.handleChange}
                    input={<BootstrapInput />}
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
                        Enviar
                    </Button>
                </Grid>
            </DialogContent>
        </form>

    )
}