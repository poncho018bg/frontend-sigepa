import React, { useEffect, useContext, useState } from 'react';
import { Button, DialogContent, FormHelperText, Grid, TextField, MenuItem } from '@material-ui/core'
import { Formik } from 'formik';
import * as Yup from 'yup';
import { FirmasContext } from 'contexts/catalogos/firmasContext';
import { ModalContextUpdate } from 'contexts/modalContexUpdate';

import { ModalConfirmacion } from 'commons/ModalConfirmacion';
import { ModalContextConfirmacion } from 'contexts/modalContextConfirmacion';
import { Mensaje } from 'components/Personalizados/Mensaje';


export const FirmasEdit = ({ firmasSeleccionado }) => {

    const { setShowModalUpdate } = useContext(ModalContextUpdate);
    const { actualizarFirmas, getProgramas, programaList } = useContext(FirmasContext);

    //dialog confirmacion
    const [valores, setValores] = useState();
    const { setShowModalConfirmacion } = useContext(ModalContextConfirmacion);

    const [error, setError] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [msjConfirmacion, setMsjConfirmacion] = useState('');

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
     * Edita el elemento
     */
    const handleRegistrar = () => {
        actualizarFirmas(valores).then(response => {
            setOpenSnackbar(true);

            setMsjConfirmacion(`El registro ha sido actualizado exitosamente `);

            const timer = setTimeout(() => {

                setError(false);
                setShowModalConfirmacion(false);
                setShowModalUpdate(false);

            }, 2000);
            return () => clearTimeout(timer);
        })
            .catch(err => {
                setOpenSnackbar(true);
                setError(true);
                setMsjConfirmacion(`Ocurrio un error, ${err}`);

                setShowModalConfirmacion(false);
                setShowModalUpdate(false);
            });
    }
    // Schema de validación
    const schemaValidacion = Yup.object({
        dsautoriza: Yup.string()
            .required('Es obligatorio poner la persona que autoriza'),
        
        dspuesto: Yup.string()
            .required('Es obligatorio poner el puesto'),
    });

    useEffect(() => {
        getProgramas();
    }, []);

    const actualizarInfoFirmas = async valores => {
        confirmacionDialog(valores);
    }


    return (
        <Formik
            enableReinitialize
            initialValues={firmasSeleccionado}
            validationSchema={schemaValidacion}
            onSubmit={(valores) => {
                actualizarInfoFirmas(valores)
            }}
        >
            {props => {
                return (
                    <form
                        className="bg-white shadow-md px-8 pt-6 pb-8 mb-4"
                        onSubmit={props.handleSubmit}>
                        <DialogContent>
                            <TextField
                                id="dsautoriza"
                                label="Nombre del funcionario que autoriza"
                                variant="outlined"
                                name="dsautoriza"
                                fullWidth
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                value={props.values.dsautoriza}
                            />
                            {props.touched.dsautoriza && props.errors.dsautoriza ? (
                                <FormHelperText error={props.errors.dsautoriza}>{props.errors.dsautoriza}</FormHelperText>
                            ) : null}
                        </DialogContent>
                        <DialogContent>
                            <TextField
                                id="dspuesto"
                                label="Puesto"
                                variant="outlined"
                                name="dspuesto"
                                fullWidth
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                value={props.values.dspuesto}
                            />
                            {props.touched.dspuesto && props.errors.dspuesto ? (
                                <FormHelperText error={props.errors.dspuesto}>{props.errors.dspuesto}</FormHelperText>
                            ) : null}
                        </DialogContent>
                        

                        <DialogContent>



                            <TextField
                                id="dscomentario"
                                label="Comentarios (opcional)"
                                variant="outlined"
                                name="dscomentario"
                                fullWidth
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                value={props.values.dscomentario}
                            />
                            {props.touched.dscomentario && props.errors.dscomentario ? (
                                <FormHelperText error={props.errors.dscomentario}>{props.errors.dscomentario}</FormHelperText>
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
                            handleRegistrar={handleRegistrar} evento="Editar"
                        />
                        <Mensaje
                            setOpen={setOpenSnackbar}
                            open={openSnackbar}
                            severity={error ? "error" : "success"}
                            message={msjConfirmacion}
                        />
                    </form>
                )
            }}
        </Formik>

    )

}