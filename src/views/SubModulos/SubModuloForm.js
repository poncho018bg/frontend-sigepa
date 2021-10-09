import { Button, DialogContent, FormHelperText, Grid, MenuItem, TextField } from '@material-ui/core'
import React, { useContext, useEffect, useState } from 'react';

import { useFormik } from 'formik'
import * as Yup from 'yup'
import { SubModuloContext } from 'contexts/subModuloContext';
import { ModalContext } from 'contexts/modalContex';
import UserService from 'servicios/UserService';
import { ModuloContext } from 'contexts/moduloContext';

import { ModalConfirmacion } from 'commons/ModalConfirmacion';
import { ModalContextConfirmacion } from 'contexts/modalContextConfirmacion';
import { Mensaje } from 'components/Personalizados/Mensaje';
import { useTranslation } from 'react-i18next';
export const SubModuloForm = () => {
    const { t } = useTranslation();
    const { registrarSubModulos } = useContext(SubModuloContext);
    const { setShowModal } = useContext(ModalContext);
    const { getModulos, moduloList } = useContext(ModuloContext);
    const [error, setError] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [msjConfirmacion, setMsjConfirmacion] = useState('');

    //dialog confirmacion
    const [valores, setValores] = useState();
    const { setShowModalConfirmacion } = useContext(ModalContextConfirmacion);

    const confirmacionDialog = (e) => {
        console.log("Aqui hace el llamado al dialog", e);
        setShowModalConfirmacion(true);
        setValores(e)
    }


    const formik = useFormik({
        initialValues: {
            dssubmodulo: '',
            usuarioCreacionId: UserService.getIdUSuario(),
            crcModulosCollection: ''
        },
        validationSchema: Yup.object({
            dssubmodulo: Yup.string()
                .required('El submodulo  es obligatorio'),
            crcModulosCollection: Yup.string()
                .required('El modulo  es obligatorio')

        }),
        onSubmit: async valores => {
            confirmacionDialog(valores);
        }
    })


    const handleRegistrar = () => {
        const { dssubmodulo, crcModulosCollection } = valores
        console.log(dssubmodulo);
        let module = {
            dssubmodulo: dssubmodulo,
            usuarioCreacionId: `${process.env.REACT_APP_API_URL}/usuario/${UserService.getIdUSuario()}`,
            boactivo: true,
            crcModulosCollection: crcModulosCollection
        }


        registrarSubModulos(module).then(response => {
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

    useEffect(() => {
        getModulos()
    }, [])


    return (
        <form
            onSubmit={formik.handleSubmit}
        >
            <DialogContent>
                <TextField
                    id="crcModulosCollection"
                    variant="outlined"
                    label="Selecciona un modulo"
                    select
                    fullWidth
                    error={formik.errors.crcModulosCollection}
                    name="crcModulosCollection"
                    value={formik.values.crcModulosCollection}
                    onChange={formik.handleChange}
                >
                    <MenuItem value="0">
                        <em>Ninguno</em>
                    </MenuItem>
                    {
                        moduloList.map(
                            item => (
                                <MenuItem
                                    key={item.id}
                                    value={item.id}>
                                    {item.dsmodulo}
                                </MenuItem>
                            )
                        )
                    }

                </TextField>
                {formik.touched.crcModulosCollection && formik.errors.crcModulosCollection ? (
                    <FormHelperText error={formik.errors.crcModulosCollection}>{formik.errors.crcModulosCollection}</FormHelperText>
                ) : null}
            </DialogContent>

            <DialogContent>
                <TextField
                    id="dssubmodulo"
                    label="Desc. submodulo"
                    variant="outlined"
                    name="dssubmodulo"
                    fullWidth
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.dssubmodulo}
                />
                {formik.touched.dssubmodulo && formik.errors.dssubmodulo ? (
                    <FormHelperText error={formik.errors.dssubmodulo}>{formik.errors.dssubmodulo}</FormHelperText>
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