import { Button, Dialog, DialogContent, FormHelperText, Grid, TextField } from '@material-ui/core'
import React, { useContext } from 'react';

import { useFormik } from 'formik'
import * as Yup from 'yup'

import { ModalContext } from 'contexts/modalContex';
import { ApoyoServicioContext } from 'contexts/catalogos/ApoyoServicioContext';

export const ApoyoServicioForm = () => {

    const { registrarApoyoSevicio } = useContext(ApoyoServicioContext);

    const { setShowModal } = useContext(ModalContext);


    const formik = useFormik({
        initialValues: {
            dsservicio: ''
        },
        validationSchema: Yup.object({
            dsservicio: Yup.string()
                .required('La descripción del apoyo servicio es obligatorio')
        }),
        onSubmit: async valores => {

            const { dsservicio } = valores

            let apoyoSevicio = {
                dsservicio: dsservicio,
                activo: true,
                crcProgramastipoapoyos:[]
            }
            registrarApoyoSevicio(apoyoSevicio);
            setShowModal(false);

        }
    })


    return (
        <form
            onSubmit={formik.handleSubmit}
        >
            <DialogContent>
                <TextField
                    id="dsservicio"
                    label="Desc. Apoyo servicio"
                    variant="outlined"
                    name="dsservicio"
                    fullWidth
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.dsservicio}
                />
                {formik.touched.dsservicio && formik.errors.dsservicio ? (
                    <FormHelperText error={formik.errors.dsservicio}>{formik.errors.dsservicio}</FormHelperText>
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
