import { Button, DialogContent, FormHelperText, Grid, TextField } from '@material-ui/core'
import React, { useContext, useState } from 'react';

import { useFormik } from 'formik'
import * as Yup from 'yup'
import { ModuloContext } from 'contexts/moduloContext';
import { ModalContext } from 'contexts/modalContex';

import { ModalConfirmacion } from 'commons/ModalConfirmacion';
import { ModalContextConfirmacion } from 'contexts/modalContextConfirmacion';
import { Mensaje } from 'components/Personalizados/Mensaje';
import { useTranslation } from 'react-i18next';
export const ModuloForm = () => {
    const { t } = useTranslation();
    const { registrarModulos } = useContext(ModuloContext);
    const { setShowModal } = useContext(ModalContext);

    //dialog confirmacion
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

    const formik = useFormik({
        initialValues: {
            dsmodulo: '',
            usuarioCreacionId: sessionStorage.getItem('idUSuario')
        },
        validationSchema: Yup.object({
            dsmodulo: Yup.string()
                .required(`${t('msg.moduloobligatorio')}`)

        }),
        onSubmit: async valores => {

            confirmacionDialog(valores);

        }


    })

    const handleRegistrar = () => {
        const { dsmodulo } = valores

        console.log(dsmodulo);


        let module = {
            dsmodulo: dsmodulo,
            usuarioCreacionId: `${process.env.REACT_APP_API_URL}/usuario/${sessionStorage.getItem('idUSuario')}`,
            boactivo: true,
            'SubModulos': []
        }


        registrarModulos(module).then(response => {
            setOpenSnackbar(true);
            setMsjConfirmacion(`${t('msg.registroguardadoexitosamente')}`);

            const timer = setTimeout(() => {
                setError(false);
                setShowModalConfirmacion(false);
                setShowModal(false);

            }, 1000);
            return () => clearTimeout(timer);
        }).catch(err => {
            setOpenSnackbar(true);
            setError(true);
            setMsjConfirmacion(`${t('msg.ocurrioerrorcalidarinfo')}`);
        })

    }


    return (
        <form
            onSubmit={formik.handleSubmit}
        >
            <DialogContent>
                <TextField
                    id="dsmodulo"
                    label={t('lbl.descmodulo')} 
                    variant="outlined"
                    name="dsmodulo"
                    fullWidth
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.dsmodulo}
                    inputProps={{ maxLength: 200 }}
                />
                {formik.touched.dsmodulo && formik.errors.dsmodulo ? (
                    <FormHelperText error={formik.errors.dsmodulo}>{formik.errors.dsmodulo}</FormHelperText>
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