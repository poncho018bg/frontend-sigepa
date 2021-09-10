import React, { useContext } from 'react';
import { Button, DialogContent, FormHelperText, Grid, TextField } from '@material-ui/core'
import { Formik } from 'formik';
import * as Yup from 'yup';
import { NumeroApoyosContext } from 'contexts/catalogos/numeroApoyosContext';
import { ModalContextUpdate } from 'contexts/modalContexUpdate';


export const NumeroApoyosEdit = ({ numeroApoyosSeleccionado }) => {

    const { setShowModalUpdate } = useContext(ModalContextUpdate);
    const { actualizarNumeroApoyos} = useContext(NumeroApoyosContext);


    // Schema de validación
    const schemaValidacion = Yup.object({
        noapoyo: Yup.string()
            .required('El no. de apoyo  es obligatorio')
    });

    const actualizarInfoNumeroApoyos= async valores => {
        actualizarNumeroApoyos(valores);
        setShowModalUpdate(false);
    }


    return (

        <Formik
            enableReinitialize
            initialValues={numeroApoyosSeleccionado}
            validationSchema={schemaValidacion}
            onSubmit={(valores) => {
                actualizarInfoNumeroApoyos(valores)
            }}
        >

            {props => {
                return (


                    <form
                        className="bg-white shadow-md px-8 pt-6 pb-8 mb-4"
                        onSubmit={props.handleSubmit}>

                        <DialogContent>
                            <TextField
                                id="noapoyo"
                                label="No. Apoyos"
                                variant="outlined"
                                name="noapoyo"
                                fullWidth
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                value={props.values.noapoyo}
                            />
                            {props.touched.noapoyo && props.errors.noapoyo ? (
                                <FormHelperText error={props.errors.noapoyo}>{props.errors.noapoyo}</FormHelperText>
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