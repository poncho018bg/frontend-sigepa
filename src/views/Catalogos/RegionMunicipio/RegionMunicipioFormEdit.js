import React, { useContext } from 'react';
import { Button, Dialog, DialogContent, FormHelperText, Grid, TextField } from '@material-ui/core'
import { Formik } from 'formik';
import * as Yup from 'yup';
import { ModalContextUpdate } from 'contexts/modalContexUpdate';
import { RegionMunicipiosContext } from 'contexts/catalogos/RegionMunicipiosContext';

export const RegionMunicipioFormEdit = ({ regionMunicipioSeleccionada }) => {


    const { setShowModalUpdate } = useContext(ModalContextUpdate);
    const { actualizarRegionMunicipios } = useContext(RegionMunicipiosContext);

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
                                    Editar
                                </Button>
                            </Grid>


                        </DialogContent>
                    </form>
                )
            }}
        </Formik>

    )
}
