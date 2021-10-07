import { Button, DialogContent, FormHelperText, Grid, MenuItem, TextField } from '@material-ui/core'
import React, { useContext,useEffect, useState } from 'react';

import { useFormik } from 'formik'
import * as Yup from 'yup'
import { ModalContext } from 'contexts/modalContex';
import { RegionMunicipiosContext } from 'contexts/catalogos/RegionMunicipiosContext';
import { MunicipiosContext } from 'contexts/catalogos/MunicipiosContext';
import { Mensaje } from 'components/Personalizados/Mensaje';
import { ModalContextConfirmacion } from 'contexts/modalContextConfirmacion';
import { ModalConfirmacion } from 'commons/ModalConfirmacion';

export const RegionMunicipioForm = () => {

    const { registrarRegionMunicipios } = useContext(RegionMunicipiosContext);
    const { municipiosList, getMunicipios } = useContext(MunicipiosContext);
    const { setShowModal } = useContext(ModalContext);
    const [valores, setValores] = useState();
    const { setShowModalConfirmacion } = useContext(ModalContextConfirmacion);

    const [error, setError] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [msjConfirmacion, setMsjConfirmacion] = useState('');


    const confirmacionDialog = (e) => {
        console.log("Aqui hace el llamado al dialog", e);
        setShowModalConfirmacion(true);
        setValores(e)
    }

    const handleRegistrar = () => {
        const { noclaveregion, dsRegion, idMunicipio } = valores

        let regionMunicipios = {
            noclaveregion: noclaveregion,
            dsRegion: dsRegion,
            idMunicipio: idMunicipio,
            activo: true
        }
        registrarRegionMunicipios(regionMunicipios).then(response => {
            setOpenSnackbar(true);
             
            setMsjConfirmacion(`El registro ha sido guardado exitosamente `  );
           
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
            setMsjConfirmacion(`Ocurrio un error, ${err}`  );
        });
    }

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


            confirmacionDialog(valores);

           

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
                    Guardar
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
