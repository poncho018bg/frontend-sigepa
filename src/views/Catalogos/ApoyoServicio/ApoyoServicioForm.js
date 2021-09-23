import { Button, DialogContent, FormHelperText, Grid, TextField } from '@material-ui/core'
import React, { useContext, useState } from 'react';

import { useFormik } from 'formik'
import * as Yup from 'yup'

import { ModalContext } from 'contexts/modalContex';
import { ApoyoServicioContext } from 'contexts/catalogos/ApoyoServicioContext';

import { ModalConfirmacion } from 'commons/ModalConfirmacion';
import { ModalContextConfirmacion } from 'contexts/modalContextConfirmacion';

export const ApoyoServicioForm = () => {

    const { registrarApoyoSevicio } = useContext(ApoyoServicioContext);

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
        const { dsservicio } = valores

        let apoyoSevicio = {
            dsservicio: dsservicio,
            activo: true,
            crcProgramastipoapoyos: []
        }
        registrarApoyoSevicio(apoyoSevicio);
        setShowModalConfirmacion(false);
        setShowModal(false);
    }

    const formik = useFormik({
        initialValues: {
            dsservicio: ''
        },
        validationSchema: Yup.object({
            dsservicio: Yup.string()
                .required('La descripción del apoyo servicio es obligatorio')
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
                    Guardar
                    </Button>
                </Grid>
            </DialogContent>
            <ModalConfirmacion
                handleRegistrar={handleRegistrar} evento="Registrar"
            />
        </form>

    )
}
