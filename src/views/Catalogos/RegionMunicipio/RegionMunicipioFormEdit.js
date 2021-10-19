import React, { useContext,useEffect, useState } from 'react';
import { Button, DialogContent, FormHelperText, Grid, MenuItem, TextField } from '@material-ui/core'
import { Formik } from 'formik';
import * as Yup from 'yup';
import { ModalContextUpdate } from 'contexts/modalContexUpdate';
import { RegionMunicipiosContext } from 'contexts/catalogos/RegionMunicipiosContext';
import { MunicipiosContext } from 'contexts/catalogos/MunicipiosContext';
import { Mensaje } from 'components/Personalizados/Mensaje';
import { ModalConfirmacion } from 'commons/ModalConfirmacion';
import { ModalContextConfirmacion } from 'contexts/modalContextConfirmacion';
import { useTranslation } from 'react-i18next';
export const RegionMunicipioFormEdit = ({ regionMunicipioSeleccionada }) => {
    const { t } = useTranslation();

    const { setShowModalUpdate } = useContext(ModalContextUpdate);
    const { actualizarRegionMunicipios } = useContext(RegionMunicipiosContext);
    const { municipiosList, getMunicipios } = useContext(MunicipiosContext);

     //dialog confirmacion
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
        actualizarRegionMunicipios(valores).then(response => {
            setOpenSnackbar(true);
             
            setMsjConfirmacion(`${t('msg.registroguardadoexitosamente')}`);
           
           const timer = setTimeout(() => {
        
            setError(false);
            setShowModalConfirmacion(false);
            setShowModalUpdate(false);
        
            }, 1500);
            return () => clearTimeout(timer);
        })
        .catch(err => {   
            setOpenSnackbar(true);
            setError(true);
            setMsjConfirmacion(`${t('msg.ocurrioerrorcalidarinfo')}`);
        });
    }


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
        confirmacionDialog(valores);
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
                                    <em>{t('cmb.ninguno')}</em>
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
                                {t('btn.guardar')}
                                </Button>
                            </Grid>


                        </DialogContent>
                        <ModalConfirmacion
                            handleRegistrar={handleRegistrar} evento="Editar"
                        />
                        <Mensaje
                            setOpen={setOpenSnackbar}
                            open={openSnackbar}
                            severity={error?"error":"success"}
                            message={msjConfirmacion}
                        />
                    </form>
                )
            }}
        </Formik>

    )
}
