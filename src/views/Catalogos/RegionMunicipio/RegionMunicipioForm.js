import { Button, Dialog, DialogContent, FormHelperText, Grid, MenuItem, TextField } from '@material-ui/core'
import React, { useContext,useEffect } from 'react';

import { useFormik } from 'formik'
import * as Yup from 'yup'
import { ModalContext } from 'contexts/modalContex';
import { RegionMunicipiosContext } from 'contexts/catalogos/RegionMunicipiosContext';
import { MunicipiosContext } from 'contexts/catalogos/MunicipiosContext';

export const RegionMunicipioForm = () => {

    const { registrarRegionMunicipios } = useContext(RegionMunicipiosContext);
    const { municipiosList, getMunicipios } = useContext(MunicipiosContext);
    const { setShowModal } = useContext(ModalContext);


    const formik = useFormik({
        initialValues: {
            noclaveregion: '',
            dsRegion: '',
            idMunicipio: ''
        },
        validationSchema: Yup.object({
            noclaveregion: Yup.string()
                .required('La clave  es obligatorio'),
            dsRegion: Yup.string()
                .required('La región es obligatorio'),
                idMunicipio: Yup.string()
                .required('El municipio es obligatorio')
        }),
        onSubmit: async valores => {

            const { noclaveregion, dsRegion, idMunicipio } = valores

            let regionMunicipios = {
                noclaveregion: noclaveregion,
                dsRegion: dsRegion,
                idMunicipio: idMunicipio,
                activo: true
            }
            registrarRegionMunicipios(regionMunicipios);
            setShowModal(false);

        }
    })

    useEffect(() => {
        getMunicipios();
    }, []);


    return (
        <form
            onSubmit={formik.handleSubmit}
        >
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
                    id="noclaveregion"
                    label="Clave"
                    variant="outlined"
                    name="noclaveregion"
                    fullWidth
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.noclaveregion}
                />
                {formik.touched.noclaveregion && formik.errors.noclaveregion ? (
                    <FormHelperText error={formik.errors.noclaveregion}>{formik.errors.noclaveregion}</FormHelperText>
                ) : null}
            </DialogContent>
            <DialogContent>

                <TextField
                    id="dsRegion"
                    label="Región"
                    variant="outlined"
                    name="dsRegion"
                    fullWidth
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.dsRegion}
                />

                {formik.touched.dsRegion && formik.errors.dsRegion ? (
                    <FormHelperText error={formik.errors.dsRegion}>{formik.errors.dsRegion}</FormHelperText>
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
