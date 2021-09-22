import { Button, DialogContent, FormHelperText, Grid, TextField } from '@material-ui/core'
import React, { useContext, useState } from 'react';

import { useFormik } from 'formik'
import * as Yup from 'yup'
import { MotivoRechazosContext } from 'contexts/catalogos/motivoRechazosContext';
import { ModalContext } from 'contexts/modalContex';

import { ModalConfirmacion } from 'commons/ModalConfirmacion';
import { ModalContextConfirmacion } from 'contexts/modalContextConfirmacion';

export const MotivoRechazosForm = () => {

    const { registrarMotivoRechazos } = useContext(MotivoRechazosContext);
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

    /**
 * Registra el elemento
 */
    const handleRegistrar = () => {
        const { dsmotivorechazo } = valores;

        console.log(dsmotivorechazo);


        let motivoRechazos = {
            dsmotivorechazo: dsmotivorechazo,
            boactivo: true
        }
        registrarMotivoRechazos(motivoRechazos);
        setShowModalConfirmacion(false);
        setShowModal(false);

    }


    const formik = useFormik({
        initialValues: {
            dsmotivorechazo: ''
        },
        validationSchema: Yup.object({
            dsmotivorechazo: Yup.string()
                .required('El modulo  es obligatorio')
                .matches(/^[a-zA-Z0-9_.-\sñÑ]*$/, "No debe contener caracteres especiales")

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
                    id="dsmotivorechazo"
                    label="Descripción Motivo de Rechazo"
                    variant="outlined"
                    name="dsmotivorechazo"
                    fullWidth
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.dsmotivorechazo}
                    inputProps={{ maxLength: "50" }}
                />
                {formik.touched.dsmotivorechazo && formik.errors.dsmotivorechazo ? (
                    <FormHelperText error={formik.errors.dsmotivorechazo}>{formik.errors.dsmotivorechazo}</FormHelperText>
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