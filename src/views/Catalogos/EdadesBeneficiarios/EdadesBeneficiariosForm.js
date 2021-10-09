import { Button, DialogContent, FormHelperText, Grid, TextField } from '@material-ui/core'
import React, { useContext, useState } from 'react';

import { useFormik } from 'formik'
import * as Yup from 'yup'
import { EdadesBeneficiariosContext } from 'contexts/catalogos/edadesBeneficiariosContext';
import { ModalContext } from 'contexts/modalContex';

import { ModalConfirmacion } from 'commons/ModalConfirmacion';
import { ModalContextConfirmacion } from 'contexts/modalContextConfirmacion';
import { Mensaje } from 'components/Personalizados/Mensaje';
import { useTranslation } from 'react-i18next';
export const EdadesBeneficiariosForm = () => {
    const { t } = useTranslation();
    const { registrarEdadesBeneficiarios } = useContext(EdadesBeneficiariosContext);
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
        const { dsedadbeneficiario } = valores

        console.log(dsedadbeneficiario);


        let edadesBeneficiarios = {
            dsedadbeneficiario: dsedadbeneficiario,
            boactivo: true
        }
        registrarEdadesBeneficiarios(edadesBeneficiarios).then(response => {
            setOpenSnackbar(true);
             
            setMsjConfirmacion(`El registro ha sido guardado exitosamente `  );
           
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
            setMsjConfirmacion(`Ocurrio un error, ${err}`  );
        });
    }

    const formik = useFormik({
        initialValues: {
            dsedadbeneficiario: ''
        },
        validationSchema: Yup.object({
            dsedadbeneficiario: Yup.string()
                .required('El modulo  es obligatorio')

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
                    id="dsedadbeneficiario"
                    label="Desc. edad beneficiarios"
                    variant="outlined"
                    name="dsedadbeneficiario"
                    fullWidth
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.dsedadbeneficiario}
                />
                {formik.touched.dssecretaria && formik.errors.dsedadbeneficiario ? (
                    <FormHelperText error={formik.errors.dsedadbeneficiario}>{formik.errors.dsedadbeneficiario}</FormHelperText>
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