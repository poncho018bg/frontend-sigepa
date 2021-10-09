import { Button, DialogContent, FormHelperText, Grid, MenuItem, TextField } from '@material-ui/core'
import NativeSelect from '@material-ui/core/NativeSelect';
import { withStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import React, { useEffect, useContext, useState } from 'react';

import { useFormik } from 'formik'
import * as Yup from 'yup'
import { ModalContext } from 'contexts/modalContex';

import { DocumentosContext } from 'contexts/catalogos/documentosContext';

import { ModalConfirmacion } from 'commons/ModalConfirmacion';
import { ModalContextConfirmacion } from 'contexts/modalContextConfirmacion';
import { Mensaje } from 'components/Personalizados/Mensaje';
import { useTranslation } from 'react-i18next';

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
    const { t } = useTranslation();
    const { setShowModal } = useContext(ModalContext);

    const { getVigencias, todasVigencias, registrarDocumento } = useContext(DocumentosContext);


    const [valores, setValores] = useState();
    const { setShowModalConfirmacion } = useContext(ModalContextConfirmacion);
    const [error, setError] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [msjConfirmacion, setMsjConfirmacion] = useState('');


    const confirmacionDialog = (e) => {
        console.log("Aqui hace el llamado al dialog", e);
        setShowModalConfirmacion(true);
        setValores(e)
    }

    const handleRegistrar = () => {
        console.log("aqui hace el registro no deshabilita nada");
        const { idVigencia, dsdocumento, dsdescripcion } = valores

        console.log("vemos que llega ---> ", idVigencia, dsdocumento, dsdescripcion);


        let documentosRequisitos = {
            dsdocumento: dsdocumento,
            dsdescripcion: dsdescripcion,
            vigencias: `${process.env.REACT_APP_API_URL}vigencias/${idVigencia}`,
            boactivo: true,
            'programas': []
        }


        registrarDocumento(documentosRequisitos).then(response => {
            setOpenSnackbar(true);
            setMsjConfirmacion(`El registro ha sido guardado exitosamente`);

            const timer = setTimeout(() => {
                setError(false);
                setShowModalConfirmacion(false);
                setShowModal(false);

            }, 1000);
            return () => clearTimeout(timer);
        }).catch(err => {
            setOpenSnackbar(true);
            setError(true);
            setMsjConfirmacion(`Ocurrio un error, ${err}`);
        });;
    }

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
            confirmacionDialog(valores);
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
            </DialogContent>
            <DialogContent>
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
            </DialogContent>
            <DialogContent>
                <TextField
                    id="idVigencia"
                    variant="outlined"
                    label="Selecciona una vigencia"
                    select
                    fullWidth
                    name="idVigencia"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.idVigencia}
                >
                    <MenuItem value="0">
                        <em>Ninguno</em>
                    </MenuItem>
                    {
                        todasVigencias.map(
                            item => (
                                <MenuItem
                                    key={item.id}
                                    value={item.id}>
                                    {item.dsvigencia}
                                </MenuItem>
                            )
                        )
                    }
                </TextField>


            </DialogContent>

            <DialogContent >
                <Grid container justify="flex-end">
                    <Button variant="contained" color="primary" type='submit'>
                    {t('btn.guardar')}
                    </Button>
                </Grid>
            </DialogContent>
            <ModalConfirmacion
                handleRegistrar={handleRegistrar} evento="Registrar"
            />
            <Mensaje
                setOpen={setOpenSnackbar}
                open={openSnackbar}
                severity={error ? "error" : "success"}
                message={msjConfirmacion}
            />
        </form>

    )
}