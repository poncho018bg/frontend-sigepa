import React, { useContext } from 'react';
import { Button, Dialog, DialogContent, FormHelperText, Grid, TextField } from '@material-ui/core'
import { Formik } from 'formik';
import * as Yup from 'yup';
//import { ModuloContext } from 'contexts/moduloContext';
import {TiposApoyosContext} from 'contexts/catalogos/tiposApoyosContext';
import { ModalContextUpdate } from 'contexts/modalContexUpdate';


export const TipoApoyoEdit = ({ tipoApoyoSeleccionado }) => {

    const { setShowModalUpdate } = useContext(ModalContextUpdate);
    //const { actualizarModulo } = useContext(ModuloContext);
    const { actualizarTiposApoyos} = useContext(TiposApoyosContext);


    // Schema de validación
    const schemaValidacion = Yup.object({
        dstipoapoyo: Yup.string()
            .required('El modulo  es obligatorio')
    });

    const actualizarInfoTipoApoyo = async valores => {
        actualizarTiposApoyos(valores);
        setShowModalUpdate(false);
    }


    return (

        <Formik
            enableReinitialize
            initialValues={tipoApoyoSeleccionado}
            validationSchema={schemaValidacion}
            onSubmit={(valores) => {
                actualizarInfoTipoApoyo(valores)
            }}
        >

            {props => {
                return (


                    <form
                        className="bg-white shadow-md px-8 pt-6 pb-8 mb-4"
                        onSubmit={props.handleSubmit}>

                        <DialogContent>
                            <TextField
                                id="dstipoapoyo"
                                label="Desc. Tipo de Apoyo"
                                variant="outlined"
                                name="dstipoapoyo"
                                fullWidth
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                value={props.values.dstipoapoyo}
                            />
                            {props.touched.dstipoapoyo && props.errors.dstipoapoyo ? (
                                <FormHelperText error={props.errors.dstipoapoyo}>{props.errors.dstipoapoyo}</FormHelperText>
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