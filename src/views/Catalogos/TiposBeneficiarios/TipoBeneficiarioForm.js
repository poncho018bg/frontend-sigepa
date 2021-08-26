import { Button, Dialog, DialogContent, FormHelperText, Grid, TextField } from '@material-ui/core'
import React, { useContext } from 'react';

import { useFormik } from 'formik'
import * as Yup from 'yup'
import { TiposBeneficiariosContext } from 'contexts/catalogos/tiposBeneficiariosContext';
import { ModalContext } from 'contexts/modalContex';
import UserService from "../../../servicios/UserService";

export const TipoBeneficiarioForm = () => {

    const { registrarTiposBeneficiarios } = useContext(TiposBeneficiariosContext);
    const { setShowModal } = useContext(ModalContext);


    const formik = useFormik({
        initialValues: {
            dstipobeneficiario: ''
        },
        validationSchema: Yup.object({
            dstipobeneficiario: Yup.string()
                .required('El modulo  es obligatorio')

        }),
        onSubmit: async valores => {

            const { dstipobeneficiario } = valores

            console.log(dstipobeneficiario);


            let tiposBeneficiario = {
                dstipobeneficiario: dstipobeneficiario,
                boactivo: true
            }
            registrarTiposBeneficiarios(tiposBeneficiario);
            setShowModal(false);

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
                        Enviar
                    </Button>
                </Grid>
            </DialogContent>
        </form>

    )
}