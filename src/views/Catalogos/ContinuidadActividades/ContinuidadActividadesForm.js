import { Button, DialogContent, FormHelperText, Grid, TextField } from '@material-ui/core'
import React, { useContext, useState } from 'react';

import { useFormik } from 'formik'
import * as Yup from 'yup'
import { ActividadesContinuarContext } from 'contexts/catalogos/ActividadesContinuarContext';
import { ModalContext } from 'contexts/modalContex';

import { ModalConfirmacion } from 'commons/ModalConfirmacion';
import { ModalContextConfirmacion } from 'contexts/modalContextConfirmacion';
import { Mensaje } from 'components/Personalizados/Mensaje';

export const ContinuidadActividadesForm = () => {

    const { registrarActividadesContinuar } = useContext(ActividadesContinuarContext);
    const { setShowModal } = useContext(ModalContext);
    const [valores, setValores] = useState();


    const { setShowModalConfirmacion } = useContext(ModalContextConfirmacion);

    const [error, setError] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [msjConfirmacion, setMsjConfirmacion] = useState('');

    const confirmacionDialog = (e) => {
        console.log("Aqui hace el llamado al dialog", e);
        setShowModalConfirmacion(true);
        setValores(e)
    }

    const handleRegistrar = () => {
        console.log("aqui hace el registro no deshabilita nada");
        const { dsactividadcontinuidad } = valores
        let actividadcontinuidad = {
            dsactividadcontinuidad: dsactividadcontinuidad,
            activo: true,
            apoyos: [],
            continuidadActividades: {}
        }
        registrarActividadesContinuar(actividadcontinuidad).then(response => {
            setOpenSnackbar(true);
             
            setMsjConfirmacion(`El registro ha sido guardado exitosamente `  );
           
           const timer = setTimeout(() => {
        
            setError(false);
            setShowModalConfirmacion(false);
            setShowModal(false);
        
            }, 1500);
            return () => clearTimeout(timer);
        })
        .catch(err => {   
            setOpenSnackbar(true);
            setError(true);
            setMsjConfirmacion(`Ocurrio un error, ${err}`  );
        });
    }

    const formik = useFormik({
        initialValues: {
            dsactividadcontinuidad: ''
        },
        validationSchema: Yup.object({
            dsactividadcontinuidad: Yup.string()
                .required('La descripción de la actividad  es obligatorio')
                .matches(/^[a-zA-Z0-9_.-\sñÑ]*$/, "No debe contener caracteres especiales")
        }),
        onSubmit: async valores => {
            confirmacionDialog(valores);
        },

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
                    inputProps={{ maxLength: "50" }}
                />
                {formik.touched.dsactividadcontinuidad && formik.errors.dsactividadcontinuidad ? (
                    <FormHelperText error={formik.errors.dsactividadcontinuidad}>{formik.errors.dsactividadcontinuidad}</FormHelperText>
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
            <Mensaje
                setOpen={setOpenSnackbar}
                open={openSnackbar}
                severity={error?"error":"success"}
                message={msjConfirmacion}
            />
        </form>

    )
}