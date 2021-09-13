import React, { useContext, useEffect } from 'react';
import { Button, DialogContent, FormHelperText, Grid, MenuItem, TextField } from '@material-ui/core'
import { Formik } from 'formik';
import * as Yup from 'yup';
import { ModalContextUpdate } from 'contexts/modalContexUpdate';
import { MunicipiosContext } from 'contexts/catalogos/MunicipiosContext';
import { EstadosContext } from 'contexts/catalogos/EstadosContext';

export const MunicipioFormEdit = ({ municipioSeleccionada }) => {


    const { setShowModalUpdate } = useContext(ModalContextUpdate);

    const { actualizarMunicipios } = useContext(MunicipiosContext);
    const { getEstados, estadosList, getEstadoByIdHetoas, estado } = useContext(EstadosContext);

    // Schema de validación
    const schemaValidacion = Yup.object({
        dsclavemunicipio: Yup.string()
            .required('La clave es obligatorio'),
        dsmunicipio: Yup.string()
            .required('El municipio es obligatorio'),
        estadoId: Yup.string()
            .required('El Estado es obligatorio')
    });

    const actualizarInfoMunicipio = async valores => {
        actualizarMunicipios(valores);
        setShowModalUpdate(false);
    }
    useEffect(() => {
        const { _links: { estadoId: { href } } } = municipioSeleccionada
        getEstadoByIdHetoas(href);


    }, []);

    useEffect(() => {
        console.log('ESTADO=>', estado)


    }, [estado]);

    useEffect(() => {
        getEstados();

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
                                id="estadoId"
                                variant="outlined"
                                label="Selecciona un estado"
                                select
                                fullWidth
                                name="estadoId"                                
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                value={props.values.estadoId}
                            >
                                <MenuItem value="0">
                                    <em>Ninguno</em>
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
                            {props.touched.estadoId && props.errors.estadoId ? (
                                <FormHelperText error={props.errors.estadoId}>{props.errors.estadoId}</FormHelperText>
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
