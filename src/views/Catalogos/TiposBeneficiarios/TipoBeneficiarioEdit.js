import React, { useContext, useState } from 'react';
import { Button, DialogContent, FormHelperText, Grid, TextField } from '@material-ui/core'
import { Formik } from 'formik';
import * as Yup from 'yup';
import { TiposBeneficiariosContext } from 'contexts/catalogos/tiposBeneficiariosContext';
import { ModalContextUpdate } from 'contexts/modalContexUpdate';

import { ModalConfirmacion } from 'commons/ModalConfirmacion';
import { ModalContextConfirmacion } from 'contexts/modalContextConfirmacion';
import { Mensaje } from 'components/Personalizados/Mensaje';
import { useTranslation } from 'react-i18next';

export const TipoBeneficiarioEdit = ({ tipoBeneficiarioSeleccionado }) => {
    const { t } = useTranslation();
    const { setShowModalUpdate } = useContext(ModalContextUpdate);
    const { actualizarTiposBeneficiarios } = useContext(TiposBeneficiariosContext);
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
        console.log("Aqui hace el llamado al dialog", e);
        setShowModalConfirmacion(true);
        setValores(e)
    }

    /**
     * Edita el elemento
     */
    const handleRegistrar = () => {   

        actualizarTiposBeneficiarios(valores).then(response => {
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
        dstipobeneficiario: Yup.string()
            .required('El modulo  es obligatorio')
    });

    const actualizarInfoTipoBeneficiario = async valores => {
        confirmacionDialog(valores);
    }


    return (

        <Formik
            enableReinitialize
            initialValues={tipoBeneficiarioSeleccionado}
            validationSchema={schemaValidacion}
            onSubmit={(valores) => {
                actualizarInfoTipoBeneficiario(valores)
            }}
        >

            {props => {
                return (


                    <form
                        className="bg-white shadow-md px-8 pt-6 pb-8 mb-4"
                        onSubmit={props.handleSubmit}>

                        <DialogContent>
                            <TextField
                                id="dstipobeneficiario"
                                label="Desc. Tipo de Beneficiario"
                                variant="outlined"
                                name="dstipobeneficiario"
                                fullWidth
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                value={props.values.dstipobeneficiario}
                            />
                            {props.touched.dstipobeneficiario && props.errors.dstipobeneficiario ? (
                                <FormHelperText error={props.errors.dstipobeneficiario}>{props.errors.dstipobeneficiario}</FormHelperText>
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