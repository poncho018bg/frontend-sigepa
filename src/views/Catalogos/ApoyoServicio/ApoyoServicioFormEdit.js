import React, { useContext, useState, useEffect } from 'react';
import { Button, DialogContent, FormHelperText, Grid, MenuItem, TextField } from '@material-ui/core'
import { Formik } from 'formik';
import * as Yup from 'yup';

import { ModalContextUpdate } from 'contexts/modalContexUpdate';
import { ApoyoServicioContext } from 'contexts/catalogos/ApoyoServicioContext';
import { ClasificacionServiciosContext } from 'contexts/catalogos/clasificacionServiciosContext';

import { ModalConfirmacion } from 'commons/ModalConfirmacion';
import { ModalContextConfirmacion } from 'contexts/modalContextConfirmacion';
import { Mensaje } from 'components/Personalizados/Mensaje';
import { useHistory } from "react-router";
import { useTranslation } from 'react-i18next';

export const ApoyoServicioFormEdit = ({ ApoyoServicioSeleccionada }) => {
    const { t } = useTranslation();
    let history = useHistory();
    const { setShowModalUpdate } = useContext(ModalContextUpdate);


    const { actualizarApoyoServicio } = useContext(ApoyoServicioContext);
    const { getClasificacionServicios, clasificacionServiciosList } = useContext(ClasificacionServiciosContext);
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

        console.log("valores antes de registrar--->",valores)

        actualizarApoyoServicio(valores).then(response => {

            setOpenSnackbar(true);
            setMsjConfirmacion(`${t('msg.registroguardadoexitosamente')}`);
            const timer = setTimeout(() => {
                setError(false);
                history.push("/admin/apoyoservicio")
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

    useEffect(() => {
        getClasificacionServicios();
    }, []);
    // Schema de validación
    const schemaValidacion = Yup.object({
        dsservicio: Yup.string()
            .required('La descripción del apoyo servicio  es obligatorio')
    });

    const actualizarInfoApoyoServicio = async valores => {
        console.log("Valores --->",valores);
        valores.clasificacionServicio = `/${valores.clasificacion_id}`
        valores.serviciosApoyos = [{}]
        confirmacionDialog(valores);
    }

    return (

        <Formik
            enableReinitialize
            initialValues={ApoyoServicioSeleccionada}
            validationSchema={schemaValidacion}
            onSubmit={(valores) => {
                actualizarInfoApoyoServicio(valores)
            }}
        >

            {props => {
                return (


                    <form
                        className="bg-white shadow-md px-8 pt-6 pb-8 mb-4"
                        onSubmit={props.handleSubmit}>

                        <DialogContent>
                            <TextField
                                variant="outlined"
                                label="Selecciona una clasificación"
                                select
                                fullWidth
                                name="clasificacion_id"
                                value={props.values.clasificacion_id}
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                            >
                                <MenuItem value="0">
                                    <em>{t('cmb.ninguno')}</em>
                                </MenuItem>
                                {
                                    clasificacionServiciosList.map(
                                        item => (
                                            <MenuItem
                                                key={item.id}
                                                value={item.id}>
                                                {item.dsclasificacionservicio}
                                            </MenuItem>
                                        )
                                    )
                                }

                            </TextField>
                            {props.touched.estadoId && props.errors.estadoId ? (
                                <FormHelperText error={props.errors.estadoId}>{props.errors.estadoId}</FormHelperText>
                            ) : null}
                        </DialogContent>

                        <DialogContent>
                            <TextField
                                id="dsservicio"
                                label="Desc. Apoyo servicio"
                                variant="outlined"
                                name="dsservicio"
                                fullWidth
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                value={props.values.dsservicio}
                            />
                            {props.touched.dsservicio && props.errors.dsservicio ? (
                                <FormHelperText error={props.errors.dsservicio}>{props.errors.dsservicio}</FormHelperText>
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
