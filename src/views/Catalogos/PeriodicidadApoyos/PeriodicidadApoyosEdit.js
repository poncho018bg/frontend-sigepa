import React, { useContext } from 'react';
import { Button, Dialog, DialogContent, FormHelperText, Grid, TextField } from '@material-ui/core'
import { Formik } from 'formik';
import * as Yup from 'yup';
import { PeriodicidadApoyosContext } from 'contexts/catalogos/periodicidadApoyosContext';
import { ModalContextUpdate } from 'contexts/modalContexUpdate';


export const PeriodicidadApoyosEdit = ({ periodicidadApoyosSeleccionado }) => {

    const { setShowModalUpdate } = useContext(ModalContextUpdate);
    //const { actualizarModulo } = useContext(ModuloContext);
    const { actualizarPeriodicidadApoyos} = useContext(PeriodicidadApoyosContext);


    // Schema de validación
    const schemaValidacion = Yup.object({
        dsperiodicidad: Yup.string()
            .required('La periodicidad es obligatoria'),
    });

    const actualizarInfoPeriodicidadApoyos= async valores => {
        actualizarPeriodicidadApoyos(valores);
        setShowModalUpdate(false);
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
                    </form>
                )
            }}
        </Formik>

    )

}