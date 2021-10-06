import { Button, DialogContent, FormHelperText, Grid, TextField } from '@material-ui/core'
import React, { useContext, useState } from 'react';

import { useFormik } from 'formik'
import * as Yup from 'yup'
import { TiposApoyosContext } from 'contexts/catalogos/tiposApoyosContext';
import { ModalContext } from 'contexts/modalContex';

import { ModalConfirmacion } from 'commons/ModalConfirmacion';
import { ModalContextConfirmacion } from 'contexts/modalContextConfirmacion';
import { Mensaje } from 'components/Personalizados/Mensaje';

export const TipoApoyoForm = () => {

    const { registrarTiposApoyos } = useContext(TiposApoyosContext);
    const { setShowModal } = useContext(ModalContext);

    //dialog confirmar
    const [valores, setValores] = useState();
    const { setShowModalConfirmacion } = useContext(ModalContextConfirmacion);

    const [error, setError] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [msjConfirmacion, setMsjConfirmacion] = useState('');

    const confirmacionDialog = (e) => {
        console.log("Aqui hace el llamado al dialog", e);
        setShowModalConfirmacion(true);
        setValores(e)
    }

    const handleRegistrar = () => {
        const { dstipoapoyo } = valores

            console.log(dstipoapoyo);


            let tiposApoyo = {
                dstipoapoyo: dstipoapoyo,
                boactivo: true
            }
            registrarTiposApoyos(tiposApoyo).then(response => {
                setOpenSnackbar(true);
                 
                setMsjConfirmacion(`El registro ha sido guardado exitosamente `  );
               
               const timer = setTimeout(() => {
            
                setError(false);
                setShowModalConfirmacion(false);
                setShowModal(false);
            
                }, 2000);
                return () => clearTimeout(timer);
            })
            .catch(err => {   
                setOpenSnackbar(true);
                setError(true);
                setMsjConfirmacion(`Ocurrio un error, ${err}`  );
            });;        ;
    }


    const formik = useFormik({
        initialValues: {
            dstipoapoyo: ''
        },
        validationSchema: Yup.object({
            dstipoapoyo: Yup.string()
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
                    id="dstipoapoyo"
                    label="Desc. tipo de apoyo"
                    variant="outlined"
                    name="dstipoapoyo"
                    fullWidth
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.dstipoapoyo}
                />
                {formik.touched.dstipoapoyo && formik.errors.dstipoapoyo ? (
                    <FormHelperText error={formik.errors.dstipoapoyo}>{formik.errors.dstipoapoyo}</FormHelperText>
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
                handleRegistrar={handleRegistrar} evento="Registrar"
            />
             <Mensaje
                setOpen={setOpenSnackbar}
                open={openSnackbar}
                severity={error?"error":"success"}
                message={msjConfirmacion}
            />
        </form>

    )
}