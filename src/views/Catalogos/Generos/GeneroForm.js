import { Button, DialogContent, FormHelperText, Grid, TextField } from '@material-ui/core'
import React, { useContext, useState } from 'react';

import { useFormik } from 'formik'
import * as Yup from 'yup'
import { GenerosContext } from 'contexts/catalogos/GenerosContext';
import { ModalContext } from 'contexts/modalContex';

import { ModalConfirmacion } from 'commons/ModalConfirmacion';
import { ModalContextConfirmacion } from 'contexts/modalContextConfirmacion';
import { Mensaje } from 'components/Personalizados/Mensaje';
import { useTranslation } from 'react-i18next';
export const GeneroForm = () => {
    const { t } = useTranslation();
    const { registrarGeneros } = useContext(GenerosContext);
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
        const { dsgenero, dsabreviatura } = valores

        let genros = {
            dsgenero: dsgenero,
            boactivo: true,
            dsabreviatura: dsabreviatura
        }
        registrarGeneros(genros).then(response => {
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
            dsgenero: '',
            dsabreviatura: ''
        },
        validationSchema: Yup.object({
            dsgenero: Yup.string()
                .required(`${t('msg.generoobligatorio')}`)
                .matches(/^[a-zA-Z0-9_.-\sñÑ]*$/, `${t('msg.nocarateresespeciales')}`),
            dsabreviatura: Yup.string()
                .required(`${t('msg.abreviaturaobligatorio')}`)
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
                    id="dsgenero"
                    label={t('lbl.genero')}
                    variant="outlined"
                    name="dsgenero"
                    fullWidth
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.dsgenero}
                    inputProps={{ maxLength: 20 }}
                />
                {formik.touched.dsgenero && formik.errors.dsgenero ? (
                    <FormHelperText error={formik.errors.dsgenero}>{formik.errors.dsgenero}</FormHelperText>
                ) : null}
            </DialogContent>

            <DialogContent>
                <TextField
                    id="dsabreviatura"
                    label={t('lbl.abreviatura')}
                    variant="outlined"
                    name="dsabreviatura"
                    fullWidth
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.dsabreviatura}
                    inputProps={{ maxLength: 2 }}

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