import { Button, DialogContent, FormHelperText, Grid, MenuItem, TextField } from '@material-ui/core'
import React, { useContext, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik'
import * as Yup from 'yup'

import { ModalContext } from 'contexts/modalContex';
import { ApoyoServicioContext } from 'contexts/catalogos/ApoyoServicioContext';
import { ClasificacionServiciosContext } from 'contexts/catalogos/clasificacionServiciosContext';

import { ModalConfirmacion } from 'commons/ModalConfirmacion';
import { ModalContextConfirmacion } from 'contexts/modalContextConfirmacion';
import { Mensaje } from 'components/Personalizados/Mensaje';

export const ApoyoServicioForm = () => {
    const { t } = useTranslation();
    const { registrarApoyoSevicio } = useContext(ApoyoServicioContext);
    const { getClasificacionServicios, clasificacionServiciosList } = useContext(ClasificacionServiciosContext);

    const { setShowModal } = useContext(ModalContext);

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
    useEffect(() => {
        getClasificacionServicios();
    }, []);

    const handleRegistrar = () => {
        const { dsservicio, clasificacionServicio } = valores

        let apoyoSevicio = {
            dsservicio: dsservicio,
            activo: true,
            clasificacionServicio: `/${clasificacionServicio}`,
            serviciosApoyos: [{}]
        }


        registrarApoyoSevicio(apoyoSevicio).then(response => {
            setOpenSnackbar(true);
            setMsjConfirmacion(`El registro ha sido guardado exitosamente`);

            const timer = setTimeout(() => {
                setError(false);
                setShowModalConfirmacion(false);
                setShowModal(false);

            }, 1000);
            return () => clearTimeout(timer);
        }).catch(err => {
            setOpenSnackbar(true);
            setError(true);
            setMsjConfirmacion(`Ocurrio un error, ${err}`);
        });;




    }

    const formik = useFormik({
        initialValues: {
            dsservicio: '',
            clasificacionServicio: ''
        },
        validationSchema: Yup.object({
            dsservicio: Yup.string()
                .required('La descripción del apoyo servicio es obligatorio')
        }),
        onSubmit: async valores => {

            confirmacionDialog(valores);


        }
    })


    return (
        <form
            onSubmit={formik.handleSubmit}
        >
            <DialogContent>
                <TextField
                    variant="outlined"
                    label="Selecciona una clasificación"
                    select
                    fullWidth
                    name="clasificacionServicio"
                    value={formik.values.clasificacionServicio}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                >
                    <MenuItem value="0">
                        <em>Ninguno</em>
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
                {formik.touched.estadoId && formik.errors.estadoId ? (
                    <FormHelperText error={formik.errors.estadoId}>{formik.errors.estadoId}</FormHelperText>
                ) : null}
            </DialogContent>

            <DialogContent>
                <TextField
                    id="dsservicio"
                    label="Desc. Apoyo servicio"
                    variant="outlined"
                    name="dsservicio"
                    fullWidth
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.dsservicio}
                />
                {formik.touched.dsservicio && formik.errors.dsservicio ? (
                    <FormHelperText error={formik.errors.dsservicio}>{formik.errors.dsservicio}</FormHelperText>
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
                handleRegistrar={handleRegistrar} evento="Registrar"
            />

            <Mensaje
                setOpen={setOpenSnackbar}
                open={openSnackbar}
                severity={error ? "error" : "success"}
                message={msjConfirmacion}
            />
        </form>

    )
}
