import { Button, DialogContent, FormHelperText, Grid, TextField } from '@material-ui/core'
import React, { useContext, useState } from 'react';

import { useFormik } from 'formik'
import * as Yup from 'yup'
import { IdentificacionesOficialesContext } from 'contexts/catalogos/IdentificacionesOficialesContext';
import { ModalContext } from 'contexts/modalContex';

import { ModalConfirmacion } from 'commons/ModalConfirmacion';
import { ModalContextConfirmacion } from 'contexts/modalContextConfirmacion';
import { Mensaje } from 'components/Personalizados/Mensaje';
import { useTranslation } from 'react-i18next';
export const IdentificacionesForm = () => {
    const { t } = useTranslation();
    const { registrarIdentificacionesOficiales } = useContext(IdentificacionesOficialesContext);
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
        const { dsidentificacion, dsidentificador } = valores

        let identificacion = {
            dsidentificacion: dsidentificacion,
            boactivo: true,
            dsidentificador: dsidentificador
        }
        registrarIdentificacionesOficiales(identificacion).then(response => {
            setOpenSnackbar(true);

            setMsjConfirmacion(`${t('msg.registroguardadoexitosamente')}`);

            const timer = setTimeout(() => {

                setError(false);
                setShowModalConfirmacion(false);
                setShowModal(false);

            }, 1500);
            return () => clearTimeout(timer);
        })
            .catch(err => {
                console.log('err', err)
                setOpenSnackbar(true);
                setError(true);
                setMsjConfirmacion(`${t('msg.ocurrioerrorcalidarinfo')}`);
            });
    }

    const formik = useFormik({
        initialValues: {
            dsidentificacion: '',
            dsidentificador: ''
        },
        validationSchema: Yup.object({
            dsidentificacion: Yup.string()
                .required(`${t('msg.identificacionobligatorio')}`)
                .matches(/^[a-zA-Z0-9_.-\sñÑ]*$/, `${t('msg.nocarateresespeciales')}`),
            dsidentificador: Yup.string()
                .required(`${t('msg.identificadorobligatorio')}`)
                .matches(/^[a-zA-Z0-9_.-\sñÑ]*$/, `${t('msg.nocarateresespeciales')}`),

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
                    id="dsidentificacion"
                    label={t('lbl.identificacion')}
                    variant="outlined"
                    name="dsidentificacion"
                    fullWidth
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.dsidentificacion}
                    inputProps={{ maxLength: 30 }}
                />
                {formik.touched.dsidentificacion && formik.errors.dsidentificacion ? (
                    <FormHelperText error={formik.errors.dsidentificacion}>{formik.errors.dsidentificacion}</FormHelperText>
                ) : null}
            </DialogContent>

            <DialogContent>
                <TextField
                    id="dsidentificador"
                    label={t('lbl.identificador')}
                    variant="outlined"
                    name="dsidentificador"
                    fullWidth
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.dsidentificador}
                    inputProps={{ maxLength: 2 }}
                />
                {formik.touched.dsidentificador && formik.errors.dsidentificador ? (
                    <FormHelperText error={formik.errors.dsidentificador}>{formik.errors.dsidentificador}</FormHelperText>
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