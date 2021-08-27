import React, { useContext } from 'react';
import { Button, Dialog, DialogContent, FormHelperText, Grid, TextField } from '@material-ui/core'
import { Formik } from 'formik';
import * as Yup from 'yup';
import { ComiteSecretariasContext } from 'contexts/catalogos/comiteSecretariasContext';
import { ModalContextUpdate } from 'contexts/modalContexUpdate';


export const ComiteSecretariasEdit = ({ comiteSecretariasSeleccionado }) => {

    const { setShowModalUpdate } = useContext(ModalContextUpdate);
    //const { actualizarModulo } = useContext(ModuloContext);
    const { actualizarComiteSecretarias } = useContext(ComiteSecretariasContext);


    // Schema de validación
    const schemaValidacion = Yup.object({
        dssecretaria: Yup.string()
            .required('El modulo  es obligatorio')
    });

    const actualizarInfoComiteSecretarias = async valores => {
        actualizarComiteSecretarias(valores);
        setShowModalUpdate(false);
    }


    return (

        <Formik
            enableReinitialize
            initialValues={comiteSecretariasSeleccionado}
            validationSchema={schemaValidacion}
            onSubmit={(valores) => {
                actualizarInfoComiteSecretarias(valores)
            }}
        >

            {props => {
                return (


                    <form
                        className="bg-white shadow-md px-8 pt-6 pb-8 mb-4"
                        onSubmit={props.handleSubmit}>

                        <DialogContent>
                            <TextField
                                id="dssecretaria"
                                label="Desc. comites de secretaría"
                                variant="outlined"
                                name="dssecretaria"
                                fullWidth
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                value={props.values.dssecretaria}
                            />
                            {props.touched.dssecretaria && props.errors.dssecretaria ? (
                                <FormHelperText error={props.errors.dssecretaria}>{props.errors.dssecretaria}</FormHelperText>
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