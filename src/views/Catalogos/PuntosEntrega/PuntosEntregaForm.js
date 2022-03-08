import { Button, DialogContent, FormHelperText, Grid, TextField } from '@material-ui/core'
import React, { useContext, useState } from 'react';

import { useFormik } from 'formik'
import * as Yup from 'yup'
import { PuntosEntregaContext } from 'contexts/catalogos/PuntosEntregaContext';
import { ModalContext } from 'contexts/modalContex';

import { ModalConfirmacion } from 'commons/ModalConfirmacion';
import { ModalContextConfirmacion } from 'contexts/modalContextConfirmacion';
import { Mensaje } from 'components/Personalizados/Mensaje';
import { useTranslation } from 'react-i18next';

export const PuntosEntregaForm = () => {
    const { t } = useTranslation();
    const { registrarPuntosEntrega } = useContext(PuntosEntregaContext);
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
        const { dspuntoentrega } = valores

        let puntoentregas = {
            dspuntoentrega: dspuntoentrega,
            boactivo: true,            
        }
        registrarPuntosEntrega(puntoentregas).then(response => {
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
            dspuntoentrega: ''
        },
        validationSchema: Yup.object({
            dspuntoentrega: Yup.string()
                .required(`${t('msg.identificacionobligatorio')}`)
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
                    id="dspuntoentrega"
                    label={t('lbl.puntoentrega')}
                    variant="outlined"
                    name="dspuntoentrega"
                    fullWidth
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.dspuntoentrega}
                    inputProps={{ maxLength: 30 }}
                />
                {formik.touched.dspuntoentrega && formik.errors.dspuntoentrega ? (
                    <FormHelperText error={formik.errors.dspuntoentrega}>{formik.errors.dspuntoentrega}</FormHelperText>
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