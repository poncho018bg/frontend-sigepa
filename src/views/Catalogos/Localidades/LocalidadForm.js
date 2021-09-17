import { Button, DialogContent, FormHelperText, Grid, MenuItem, TextField } from '@material-ui/core'
import React, { useContext, useState } from 'react';
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { ModalContext } from 'contexts/modalContex';
import { LocalidadesContext } from 'contexts/catalogos/Localidades/localidadesContext';
import { MunicipiosContext } from 'contexts/catalogos/MunicipiosContext';

import { ModalConfirmacion } from 'commons/ModalConfirmacion';
import { ModalContextConfirmacion } from 'contexts/modalContextConfirmacion';

export const LocalidadForm = () => {

    const { registrar } = useContext(LocalidadesContext);
    const { setShowModal } = useContext(ModalContext);
    const { municipiosList } = useContext(MunicipiosContext);


    //dialog confirmar
    const [valores, setValores] = useState();
    const { setShowModalConfirmacion } = useContext(ModalContextConfirmacion);


    const confirmacionDialog = (e) => {
        console.log("Aqui hace el llamado al dialog", e);
        setShowModalConfirmacion(true);
        setValores(e)
    }

    const handleRegistrar = () => {
        const { dsidlocalidad, dsclavelocalidad, idMunicipio, dscodigopostal, dslocalidad } = valores;
        let localidad = {
            dsidlocalidad,
            dsclavelocalidad,

            dslocalidad,
            dscodigopostal,
            dsestado: true,
            municipios: {
                dsclavemunicipio: idMunicipio
            },
        }
        console.log(localidad)
        registrar(localidad);
        setShowModalConfirmacion(false);
        setShowModal(false);
    }

    const formik = useFormik({
        initialValues: {
            dsidlocalidad: '',
            dsclavelocalidad: '',
            idMunicipio: 0,
            dslocalidad: '',
            dscodigopostal: '',
            dslocalidad: ''

        },
        validationSchema: Yup.object({
            dsidlocalidad: Yup.string()
                .required('El id de localidad es obligatorio'),
            dsclavelocalidad: Yup.string()
                .required('La clave localidad es obligatoria'),
            idMunicipio: Yup.string()
                .required('El municipio es obligatorio'),
            dslocalidad: Yup.string()
                .required('La localidad es obligatoria'),
            dscodigopostal: Yup.string()
                .required('El código postal es obligatorio')

        }),
        onSubmit: async valores => {
            confirmacionDialog(valores);
        }
    });
    return (
        <form
            onSubmit={formik.handleSubmit}
        >
            <DialogContent>
                <TextField
                    id="dsidlocalidad"
                    label="Id Localidad"
                    variant="outlined"
                    name="dsidlocalidad"
                    fullWidth
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.dsidlocalidad}
                />
                {formik.touched.dsidlocalidad && formik.errors.dsidlocalidad ? (
                    <FormHelperText error={formik.errors.dsidlocalidad}>{formik.errors.dsidlocalidad}</FormHelperText>
                ) : null}
            </DialogContent>

            <DialogContent>
                <TextField
                    id="dsclavelocalidad"
                    label="Clave Localidad"
                    variant="outlined"
                    name="dsclavelocalidad"
                    fullWidth
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.dsclavelocalidad}
                />
                {formik.touched.dsclavelocalidad && formik.errors.dsclavelocalidad ? (
                    <FormHelperText error={formik.errors.dsclavelocalidad}>{formik.errors.dsclavelocalidad}</FormHelperText>
                ) : null}
            </DialogContent>


            <DialogContent>
                <TextField
                    variant="outlined"
                    label="Selecciona un municipio"
                    select
                    fullWidth
                    name="idMunicipio"
                    value={formik.values.idMunicipio}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                >
                    <MenuItem value="0">
                        <em>Ninguno</em>
                    </MenuItem>
                    {
                        municipiosList.map(
                            item => (
                                <MenuItem
                                    key={item.id}
                                    value={item.id}>
                                    {item.dsmunicipio}
                                </MenuItem>
                            )
                        )
                    }

                </TextField>
                {formik.touched.idMunicipio && formik.errors.idMunicipio ? (
                    <FormHelperText error={formik.errors.idMunicipio}>{formik.errors.idMunicipio}</FormHelperText>
                ) : null}
            </DialogContent>

            <DialogContent>
                <TextField
                    id="dslocalidad"
                    label=" Localidad"
                    variant="outlined"
                    name="dslocalidad"
                    fullWidth
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.dslocalidad}
                />
                {formik.touched.dslocalidad && formik.errors.dslocalidad ? (
                    <FormHelperText error={formik.errors.dslocalidad}>{formik.errors.dslocalidad}</FormHelperText>
                ) : null}
            </DialogContent>


            <DialogContent>
                <TextField
                    id="dscodigopostal"
                    label=" CP"
                    variant="outlined"
                    name="dscodigopostal"
                    fullWidth
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.dscodigopostal}
                />
                {formik.touched.dscodigopostal && formik.errors.dscodigopostal ? (
                    <FormHelperText error={formik.errors.dscodigopostal}>{formik.errors.dscodigopostal}</FormHelperText>
                ) : null}
            </DialogContent>
            <DialogContent >
                <Grid container justify="flex-end">
                    <Button variant="contained" color="primary" type='submit'>
                        Enviar
                    </Button>
                </Grid>
            </DialogContent>
            <ModalConfirmacion
                handleRegistrar={handleRegistrar} evento="Registrar"
            />
        </form>

    )
}