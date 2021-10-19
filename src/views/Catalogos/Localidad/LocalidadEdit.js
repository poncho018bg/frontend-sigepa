import React, { useContext, useState,useEffect } from 'react';
import { Button, DialogContent, FormHelperText, Grid, MenuItem, TextField } from '@material-ui/core'
import { Formik } from 'formik';
import * as Yup from 'yup';
import { ModalContextUpdate } from 'contexts/modalContexUpdate';

import { ModalConfirmacion } from 'commons/ModalConfirmacion';
import { ModalContextConfirmacion } from 'contexts/modalContextConfirmacion';
import { Mensaje } from 'components/Personalizados/Mensaje';
import { useTranslation } from 'react-i18next';
import { LocalidadesContext } from 'contexts/catalogos/Localidades/localidadesContext';
import { MunicipiosContext } from 'contexts/catalogos/MunicipiosContext';

export const LocalidadEdit = ({ objetoActualizar }) => {
    const { t } = useTranslation();
    const { setShowModalUpdate } = useContext(ModalContextUpdate);
    const { actualizar, getByID, localidad } = useContext(LocalidadesContext);
    
    const { municipiosList ,getMunicipiosAll} = useContext(MunicipiosContext);

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

    useEffect(() => {
        getMunicipiosAll();
    }, []);

    /**
    * Edita el elemento
    */
    const handleRegistrar = () => {
        console.log('handleRegistrar')

        actualizar(valores).then(response => {
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

            setShowModalConfirmacion(false);
            setShowModalUpdate(false);
        });
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
        console.log('actualizarInfo')
    }


    return (

        <Formik
            enableReinitialize
            initialValues={objetoActualizar}
            
            onSubmit={(valores) => {
                actualizarInfo(valores)
            }}
        >

            {props => {
                return (


                    <form
                        className="bg-white shadow-md px-8 pt-6 pb-8 mb-4"
                        onSubmit={props.handleSubmit}>
                           {console.log(schemaValidacion)}
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



                         <DialogContent>
                            <TextField
                                variant="outlined"
                                label={t('cmb.seleccionamunicipio')}
                                select
                                fullWidth
                                id="municipio_id"
                                name="municipio_id"
                                value={props.values.municipio_id}
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
                            {props.touched.municipio_id && props.errors.municipio_id ? (
                                <FormHelperText error={props.errors.municipio_id}>{props.errors.municipio_id}</FormHelperText>
                            ) : null}
                        </DialogContent> 

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
                        <Mensaje
                            setOpen={setOpenSnackbar}
                            open={openSnackbar}
                            severity={error ? "error" : "success"}
                            message={msjConfirmacion}
                        />
                    </form>
                )
            }}
        </Formik>

    )
}