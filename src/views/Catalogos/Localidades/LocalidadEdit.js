import React, { useContext, useState } from 'react';
import { Button,  DialogContent, FormHelperText, Grid, MenuItem, TextField } from '@material-ui/core'
import { Formik } from 'formik';
import * as Yup from 'yup';
import { ModalContextUpdate } from 'contexts/modalContexUpdate';
import { CursosCapacitacionesContext } from 'contexts/catalogos/CursosCapacitaciones/cursosCapacitacionesContext';
import { MunicipiosContext } from 'contexts/catalogos/MunicipiosContext';


export const LocalidadEdit = ({objetoActualizar}) => {
    const { setShowModalUpdate } = useContext(ModalContextUpdate);
 
    const { actualizar} = useContext(CursosCapacitacionesContext);
    const { municipiosList } = useContext(MunicipiosContext);

    // Schema de validación
    const schemaValidacion = Yup.object({
        dsestado: Yup.string()
            .required('El curso  es obligatorio')
    });

    const actualizarInfo= async valores => {
        actualizar(valores);
        setShowModalUpdate(false);
    }


    return (

        <Formik
            enableReinitialize
            initialValues={objetoActualizar}
            validationSchema={schemaValidacion}
            onSubmit={(valores) => {
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
                                label="Curso"
                                variant="outlined"
                                name="dsidlocalidad"
                                fullWidth
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                value={props.values?.dsidlocalidad}
                            />
                           
                        </DialogContent>


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


            <DialogContent>
                <TextField
                    variant="outlined"
                    label="Selecciona un municipio"
                    select
                    fullWidth
                    name="idMunicipio"
                    value={props.values?.idMunicipio}
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