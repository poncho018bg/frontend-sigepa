import { Button, DialogContent, FormHelperText, Grid, TextField } from '@material-ui/core'
import React, { useContext,useState } from 'react';

import { useFormik } from 'formik'
import * as Yup from 'yup'
import { ModuloContext } from 'contexts/moduloContext';
import { ModalContext } from 'contexts/modalContex';
import UserService from "../../servicios/UserService";
import { ModalConfirmacion } from 'commons/ModalConfirmacion';
import { ModalContextConfirmacion } from 'contexts/modalContextConfirmacion';

export const ModuloForm = () => {

    const { registrarModulos } = useContext(ModuloContext);
    const { setShowModal } = useContext(ModalContext);

    //dialog confirmacion
    const [valores, setValores] = useState();
    const { setShowModalConfirmacion } = useContext(ModalContextConfirmacion);

    const confirmacionDialog = (e) => {
        console.log("Aqui hace el llamado al dialog", e);
        setShowModalConfirmacion(true);
        setValores(e)
    }

    const formik = useFormik({
        initialValues: {
            dsmodulo: '',
            usuarioCreacionId: UserService.getIdUSuario()
        },
        validationSchema: Yup.object({
            dsmodulo: Yup.string()
                .required('El modulo  es obligatorio')

        }),
        onSubmit: async valores => {

            confirmacionDialog(valores);

        }


    })

    const handleRegistrar = () => {
        const { dsmodulo } = valores

        console.log(dsmodulo);


        let module = {
            dsmodulo: dsmodulo,
            usuarioCreacionId: `${process.env.REACT_APP_API_URL}/usuario/${UserService.getIdUSuario()}`,
            boactivo: true,
            'SubModulos': []
        }
        registrarModulos(module);
        setShowModalConfirmacion(false);
        setShowModal(false);

    }


    return (
        <form
            onSubmit={formik.handleSubmit}
        >
            <DialogContent>
                <TextField
                    id="dsmodulo"
                    label="Desc. modulo"
                    variant="outlined"
                    name="dsmodulo"
                    fullWidth
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.dsmodulo}
                />
                {formik.touched.dsmodulo && formik.errors.dsmodulo ? (
                    <FormHelperText error={formik.errors.dsmodulo}>{formik.errors.dsmodulo}</FormHelperText>
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
        </form>

    )
}