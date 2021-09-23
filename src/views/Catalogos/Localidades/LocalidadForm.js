import { Button, DialogContent, FormHelperText, Grid, MenuItem, TextField } from '@material-ui/core'
import React, { useContext, useState } from 'react';
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { ModalContext } from 'contexts/modalContex';
import { LocalidadesContext } from 'contexts/catalogos/Localidades/localidadesContext';
import { MunicipiosContext } from 'contexts/catalogos/MunicipiosContext';

import { ModalConfirmacion } from 'commons/ModalConfirmacion';
import { ModalContextConfirmacion } from 'contexts/modalContextConfirmacion';
import { Mensaje } from 'components/Personalizados/Mensaje';
import { useHistory } from 'react-router';

export const LocalidadForm = () => {

    const { registrar } = useContext(LocalidadesContext);
    const { setShowModal } = useContext(ModalContext);
    const { municipiosListId } = useContext(MunicipiosContext);


    //dialog confirmar
    const [valores, setValores] = useState();
    const { setShowModalConfirmacion } = useContext(ModalContextConfirmacion);


    const [error, setError] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [msjConfirmacion, setMsjConfirmacion] = useState('');

    let history = useHistory();

    const confirmacionDialog = (e) => {
        console.log("Aqui hace el llamado al dialog", e);
        setShowModalConfirmacion(true);
        setValores(e)
    }

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
             
            setMsjConfirmacion(`La localidad ${response.data.dslocalidad}  fue registrada correctamente `  );
           
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
            setMsjConfirmacion(`Ocurrio un error, ${err}`  );
        });;        ;
      
    }

    const formik = useFormik({
        initialValues: {
            dsidlocalidad: '',
            dsclavelocalidad: '',
            idMunicipio: 0,
            dslocalidad: '',
            dscodigopostal: '',
            dslocalidad: ''

        },
        validationSchema: Yup.object({
            dsidlocalidad: Yup.string()
                .required('El id de localidad es obligatorio'),
            dsclavelocalidad: Yup.string()
                .required('La clave localidad es obligatoria'),
            idMunicipio: Yup.string()
                .required('El municipio es obligatorio'),
            dslocalidad: Yup.string()
                .required('La localidad es obligatoria'),
            dscodigopostal: Yup.string()
                .required('El código postal es obligatorio')

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
                    label="Id Localidad"
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
                    label="Clave Localidad"
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
                    label="Selecciona un municipio"
                    select
                    fullWidth
                    name="idMunicipio"
                    value={formik.values.idMunicipio}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                >
                    <MenuItem value="0">
                        <em>Ninguno</em>
                    </MenuItem>
                    {
                        municipiosListId.map(
                            item => (
                                <MenuItem
                                    key={item.idMunicipio}
                                    value={item.idMunicipio}>
                                    {item.dsMunicipio}
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
                    label=" Localidad"
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
                    label=" CP"
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
                        Enviar
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