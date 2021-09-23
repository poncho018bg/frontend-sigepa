import React, { useContext,useState } from 'react';
import { Button, DialogContent, FormHelperText, Grid, TextField } from '@material-ui/core'
import { Formik } from 'formik';
import * as Yup from 'yup';
import { ClasificacionServiciosContext } from 'contexts/catalogos/clasificacionServiciosContext';
import { ModalContextUpdate } from 'contexts/modalContexUpdate';

import { ModalConfirmacion } from 'commons/ModalConfirmacion';
import { ModalContextConfirmacion } from 'contexts/modalContextConfirmacion';


export const ClasificacionServiciosEdit = ({ clasificacionServiciosSeleccionado }) => {

    const { setShowModalUpdate } = useContext(ModalContextUpdate);
    const { actualizarClasificacionServicios } = useContext(ClasificacionServiciosContext);

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

    const handleRegistrar = () => {
        actualizarClasificacionServicios(valores);
        setShowModalConfirmacion(false);
        setShowModalUpdate(false);
    }


    // Schema de validación
    const schemaValidacion = Yup.object({
        dsclasificacionservicio: Yup.string()
            .required('La clasificacion es obligatoria'),
        dsabreviatura: Yup.string()
            .required('La abreviatura es obligatoria'),
    });

    const actualizarInfoClasificacionServicios = async valores => {
        confirmacionDialog(valores);
    }


    return (

        <Formik
            enableReinitialize
            initialValues={clasificacionServiciosSeleccionado}
            validationSchema={schemaValidacion}
            onSubmit={(valores) => {
                actualizarInfoClasificacionServicios(valores)
            }}
        >

            {props => {
                return (


                    <form
                        className="bg-white shadow-md px-8 pt-6 pb-8 mb-4"
                        onSubmit={props.handleSubmit}>

                        <DialogContent>
                            <TextField
                                id="dsclasificacionservicio"
                                label="Clasificacion del servicio"
                                variant="outlined"
                                name="dsclasificacionservicio"
                                fullWidth
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                value={props.values.dsclasificacionservicio}
                            />
                            {props.touched.dsclasificacionservicio && props.errors.dsclasificacionservicio ? (
                                <FormHelperText error={props.errors.dsclasificacionservicio}>{props.errors.dsclasificacionservicio}</FormHelperText>
                            ) : null}
                            <TextField
                                id="dsabreviatura"
                                label="Abreviatura"
                                variant="outlined"
                                name="dsabreviatura"
                                fullWidth
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                value={props.values.dsabreviatura}
                            />
                            {props.touched.dsabreviatura && props.errors.dsabreviatura ? (
                                <FormHelperText error={props.errors.dsabreviatura}>{props.errors.dsabreviatura}</FormHelperText>
                            ) : null}
                        </DialogContent>

                        <DialogContent >
                            <Grid container justify="flex-end">
                                <Button variant="contained" color="primary" type='submit'>
                                Guardar
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