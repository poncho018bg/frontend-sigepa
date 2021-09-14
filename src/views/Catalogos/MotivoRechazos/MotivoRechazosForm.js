import { Button, DialogContent, FormHelperText, Grid, TextField } from '@material-ui/core'
import React, { useContext } from 'react';

import { useFormik } from 'formik'
import * as Yup from 'yup'
import { MotivoRechazosContext } from 'contexts/catalogos/motivoRechazosContext';
import { ModalContext } from 'contexts/modalContex';

export const MotivoRechazosForm = () => {

    const { registrarMotivoRechazos } = useContext(MotivoRechazosContext);
    const { setShowModal } = useContext(ModalContext);


    const formik = useFormik({
        initialValues: {
            dsmotivorechazo: ''
        },
        validationSchema: Yup.object({
            dsmotivorechazo: Yup.string()
                .required('El modulo  es obligatorio')
                .matches(/^[a-zA-Z0-9_.-\sñÑ]*$/,"No debe contener caracteres especiales")

        }),
        onSubmit: async valores => {

            const { dsmotivorechazo } = valores;

            console.log(dsmotivorechazo);


            let motivoRechazos = {
                dsmotivorechazo: dsmotivorechazo,
                boactivo: true
            }
            registrarMotivoRechazos(motivoRechazos);
            setShowModal(false);

        }
    })


    return (
        <form
            onSubmit={formik.handleSubmit}
        >
            <DialogContent>
                <TextField
                    id="dsmotivorechazo"
                    label="Descripción Motivo de Rechazo"
                    variant="outlined"
                    name="dsmotivorechazo"
                    fullWidth
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.dsmotivorechazo}
                    inputProps={{maxLength:"50"}}
                />
                {formik.touched.dsmotivorechazo && formik.errors.dsmotivorechazo ? (
                    <FormHelperText error={formik.errors.dsmotivorechazo}>{formik.errors.dsmotivorechazo}</FormHelperText>
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