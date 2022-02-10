import React, { useContext, useState } from 'react';
import { Button, DialogContent, FormHelperText, Grid, TextField } from '@material-ui/core'
import { Formik } from 'formik';
import * as Yup from 'yup';
import { MotivoSuspensionContext } from 'contexts/MotivoSuspensionContext';
import { ModalContextUpdate } from 'contexts/modalContexUpdate';

import { ModalConfirmacion } from 'commons/ModalConfirmacion';
import { ModalContextConfirmacion } from 'contexts/modalContextConfirmacion';
import { useHistory } from "react-router";
import { Mensaje } from 'components/Personalizados/Mensaje';
import { useTranslation } from 'react-i18next';

export const MotivoSuspensionEdit = ({ motivoSuspensionSeleccionado }) => {
    const { t } = useTranslation();
    let history = useHistory();
    const { setShowModalUpdate } = useContext(ModalContextUpdate);
    const { actualizarMotivoSuspension } = useContext(MotivoSuspensionContext);

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

        actualizarMotivoSuspension(valores).then(response => {
            setOpenSnackbar(true);
            setMsjConfirmacion(`${t('msg.registroguardadoexitosamente')}`);
            const timer = setTimeout(() => {
                setError(false);
                history.push("/admin/motivosSuspension")
                setShowModalConfirmacion(false);
                setShowModalUpdate(false);

            }, 1000);
            return () => clearTimeout(timer);
        }).catch(err => {
            setOpenSnackbar(true);
            setError(true);
            setMsjConfirmacion(`${t('msg.ocurrioerrorcalidarinfo')}`);
        })
    }

    // Schema de validación
    const schemaValidacion = Yup.object({
        dsmotivosuspesion: Yup.string()
            .required(`${t('msg.moduloobligatorio')}`)
            .matches(/^[a-zA-Z0-9_.-\sñÑ]*$/, `${t('msg.nocarateresespeciales')}`)
    });

    const actualizarInfoMotivoRechazos = async valores => {
        confirmacionDialog(valores);
    }


    return (
        <Formik
            enableReinitialize
            initialValues={motivoSuspensionSeleccionado}
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
                                id="dsmotivosuspesion"
                                label={t("lbl.motivosuspensión")}
                                variant="outlined"
                                name="dsmotivosuspesion"
                                fullWidth
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                value={props.values.dsmotivosuspesion}
                                inputProps={{ maxLength: "50" }}
                            />
                            {props.touched.dsmotivosuspesion && props.errors.dsmotivosuspesion ? (
                                <FormHelperText error={props.errors.dsmotivosuspesion}>{props.errors.dsmotivosuspesion}</FormHelperText>
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