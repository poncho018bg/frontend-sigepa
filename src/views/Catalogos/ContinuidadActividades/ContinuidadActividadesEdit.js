import React, { useContext, useState } from 'react';
import { Button, DialogContent, FormHelperText, Grid, TextField } from '@material-ui/core'
import { Formik } from 'formik';
import * as Yup from 'yup';
import { ModalContextUpdate } from 'contexts/modalContexUpdate';
import { ActividadesContinuarContext } from 'contexts/catalogos/ActividadesContinuarContext';

import { ModalConfirmacion } from 'commons/ModalConfirmacion';
import { ModalContextConfirmacion } from 'contexts/modalContextConfirmacion';

export const ContinuidadActividadesEdit = ({ continuidadActividadesSeleccionada }) => {

    const { setShowModalUpdate } = useContext(ModalContextUpdate);
    const { actualizarActividadesContinuar } = useContext(ActividadesContinuarContext);

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
        actualizarActividadesContinuar(valores);
        setShowModalConfirmacion(false);
        setShowModalUpdate(false);
    }

    const schemaValidacion = Yup.object({
        dsactividadcontinuidad: Yup.string()
            .required('La descripción de la actividad  es obligatorio')
            .matches(/^[a-zA-Z0-9_.-\sñÑ]*$/, "No debe contener caracteres especiales")
    });

    const actualizarActividad = async valores => {
        confirmacionDialog(valores);
    }

    return (

        <Formik
            enableReinitialize
            initialValues={continuidadActividadesSeleccionada}
            validationSchema={schemaValidacion}
            onSubmit={(valores) => {
                actualizarActividad(valores)
            }}
        >

            {props => {
                return (


                    <form
                        className="bg-white shadow-md px-8 pt-6 pb-8 mb-4"
                        onSubmit={props.handleSubmit}>

                        <DialogContent>
                            <TextField
                                id="dsactividadcontinuidad"
                                label="Descripción actividad"
                                variant="outlined"
                                name="dsactividadcontinuidad"
                                fullWidth
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                value={props.values.dsactividadcontinuidad}
                                inputProps={{ maxLength: "50" }}
                            />
                            {props.touched.dsactividadcontinuidad && props.errors.dsactividadcontinuidad ? (
                                <FormHelperText error={props.errors.dsactividadcontinuidad}>{props.errors.dsactividadcontinuidad}</FormHelperText>
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
                    </form>
                )
            }}
        </Formik>

    )
}