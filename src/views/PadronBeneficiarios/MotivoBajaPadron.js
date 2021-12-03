import { DialogContent, TextField } from '@material-ui/core';
import React, { useEffect, useState, useContext } from 'react';
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { ModalContext } from 'contexts/modalContex';
import { BandejaRechazosContext } from 'contexts/BandejaRechazosContext';
import { ModalConfirmacion } from 'commons/ModalConfirmacion';
import { ModalContextConfirmacion } from 'contexts/modalContextConfirmacion';
import { Mensaje } from 'components/Personalizados/Mensaje';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles(stylesArchivo);

export const MotivoBajaPadron = ({ beneficiariaSeleccionada }) => {

    const { t } = useTranslation();
    let history = useHistory();
    const classes = useStyles();
    const { setShowModal } = useContext(ModalContext);
    const { registrarBandejaRechazos } = useContext(BandejaRechazosContext);
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


    const formik = useFormik({
        initialValues: {
            dsobservaciones: ''
        },
        validationSchema: Yup.object({
            dsobservaciones: Yup.string()
                .required('Las observaciones son obligatorias')
                .matches(/^[a-zA-Z0-9_.-\sñÑ]*$/, `${t('msg.nocarateresespeciales')}`),

        }),
        onSubmit: async valores => {
            confirmacionDialog(valores);
        }
    })

    const handleRegistrar = () => {
        const { dsobservaciones } = valores




        let estatusregistro = {
            dsobservaciones: dsobservaciones,
           

        }
        registrarBandejaRechazos(estatusregistro).then(response => {
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
                console.log('err', err)
                setOpenSnackbar(true);
                setError(true);
                setMsjConfirmacion(`${t('msg.ocurrioerrorcalidarinfo')}`);
            });
    }

    return (
        <form
            onSubmit={formik.handleSubmit}
        >

            <DialogContent >
                <TextField
                    id="dsobservaciones"
                    label="Motivo de baja"
                    variant="outlined"
                    name="dsobservaciones"
                    fullWidth
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.dsapoyo}
                />

            </DialogContent>

            <ModalConfirmacion
                handleRegistrar={handleRegistrar} evento="Registrar"
            />

            <Mensaje
                setOpen={setOpenSnackbar}
                open={openSnackbar}
                severity={error ? "error" : "success"}
                message={msjConfirmacion}
            />

        </form>

    )

}