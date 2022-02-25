import React, { useContext, useState } from 'react';
import { Button, DialogContent, FormHelperText, Grid, TextField } from '@material-ui/core'
import { Formik } from 'formik';
import * as Yup from 'yup';
import { PuntosEntregaContext } from 'contexts/catalogos/PuntosEntregaContext';
import { ModalContextUpdate } from 'contexts/modalContexUpdate';

import { ModalConfirmacion } from 'commons/ModalConfirmacion';
import { ModalContextConfirmacion } from 'contexts/modalContextConfirmacion';
import { Mensaje } from 'components/Personalizados/Mensaje';
import { useTranslation } from 'react-i18next';

export const PuntosEntregaEdit = ({ puntosEntregaSeleccionado }) => {
    const { t } = useTranslation();
    const { setShowModalUpdate } = useContext(ModalContextUpdate);
    const { actualizarPuntosEntrega } = useContext(PuntosEntregaContext);

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

        actualizarPuntosEntrega(valores).then(response => {
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
        dspuntoentrega: Yup.string()
            .required(`${t('msg.identificacionobligatorio')}`)
            .matches(/^[a-zA-Z0-9_.-\sñÑ]*$/, `${t('msg.nocarateresespeciales')}`),
      
    });

    const actualizarInfoEdadesBeneficiarios = async valores => {
        confirmacionDialog(valores);
    }


    return (

        <Formik
            enableReinitialize
            initialValues={puntosEntregaSeleccionado}
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
                                id="dspuntoentrega"
                                label={t('lbl.puntoentrega')}
                                variant="outlined"
                                name="dspuntoentrega"
                                fullWidth
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                value={props.values?.dspuntoentrega}
                                inputProps={{ maxLength: 30 }}
                            />
                            {props.touched.dspuntoentrega && props.errors.dspuntoentrega ? (
                                <FormHelperText error={props.errors.dspuntoentrega}>{props.errors.dspuntoentrega}</FormHelperText>
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