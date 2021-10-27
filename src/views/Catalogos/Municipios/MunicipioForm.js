import { Button, DialogContent, FormHelperText, Grid, MenuItem, TextField } from '@material-ui/core'
import React, { useContext, useEffect, useState } from 'react';

import { useFormik } from 'formik'
import * as Yup from 'yup'
import { ModalContext } from 'contexts/modalContex';
import { MunicipiosContext } from 'contexts/catalogos/MunicipiosContext';
import { EstadosContext } from 'contexts/catalogos/EstadosContext';

import { ModalConfirmacion } from 'commons/ModalConfirmacion';
import { ModalContextConfirmacion } from 'contexts/modalContextConfirmacion';
import { Mensaje } from 'components/Personalizados/Mensaje';
import { useTranslation } from 'react-i18next';
export const MunicipioForm = () => {
    const { t } = useTranslation();
    const { registrarMunicipios } = useContext(MunicipiosContext);
    const {  estadosList,getEstadosAll } = useContext(EstadosContext);
    const { setShowModal } = useContext(ModalContext);

    //dialog confirmar
    const [valores, setValores] = useState();
    const { setShowModalConfirmacion } = useContext(ModalContextConfirmacion);


    const [error, setError] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [msjConfirmacion, setMsjConfirmacion] = useState('');


    const confirmacionDialog = (e) => {
        setShowModalConfirmacion(true);
        setValores(e)
    }

    const handleRegistrar = () => {
        const { dsclavemunicipio, dsmunicipio, estadoId } = valores
        let municipio = {
            dsclavemunicipio: dsclavemunicipio,
            dsmunicipio: dsmunicipio,
            estadoId: estadoId,
            activo: true
        }
        registrarMunicipios(municipio).then(response => {
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
            setMsjConfirmacion(`${t('msg.ocurrioerrorcalidarinfo')}`);
        });
    }

    useEffect(() => {
        getEstadosAll();

    }, []);

    const formik = useFormik({
        initialValues: {
            dsclavemunicipio: '',
            dsmunicipio: '',
            estadoId: ''
        },
        validationSchema: Yup.object({
            dsclavemunicipio: Yup.string()
                .required('La clave es obligatorio'),
            dsmunicipio: Yup.string()
                .required('El municipio es obligatorio'),
            estadoId: Yup.string()
                .required('El Estado es obligatorio')
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
                    label="Selecciona un estado"
                    select
                    fullWidth

                    name="estadoId"
                    value={formik.values.estadoId}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                >
                    <MenuItem value="0">
                        <em>{t('cmb.ninguno')}</em>
                    </MenuItem>
                    {
                        estadosList.map(
                            item => (
                                <MenuItem
                                    key={item.id}
                                    value={item.id}>
                                    {item.dsestado}
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
                    id="dsclavemunicipio"
                    label="Clave municipio"
                    variant="outlined"
                    name="dsclavemunicipio"
                    fullWidth
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.dsclavemunicipio}
                />
                {formik.touched.dsclavemunicipio && formik.errors.dsclavemunicipio ? (
                    <FormHelperText error={formik.errors.dsclavemunicipio}>{formik.errors.dsclavemunicipio}</FormHelperText>
                ) : null}
            </DialogContent>
            <DialogContent>
                <TextField
                    id="dsmunicipio"
                    label="Municipio"
                    variant="outlined"
                    name="dsmunicipio"
                    fullWidth
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.dsmunicipio}
                />

                {formik.touched.dsmunicipio && formik.errors.dsmunicipio ? (
                    <FormHelperText error={formik.errors.dsmunicipio}>{formik.errors.dsmunicipio}</FormHelperText>
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
