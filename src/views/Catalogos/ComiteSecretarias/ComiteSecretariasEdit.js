import React, { useContext, useState } from 'react';
import { Button, DialogContent, FormHelperText, Grid, TextField } from '@material-ui/core'
import { Formik } from 'formik';
import * as Yup from 'yup';
import { ComiteSecretariasContext } from 'contexts/catalogos/comiteSecretariasContext';
import { ModalContextUpdate } from 'contexts/modalContexUpdate';

import { ModalConfirmacion } from 'commons/ModalConfirmacion';
import { ModalContextConfirmacion } from 'contexts/modalContextConfirmacion';
import { useTranslation } from 'react-i18next';

export const ComiteSecretariasEdit = ({ comiteSecretariasSeleccionado }) => {
    const { t } = useTranslation();
    const { setShowModalUpdate } = useContext(ModalContextUpdate);
    const { actualizarComiteSecretarias } = useContext(ComiteSecretariasContext);

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

    const handleRegistrar = () => {
        actualizarComiteSecretarias(valores);
        setShowModalConfirmacion(false);
        setShowModalUpdate(false);
    }


    // Schema de validación
    const schemaValidacion = Yup.object({
        dssecretaria: Yup.string()
            .required('El modulo  es obligatorio')
    });

    const actualizarInfoComiteSecretarias = async valores => {
        confirmacionDialog(valores);
    }


    return (

        <Formik
            enableReinitialize
            initialValues={comiteSecretariasSeleccionado}
            validationSchema={schemaValidacion}
            onSubmit={(valores) => {
                actualizarInfoComiteSecretarias(valores)
            }}
        >

            {props => {
                return (


                    <form
                        className="bg-white shadow-md px-8 pt-6 pb-8 mb-4"
                        onSubmit={props.handleSubmit}>

                        <DialogContent>
                            <TextField
                                id="dssecretaria"
                                label="Desc. comites de secretaría"
                                variant="outlined"
                                name="dssecretaria"
                                fullWidth
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                value={props.values.dssecretaria}
                            />
                            {props.touched.dssecretaria && props.errors.dssecretaria ? (
                                <FormHelperText error={props.errors.dssecretaria}>{props.errors.dssecretaria}</FormHelperText>
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