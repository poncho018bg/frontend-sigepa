import { Button, DialogContent, FormHelperText, Grid, MenuItem, TextField } from '@material-ui/core'
import React, { useContext, useEffect } from 'react';

import { useFormik } from 'formik'
import * as Yup from 'yup'
import { SubModuloContext } from 'contexts/subModuloContext';
import { ModalContext } from 'contexts/modalContex';
import UserService from 'servicios/UserService';
import { ModuloContext } from 'contexts/moduloContext';

export const SubModuloForm = () => {

    const { registrarSubModulos } = useContext(SubModuloContext);
    const { setShowModal } = useContext(ModalContext);
    const { getModulos, moduloList } = useContext(ModuloContext);




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

            const { dssubmodulo, crcModulosCollection } = valores

            console.log(dssubmodulo);


            let module = {
                dssubmodulo: dssubmodulo,
                usuarioCreacionId: `${process.env.REACT_APP_API_URL}/usuario/${UserService.getIdUSuario()}`,
                boactivo: true,
                crcModulosCollection: crcModulosCollection
            }

            console.log('REG=>', registrarSubModulos(module));

            setShowModal(false);

        }
    })

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
                        Enviar
                    </Button>
                </Grid>
            </DialogContent>
        </form>

    )
}