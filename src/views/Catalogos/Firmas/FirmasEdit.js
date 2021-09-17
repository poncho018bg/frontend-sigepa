import React, { useEffect, useContext, useState } from 'react';
import { Button, DialogContent, FormHelperText, Grid, TextField, MenuItem } from '@material-ui/core'
import { Formik } from 'formik';
import * as Yup from 'yup';
import { FirmasContext } from 'contexts/catalogos/firmasContext';
import { ModalContextUpdate } from 'contexts/modalContexUpdate';

import { ModalConfirmacion } from 'commons/ModalConfirmacion';
import { ModalContextConfirmacion } from 'contexts/modalContextConfirmacion';


export const FirmasEdit = ({ firmasSeleccionado }) => {

    const { setShowModalUpdate } = useContext(ModalContextUpdate);
    const { actualizarFirmas, getProgramas, programaList } = useContext(FirmasContext);

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
     * Edita el elemento
     */
    const handleRegistrar = () => {
        actualizarFirmas(valores);
        setShowModalConfirmacion(false);
        setShowModalUpdate(false);
    }
    // Schema de validación
    const schemaValidacion = Yup.object({
        dsautoriza: Yup.string()
            .required('Es obligatorio poner la persona que autoriza'),
        idPrograma: Yup.string()
            .required('El programa de apoyo es obligatorio'),
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
                                id="idPrograma"
                                variant="outlined"
                                label="Programa de Apoyo"
                                select
                                fullWidth
                                name="idPrograma"
                                onChange={props.handleChange}
                                value={props.values.idPrograma}
                            >
                                <MenuItem value="0">
                                    <em>Ninguno</em>
                                </MenuItem>
                                {
                                    programaList.map(
                                        item => (
                                            <MenuItem
                                                key={item.id}
                                                value={item.id}>
                                                {item.dsprograma}
                                            </MenuItem>
                                        )
                                    )
                                }
                            </TextField>
                            {props.touched.idPrograma && props.errors.idPrograma ? (
                                <FormHelperText error={props.errors.idPrograma}>{props.errors.idPrograma}</FormHelperText>
                            ) : null}
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
                                    Editar
                                </Button>
                            </Grid>
                        </DialogContent>
                        <ModalConfirmacion
                            handleRegistrar={handleRegistrar} evento="Editar"
                        />
                    </form>
                )
            }}
        </Formik>

    )

}