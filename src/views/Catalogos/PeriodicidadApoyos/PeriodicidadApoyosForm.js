import { Button, DialogContent, FormHelperText, Grid, TextField } from '@material-ui/core'
import React, { useContext, useState } from 'react';

import { useFormik } from 'formik'
import * as Yup from 'yup'
import { PeriodicidadApoyosContext } from 'contexts/catalogos/periodicidadApoyosContext';
import { ModalContext } from 'contexts/modalContex';

import { ModalConfirmacion } from 'commons/ModalConfirmacion';
import { ModalContextConfirmacion } from 'contexts/modalContextConfirmacion';

export const PeriodicidadApoyosForm = () => {

    const { registrarPeriodicidadApoyos } = useContext(PeriodicidadApoyosContext);
    const { setShowModal } = useContext(ModalContext);

    //dialog confirmar
    const [valores, setValores] = useState();
    const { setShowModalConfirmacion } = useContext(ModalContextConfirmacion);


    const confirmacionDialog = (e) => {
        console.log("Aqui hace el llamado al dialog", e);
        setShowModalConfirmacion(true);
        setValores(e)
    }

    const handleRegistrar = () => {
        const { dsperiodicidad } = valores;

        console.log(dsperiodicidad);


        let periodicidadApoyos = {
            dsperiodicidad: dsperiodicidad,
            boactivo: true
        }
        registrarPeriodicidadApoyos(periodicidadApoyos);
        setShowModalConfirmacion(false);
        setShowModal(false);
    }


    const formik = useFormik({
        initialValues: {
            dsperiodicidad: ''
        },
        validationSchema: Yup.object({
            dsperiodicidad: Yup.string()
                .required('La periodicidad es obligatoria')

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