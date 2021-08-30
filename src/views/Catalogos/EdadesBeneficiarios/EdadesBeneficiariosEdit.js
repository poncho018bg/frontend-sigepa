import React, { useContext } from 'react';
import { Button, Dialog, DialogContent, FormHelperText, Grid, TextField } from '@material-ui/core'
import { Formik } from 'formik';
import * as Yup from 'yup';
import { EdadesBeneficiariosContext } from 'contexts/catalogos/edadesBeneficiariosContext';
import { ModalContextUpdate } from 'contexts/modalContexUpdate';


export const EdadesBeneficiariosEdit = ({ edadesBeneficiariosSeleccionado }) => {

    const { setShowModalUpdate } = useContext(ModalContextUpdate);
    //const { actualizarModulo } = useContext(ModuloContext);
    const { actualizarEdadesBeneficiarios} = useContext(EdadesBeneficiariosContext);


    // Schema de validación
    const schemaValidacion = Yup.object({
        dsedadbeneficiario: Yup.string()
            .required('El modulo  es obligatorio')
    });

    const actualizarInfoEdadesBeneficiarios = async valores => {
        actualizarEdadesBeneficiarios(valores);
        setShowModalUpdate(false);
    }


    return (

        <Formik
            enableReinitialize
            initialValues={edadesBeneficiariosSeleccionado}
            validationSchema={schemaValidacion}
            onSubmit={(valores) => {
                actualizarInfoEdadesBeneficiarios(valores)
            }}
        >

            {props => {
                return (


                    <form
                        className="bg-white shadow-md px-8 pt-6 pb-8 mb-4"
                        onSubmit={props.handleSubmit}>

                        <DialogContent>
                            <TextField
                                id="dsedadbeneficiario"
                                label="Desc. comites de secretaría"
                                variant="outlined"
                                name="dsedadbeneficiario"
                                fullWidth
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                value={props.values.dsedadbeneficiario}
                            />
                            {props.touched.dsedadbeneficiario && props.errors.dsedadbeneficiario ? (
                                <FormHelperText error={props.errors.dsedadbeneficiario}>{props.errors.dsedadbeneficiario}</FormHelperText>
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