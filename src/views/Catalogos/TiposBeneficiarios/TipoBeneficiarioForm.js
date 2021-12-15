import { Button, DialogContent, FormHelperText, Grid, TextField } from '@material-ui/core'
import React, { useContext, useState } from 'react';

import { useFormik } from 'formik'
import * as Yup from 'yup'
import { TiposBeneficiariosContext } from 'contexts/catalogos/tiposBeneficiariosContext';
import { ModalContext } from 'contexts/modalContex';

import { ModalConfirmacion } from 'commons/ModalConfirmacion';
import { ModalContextConfirmacion } from 'contexts/modalContextConfirmacion';
import { Mensaje } from 'components/Personalizados/Mensaje';
import { useTranslation } from 'react-i18next';
export const TipoBeneficiarioForm = () => {
    const { t } = useTranslation();
    const { registrarTiposBeneficiarios } = useContext(TiposBeneficiariosContext);
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
        const { dstipobeneficiario } = valores

        console.log(dstipobeneficiario);


        let tiposBeneficiario = {
            dstipobeneficiario: dstipobeneficiario,
            boactivo: true
        }
        registrarTiposBeneficiarios(tiposBeneficiario).then(response => {
            setOpenSnackbar(true);
             
            setMsjConfirmacion(`${t('msg.registroguardadoexitosamente')}`);
           
           const timer = setTimeout(() => {
        
            setError(false);
            setShowModalConfirmacion(false);
            setShowModal(false);
        
            }, 2000);
            return () => clearTimeout(timer);
        })
        .catch(err => {   
            setOpenSnackbar(true);
            setError(true);
            setMsjConfirmacion(`${t('msg.ocurrioerrorcalidarinfo')}`);
        })
    }


    const formik = useFormik({
        initialValues: {
            dstipobeneficiario: ''
        },
        validationSchema: Yup.object({
            dstipobeneficiario: Yup.string()
                .required(`${t('msg.descripcióntipobeneficiariorequerida')}`)

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
                    id="dstipobeneficiario"
                    label={t('lbl.desctipobeneficiario')}
                    variant="outlined"
                    name="dstipobeneficiario"
                    fullWidth
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.dstipobeneficiario}
                    inputProps={{ maxLength: 100 }}
                />
                {formik.touched.dstipobeneficiario && formik.errors.dstipobeneficiario ? (
                    <FormHelperText error={formik.errors.dstipobeneficiario}>{formik.errors.dstipobeneficiario}</FormHelperText>
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
                severity={error?"error":"success"}
                message={msjConfirmacion}
            />
        </form>

    )
}