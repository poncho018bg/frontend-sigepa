import React, { useContext } from 'react';
import { Button,  DialogContent, FormHelperText, Grid, TextField } from '@material-ui/core'
import { Formik } from 'formik';
import * as Yup from 'yup';

import { ModalContextUpdate } from 'contexts/modalContexUpdate';
import { ApoyoServicioContext } from 'contexts/catalogos/ApoyoServicioContext';

export const ApoyoServicioFormEdit = ({ ApoyoServicioSeleccionada }) => {


    const { setShowModalUpdate } = useContext(ModalContextUpdate);


    const { actualizarApoyoServicio } = useContext(ApoyoServicioContext);

    // Schema de validación
    const schemaValidacion = Yup.object({
        dsservicio: Yup.string()
            .required('La descripción del apoyo servicio  es obligatorio')
    });

    const actualizarInfoApoyoServicio = async valores => {
        actualizarApoyoServicio(valores);
        setShowModalUpdate(false);
    }

    return (

        <Formik
            enableReinitialize
            initialValues={ApoyoServicioSeleccionada}
            validationSchema={schemaValidacion}
            onSubmit={(valores) => {
                actualizarInfoApoyoServicio(valores)
            }}
        >

            {props => {
                return (


                    <form
                        className="bg-white shadow-md px-8 pt-6 pb-8 mb-4"
                        onSubmit={props.handleSubmit}>

                        <DialogContent>
                            <TextField
                                id="dsservicio"
                                label="Desc. Apoyo servicio"
                                variant="outlined"
                                name="dsservicio"
                                fullWidth
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                value={props.values.dsservicio}
                            />
                            {props.touched.dsservicio && props.errors.dsservicio ? (
                                <FormHelperText error={props.errors.dsservicio}>{props.errors.dsservicio}</FormHelperText>
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
