import { Button, DialogContent, FormHelperText, Grid, TextField } from '@material-ui/core'
import React, { useContext, useState } from 'react';

import { useFormik } from 'formik'
import * as Yup from 'yup'
import { EdadesBeneficiariosContext } from 'contexts/catalogos/edadesBeneficiariosContext';
import { ModalContext } from 'contexts/modalContex';

import { ModalConfirmacion } from 'commons/ModalConfirmacion';
import { ModalContextConfirmacion } from 'contexts/modalContextConfirmacion';
import { Mensaje } from 'components/Personalizados/Mensaje';
import { useTranslation } from 'react-i18next';
export const EdadesBeneficiariosForm = () => {
    const { t } = useTranslation();
    const { registrarEdadesBeneficiarios } = useContext(EdadesBeneficiariosContext);
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
        const { dsedadbeneficiario, norangominimo, norangomaximo} = valores

        console.log(dsedadbeneficiario);


        let edadesBeneficiarios = {
            dsedadbeneficiario: dsedadbeneficiario,
            boactivo: true,
            norangominimo:norangominimo,
            norangomaximo:norangomaximo
        }
        registrarEdadesBeneficiarios(edadesBeneficiarios).then(response => {
            setOpenSnackbar(true);
             
            setMsjConfirmacion(`${t('msg.registroguardadoexitosamente')}`);
           
           const timer = setTimeout(() => {
        
            setError(false);
            setShowModalConfirmacion(false);
            setShowModal(false);
        
            }, 1500);
            return () => clearTimeout(timer);
        })
        .catch(err => {   
            console.log('err',err)
            setOpenSnackbar(true);
            setError(true);
            setMsjConfirmacion(`${t('msg.ocurrioerrorcalidarinfo')}`);
        });
    }

    const formik = useFormik({
        initialValues: {
            dsedadbeneficiario: '',
            norangominimo:0,
            norangomaximo:0,
        },
        validationSchema: Yup.object({
            dsedadbeneficiario: Yup.string()
                .required('El modulo  es obligatorio')
                .matches(/^[a-zA-Z0-9_.-\sñÑ]*$/, `${t('msg.nocarateresespeciales')}`),
                norangominimo: Yup.number().required('Rango de edad es obligatorio'),
                norangomaximo: Yup.number().required('Rango de edad es obligatorio')

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
                    id="dsedadbeneficiario"
                    label="Desc. edad beneficiarios"
                    variant="outlined"
                    name="dsedadbeneficiario"
                    fullWidth
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.dsedadbeneficiario}
                    inputProps={{ maxLength: 80 }}
                />
                {formik.touched.dsedadbeneficiario && formik.errors.dsedadbeneficiario ? (
                    <FormHelperText error={formik.errors.dsedadbeneficiario}>{formik.errors.dsedadbeneficiario}</FormHelperText>
                ) : null}
            </DialogContent>

            <DialogContent>
                <TextField
                    id="norangominimo"
                    label="Rango de edad mínimo"
                    variant="outlined"
                    name="norangominimo"
                    fullWidth
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.norangominimo}
                    
                />
                {formik.touched.norangominimo && formik.errors.norangominimo ? (
                    <FormHelperText error={formik.errors.norangominimo}>{formik.errors.norangominimo}</FormHelperText>
                ) : null}
            </DialogContent>

            <DialogContent>
                <TextField
                    id="norangomaximo"
                    label="Rango de edad máximo"
                    variant="outlined"
                    name="norangomaximo"
                    fullWidth
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.norangomaximo}
                   
                />
                {formik.touched.norangomaximo && formik.errors.norangomaximo ? (
                    <FormHelperText error={formik.errors.norangomaximo}>{formik.errors.norangomaximo}</FormHelperText>
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