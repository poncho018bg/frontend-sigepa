import { Button, DialogContent, FormHelperText, Grid, TextField } from '@material-ui/core'
import React, { useContext, useState } from 'react';

import { useFormik } from 'formik'
import * as Yup from 'yup'

import { ModalContext } from 'contexts/modalContex';
import { EstadosContext } from 'contexts/catalogos/EstadosContext';

import { ModalConfirmacion } from 'commons/ModalConfirmacion';
import { ModalContextConfirmacion } from 'contexts/modalContextConfirmacion';

export const EstadosForm = () => {

    const { registrarEstados } = useContext(EstadosContext);
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
        const { noestado, dsestado } = valores
        let estado = {
            noestado: noestado,
            dsestado: dsestado,
            activo: true
        }
        registrarEstados(estado);
        setShowModalConfirmacion(false);
        setShowModal(false);
    }


    const formik = useFormik({
        initialValues: {
            noestado: '',
            dsestado: ''
        },
        validationSchema: Yup.object({
            noestado: Yup.string()
                .required('El num. de estado  es obligatorio'),
            dsestado: Yup.string()
                .required('La desc. del estado es obligatorio')
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
                    id="noestado"
                    label="Num. estado"
                    variant="outlined"
                    name="noestado"
                    fullWidth
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.noestado}
                />
                {formik.touched.noestado && formik.errors.noestado ? (
                    <FormHelperText error={formik.errors.noestado}>{formik.errors.noestado}</FormHelperText>
                ) : null}
            </DialogContent>
            <DialogContent>

                <TextField
                    id="dsestado"
                    label="Desc. estado"
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
