import React, { useContext, useState } from 'react';
import { Button, DialogContent, FormHelperText, Grid, TextField } from '@material-ui/core'
import { Formik } from 'formik';
import * as Yup from 'yup';
import { ClasificacionServiciosContext } from 'contexts/catalogos/clasificacionServiciosContext';
import { ModalContextUpdate } from 'contexts/modalContexUpdate';

import { ModalConfirmacion } from 'commons/ModalConfirmacion';
import { ModalContextConfirmacion } from 'contexts/modalContextConfirmacion';
import { Mensaje } from 'components/Personalizados/Mensaje';
import { useTranslation } from 'react-i18next';

export const ClasificacionServiciosEdit = ({ clasificacionServiciosSeleccionado }) => {
    const { t } = useTranslation();
    const { setShowModalUpdate } = useContext(ModalContextUpdate);
    const { actualizarClasificacionServicios } = useContext(ClasificacionServiciosContext);

    //dialog confirmacion
    const [valores, setValores] = useState();
    const { setShowModalConfirmacion } = useContext(ModalContextConfirmacion);

    const [error, setError] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [msjConfirmacion, setMsjConfirmacion] = useState('');

    /**
     * abre el dialogo de confirmación
     * @param {valores} e 
     */
    const confirmacionDialog = (e) => {
        setShowModalConfirmacion(true);
        setValores(e)
    }

    const handleRegistrar = () => {
        actualizarClasificacionServicios(valores).then(response => {
            setOpenSnackbar(true);
             
            setMsjConfirmacion(`${t('msg.registroguardadoexitosamente')}`);
           
           const timer = setTimeout(() => {
        
            setError(false);
            setShowModalConfirmacion(false);
            setShowModalUpdate(false);
        
            }, 1500);
            return () => clearTimeout(timer);
        })
        .catch(err => {   
            setOpenSnackbar(true);
            setError(true);
            setMsjConfirmacion(`${t('msg.ocurrioerrorcalidarinfo')}`);

            setShowModalConfirmacion(false);
            setShowModalUpdate(false);
        });
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

                        </DialogContent>
                        <DialogContent>
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
                                {t('btn.guardar')}
                                </Button>
                            </Grid>
                        </DialogContent>
                        <ModalConfirmacion
                            handleRegistrar={handleRegistrar} evento="Editar"
                        />
                        <Mensaje
                            setOpen={setOpenSnackbar}
                            open={openSnackbar}
                            severity={error?"error":"success"}
                            message={msjConfirmacion}
                        />
                    </form>
                )
            }}
        </Formik>

    )

}