import { Button, DialogContent, FormHelperText, Grid, TextField } from '@material-ui/core'
import React, { useContext } from 'react';

import { useFormik } from 'formik'
import * as Yup from 'yup'
import { TiposApoyosContext } from 'contexts/catalogos/tiposApoyosContext';
import { ModalContext } from 'contexts/modalContex';

export const TipoApoyoForm = () => {

    const { registrarTiposApoyos } = useContext(TiposApoyosContext);
    const { setShowModal } = useContext(ModalContext);


    const formik = useFormik({
        initialValues: {
            dstipoapoyo: ''
        },
        validationSchema: Yup.object({
            dstipoapoyo: Yup.string()
                .required('El modulo  es obligatorio')

        }),
        onSubmit: async valores => {

            const { dstipoapoyo } = valores

            console.log(dstipoapoyo);


            let tiposApoyo = {
                dstipoapoyo: dstipoapoyo,
                boactivo: true
            }
            registrarTiposApoyos(tiposApoyo);
            setShowModal(false);

        }
    })


    return (
        <form
            onSubmit={formik.handleSubmit}
        >
            <DialogContent>
                <TextField
                    id="dstipoapoyo"
                    label="Desc. tipo de apoyo"
                    variant="outlined"
                    name="dstipoapoyo"
                    fullWidth
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.dstipoapoyo}
                />
                {formik.touched.dstipoapoyo && formik.errors.dstipoapoyo ? (
                    <FormHelperText error={formik.errors.dstipoapoyo}>{formik.errors.dstipoapoyo}</FormHelperText>
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