import React, { useContext } from 'react';
import { Button, DialogContent, FormHelperText, Grid, TextField } from '@material-ui/core'
import { Formik } from 'formik';
import * as Yup from 'yup';
import { ModuloContext } from 'contexts/moduloContext';
import { ModalContextUpdate } from 'contexts/modalContexUpdate';


export const ModuloFormEdit = ({ moduloSeleccionado }) => {

    const { setShowModalUpdate } = useContext(ModalContextUpdate);
    const { actualizarModulo } = useContext(ModuloContext);


    // Schema de validación
    const schemaValidacion = Yup.object({
        dsmodulo: Yup.string()
            .required('El modulo  es obligatorio')
    });

    const actualizarInfoModulo = async valores => {
        actualizarModulo(valores);
        setShowModalUpdate(false);
    }


    return (

        <Formik
            enableReinitialize
            initialValues={moduloSeleccionado}
            validationSchema={schemaValidacion}
            onSubmit={(valores) => {
                actualizarInfoModulo(valores)
            }}
        >

            {props => {
                return (


                    <form
                        className="bg-white shadow-md px-8 pt-6 pb-8 mb-4"
                        onSubmit={props.handleSubmit}>

                        <DialogContent>
                            <TextField
                                id="dsmodulo"
                                label="Desc. modulo"
                                variant="outlined"
                                name="dsmodulo"
                                fullWidth
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                value={props.values.dsmodulo}
                            />
                            {props.touched.dsmodulo && props.errors.dsmodulo ? (
                                <FormHelperText error={props.errors.dsmodulo}>{props.errors.dsmodulo}</FormHelperText>
                            ) : null}
                        </DialogContent>

                        <DialogContent >
                            <Grid container justify="flex-end">
                                <Button variant="contained" color="primary" type='submit'>
                                Guardar
                                </Button>
                            </Grid>


                        </DialogContent>
                    </form>
                )
            }}
        </Formik>

    )

}