import { Button, DialogContent, FormHelperText, Grid, TextField } from '@material-ui/core'
import React, { useContext } from 'react';

import { useFormik } from 'formik'
import * as Yup from 'yup'
import { ClasificacionServiciosContext } from 'contexts/catalogos/clasificacionServiciosContext';
import { ModalContext } from 'contexts/modalContex';

export const ClasificacionServiciosForm = () => {

    const { registrarClasificacionServicios } = useContext(ClasificacionServiciosContext);
    const { setShowModal } = useContext(ModalContext);


    const formik = useFormik({
        initialValues: {
            dsclasificacionservicio: '',
            dsabreviatura: '',
        },
        validationSchema: Yup.object({
            dsclasificacionservicio: Yup.string()
                .required('La clasificacion es obligatoria'),
            dsabreviatura: Yup.string()
                .required('La abreviatura es obligatoria'),

        }),
        onSubmit: async valores => {

            const { dsclasificacionservicio, dsabreviatura } = valores

            console.log(dsclasificacionservicio, dsabreviatura);


            let clasificacionServicios = {
                dsclasificacionservicio: dsclasificacionservicio,
                dsabreviatura: dsabreviatura,
                boactivo: true,
                'crcApoyoServicios':[]
            }
            registrarClasificacionServicios(clasificacionServicios);
            setShowModal(false);

        }
    })


    return (
        <form
            onSubmit={formik.handleSubmit}
        >
            <DialogContent>
                <TextField
                    id="dsclasificacionservicio"
                    label="Clasificacion del servicio"
                    variant="outlined"
                    name="dsclasificacionservicio"
                    fullWidth
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.dsclasificacionservicio}
                />
                {formik.touched.dsclasificacionservicio && formik.errors.dsclasificacionservicio ? (
                    <FormHelperText error={formik.errors.dsclasificacionservicio}>{formik.errors.dsclasificacionservicio}</FormHelperText>
                ) : null}
                <TextField
                    id="dsabreviatura"
                    label="Abreviatura"
                    variant="outlined"
                    name="dsabreviatura"
                    fullWidth
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.dsabreviatura}
                />
                {formik.touched.dsabreviatura && formik.errors.dsabreviatura ? (
                    <FormHelperText error={formik.errors.dsabreviatura}>{formik.errors.dsabreviatura}</FormHelperText>
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