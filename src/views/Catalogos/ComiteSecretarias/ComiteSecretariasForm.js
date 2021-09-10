import { Button, DialogContent, FormHelperText, Grid, TextField } from '@material-ui/core'
import React, { useContext } from 'react';

import { useFormik } from 'formik'
import * as Yup from 'yup'
import { ComiteSecretariasContext } from 'contexts/catalogos/comiteSecretariasContext';
import { ModalContext } from 'contexts/modalContex';

export const ComiteSecretariasForm = () => {

    const { registrarComiteSecretarias } = useContext(ComiteSecretariasContext);
    const { setShowModal } = useContext(ModalContext);


    const formik = useFormik({
        initialValues: {
            dssecretaria: ''
        },
        validationSchema: Yup.object({
            dssecretaria: Yup.string()
                .required('El modulo  es obligatorio')

        }),
        onSubmit: async valores => {

            const { dssecretaria } = valores

            console.log(dssecretaria);


            let comitesSecretaria = {
                dssecretaria: dssecretaria,
                boactivo: true
            }
            registrarComiteSecretarias(comitesSecretaria);
            setShowModal(false);

        }
    })


    return (
        <form
            onSubmit={formik.handleSubmit}
        >
            <DialogContent>
                <TextField
                    id="dssecretaria"
                    label="Desc. comites de secretaría"
                    variant="outlined"
                    name="dssecretaria"
                    fullWidth
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.dssecretaria}
                />
                {formik.touched.dssecretaria && formik.errors.dssecretaria ? (
                    <FormHelperText error={formik.errors.dssecretaria}>{formik.errors.dssecretaria}</FormHelperText>
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