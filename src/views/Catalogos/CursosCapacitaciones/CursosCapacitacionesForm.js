import { Button, Dialog, DialogContent, FormHelperText, Grid, TextField } from '@material-ui/core'
import React, { useContext } from 'react';

import { useFormik } from 'formik'
import * as Yup from 'yup'
import { MotivoRechazosContext } from 'contexts/catalogos/motivoRechazosContext';
import { ModalContext } from 'contexts/modalContex';
import UserService from "../../../servicios/UserService";
import { CursosCapacitacionesContext } from 'contexts/catalogos/CursosCapacitaciones/cursosCapacitacionesContext';

export const CursosCapacitacionesForm = () => {

    const { registrar} = useContext(CursosCapacitacionesContext);
    const { setShowModal } = useContext(ModalContext);


    const formik = useFormik({
        initialValues: {
            dsestado: ''
        },
        validationSchema: Yup.object({
            dsestado: Yup.string()
                .required('El curso  es obligatorio')

        }),
        onSubmit: async valores => {

            const { dsestado } = valores;

            console.log(dsestado);


            let cursoCapacitaciones = {
                 dsestado,
                boactivo: true
            }
            registrar(cursoCapacitaciones);
            setShowModal(false);

        }
    })


    return (
        <form
            onSubmit={formik.handleSubmit}
        >
            <DialogContent>
                <TextField
                    id="dsestado"
                    label="Curso"
                    variant="outlined"
                    name="dsestado"
                    fullWidth
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.dsestado}
                />
                {formik.touched.dsestado && formik.errors.dsestado ? (
                    <FormHelperText error={formik.errors.dsestado}>{formik.errors.dsestado}</FormHelperText>
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