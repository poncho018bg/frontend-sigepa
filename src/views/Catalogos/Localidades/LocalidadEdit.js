import React, { useContext, useEffect, useState } from 'react';
import { Button, DialogContent, FormHelperText, Grid, MenuItem, TextField } from '@material-ui/core'
import { Formik } from 'formik';
import * as Yup from 'yup';
import { ModalContextUpdate } from 'contexts/modalContexUpdate';
import { MunicipiosContext } from 'contexts/catalogos/MunicipiosContext';

import { ModalConfirmacion } from 'commons/ModalConfirmacion';
import { ModalContextConfirmacion } from 'contexts/modalContextConfirmacion';
import { LocalidadesContext } from 'contexts/catalogos/Localidades/localidadesContext';


export const LocalidadEdit = ({ objetoActualizar }) => {
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
                .required('El id de localidad es obligatorio'),
            dsclavelocalidad: Yup.string()
                .required('La clave localidad es obligatoria'),
            idMunicipio: Yup.string()
                .required('El municipio es obligatorio'),
            dslocalidad: Yup.string()
                .required('La localidad es obligatoria'),
            dscodigopostal: Yup.string()
                .required('El código postal es obligatorio')
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
                                label="Id Localidad"
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
                                label="Clave Localidad"
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
                                label="Selecciona un municipio"
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
                                label=" Localidad"
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
                                label=" CP"
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
                                Guardar
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