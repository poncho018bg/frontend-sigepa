import { Button, DialogContent, FormHelperText, Grid, TextField } from '@material-ui/core'
import React, { useContext, useState } from 'react';

import { useFormik } from 'formik'
import * as Yup from 'yup'
import { TiposBeneficiariosContext } from 'contexts/catalogos/tiposBeneficiariosContext';
import { ModalContext } from 'contexts/modalContex';

import { ModalConfirmacion } from 'commons/ModalConfirmacion';
import { ModalContextConfirmacion } from 'contexts/modalContextConfirmacion';
export const TipoBeneficiarioForm = () => {

    const { registrarTiposBeneficiarios } = useContext(TiposBeneficiariosContext);
    const { setShowModal } = useContext(ModalContext);
    //dialog confirmar
    const [valores, setValores] = useState();
    const { setShowModalConfirmacion } = useContext(ModalContextConfirmacion);


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
        registrarTiposBeneficiarios(tiposBeneficiario);
        setShowModalConfirmacion(false);
        setShowModal(false);
    }


    const formik = useFormik({
        initialValues: {
            dstipobeneficiario: ''
        },
        validationSchema: Yup.object({
            dstipobeneficiario: Yup.string()
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
                    id="dstipobeneficiario"
                    label="Desc. tipo de beneficiario"
                    variant="outlined"
                    name="dstipobeneficiario"
                    fullWidth
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.dstipobeneficiario}
                />
                {formik.touched.dstipobeneficiario && formik.errors.dstipobeneficiario ? (
                    <FormHelperText error={formik.errors.dstipobeneficiario}>{formik.errors.dstipobeneficiario}</FormHelperText>
                ) : null}
            </DialogContent>

            <DialogContent >
                <Grid container justify="flex-end">
                    <Button variant="contained" color="primary" type='submit'>
                    Guardar
                    </Button>
                </Grid>
            </DialogContent>
            <ModalConfirmacion
                handleRegistrar={handleRegistrar} evento="Registrar"
            />
        </form>

    )
}