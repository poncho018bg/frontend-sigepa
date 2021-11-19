import React, { useContext, useState } from 'react';
import { Button, DialogContent, FormHelperText, Grid, TextField } from '@material-ui/core'
import { Formik } from 'formik';
import * as Yup from 'yup';
import { IdentificacionesOficialesContext } from 'contexts/catalogos/IdentificacionesOficialesContext';
import { ModalContextUpdate } from 'contexts/modalContexUpdate';

import { ModalConfirmacion } from 'commons/ModalConfirmacion';
import { ModalContextConfirmacion } from 'contexts/modalContextConfirmacion';
import { Mensaje } from 'components/Personalizados/Mensaje';
import { useTranslation } from 'react-i18next';
export const IdentificacionesFormEdit = ({ identificacionSeleccionado }) => {
    const { t } = useTranslation();
    const { setShowModalUpdate } = useContext(ModalContextUpdate);
    const { actualizarIdentificacionesOficiales } = useContext(IdentificacionesOficialesContext);

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
        console.log("Aqui hace el llamado al dialog", e);
        setShowModalConfirmacion(true);
        setValores(e)
    }

    /**
     * Edita el elemento
     */
    const handleRegistrar = () => {

        actualizarIdentificacionesOficiales(valores).then(response => {
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
        dsidentificacion: Yup.string()
            .required('La identificación es obligatorio')
            .matches(/^[a-zA-Z0-9_.-\sñÑ]*$/, `${t('msg.nocarateresespeciales')}`),
        dsidentificador: Yup.string()
            .required('El identificador es obligatorio')
            .matches(/^[a-zA-Z0-9_.-\sñÑ]*$/, `${t('msg.nocarateresespeciales')}`),
    });

    const actualizarInfoEdadesBeneficiarios = async valores => {
        confirmacionDialog(valores);
    }


    return (

        <Formik
            enableReinitialize
            initialValues={identificacionSeleccionado}
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
                                id="dsidentificacion"
                                label="Identificación"
                                variant="outlined"
                                name="dsidentificacion"
                                fullWidth
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                value={props.values?.dsidentificacion}
                                inputProps={{ maxLength: 30 }}
                            />
                            {props.touched.dsidentificacion && props.errors.dsidentificacion ? (
                                <FormHelperText error={props.errors.dsidentificacion}>{props.errors.dsidentificacion}</FormHelperText>
                            ) : null}
                        </DialogContent>
                        <DialogContent>
                            <TextField
                                id="dsidentificador"
                                label="Identificador"
                                variant="outlined"
                                name="dsidentificador"
                                fullWidth
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                value={props.values?.dsidentificador}
                                inputProps={{ maxLength: 2 }}
                            />
                            {props.touched.dsidentificador && props.errors.dsidentificador ? (
                                <FormHelperText error={props.errors.dsidentificador}>{props.errors.dsidentificador}</FormHelperText>
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
                            severity={error ? "error" : "success"}
                            message={msjConfirmacion}
                        />
                    </form>
                )
            }}
        </Formik>

    )

}