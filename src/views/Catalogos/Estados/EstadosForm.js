import { Button, DialogContent, FormHelperText, Grid, TextField } from '@material-ui/core'
import React, { useContext, useState } from 'react';

import { useFormik } from 'formik'
import * as Yup from 'yup'

import { ModalContext } from 'contexts/modalContex';
import { EstadosContext } from 'contexts/catalogos/EstadosContext';

import { ModalConfirmacion } from 'commons/ModalConfirmacion';
import { ModalContextConfirmacion } from 'contexts/modalContextConfirmacion';
import { Mensaje } from 'components/Personalizados/Mensaje';
import { useTranslation } from 'react-i18next';
export const EstadosForm = () => {
    const { t } = useTranslation();
    const { registrarEstados } = useContext(EstadosContext);
    const { setShowModal } = useContext(ModalContext);

    //dialog confirmar
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
        const { noestado, dsestado, dsabreviatura} = valores
        let estado = {
            noestado: noestado,
            dsestado: dsestado,
            dsabreviatura:dsabreviatura,
            activo: true
        }
        registrarEstados(estado).then(response => {
            setOpenSnackbar(true);

            setMsjConfirmacion(`${t('msg.registroinhabilitadoexitosamente')}`);

            const timer = setTimeout(() => {

                setError(false);
                setShowModalConfirmacion(false);
                setShowModal(false);

            }, 1500);
            return () => clearTimeout(timer);
        })
            .catch(err => {
                setOpenSnackbar(true);
                setError(true);
                setMsjConfirmacion(`Ocurrio un error, ${err}`);
            });
    }


    const formik = useFormik({
        initialValues: {
            noestado: '',
            dsestado: '',
            dsabreviatura: ''
        },
        validationSchema: Yup.object({
            noestado: Yup.string()
                .required('El num. de estado  es obligatorio'),
            dsestado: Yup.string()
                .required('La desc. del estado es obligatorio'),
            dsabreviatura: Yup.string()
                .required('La abreviatura del estado es obligatorio')
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
                    id="noestado"
                    label="Num. estado"
                    variant="outlined"
                    name="noestado"
                    fullWidth
                    inputProps={{ maxLength: "2" }}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.noestado}
                />
                {formik.touched.noestado && formik.errors.noestado ? (
                    <FormHelperText error={formik.errors.noestado}>{formik.errors.noestado}</FormHelperText>
                ) : null}
            </DialogContent>
            <DialogContent>

                <TextField
                    id="dsestado"
                    label="Desc. estado"
                    variant="outlined"
                    name="dsestado"
                    fullWidth
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.dsestado}
                />
                {formik.touched.dsestado && formik.errors.dsestado ? (
                    <FormHelperText error={formik.errors.dsestado}>{formik.errors.dsestado}</FormHelperText>
                ) : null}
            </DialogContent>
            <DialogContent>
                <TextField
                    id="dsabreviatura"
                    label="Abreviatura"
                    variant="outlined"
                    name="dsabreviatura"
                    fullWidth
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.dsabreviatura}
                />
                {formik.touched.dsabreviatura && formik.errors.dsabreviatura ? (
                    <FormHelperText error={formik.errors.dsabreviatura}>{formik.errors.dsabreviatura}</FormHelperText>
                ) : null}
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
