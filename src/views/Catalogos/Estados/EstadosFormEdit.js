import React, { useContext, useState } from 'react';
import { Button, DialogContent, FormHelperText, Grid, TextField } from '@material-ui/core'
import { Formik } from 'formik';
import * as Yup from 'yup';
import { ModalContextUpdate } from 'contexts/modalContexUpdate';
import { EstadosContext } from 'contexts/catalogos/EstadosContext';

import { ModalConfirmacion } from 'commons/ModalConfirmacion';
import { ModalContextConfirmacion } from 'contexts/modalContextConfirmacion';
import { Mensaje } from 'components/Personalizados/Mensaje';

export const EstadosFormEdit = ({ estadoSeleccionada }) => {


    const { setShowModalUpdate } = useContext(ModalContextUpdate);
    const { actualizarEstados } = useContext(EstadosContext);

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
        actualizarEstados(valores).then(response => {
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
        noestado: Yup.string()
            .required('El num. de estado  es obligatorio'),
        dsestado: Yup.string()
            .required('La desc. del estado es obligatorio')
    });

    const actualizarInfoEstado = async valores => {
        confirmacionDialog(valores);
    }

    return (

        <Formik
            enableReinitialize
            initialValues={estadoSeleccionada}
            validationSchema={schemaValidacion}
            onSubmit={(valores) => {
                actualizarInfoEstado(valores)
            }}
        >

            {props => {
                return (


                    <form
                        className="bg-white shadow-md px-8 pt-6 pb-8 mb-4"
                        onSubmit={props.handleSubmit}>

                        <DialogContent>
                            <TextField
                                id="noestado"
                                label="Num. estado"
                                variant="outlined"
                                name="noestado"
                                inputProps={{ maxLength: "2" }}
                                fullWidth
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                value={props.values.noestado}
                            />
                            {props.touched.noestado && props.errors.noestado ? (
                                <FormHelperText error={props.errors.noestado}>{props.errors.noestado}</FormHelperText>
                            ) : null}
                        </DialogContent>
                        <DialogContent>

                            <TextField
                            fullWidth
                                id="dsestado"
                                label="Desc. estado"
                                variant="outlined"
                                name="dsestado"
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                value={props.values.dsestado}
                            />

                            {props.touched.dsestado && props.errors.dsestado ? (
                                <FormHelperText error={props.errors.dsestado}>{props.errors.dsestado}</FormHelperText>
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
