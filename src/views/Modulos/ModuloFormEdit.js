import React, { useContext, useState } from 'react';
import { Button, DialogContent, FormHelperText, Grid, TextField } from '@material-ui/core'
import { Formik } from 'formik';
import * as Yup from 'yup';
import { ModuloContext } from 'contexts/moduloContext';
import { ModalContextUpdate } from 'contexts/modalContexUpdate';

import { ModalConfirmacion } from 'commons/ModalConfirmacion';
import { ModalContextConfirmacion } from 'contexts/modalContextConfirmacion';
import { Mensaje } from 'components/Personalizados/Mensaje';
import { useHistory } from "react-router";
import { useTranslation } from 'react-i18next';
export const ModuloFormEdit = ({ moduloSeleccionado }) => {
    const { t } = useTranslation();
    let history = useHistory();
    const { setShowModalUpdate } = useContext(ModalContextUpdate);
    const { actualizarModulo } = useContext(ModuloContext);
    
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

    const handleRegistrar = () => {


        actualizarModulo(valores).then(response => {

            setOpenSnackbar(true);
            setMsjConfirmacion(`${t('msg.registroguardadoexitosamente')}`);
            const timer = setTimeout(() => {
                setError(false);
                history.push("/admin/modulos")
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
        dsmodulo: Yup.string()
            .required(`${t('msg.moduloobligatorio')}`)
    });

    const actualizarInfoModulo = async valores => {
        confirmacionDialog(valores);
    }




    return (

        <Formik
            enableReinitialize
            initialValues={moduloSeleccionado}
            validationSchema={schemaValidacion}
            onSubmit={(valores) => {
                actualizarInfoModulo(valores)
            }}
        >

            {props => {
                return (


                    <form
                        className="bg-white shadow-md px-8 pt-6 pb-8 mb-4"
                        onSubmit={props.handleSubmit}>

                        <DialogContent>
                            <TextField
                                id="dsmodulo"
                                label={t('lbl.descmodulo')}
                                variant="outlined"
                                name="dsmodulo"
                                fullWidth
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                value={props.values.dsmodulo}
                                inputProps={{ maxLength: 200 }}
                            />
                            {props.touched.dsmodulo && props.errors.dsmodulo ? (
                                <FormHelperText error={props.errors.dsmodulo}>{props.errors.dsmodulo}</FormHelperText>
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