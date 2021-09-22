import { Button, DialogContent, FormHelperText, Grid, TextField } from '@material-ui/core'
import React, { useContext } from 'react';

import { useFormik } from 'formik'
import * as Yup from 'yup'
import { ModuloContext } from 'contexts/moduloContext';
import { ModalContext } from 'contexts/modalContex';
import UserService from "../../servicios/UserService";

export const ModuloForm = () => {

    const { registrarModulos } = useContext(ModuloContext);
    const { setShowModal } = useContext(ModalContext);


    const formik = useFormik({
        initialValues: {
            dsmodulo: '',
            usuarioCreacionId: UserService.getIdUSuario()
        },
        validationSchema: Yup.object({
            dsmodulo: Yup.string()
                .required('El modulo  es obligatorio')

        }),
        onSubmit: async valores => {

            const { dsmodulo } = valores

            console.log(dsmodulo);


            let module = {
                dsmodulo: dsmodulo,
                usuarioCreacionId: `${ process.env.REACT_APP_API_URL}/usuario/${UserService.getIdUSuario()}`,
                boactivo: true,
                'SubModulos':[]
            }
            registrarModulos(module);
            setShowModal(false);

        }
    })


    return (
        <form
            onSubmit={formik.handleSubmit}
        >
            <DialogContent>
                <TextField
                    id="dsmodulo"
                    label="Desc. modulo"
                    variant="outlined"
                    name="dsmodulo"
                    fullWidth
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.dsmodulo}
                />
                {formik.touched.dsmodulo && formik.errors.dsmodulo ? (
                    <FormHelperText error={formik.errors.dsmodulo}>{formik.errors.dsmodulo}</FormHelperText>
                ) : null}
            </DialogContent>

            <DialogContent >
                <Grid container justify="flex-end">
                    <Button variant="contained" color="primary" type='submit'>
                    Guardar
                    </Button>
                </Grid>
            </DialogContent>
        </form>

    )
}