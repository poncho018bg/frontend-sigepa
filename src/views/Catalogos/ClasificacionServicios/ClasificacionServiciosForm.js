import { Button, DialogContent, FormHelperText, Grid, TextField } from '@material-ui/core'
import React, { useContext, useState } from 'react';

import { useFormik } from 'formik'
import * as Yup from 'yup'
import { ClasificacionServiciosContext } from 'contexts/catalogos/clasificacionServiciosContext';
import { ModalContext } from 'contexts/modalContex';

import { ModalConfirmacion } from 'commons/ModalConfirmacion';
import { ModalContextConfirmacion } from 'contexts/modalContextConfirmacion';

export const ClasificacionServiciosForm = () => {

    const { registrarClasificacionServicios } = useContext(ClasificacionServiciosContext);
    const { setShowModal } = useContext(ModalContext);

    //dialog confirmacion
    const [valores, setValores] = useState();
    const { setShowModalConfirmacion } = useContext(ModalContextConfirmacion);
    /**
     * abre el dialogo de confirmación
     * @param {valores} e 
     */
    const confirmacionDialog = (e) => {
        console.log("Aqui hace el llamado al dialog", e);
        setShowModalConfirmacion(true);
        setValores(e)
    }

    const handleRegistrar = () => {
        const { dsclasificacionservicio, dsabreviatura } = valores

        console.log(dsclasificacionservicio, dsabreviatura);


        let clasificacionServicios = {
            dsclasificacionservicio: dsclasificacionservicio,
            dsabreviatura: dsabreviatura,
            boactivo: true,
            'crcApoyoServicios': []
        }
        registrarClasificacionServicios(clasificacionServicios);
        setShowModalConfirmacion(false);
        setShowModal(false);

    }


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
            confirmacionDialog(valores);
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
            <ModalConfirmacion
                handleRegistrar={handleRegistrar} evento="Registrar"
            />
        </form>

    )
}