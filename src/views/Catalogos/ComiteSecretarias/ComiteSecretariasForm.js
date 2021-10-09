import { Button, DialogContent, FormHelperText, Grid, TextField } from '@material-ui/core'
import React, { useContext, useState } from 'react';

import { useFormik } from 'formik'
import * as Yup from 'yup'
import { ComiteSecretariasContext } from 'contexts/catalogos/comiteSecretariasContext';
import { ModalContext } from 'contexts/modalContex';

import { ModalConfirmacion } from 'commons/ModalConfirmacion';
import { ModalContextConfirmacion } from 'contexts/modalContextConfirmacion';
import { useTranslation } from 'react-i18next';
export const ComiteSecretariasForm = () => {
    const { t } = useTranslation();
    const { registrarComiteSecretarias } = useContext(ComiteSecretariasContext);
    const { setShowModal } = useContext(ModalContext);

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
        const { dssecretaria } = valores

        console.log(dssecretaria);


        let comitesSecretaria = {
            dssecretaria: dssecretaria,
            boactivo: true
        }
        registrarComiteSecretarias(comitesSecretaria);
        setShowModalConfirmacion(false);
        setShowModal(false);

    }

    const formik = useFormik({
        initialValues: {
            dssecretaria: ''
        },
        validationSchema: Yup.object({
            dssecretaria: Yup.string()
                .required('El modulo  es obligatorio')

        }),
        onSubmit: async valores => {
            confirmacionDialog(valores);
        }
    })


    return (
        <form
            onSubmit={formik.handleSubmit}
        >
            <DialogContent>
                <TextField
                    id="dssecretaria"
                    label="Desc. comites de secretaría"
                    variant="outlined"
                    name="dssecretaria"
                    fullWidth
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.dssecretaria}
                />
                {formik.touched.dssecretaria && formik.errors.dssecretaria ? (
                    <FormHelperText error={formik.errors.dssecretaria}>{formik.errors.dssecretaria}</FormHelperText>
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
}