import React, { useContext, useSate } from 'react';
import { Button, DialogContent, FormHelperText, Grid, TextField } from '@material-ui/core'
import { Formik } from 'formik';
import * as Yup from 'yup';
import { TiposApoyosContext } from 'contexts/catalogos/tiposApoyosContext';
import { ModalContextUpdate } from 'contexts/modalContexUpdate';

import { ModalConfirmacion } from 'commons/ModalConfirmacion';
import { ModalContextConfirmacion } from 'contexts/modalContextConfirmacion';


export const TipoApoyoEdit = ({ tipoApoyoSeleccionado }) => {

    const { setShowModalUpdate } = useContext(ModalContextUpdate);
    const { actualizarTiposApoyos } = useContext(TiposApoyosContext);

    //dialog confirmacion
    const [valores, setValores] = useState();
    const { setShowModalConfirmacion } = useContext(ModalContextConfirmacion);
    /**
     * abre el dialogo de confirmación
     * @param {valores} e 
     */
    const confirmacionDialog = (e) => {
        console.log("Aqui hace el llamado al dialog", e);
        setShowModalConfirmacion(true);
        setValores(e)
    }

    /**
     * Edita el elemento
     */
    const handleRegistrar = () => {
        actualizarTiposApoyos(valores);
        setShowModalConfirmacion(false);
        setShowModalUpdate(false);
    }


    // Schema de validación
    const schemaValidacion = Yup.object({
        dstipoapoyo: Yup.string()
            .required('El modulo  es obligatorio')
    });

    const actualizarInfoTipoApoyo = async valores => {
        confirmacionDialog(valores);
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
                        <ModalConfirmacion
                            handleRegistrar={handleRegistrar} evento="Editar"
                        />
                    </form>
                )
            }}
        </Formik>

    )

}