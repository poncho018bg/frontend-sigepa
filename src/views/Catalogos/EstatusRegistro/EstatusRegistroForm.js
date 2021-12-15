import { Button, DialogContent, FormHelperText, Grid, TextField } from '@material-ui/core'
import React, { useContext, useState } from 'react';

import { useFormik } from 'formik'
import * as Yup from 'yup'
import { EstatusRegistroContext } from 'contexts/catalogos/EstatusRegistroContext';
import { ModalContext } from 'contexts/modalContex';

import { ModalConfirmacion } from 'commons/ModalConfirmacion';
import { ModalContextConfirmacion } from 'contexts/modalContextConfirmacion';
import { Mensaje } from 'components/Personalizados/Mensaje';
import { useTranslation } from 'react-i18next';

export const EstatusRegistroForm = () => {
    const { t } = useTranslation();
    const { registrarEstatusRegistros } = useContext(EstatusRegistroContext);
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
        const { dsestatusregistro } = valores




        let estatusregistro = {
            dsestatusregistro: dsestatusregistro,
            boactivo: true,

        }
        registrarEstatusRegistros(estatusregistro).then(response => {
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
            dsestatusregistro: ''
        },
        validationSchema: Yup.object({
            dsestatusregistro: Yup.string()
                .required(`${t('msg.estatusregistroobligatorio')}`)
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
                    id="dsestatusregistro"
                    label={t('lbl.estatusregistro')}
                    variant="outlined"
                    name="dsestatusregistro"
                    fullWidth
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.dsestatusregistro}
                    inputProps={{ maxLength: 50 }}
                />
                {formik.touched.dsestatusregistro && formik.errors.dsestatusregistro ? (
                    <FormHelperText error={formik.errors.dsestatusregistro}>{formik.errors.dsestatusregistro}</FormHelperText>
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