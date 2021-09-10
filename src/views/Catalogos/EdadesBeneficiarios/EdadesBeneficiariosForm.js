import { Button, DialogContent, FormHelperText, Grid, TextField } from '@material-ui/core'
import React, { useContext } from 'react';

import { useFormik } from 'formik'
import * as Yup from 'yup'
import { EdadesBeneficiariosContext } from 'contexts/catalogos/edadesBeneficiariosContext';
import { ModalContext } from 'contexts/modalContex';

export const EdadesBeneficiariosForm = () => {

    const { registrarEdadesBeneficiarios } = useContext(EdadesBeneficiariosContext);
    const { setShowModal } = useContext(ModalContext);


    const formik = useFormik({
        initialValues: {
            dsedadbeneficiario: ''
        },
        validationSchema: Yup.object({
            dsedadbeneficiario: Yup.string()
                .required('El modulo  es obligatorio')

        }),
        onSubmit: async valores => {

            const { dsedadbeneficiario } = valores

            console.log(dsedadbeneficiario);


            let edadesBeneficiarios = {
                dsedadbeneficiario: dsedadbeneficiario,
                boactivo: true
            }
            registrarEdadesBeneficiarios(edadesBeneficiarios);
            setShowModal(false);

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
                        Enviar
                    </Button>
                </Grid>
            </DialogContent>
        </form>

    )
}