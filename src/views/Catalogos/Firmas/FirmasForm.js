import { Button, DialogContent, FormHelperText, Grid, TextField, MenuItem } from '@material-ui/core';
import React, { useEffect, useContext, useState } from 'react';

import { useFormik } from 'formik'
import * as Yup from 'yup'
import { FirmasContext } from 'contexts/catalogos/firmasContext';
import { ModalContext } from 'contexts/modalContex';

import { ModalConfirmacion } from 'commons/ModalConfirmacion';
import { ModalContextConfirmacion } from 'contexts/modalContextConfirmacion';
import { Mensaje } from 'components/Personalizados/Mensaje';


export const FirmasForm = () => {

    const { registrarFirmas, getProgramas, programaList } = useContext(FirmasContext);
    const { setShowModal } = useContext(ModalContext);


    //dialog confirmar
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
        const { idPrograma, dsautoriza, dspuesto, dscomentario } = valores
        console.log("datos ---> ", idPrograma, dsautoriza, dspuesto, dscomentario);
        let Firmas = {
            dsautoriza: dsautoriza,
            dspuesto: dspuesto,
            dscomentario: dscomentario,
            programas: `${process.env.REACT_APP_API_URL}programas/${idPrograma}`,
            boactivo: true
        }
        registrarFirmas(Firmas).then(response => {
            setOpenSnackbar(true);

            setMsjConfirmacion(`El registro ha sido guardado exitosamente `);

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
                setMsjConfirmacion(`Ocurrio un error, ${err}`);
            });
    }


    useEffect(() => {
        getProgramas();
    }, []);

    const formik = useFormik({
        initialValues: {
            dscomentario: '',
            dsautoriza: '',
            dspuesto: '',
        },
        validationSchema: Yup.object({
            dsautoriza: Yup.string()
                .required('Es obligatorio poner la persona que autoriza'),
            dspuesto: Yup.string()
                .required('Es obligatorio poner el puesto'),

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
                    id="dsautoriza"
                    label="Nombre del funcionario que autoriza"
                    variant="outlined"
                    name="dsautoriza"
                    fullWidth
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.dsautoriza}
                />
                {formik.touched.dsautoriza && formik.errors.dsautoriza ? (
                    <FormHelperText error={formik.errors.dsautoriza}>{formik.errors.dsautoriza}</FormHelperText>
                ) : null}
            </DialogContent>
            <DialogContent>
                <TextField
                    id="dspuesto"
                    label="Puesto"
                    variant="outlined"
                    name="dspuesto"
                    fullWidth
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.dspuesto}
                />
                {formik.touched.dspuesto && formik.errors.dspuesto ? (
                    <FormHelperText error={formik.errors.dspuesto}>{formik.errors.dspuesto}</FormHelperText>
                ) : null}
            </DialogContent>
            <DialogContent>

                <TextField
                    id="dscomentario"
                    label="Comentarios (opcional)"
                    variant="outlined"
                    name="dscomentario"
                    fullWidth
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.dscomentario}
                />
                {formik.touched.dscomentario && formik.errors.dscomentario ? (
                    <FormHelperText error={formik.errors.dscomentario}>{formik.errors.dscomentario}</FormHelperText>
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
                severity={error ? "error" : "success"}
                message={msjConfirmacion}
            />
        </form>

    )
}