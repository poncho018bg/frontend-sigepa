import React, { useContext } from 'react';
import { Button,  DialogContent, FormHelperText, Grid, TextField } from '@material-ui/core'
import { Formik } from 'formik';
import * as Yup from 'yup';
import { ModalContextUpdate } from 'contexts/modalContexUpdate';
import { CursosCapacitacionesContext } from 'contexts/catalogos/CursosCapacitaciones/cursosCapacitacionesContext';


export const CursosCapacitacionesEdit = ({ objetoActualizar }) => {
    const { setShowModalUpdate } = useContext(ModalContextUpdate);

    const { actualizar} = useContext(CursosCapacitacionesContext);


    // Schema de validación
    const schemaValidacion = Yup.object({
        dsestado: Yup.string()
            .required('El curso  es obligatorio')
    });

    const actualizarInfo= async valores => {
        actualizar(valores);
        setShowModalUpdate(false);
    }


    return (

        <Formik
            enableReinitialize
            initialValues={objetoActualizar}
            validationSchema={schemaValidacion}
            onSubmit={(valores) => {
                actualizarInfo(valores)
            }}
        >

            {props => {
                return (


                    <form
                        className="bg-white shadow-md px-8 pt-6 pb-8 mb-4"
                        onSubmit={props.handleSubmit}>

                        <DialogContent>
                            <TextField
                                id="dsestado"
                                label="Curso"
                                variant="outlined"
                                name="dsestado"
                                fullWidth
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                value={props.values.dsestado}
                            />
                            {props.touched.dsestado && props.errors.dsestado ? (
                                <FormHelperText error={props.errors.dsestado}>{props.errors.dsestado}</FormHelperText>
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