import React, { useContext, useEffect, useState } from 'react';
import { Button, DialogContent, FormHelperText, Grid, MenuItem, TextField } from '@material-ui/core'
import { Formik } from 'formik';
import * as Yup from 'yup';
import { ModalContextUpdate } from 'contexts/modalContexUpdate';
import { MunicipiosContext } from 'contexts/catalogos/MunicipiosContext';

import { ModalConfirmacion } from 'commons/ModalConfirmacion';
import { ModalContextConfirmacion } from 'contexts/modalContextConfirmacion';
import { LocalidadesContext } from 'contexts/catalogos/Localidades/localidadesContext';
import { useTranslation } from 'react-i18next';

export const LocalidadEdit = ({ objetoActualizar }) => {
    const { t } = useTranslation();
    const { setShowModalUpdate,showModalUpdate } = useContext(ModalContextUpdate);
    const { actualizar,getByID,localidad } = useContext(LocalidadesContext);
    const { getMunicipioByIdHetoas,municipio } = useContext(MunicipiosContext);

    const [valores, setValores] = useState();
    const { setShowModalConfirmacion } = useContext(ModalContextConfirmacion);
    
    useEffect(() => {
        if(objetoActualizar){
            getByID(objetoActualizar.id);
            getMunicipioByIdHetoas(objetoActualizar._links.municipios.href);
        }
    }, [showModalUpdate])


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
        actualizar(valores, localidad,municipio);
        setShowModalConfirmacion(false);
        setShowModalUpdate(false);
    }

    // Schema de validación
    const schemaValidacion = Yup.object({
            dsidlocalidad: Yup.string()
                .required(`${t('msg.idlocalidadobligatorio')}`),
            dsclavelocalidad: Yup.string()
                .required(`${t('msg.clavelocalidadobligatoria')}`),
            idMunicipio: Yup.string()
                .required(`${t('msg.municipioobligatorio')}`),
            dslocalidad: Yup.string()
                .required(`${t('msg.localidadobligatoria')}`),
            dscodigopostal: Yup.string()
                .required(`${t('msg.cpobligatorio')}`)
    });

    const actualizarInfo = async valores => {
        confirmacionDialog(valores);
    }


    return (

        <Formik
            enableReinitialize
            initialValues={localidad}
            validationSchema={schemaValidacion}
            onSubmit={(valores) => {
                console.log('valores');   
                console.log(valores);
                actualizarInfo(valores)
            }}
        >

            {props => {
                return (


                    <form
                        className="bg-white shadow-md px-8 pt-6 pb-8 mb-4"
                        onSubmit={props.handleSubmit}>

                        <DialogContent>
                            <TextField
                                id="dsidlocalidad"
                                label={t('lbl.localidadesid')}
                                variant="outlined"
                                name="dsidlocalidad"
                                fullWidth
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                value={props.values?.dsidlocalidad}
                            />
                              {props.touched.dsidlocalidad && props.errors.dsidlocalidad ? (
                                <FormHelperText error={props.errors.dsidlocalidad}>{props.errors.dsidlocalidad}</FormHelperText>
                            ) : null}
                        </DialogContent>


                        <DialogContent>
                            <TextField
                                id="dsclavelocalidad"
                                label={t('lbl.clavelocalidad')}
                                variant="outlined"
                                name="dsclavelocalidad"
                                fullWidth
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                value={props.values?.dsclavelocalidad}
                            />
                            {props.touched.dsclavelocalidad && props.errors.dsclavelocalidad ? (
                                <FormHelperText error={props.errors.dsclavelocalidad}>{props.errors.dsclavelocalidad}</FormHelperText>
                            ) : null}
                        </DialogContent>

                       

                        {/* <DialogContent>
                            <TextField
                                variant="outlined"
                                label={t('cmb.seleccionamunicipio')}
                                select
                                fullWidth
                                id="idMunicipio"
                                name="idMunicipio"
                                value={props.values.idMunicipio}
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                            >
                                <MenuItem value="0">
                                    <em>Ninguno</em>
                                </MenuItem>
                                {
                                    municipiosListId.map(
                                        item => (
                                            <MenuItem
                                                key={item.id}
                                                value={item.id}>
                                                {item.dsMunicipio}
                                            </MenuItem>
                                        )
                                    )
                                }

                            </TextField>
                            {props.touched.idMunicipio && props.errors.idMunicipio ? (
                                <FormHelperText error={props.errors.idMunicipio}>{props.errors.idMunicipio}</FormHelperText>
                            ) : null}
                        </DialogContent> */}

                        <DialogContent>
                            <TextField
                                id="dslocalidad"
                                label={t('lbl.localidad')}
                                variant="outlined"
                                name="dslocalidad"
                                fullWidth
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                value={props.values?.dslocalidad}
                            />
                            {props.touched.dslocalidad && props.errors.dslocalidad ? (
                                <FormHelperText error={props.errors.dslocalidad}>{props.errors.dslocalidad}</FormHelperText>
                            ) : null}
                        </DialogContent>


                        <DialogContent>
                            <TextField
                                id="dscodigopostal"
                                label={t('lbl.cp')}
                                variant="outlined"
                                name="dscodigopostal"
                                fullWidth
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                value={props.values?.dscodigopostal}
                            />
                            {props.touched.dscodigopostal && props.errors.dscodigopostal ? (
                                <FormHelperText error={props.errors.dscodigopostal}>{props.errors.dscodigopostal}</FormHelperText>
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
                    </form>
                )
            }}
        </Formik>

    )

}