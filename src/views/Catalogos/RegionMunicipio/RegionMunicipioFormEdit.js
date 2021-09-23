import React, { useContext,useEffect } from 'react';
import { Button, DialogContent, FormHelperText, Grid, MenuItem, TextField } from '@material-ui/core'
import { Formik } from 'formik';
import * as Yup from 'yup';
import { ModalContextUpdate } from 'contexts/modalContexUpdate';
import { RegionMunicipiosContext } from 'contexts/catalogos/RegionMunicipiosContext';
import { MunicipiosContext } from 'contexts/catalogos/MunicipiosContext';

export const RegionMunicipioFormEdit = ({ regionMunicipioSeleccionada }) => {


    const { setShowModalUpdate } = useContext(ModalContextUpdate);
    const { actualizarRegionMunicipios } = useContext(RegionMunicipiosContext);
    const { municipiosList, getMunicipios } = useContext(MunicipiosContext);

    // Schema de validación
    const schemaValidacion = Yup.object({
        noclaveregion: Yup.string()
            .required('La clave  es obligatorio'),
        dsRegion: Yup.string()
            .required('La región es obligatorio'),
        idRegionMunicipio: Yup.string()
            .required('El municipio es obligatorio')
    });

    const actualizarInfoRegionMunicipio = async valores => {
        actualizarRegionMunicipios(valores);
        setShowModalUpdate(false);
    }

    
    useEffect(() => {
        getMunicipios();
    }, []);

    return (

        <Formik
            enableReinitialize
            initialValues={regionMunicipioSeleccionada}
            validationSchema={schemaValidacion}
            onSubmit={(valores) => {
                actualizarInfoRegionMunicipio(valores)
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
                                label="Selecciona un municipio"
                                select
                                fullWidth
                                name="idMunicipio"
                                value={props.values.idMunicipio}
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
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
                            {props.touched.idMunicipio && props.errors.idMunicipio ? (
                                <FormHelperText error={props.errors.idMunicipio}>{props.errors.idMunicipio}</FormHelperText>
                            ) : null}
                        </DialogContent>
                        <DialogContent>
                            <TextField
                                id="noclaveregion"
                                label="Clave"
                                variant="outlined"
                                name="noclaveregion"
                                fullWidth
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                value={props.values.noclaveregion}
                            />
                            {props.touched.noclaveregion && props.errors.noclaveregion ? (
                                <FormHelperText error={props.errors.noclaveregion}>{props.errors.noclaveregion}</FormHelperText>
                            ) : null}
                        </DialogContent>
                        <DialogContent>
                            <TextField
                                id="dsRegion"
                                label="Región"
                                variant="outlined"
                                name="dsRegion"
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                value={props.values.dsRegion}
                            />

                            {props.touched.dsRegion && props.errors.dsRegion ? (
                                <FormHelperText error={props.errors.dsRegion}>{props.errors.dsRegion}</FormHelperText>
                            ) : null}

                        </DialogContent>
                        <DialogContent >
                            <Grid container justify="flex-end">
                                <Button variant="contained" color="primary" type='submit'>
                                Guardar
                                </Button>
                            </Grid>


                        </DialogContent>
                    </form>
                )
            }}
        </Formik>

    )
}
