import { Button, DialogContent, FormHelperText, Grid, TextField } from '@material-ui/core'
import React, { useContext } from 'react';

import { useFormik } from 'formik'
import * as Yup from 'yup'
import { ActividadesContinuarContext } from 'contexts/catalogos/ActividadesContinuarContext';
import { ModalContext } from 'contexts/modalContex';

export const ContinuidadActividadesForm = () => {

    const { registrarActividadesContinuar } = useContext(ActividadesContinuarContext);
    const { setShowModal } = useContext(ModalContext);

    const formik = useFormik({
        initialValues: {
            dsactividadcontinuidad: ''
        },
        validationSchema: Yup.object({
            dsactividadcontinuidad: Yup.string()
                .required('La descripción de la actividad  es obligatorio')
        }),
        onSubmit: async valores => {
            const { dsactividadcontinuidad } = valores
            let actividadcontinuidad = {
                dsactividadcontinuidad: dsactividadcontinuidad,
                activo: true,
                apoyos:[],
                continuidadActividades:{}
            }
            registrarActividadesContinuar(actividadcontinuidad);
            setShowModal(false);
        }
    })

    return (
        <form
            onSubmit={formik.handleSubmit}
        >
            <DialogContent>
                <TextField
                    id="dsactividadcontinuidad"
                    label="Descripción actividad"
                    variant="outlined"
                    name="dsactividadcontinuidad"
                    fullWidth
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.dsactividadcontinuidad}
                />
                {formik.touched.dsactividadcontinuidad && formik.errors.dsactividadcontinuidad ? (
                    <FormHelperText error={formik.errors.dsactividadcontinuidad}>{formik.errors.dsactividadcontinuidad}</FormHelperText>
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