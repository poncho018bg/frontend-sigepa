import React, { useContext, useState } from 'react';
import { Button, DialogContent, FormHelperText, Grid, TextField } from '@material-ui/core'
import { Formik } from 'formik';
import * as Yup from 'yup';
import { PeriodicidadApoyosContext } from 'contexts/catalogos/periodicidadApoyosContext';
import { ModalContextUpdate } from 'contexts/modalContexUpdate';

import { ModalConfirmacion } from 'commons/ModalConfirmacion';
import { ModalContextConfirmacion } from 'contexts/modalContextConfirmacion';


export const PeriodicidadApoyosEdit = ({ periodicidadApoyosSeleccionado }) => {

    const { setShowModalUpdate } = useContext(ModalContextUpdate);
    const { actualizarPeriodicidadApoyos } = useContext(PeriodicidadApoyosContext);

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
        actualizarPeriodicidadApoyos(valores);
        setShowModalConfirmacion(false);
        setShowModalUpdate(false);
    }


    // Schema de validación
    const schemaValidacion = Yup.object({
        dsperiodicidad: Yup.string()
            .required('La periodicidad es obligatoria'),
    });

    const actualizarInfoPeriodicidadApoyos = async valores => {
        confirmacionDialog(valores);
    }


    return (

        <Formik
            enableReinitialize
            initialValues={periodicidadApoyosSeleccionado}
            validationSchema={schemaValidacion}
            onSubmit={(valores) => {
                actualizarInfoPeriodicidadApoyos(valores)
            }}
        >

            {props => {
                return (


                    <form
                        className="bg-white shadow-md px-8 pt-6 pb-8 mb-4"
                        onSubmit={props.handleSubmit}>

                        <DialogContent>
                            <TextField
                                id="dsperiodicidad"
                                label="Desc. Periodicidad"
                                variant="outlined"
                                name="dsperiodicidad"
                                fullWidth
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                value={props.values.dsperiodicidad}
                            />
                            {props.touched.dsperiodicidad && props.errors.dsperiodicidad ? (
                                <FormHelperText error={props.errors.dsperiodicidad}>{props.errors.dsperiodicidad}</FormHelperText>
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