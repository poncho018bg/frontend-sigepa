import React, { useContext } from 'react';
import { Button, DialogContent, FormHelperText, Grid, TextField } from '@material-ui/core'
import { Formik } from 'formik';
import * as Yup from 'yup';
import { MotivoRechazosContext } from 'contexts/catalogos/motivoRechazosContext';
import { ModalContextUpdate } from 'contexts/modalContexUpdate';


export const MotivoRechazosEdit = ({ motivoRechazosSeleccionado }) => {

    const { setShowModalUpdate } = useContext(ModalContextUpdate);
    const { actualizarMotivoRechazos } = useContext(MotivoRechazosContext);


    // Schema de validación
    const schemaValidacion = Yup.object({
        dsmotivorechazo: Yup.string()
            .required('El motivo de rechazo  es obligatorio')
    });

    const actualizarInfoMotivoRechazos = async valores => {
        actualizarMotivoRechazos(valores);
        setShowModalUpdate(false);
    }


    return (

        <Formik
            enableReinitialize
            initialValues={motivoRechazosSeleccionado}
            validationSchema={schemaValidacion}
            onSubmit={(valores) => {
                actualizarInfoMotivoRechazos(valores)
            }}
        >

            {props => {
                return (


                    <form
                        className="bg-white shadow-md px-8 pt-6 pb-8 mb-4"
                        onSubmit={props.handleSubmit}>

                        <DialogContent>
                            <TextField
                                id="dsmotivorechazo"
                                label="Desc. Motivo de Rechazo"
                                variant="outlined"
                                name="dsmotivorechazo"
                                fullWidth
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                value={props.values.dsmotivorechazo}
                            />
                            {props.touched.dsmotivorechazo && props.errors.dsmotivorechazo ? (
                                <FormHelperText error={props.errors.dsmotivorechazo}>{props.errors.dsmotivorechazo}</FormHelperText>
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