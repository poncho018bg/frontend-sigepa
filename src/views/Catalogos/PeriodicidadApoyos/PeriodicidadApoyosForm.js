import { Button, Dialog, DialogContent, FormHelperText, Grid, TextField } from '@material-ui/core'
import React, { useContext } from 'react';

import { useFormik } from 'formik'
import * as Yup from 'yup'
import { PeriodicidadApoyosContext } from 'contexts/catalogos/periodicidadApoyosContext';
import { ModalContext } from 'contexts/modalContex';
import UserService from "../../../servicios/UserService";

export const PeriodicidadApoyosForm = () => {

    const { registrarPeriodicidadApoyos} = useContext(PeriodicidadApoyosContext);
    const { setShowModal } = useContext(ModalContext);


    const formik = useFormik({
        initialValues: {
            dsperiodicidad: ''
        },
        validationSchema: Yup.object({
            dsperiodicidad: Yup.string()
                .required('La periodicidad es obligatoria')

        }),
        onSubmit: async valores => {

            const { dsperiodicidad } = valores;

            console.log(dsperiodicidad);


            let periodicidadApoyos = {
                dsperiodicidad: dsperiodicidad,
                boactivo: true
            }
            registrarPeriodicidadApoyos(periodicidadApoyos);
            setShowModal(false);

        }
    })


    return (
        <form
            onSubmit={formik.handleSubmit}
        >
            <DialogContent>
                <TextField
                    id="dsperiodicidad"
                    label="Desc. Periodicidad"
                    variant="outlined"
                    name="dsperiodicidad"
                    fullWidth
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.dsperiodicidad}
                />
                {formik.touched.dsperiodicidad && formik.errors.dsperiodicidad ? (
                    <FormHelperText error={formik.errors.dsperiodicidad}>{formik.errors.dsperiodicidad}</FormHelperText>
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