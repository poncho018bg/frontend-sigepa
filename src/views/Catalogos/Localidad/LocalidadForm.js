import { Button, DialogContent, FormHelperText, Grid, MenuItem, TextField } from '@material-ui/core'
import React, { useContext, useState ,useEffect} from 'react';

import { useFormik } from 'formik'
import * as Yup from 'yup'
import { ModalContext } from 'contexts/modalContex';

import { ModalConfirmacion } from 'commons/ModalConfirmacion';
import { ModalContextConfirmacion } from 'contexts/modalContextConfirmacion';
import { Mensaje } from 'components/Personalizados/Mensaje';
import { useTranslation } from 'react-i18next';
import { LocalidadesContext } from 'contexts/catalogos/Localidades/localidadesContext';
import { MunicipiosContext } from 'contexts/catalogos/MunicipiosContext';

export const LocalidadForm = () => {
    const { t } = useTranslation();
    const { registrar } = useContext(LocalidadesContext);
    const { setShowModal } = useContext(ModalContext);
    const { municipiosList ,getMunicipiosAll} = useContext(MunicipiosContext);

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

    useEffect(() => {
        getMunicipiosAll();
    }, []);

    const handleRegistrar = () => {
        const { dsidlocalidad, dsclavelocalidad, idMunicipio, dscodigopostal, dslocalidad } = valores;
        let localidad = {
            dsidlocalidad,
            dsclavelocalidad,

            dslocalidad,
            dscodigopostal,
            dsestado: true,
            municipios: `/${idMunicipio}`
        }
        console.log(localidad)
        registrar(localidad).then(response => {
            setOpenSnackbar(true);

            setMsjConfirmacion(`${t('msg.registroguardadoexitosamente')}`);

            const timer = setTimeout(() => {

                setError(false);
                setShowModalConfirmacion(false);
                setShowModal(false);

            }, 1000);
            return () => clearTimeout(timer);
        })
            .catch(err => {
                setOpenSnackbar(true);
                setError(true);
                setMsjConfirmacion(`${t('msg.ocurrioerrorcalidarinfo')}`);
            });;;
    }

    const formik = useFormik({
        initialValues: {
            dsidlocalidad: '',
            dsclavelocalidad: '',
            idMunicipio: 0,
            dslocalidad: '',
            dscodigopostal: '',
            

        },
        validationSchema: Yup.object({
            dsidlocalidad: Yup.string()
                .required(`${t('msg.idlocalidadobligatorio')}`),
            dsclavelocalidad: Yup.string()
                .required(`${t('msg.clavelocalidadobligatoria')}`),
            idMunicipio: Yup.string()
                .required(`${t('msg.municipioobligatorio')}`),
            dslocalidad: Yup.string()
                .required(`${t('msg.localidadobligatoria')}`),
            dscodigopostal: Yup.string()
                .required(`${t('msg.cpobligatorio')}`)

        }),
        onSubmit: async valores => {
            confirmacionDialog(valores);
        }
    });



    return (
        <form
            onSubmit={formik.handleSubmit}
        >
            <DialogContent>
                <TextField
                    id="dsidlocalidad"
                    label={t('lbl.localidadesid')}
                    variant="outlined"
                    name="dsidlocalidad"
                    fullWidth
                    inputProps={{ maxLength: "6" }}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.dsidlocalidad}
                />
                {formik.touched.dsidlocalidad && formik.errors.dsidlocalidad ? (
                    <FormHelperText error={formik.errors.dsidlocalidad}>{formik.errors.dsidlocalidad}</FormHelperText>
                ) : null}
            </DialogContent>

            <DialogContent>
                <TextField
                    id="dsclavelocalidad"
                    label={t('lbl.clavelocalidad')}
                    variant="outlined"
                    name="dsclavelocalidad"
                    fullWidth
                    inputProps={{ maxLength: "4" }}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.dsclavelocalidad}
                />
                {formik.touched.dsclavelocalidad && formik.errors.dsclavelocalidad ? (
                    <FormHelperText error={formik.errors.dsclavelocalidad}>{formik.errors.dsclavelocalidad}</FormHelperText>
                ) : null}
            </DialogContent>


            <DialogContent>
                <TextField
                    variant="outlined"
                    label={t('cmb.seleccionamunicipio')}
                    select
                    fullWidth
                    name="idMunicipio"
                    value={formik.values.idMunicipio}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                >
                    <MenuItem value="0">
                        <em>{t('cmb.ninguno')}</em>
                    </MenuItem>
                    {
                        municipiosList.map(
                            item => (
                                <MenuItem
                                    key={item.id}
                                    value={item.id}>
                                    {item.dsmunicipio}
                                </MenuItem>
                            )
                        )
                    }

                </TextField>
                {formik.touched.idMunicipio && formik.errors.idMunicipio ? (
                    <FormHelperText error={formik.errors.idMunicipio}>{formik.errors.idMunicipio}</FormHelperText>
                ) : null}
            </DialogContent>

            <DialogContent>
                <TextField
                    id="dslocalidad"
                    label={t('lbl.localidad')}
                    variant="outlined"
                    name="dslocalidad"
                    fullWidth
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.dslocalidad}
                />
                {formik.touched.dslocalidad && formik.errors.dslocalidad ? (
                    <FormHelperText error={formik.errors.dslocalidad}>{formik.errors.dslocalidad}</FormHelperText>
                ) : null}
            </DialogContent>


            <DialogContent>
                <TextField
                    id="dscodigopostal"
                    label={t('lbl.cp')}
                    variant="outlined"
                    name="dscodigopostal"
                    fullWidth
                    inputProps={{ maxLength: "5" }}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.dscodigopostal}
                />
                {formik.touched.dscodigopostal && formik.errors.dscodigopostal ? (
                    <FormHelperText error={formik.errors.dscodigopostal}>{formik.errors.dscodigopostal}</FormHelperText>
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
                severity={error ? "error" : "success"}
                message={msjConfirmacion}
            />
        </form>

    )
}