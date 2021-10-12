import React, { useContext, useEffect, useState } from 'react';
import { Button, DialogContent, FormHelperText, Grid, MenuItem, TextField } from '@material-ui/core'
import { Formik } from 'formik';
import * as Yup from 'yup';
import { ModalContextUpdate } from 'contexts/modalContexUpdate';
import { MunicipiosContext } from 'contexts/catalogos/MunicipiosContext';
import { EstadosContext } from 'contexts/catalogos/EstadosContext';

import { ModalConfirmacion } from 'commons/ModalConfirmacion';
import { ModalContextConfirmacion } from 'contexts/modalContextConfirmacion';
import { Mensaje } from 'components/Personalizados/Mensaje';
import { useTranslation } from 'react-i18next';
export const MunicipioFormEdit = ({ municipioSeleccionada }) => {
    const { t } = useTranslation();
    const { setShowModalUpdate } = useContext(ModalContextUpdate);
    const { actualizarMunicipios } = useContext(MunicipiosContext);

    const { getTodosEstados, estadosList, getEstadoByIdHetoas, estado } = useContext(EstadosContext);
    //dialog confirmacion
    const [valores, setValores] = useState();
    const { setShowModalConfirmacion } = useContext(ModalContextConfirmacion);


    const [error, setError] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [msjConfirmacion, setMsjConfirmacion] = useState('');

    /**
     * abre el dialogo de confirmación
     * @param {valores} e 
     */
    const confirmacionDialog = (e) => {
        setShowModalConfirmacion(true);       
        setValores(e)
    }

    /**
     * Edita el elemento
     */
    const handleRegistrar = () => {
        actualizarMunicipios(valores).then(response => {
            setOpenSnackbar(true);
             
            setMsjConfirmacion(`El registro ha sido actualizado exitosamente `  );
           
           const timer = setTimeout(() => {
        
            setError(false);
            setShowModalConfirmacion(false);
            setShowModalUpdate(false);
        
            }, 2000);
            return () => clearTimeout(timer);
        })
        .catch(err => {   
            setOpenSnackbar(true);
            setError(true);
            setMsjConfirmacion(`Ocurrio un error, ${err}`  );

            setShowModalConfirmacion(false);
            setShowModalUpdate(false);
        });
    }

    // Schema de validación
    const schemaValidacion = Yup.object({
        dsclavemunicipio: Yup.string()
            .required('La clave es obligatorio'),
        dsmunicipio: Yup.string()
            .required('El municipio es obligatorio'),        
    });

    const actualizarInfoMunicipio = async valores => {
        confirmacionDialog(valores);
    }

    useEffect(() => {
        const { _links: { estadoId: { href } } } = municipioSeleccionada
        getEstadoByIdHetoas(href);


    }, []);

    useEffect(() => {
        console.log('ESTADO=>', estado)


    }, [estado]);

    useEffect(() => {
        getTodosEstados();

    }, [municipioSeleccionada]);

    return (

        <Formik
            enableReinitialize
            initialValues={municipioSeleccionada}
            validationSchema={schemaValidacion}
            onSubmit={(valores) => {
                actualizarInfoMunicipio(valores)
            }}
        >

            {props => {
                return (
                

                    <form
                        className="bg-white shadow-md px-8 pt-6 pb-8 mb-4"
                        onSubmit={props.handleSubmit}>                          
                        <DialogContent>
                            <TextField
                                id="idEstado"
                                variant="outlined"
                                label="Selecciona un estado"
                                select
                                fullWidth
                                name="idEstado"
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                value={props.values.idEstado}
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
                            {props.touched.idEstado && props.errors.idEstado ? (
                                <FormHelperText error={props.errors.idEstado}>{props.errors.idEstado}</FormHelperText>
                            ) : null}
                        </DialogContent>

                        <DialogContent>
                            <TextField
                                id="dsclavemunicipio"
                                label="Clave municipio"
                                variant="outlined"
                                name="dsclavemunicipio"
                                fullWidth
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                value={props.values.dsclavemunicipio}
                            />
                            {props.touched.dsclavemunicipio && props.errors.dsclavemunicipio ? (
                                <FormHelperText error={props.errors.dsclavemunicipio}>{props.errors.dsclavemunicipio}</FormHelperText>
                            ) : null}
                        </DialogContent>

                        <DialogContent>
                            <TextField
                                id="dsmunicipio"
                                label="Municipio"
                                variant="outlined"
                                name="dsmunicipio"
                                fullWidth
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                value={props.values.dsmunicipio}
                            />
                            {props.touched.dsmunicipio && props.errors.dsmunicipio ? (
                                <FormHelperText error={props.errors.dsmunicipio}>{props.errors.dsmunicipio}</FormHelperText>
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
