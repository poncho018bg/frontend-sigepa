import React, { useContext } from 'react';
import { Button, DialogContent, FormHelperText, Grid, TextField } from '@material-ui/core'
import { Formik } from 'formik';
import * as Yup from 'yup';
import { TiposBeneficiariosContext } from 'contexts/catalogos/tiposBeneficiariosContext';
import { ModalContextUpdate } from 'contexts/modalContexUpdate';


export const TipoBeneficiarioEdit = ({ tipoBeneficiarioSeleccionado }) => {

    const { setShowModalUpdate } = useContext(ModalContextUpdate);
    const { actualizarTiposBeneficiarios } = useContext(TiposBeneficiariosContext);


    // Schema de validación
    const schemaValidacion = Yup.object({
        dstipobeneficiario: Yup.string()
            .required('El modulo  es obligatorio')
    });

    const actualizarInfoTipoBeneficiario = async valores => {
        actualizarTiposBeneficiarios(valores);
        setShowModalUpdate(false);
    }


    return (

        <Formik
            enableReinitialize
            initialValues={tipoBeneficiarioSeleccionado}
            validationSchema={schemaValidacion}
            onSubmit={(valores) => {
                actualizarInfoTipoBeneficiario(valores)
            }}
        >

            {props => {
                return (


                    <form
                        className="bg-white shadow-md px-8 pt-6 pb-8 mb-4"
                        onSubmit={props.handleSubmit}>

                        <DialogContent>
                            <TextField
                                id="dstipobeneficiario"
                                label="Desc. Tipo de Beneficiario"
                                variant="outlined"
                                name="dstipobeneficiario"
                                fullWidth
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                value={props.values.dstipobeneficiario}
                            />
                            {props.touched.dstipobeneficiario && props.errors.dstipobeneficiario ? (
                                <FormHelperText error={props.errors.dstipobeneficiario}>{props.errors.dstipobeneficiario}</FormHelperText>
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