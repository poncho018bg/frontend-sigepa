import { Button, DialogContent, FormHelperText, Grid, TextField } from '@material-ui/core'
import React, { useContext, useState } from 'react';

import { useFormik } from 'formik'
import * as Yup from 'yup'
import { NumeroApoyosContext } from 'contexts/catalogos/numeroApoyosContext';
import { ModalContext } from 'contexts/modalContex';

import { ModalConfirmacion } from 'commons/ModalConfirmacion';
import { ModalContextConfirmacion } from 'contexts/modalContextConfirmacion';

export const NumeroApoyosForm = () => {

    const { registrarNumeroApoyos } = useContext(NumeroApoyosContext);
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
        const { noapoyo } = valores;

        console.log(noapoyo);


        let numeroApoyos = {
            noapoyo: noapoyo,
            boactivo: true
        }
        registrarNumeroApoyos(numeroApoyos);
        setShowModalConfirmacion(false);
        setShowModal(false);
    }


    const formik = useFormik({
        initialValues: {
            noapoyo: ''
        },
        validationSchema: Yup.object({
            noapoyo: Yup.string()
                .required('El modulo  es obligatorio')

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
                    id="noapoyo"
                    label="No. Apoyos"
                    variant="outlined"
                    name="noapoyo"
                    fullWidth
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.noapoyo}
                />
                {formik.touched.noapoyo && formik.errors.noapoyo ? (
                    <FormHelperText error={formik.errors.noapoyo}>{formik.errors.noapoyo}</FormHelperText>
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