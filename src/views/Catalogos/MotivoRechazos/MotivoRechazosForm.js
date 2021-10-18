import { Button, DialogContent, FormHelperText, Grid, TextField } from '@material-ui/core'
import React, { useContext, useState } from 'react';

import { useFormik } from 'formik'
import * as Yup from 'yup'
import { MotivoRechazosContext } from 'contexts/catalogos/motivoRechazosContext';
import { ModalContext } from 'contexts/modalContex';

import { ModalConfirmacion } from 'commons/ModalConfirmacion';
import { ModalContextConfirmacion } from 'contexts/modalContextConfirmacion';
import { Mensaje } from 'components/Personalizados/Mensaje';
import { useTranslation } from 'react-i18next';

export const MotivoRechazosForm = () => {
    const { t } = useTranslation();
    const { registrarMotivoRechazos } = useContext(MotivoRechazosContext);
    const { setShowModal } = useContext(ModalContext);

    //dialog confirmacion
    const [valores, setValores] = useState();
    const { setShowModalConfirmacion } = useContext(ModalContextConfirmacion);
    const [error, setError] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [msjConfirmacion, setMsjConfirmacion] = useState('');
    /**
     * abre el dialogo de confirmación
     * @param {valores} e 
     */
    const confirmacionDialog = (e) => {
        console.log("Aqui hace el llamado al dialog", e);
        setShowModalConfirmacion(true);
        setValores(e)
    }

    /**
 * Registra el elemento
 */
    const handleRegistrar = () => {
        const { dsmotivorechazo } = valores;

        console.log(dsmotivorechazo);


        let motivoRechazos = {
            dsmotivorechazo: dsmotivorechazo,
            boactivo: true
        }


        registrarMotivoRechazos(motivoRechazos).then(response => {
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
            setMsjConfirmacion(`Ocurrió un error`);
        });;

    }


    const formik = useFormik({
        initialValues: {
            dsmotivorechazo: ''
        },
        validationSchema: Yup.object({
            dsmotivorechazo: Yup.string()
                .required(`${t('msg.moduloobligatorio')}`)
                .matches(/^[a-zA-Z0-9_.-\sñÑ]*$/, `${t('msg.nocarateresespeciales')}`)

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
                    id="dsmotivorechazo"
                    label={t('lbl.descmotivosrechazo')}
                    variant="outlined"
                    name="dsmotivorechazo"
                    fullWidth
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.dsmotivorechazo}
                    inputProps={{ maxLength: "50" }}
                />
                {formik.touched.dsmotivorechazo && formik.errors.dsmotivorechazo ? (
                    <FormHelperText error={formik.errors.dsmotivorechazo}>{formik.errors.dsmotivorechazo}</FormHelperText>
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