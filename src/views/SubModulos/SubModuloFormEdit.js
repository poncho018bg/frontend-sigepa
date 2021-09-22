import React, { useContext, useEffect } from 'react';
import { Button, DialogContent, FormHelperText, Grid, MenuItem, TextField } from '@material-ui/core'
import { Formik } from 'formik';
import * as Yup from 'yup';
import { SubModuloContext } from 'contexts/subModuloContext';
import { ModalContextUpdate } from 'contexts/modalContexUpdate';
import { ModuloContext } from 'contexts/moduloContext';


export const SubModuloFormEdit = ({ subModuloSeleccionado }) => {

    const { setShowModalUpdate } = useContext(ModalContextUpdate);
    const { actualizarSubModulo } = useContext(SubModuloContext);
    const { getModulos, moduloList } = useContext(ModuloContext);


    // Schema de validación
    const schemaValidacion = Yup.object({
        dssubmodulo: Yup.string()
            .required('El submodulo  es obligatorio'),
        crcModulosCollection: Yup.string()
            .required('El modulo  es obligatorio')

    });

    const actualizarInfoSubModulo = async valores => {
        console.log('1.->',valores)
        actualizarSubModulo(valores);
        setShowModalUpdate(false);
    }

    useEffect(() => {
        getModulos()

    }, [])


    return (

        <Formik
            enableReinitialize
            initialValues={subModuloSeleccionado}
            validationSchema={schemaValidacion}
            onSubmit={(valores) => {
                actualizarInfoSubModulo(valores)
            }}
        >

            {props => {

                return (


                    <form
                        className="bg-white shadow-md px-8 pt-6 pb-8 mb-4"
                        onSubmit={props.handleSubmit}>

                        <DialogContent>
                            <TextField
                                id="crcModulosCollection"
                                variant="outlined"
                                label="Selecciona un modulo"
                                select
                                fullWidth
                                error={props.errors.crcModulosCollection}
                                name="crcModulosCollection"
                                value={props.values.crcModulosCollection}
                                onChange={props.handleChange}
                            >
                                <MenuItem value="0">
                                    <em>Ninguno</em>
                                </MenuItem>
                                {
                                    moduloList.map(
                                        item => (
                                            <MenuItem
                                                key={item.id}
                                                value={item.id}>
                                                {item.dsmodulo}
                                            </MenuItem>
                                        )
                                    )
                                }

                            </TextField>
                            {props.touched.crcModulosCollection && props.errors.crcModulosCollection ? (
                                <FormHelperText error={props.errors.crcModulosCollection}>{props.errors.crcModulosCollection}</FormHelperText>
                            ) : null}
                        </DialogContent>

                        <DialogContent>
                            <TextField
                                id="dssubmodulo"
                                label="Desc. submodulo"
                                variant="outlined"
                                name="dssubmodulo"
                                fullWidth
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                value={props.values.dssubmodulo}
                            />
                            {props.touched.dssubmodulo && props.errors.dssubmodulo ? (
                                <FormHelperText error={props.errors.dssubmodulo}>{props.errors.dssubmodulo}</FormHelperText>
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