import React, { useEffect, useContext, useState } from 'react';
import { Button, DialogContent, FormHelperText, Grid, TextField, MenuItem } from '@material-ui/core'
import { Formik } from 'formik';
import * as Yup from 'yup';
import { FirmasContext } from 'contexts/catalogos/firmasContext';
import { ModalContextUpdate } from 'contexts/modalContexUpdate';

import { ModalConfirmacion } from 'commons/ModalConfirmacion';
import { ModalContextConfirmacion } from 'contexts/modalContextConfirmacion';
import { Mensaje } from 'components/Personalizados/Mensaje';
import { useTranslation } from 'react-i18next';

export const FirmasEdit = ({ firmasSeleccionado }) => {
    const { t } = useTranslation();
    const { setShowModalUpdate } = useContext(ModalContextUpdate);
    const { actualizarFirmas, getProgramas, programaList } = useContext(FirmasContext);

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
        actualizarFirmas(valores).then(response => {
            setOpenSnackbar(true);

            setMsjConfirmacion(`${t('msg.registroguardadoexitosamente')}`);

            const timer = setTimeout(() => {

                setError(false);
                setShowModalConfirmacion(false);
                setShowModalUpdate(false);

            }, 2000);
            return () => clearTimeout(timer);
        })
            .catch(err => {
                setOpenSnackbar(true);
                setError(true);
                setMsjConfirmacion(`Ocurrio un error, ${err}`);

                setShowModalConfirmacion(false);
                setShowModalUpdate(false);
            });
    }
    // Schema de validación
    const schemaValidacion = Yup.object({
        dsautoriza: Yup.string()
            .required(`${t('msg.obligatoriopersonaautoriza')}`),
        
        dspuesto: Yup.string()
            .required(`${t('msg.obligatoriopuesto')}`),
    });

    useEffect(() => {
        getProgramas();
    }, []);

    const actualizarInfoFirmas = async valores => {
        confirmacionDialog(valores);
    }


    return (
        <Formik
            enableReinitialize
            initialValues={firmasSeleccionado}
            validationSchema={schemaValidacion}
            onSubmit={(valores) => {
                actualizarInfoFirmas(valores)
            }}
        >
            {props => {
                return (
                    <form
                        className="bg-white shadow-md px-8 pt-6 pb-8 mb-4"
                        onSubmit={props.handleSubmit}>
                        <DialogContent>
                            <TextField
                                id="dsautoriza"
                                label={t('lbl.nomfuncionarioautorizan')}
                                variant="outlined"
                                name="dsautoriza"
                                fullWidth
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                value={props.values.dsautoriza}
                                inputProps={{ maxLength: 200 }}
                            />
                            {props.touched.dsautoriza && props.errors.dsautoriza ? (
                                <FormHelperText error={props.errors.dsautoriza}>{props.errors.dsautoriza}</FormHelperText>
                            ) : null}
                        </DialogContent>
                        <DialogContent>
                            <TextField
                                id="dspuesto"
                                label={t('lbl.puesto')}
                                variant="outlined"
                                name="dspuesto"
                                fullWidth
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                value={props.values.dspuesto}
                                inputProps={{ maxLength: 200 }}
                            />
                            {props.touched.dspuesto && props.errors.dspuesto ? (
                                <FormHelperText error={props.errors.dspuesto}>{props.errors.dspuesto}</FormHelperText>
                            ) : null}
                        </DialogContent>
                        

                        <DialogContent>



                            <TextField
                                id="dscomentario"
                                label={t('lbl.comentariosopc')}
                                variant="outlined"
                                name="dscomentario"
                                fullWidth
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                value={props.values.dscomentario}
                                inputProps={{ maxLength: 200 }}
                            />
                            {props.touched.dscomentario && props.errors.dscomentario ? (
                                <FormHelperText error={props.errors.dscomentario}>{props.errors.dscomentario}</FormHelperText>
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