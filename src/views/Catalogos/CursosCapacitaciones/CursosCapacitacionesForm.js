import { Button, DialogContent, FormHelperText, Grid, TextField } from '@material-ui/core'
import React, { useContext, useState } from 'react';
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { ModalContext } from 'contexts/modalContex';
import { CursosCapacitacionesContext } from 'contexts/catalogos/CursosCapacitaciones/cursosCapacitacionesContext';

import { ModalConfirmacion } from 'commons/ModalConfirmacion';
import { ModalContextConfirmacion } from 'contexts/modalContextConfirmacion';
import { Mensaje } from 'components/Personalizados/Mensaje';
import { useTranslation } from 'react-i18next';
export const CursosCapacitacionesForm = () => {
    const { t } = useTranslation();
    const { registrar } = useContext(CursosCapacitacionesContext);
    const { setShowModal } = useContext(ModalContext);

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
        const { dscurso } = valores;

        console.log(dscurso);


        let cursoCapacitaciones = {
            dscurso,
            boactivo: true
        }



        registrar(cursoCapacitaciones).then(response => {
            setOpenSnackbar(true);

            setMsjConfirmacion(`${t('msg.registroguardadoexitosamente')}`);

            const timer = setTimeout(() => {

                setError(false);
                setShowModalConfirmacion(false);
                setShowModal(false);

            }, 1000);
            return () => clearTimeout(timer);
        })
            .catch(err => {
                setOpenSnackbar(true);
                setError(true);
                setMsjConfirmacion(`${t('msg.ocurrioerrorcalidarinfo')}`);
            });
    }


    const formik = useFormik({
        initialValues: {
            dscurso: ''
        },
        validationSchema: Yup.object({
            dscurso: Yup.string()
                .required(`${t('msg.obligatoriocurso')}`)

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
                    id="dscurso"
                    label={t('lbl.curso')}
                    variant="outlined"
                    name="dscurso"
                    fullWidth
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.dscurso}
                    inputProps={{ maxLength: 300 }}
                />
                {formik.touched.dscurso && formik.errors.dscurso ? (
                    <FormHelperText error={formik.errors.dscurso}>{formik.errors.dscurso}</FormHelperText>
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