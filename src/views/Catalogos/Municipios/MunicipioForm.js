import { Button, DialogContent, FormHelperText, Grid, MenuItem, TextField } from '@material-ui/core'
import React, { useContext,useEffect } from 'react';

import { useFormik } from 'formik'
import * as Yup from 'yup'
import { ModalContext } from 'contexts/modalContex';
import { MunicipiosContext } from 'contexts/catalogos/MunicipiosContext';
import { EstadosContext } from 'contexts/catalogos/EstadosContext';

export const MunicipioForm = () => {

    const { registrarMunicipios } = useContext(MunicipiosContext);
    const { getEstados, estadosList } = useContext(EstadosContext);
    const { setShowModal } = useContext(ModalContext);

    useEffect(() => {
        getEstados();

    }, []);

    const formik = useFormik({
        initialValues: {
            dsclavemunicipio: '',
            dsmunicipio: '',
            estadoId: ''
        },
        validationSchema: Yup.object({
            dsclavemunicipio: Yup.string()
                .required('La clave es obligatorio'),
            dsmunicipio: Yup.string()
                .required('El municipio es obligatorio'),
            estadoId: Yup.string()
                .required('El Estado es obligatorio')
        }),
        onSubmit: async valores => {

            const { dsclavemunicipio, dsmunicipio, estadoId } = valores
            let municipio = {
                dsclavemunicipio: dsclavemunicipio,
                dsmunicipio: dsmunicipio,
                estadoId: estadoId,
                activo: true
            }
            registrarMunicipios(municipio);
            setShowModal(false);

        }
    })


    return (
        <form
            onSubmit={formik.handleSubmit}
        >
            <DialogContent>
                <TextField
                    variant="outlined"
                    label="Selecciona un estado"
                    select
                    fullWidth

                    name="estadoId"
                    value={formik.values.estadoId}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                >
                    <MenuItem value="0">
                        <em>Ninguno</em>
                    </MenuItem>
                    {
                        estadosList.map(
                            item => (
                                <MenuItem
                                    key={item.id}
                                    value={item.id}>
                                    {item.dsestado}
                                </MenuItem>
                            )
                        )
                    }

                </TextField>
                {formik.touched.estadoId && formik.errors.estadoId ? (
                    <FormHelperText error={formik.errors.estadoId}>{formik.errors.estadoId}</FormHelperText>
                ) : null}
            </DialogContent>
            <DialogContent>
                <TextField
                    id="dsclavemunicipio"
                    label="Clave municipio"
                    variant="outlined"
                    name="dsclavemunicipio"
                    fullWidth
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.dsclavemunicipio}
                />
                {formik.touched.dsclavemunicipio && formik.errors.dsclavemunicipio ? (
                    <FormHelperText error={formik.errors.dsclavemunicipio}>{formik.errors.dsclavemunicipio}</FormHelperText>
                ) : null}
            </DialogContent>
            <DialogContent>
                <TextField
                    id="dsmunicipio"
                    label="Municipio"
                    variant="outlined"
                    name="dsmunicipio"
                    fullWidth
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.dsmunicipio}
                />

                {formik.touched.dsmunicipio && formik.errors.dsmunicipio ? (
                    <FormHelperText error={formik.errors.dsmunicipio}>{formik.errors.dsmunicipio}</FormHelperText>
                ) : null}
            </DialogContent>
            <DialogContent >
                <Grid container justify="flex-end">
                    <Button variant="contained" color="primary" type='submit'>
                        Enviar
                    </Button>
                </Grid>
            </DialogContent>
        </form>

    )
}