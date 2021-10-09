import React, { useContext, useState } from 'react';
import { Button, DialogContent, FormHelperText, Grid, TextField } from '@material-ui/core'
import { Formik } from 'formik';
import * as Yup from 'yup';
import { MotivoRechazosContext } from 'contexts/catalogos/motivoRechazosContext';
import { ModalContextUpdate } from 'contexts/modalContexUpdate';

import { ModalConfirmacion } from 'commons/ModalConfirmacion';
import { ModalContextConfirmacion } from 'contexts/modalContextConfirmacion';
import { useHistory } from "react-router";
import { Mensaje } from 'components/Personalizados/Mensaje';
import { useTranslation } from 'react-i18next';
export const MotivoRechazosEdit = ({ motivoRechazosSeleccionado }) => {
    const { t } = useTranslation();
    let history = useHistory();
    const { setShowModalUpdate } = useContext(ModalContextUpdate);
    const { actualizarMotivoRechazos } = useContext(MotivoRechazosContext);

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
 * Registra el elemento
 */
    const handleRegistrar = () => {

        actualizarMotivoRechazos(valores).then(response => {
            setOpenSnackbar(true);
            setMsjConfirmacion(`El registro ha sido guardado exitosamente`);
            const timer = setTimeout(() => {
                setError(false);
                history.push("/admin/motivosRechazos")
                setShowModalConfirmacion(false);
                setShowModalUpdate(false);

            }, 1000);
            return () => clearTimeout(timer);
        }).catch(err => {
            setOpenSnackbar(true);
            setError(true);
            setMsjConfirmacion(`Ocurrio un error, ${err}`);
        });;
    }

    // Schema de validación
    const schemaValidacion = Yup.object({
        dsmotivorechazo: Yup.string()
            .required('El motivo de rechazo  es obligatorio')
            .matches(/^[a-zA-Z0-9_.-\sñÑ]*$/, "No debe contener caracteres especiales")
    });

    const actualizarInfoMotivoRechazos = async valores => {
        confirmacionDialog(valores);
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
                                label="Descripción Motivo de Rechazo"
                                variant="outlined"
                                name="dsmotivorechazo"
                                fullWidth
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                value={props.values.dsmotivorechazo}
                                inputProps={{ maxLength: "50" }}
                            />
                            {props.touched.dsmotivorechazo && props.errors.dsmotivorechazo ? (
                                <FormHelperText error={props.errors.dsmotivorechazo}>{props.errors.dsmotivorechazo}</FormHelperText>
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