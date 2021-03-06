import { Button, DialogContent, FormHelperText, Grid, MenuItem, TextField } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import React, { useEffect, useContext, useState } from 'react';

import { useFormik } from 'formik'
import * as Yup from 'yup'
import { ModalContext } from 'contexts/modalContex';

import { DocumentosContext } from 'contexts/catalogos/documentosContext';

import { ModalConfirmacion } from 'commons/ModalConfirmacion';
import { ModalContextConfirmacion } from 'contexts/modalContextConfirmacion';
import { Mensaje } from 'components/Personalizados/Mensaje';
import { useTranslation } from 'react-i18next';
import { TipoRequisitosContext } from 'contexts/catalogos/TipoRequisitosContext';

const BootstrapInput = withStyles((theme) => ({
    root: {
        'label + &': {
            marginTop: theme.spacing(3),
        },
    },
    input: {
        borderRadius: 4,
        position: 'relative',
        backgroundColor: theme.palette.background.paper,
        border: '1px solid #ced4da',
        fontSize: 16,
        padding: '10px 26px 10px 12px',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        // Use the system font instead of the default Roboto font.
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        '&:focus': {
            borderRadius: 4,
            borderColor: '#80bdff',
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
        },
    },
}))(InputBase);

export const DocumentosForm = () => {
    const { t } = useTranslation();
    const { setShowModal } = useContext(ModalContext);

    const { getVigencias, todasVigencias, registrarDocumento } = useContext(DocumentosContext);
    const { getTipoRequisitos, tipoRequisitosList } = useContext(TipoRequisitosContext);


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
        console.log("aqui hace el registro no deshabilita nada");
        const { idVigencia, dsdocumento, dsdescripcion, tipoRequisitos} = valores

        console.log("vemos que llega ---> ", idVigencia, dsdocumento, dsdescripcion);


        let documentosRequisitos = {
            dsdocumento: dsdocumento,
            dsdescripcion: dsdescripcion,
            vigencias: `${process.env.REACT_APP_API_URL}vigencias/${idVigencia}`,
            boactivo: true,
            tipoRequisitos:`/${tipoRequisitos}`,
            'programas': []
        }


        registrarDocumento(documentosRequisitos).then(response => {
            setOpenSnackbar(true);
            setMsjConfirmacion(`${t('msg.registroguardadoexitosamente')}`);

            const timer = setTimeout(() => {
                setError(false);
                setShowModalConfirmacion(false);
                setShowModal(false);

            }, 1000);
            return () => clearTimeout(timer);
        }).catch(err => {
            setOpenSnackbar(true);
            setError(true);
            setMsjConfirmacion(`${t('msg.ocurrioerrorcalidarinfo')}`);
        })
    }

    useEffect(() => {
        getVigencias();
        getTipoRequisitos();
        // eslint-disable-next-line
        console.log("documentos", todasVigencias);
    }, []);

    const formik = useFormik({
        initialValues: {
            idVigencia: '',
            dsdocumento: '',
            dsdescripcion: '',
            tipoRequisitos:''
        },
        validationSchema: Yup.object({
            dsdescripcion: Yup.string()
                .required(`${t('msg.descripcionobligatoria')}`),
            dsdocumento: Yup.string()
                .required(`${t('msg.nombredocumentoobligatorio')}`)

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
                    id="dsdocumento"
                    label={t('lbl.documento')}
                    variant="outlined"
                    name="dsdocumento"
                    fullWidth
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.dsdocumento}
                />
                {formik.touched.dsdocumento && formik.errors.dsdocumento ? (
                    <FormHelperText error={formik.errors.dsdocumento}>{formik.errors.dsdocumento}</FormHelperText>
                ) : null}
            </DialogContent>
            <DialogContent>
                <TextField
                    id="dsdescripcion"
                    label={t('lbl.descripciondocumento')}
                    variant="outlined"
                    name="dsdescripcion"
                    fullWidth
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.dsdescripcion}
                />
                {formik.touched.dsdescripcion && formik.errors.dsdescripcion ? (
                    <FormHelperText error={formik.errors.dsdescripcion}>{formik.errors.dsdescripcion}</FormHelperText>
                ) : null}
            </DialogContent>
            <DialogContent>
                <TextField
                    id="idVigencia"
                    variant="outlined"
                    label={t('cmb.seleccionavigencia')}
                    select
                    fullWidth
                    name="idVigencia"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.idVigencia}
                >
                    <MenuItem value="0">
                        <em>{t('cmb.ninguno')}</em>
                    </MenuItem>
                    {
                        todasVigencias.map(
                            item => (
                                <MenuItem
                                    key={item.id}
                                    value={item.id}>
                                    {item.dsvigencia}
                                </MenuItem>
                            )
                        )
                    }
                </TextField>


            </DialogContent>

            <DialogContent>
                <TextField
                    id="tipoRequisitos"
                    variant="outlined"
                    label={t('cmb.seleccionatiporequisito')} 
                    select
                    fullWidth
                    name="tipoRequisitos"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.tipoRequisitos}
                >
                    <MenuItem value="0">
                        <em>{t('cmb.ninguno')}</em>
                    </MenuItem>
                    {
                        tipoRequisitosList.map(
                            item => (
                                <MenuItem
                                    key={item.id}
                                    value={item.id}>
                                    {item.dstiporequisito}
                                </MenuItem>
                            )
                        )
                    }
                </TextField>


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
                severity={error ? "error" : "success"}
                message={msjConfirmacion}
            />
        </form>

    )
}