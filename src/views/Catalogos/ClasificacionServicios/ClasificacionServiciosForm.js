import { Button, DialogContent, FormHelperText, Grid, TextField } from '@material-ui/core'
import React, { useContext, useState } from 'react';

import { useFormik } from 'formik'
import * as Yup from 'yup'
import { ClasificacionServiciosContext } from 'contexts/catalogos/clasificacionServiciosContext';
import { ModalContext } from 'contexts/modalContex';

import { ModalConfirmacion } from 'commons/ModalConfirmacion';
import { ModalContextConfirmacion } from 'contexts/modalContextConfirmacion';
import { Mensaje } from 'components/Personalizados/Mensaje';
import { useTranslation } from 'react-i18next';
export const ClasificacionServiciosForm = () => {
    const { t } = useTranslation();
    const { registrarClasificacionServicios } = useContext(ClasificacionServiciosContext);
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

    const handleRegistrar = () => {
        const { dsclasificacionservicio, dsabreviatura } = valores

        let clasificacionServicios = {
            dsclasificacionservicio: dsclasificacionservicio,
            dsabreviatura: dsabreviatura,
            boactivo: true,
            'crcApoyoServicios': []
        }
        registrarClasificacionServicios(clasificacionServicios).then(response => {
            setOpenSnackbar(true);
             
            setMsjConfirmacion(`${t('msg.registroguardadoexitosamente')}`);
           
           const timer = setTimeout(() => {
        
            setError(false);
            setShowModalConfirmacion(false);
            setShowModal(false);
        
            }, 1500);
            return () => clearTimeout(timer);
        })
        .catch(err => {   
            setOpenSnackbar(true);
            setError(true);
            setMsjConfirmacion(`Ocurrió un error`  );
        });

    }


    const formik = useFormik({
        initialValues: {
            dsclasificacionservicio: '',
            dsabreviatura: '',
        },
        validationSchema: Yup.object({
            dsclasificacionservicio: Yup.string()
                .required('La clasificacion es obligatoria'),
            dsabreviatura: Yup.string()
                .required('La abreviatura es obligatoria'),

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
                    id="dsclasificacionservicio"
                    label="Clasificacion del servicio"
                    variant="outlined"
                    name="dsclasificacionservicio"
                    fullWidth
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.dsclasificacionservicio}
                />
                {formik.touched.dsclasificacionservicio && formik.errors.dsclasificacionservicio ? (
                    <FormHelperText error={formik.errors.dsclasificacionservicio}>{formik.errors.dsclasificacionservicio}</FormHelperText>
                ) : null}

            </DialogContent>
            <DialogContent>
                <TextField
                    id="dsabreviatura"
                    label="Abreviatura"
                    variant="outlined"
                    name="dsabreviatura"
                    fullWidth
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.dsabreviatura}
                />
                {formik.touched.dsabreviatura && formik.errors.dsabreviatura ? (
                    <FormHelperText error={formik.errors.dsabreviatura}>{formik.errors.dsabreviatura}</FormHelperText>
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
                severity={error?"error":"success"}
                message={msjConfirmacion}
            />
        </form>

    )
}