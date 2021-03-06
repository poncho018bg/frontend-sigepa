import { Button, DialogContent, FormHelperText, Grid, MenuItem, TextField } from '@material-ui/core'
import React, { useContext, useEffect, useState } from 'react';

import { useFormik } from 'formik'
import * as Yup from 'yup'
import { SubModuloContext } from 'contexts/subModuloContext';
import { ModalContext } from 'contexts/modalContex';

import { ModuloContext } from 'contexts/moduloContext';

import { ModalConfirmacion } from 'commons/ModalConfirmacion';
import { ModalContextConfirmacion } from 'contexts/modalContextConfirmacion';
import { Mensaje } from 'components/Personalizados/Mensaje';
import { useTranslation } from 'react-i18next';
export const SubModuloForm = () => {
    const { t } = useTranslation();
    const { registrarSubModulos,getSubModulos } = useContext(SubModuloContext);
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
            usuarioCreacionId: sessionStorage.getItem('idUSuario'),
            crcModulosCollection: ''
        },
        validationSchema: Yup.object({
            dssubmodulo: Yup.string()
                .required(`${t('msg.submoduloobligatorio')}`),
            crcModulosCollection: Yup.string()
                .required(`${t('msg.moduloobligatorio')}`)

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
            usuarioCreacionId: `/${sessionStorage.getItem('idUSuario')}`,
            boactivo: true,
            crcModulosCollection: crcModulosCollection,
            activoval:true
        }


        registrarSubModulos(module).then(response => {
            setOpenSnackbar(true);
            setMsjConfirmacion(`${t('msg.registroguardadoexitosamente')}`);

            const timer = setTimeout(() => {
                setError(false);
                setShowModalConfirmacion(false);
                setShowModal(false);

            }, 1000);
            return () => clearTimeout(timer);
        }).catch(err => {
            setOpenSnackbar(true);
            setError(true);
            setMsjConfirmacion(`${t('msg.ocurrioerrorcalidarinfo')}`);
        })

    }

    useEffect(() => {
        getModulos()
        getSubModulos();
    }, [])


    return (
        <form
            onSubmit={formik.handleSubmit}
        >
            <DialogContent>
                <TextField
                    id="crcModulosCollection"
                    variant="outlined"
                    label={t('cmb.seleccionamodulo')} 
                    select
                    fullWidth
                    error={formik.errors.crcModulosCollection}
                    name="crcModulosCollection"
                    value={formik.values.crcModulosCollection}
                    onChange={formik.handleChange}
                    
                >
                    <MenuItem value="0">
                        <em>{t('cmb.ninguno')}</em>
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
                    label={t('lbl.descsubmodulo')} 
                    variant="outlined"
                    name="dssubmodulo"
                    fullWidth
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.dssubmodulo}
                    inputProps={{ maxLength: 200 }}
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