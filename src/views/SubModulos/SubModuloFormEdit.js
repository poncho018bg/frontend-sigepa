import React, { useContext, useEffect,useState } from 'react';
import { Button, DialogContent, FormHelperText, Grid, MenuItem, TextField } from '@material-ui/core'
import { Formik } from 'formik';
import * as Yup from 'yup';
import { SubModuloContext } from 'contexts/subModuloContext';
import { ModalContextUpdate } from 'contexts/modalContexUpdate';
import { ModuloContext } from 'contexts/moduloContext';

import { ModalConfirmacion } from 'commons/ModalConfirmacion';
import { ModalContextConfirmacion } from 'contexts/modalContextConfirmacion';
import { useTranslation } from 'react-i18next';
export const SubModuloFormEdit = ({ subModuloSeleccionado }) => {
    const { t } = useTranslation();
    const { setShowModalUpdate } = useContext(ModalContextUpdate);
    const { actualizarSubModulo } = useContext(SubModuloContext);
    const { getModulos, moduloList } = useContext(ModuloContext);

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
        actualizarSubModulo(valores);
        setShowModalConfirmacion(false);
        setShowModalUpdate(false);
    }

    // Schema de validación
    const schemaValidacion = Yup.object({
        dssubmodulo: Yup.string()
            .required(`${t('msg.submoduloobligatorio')}`),
        crcModulosCollection: Yup.string()
            .required(`${t('msg.moduloobligatorio')}`)

    });

    const actualizarInfoSubModulo = async valores => {
        confirmacionDialog(valores);
    }

    useEffect(() => {
        getModulos()

    }, [])


    return (

        <Formik
            enableReinitialize
            initialValues={subModuloSeleccionado}
            validationSchema={schemaValidacion}
            onSubmit={(valores) => {
                actualizarInfoSubModulo(valores)
            }}
        >

            {props => {

                return (


                    <form
                        className="bg-white shadow-md px-8 pt-6 pb-8 mb-4"
                        onSubmit={props.handleSubmit}>

                        <DialogContent>
                            <TextField
                                id="crcModulosCollection"
                                variant="outlined"
                                label={t('cmb.seleccionamodulo')} 
                                select
                                fullWidth
                                error={props.errors.crcModulosCollection}
                                name="crcModulosCollection"
                                value={props.values.crcModulosCollection}
                                onChange={props.handleChange}
                            >
                                <MenuItem value="0">
                                    <em>{t('cmb.ninguno')}</em>
                                </MenuItem>
                                {
                                    moduloList.map(
                                        item => (
                                            <MenuItem
                                                key={item.id}
                                                value={item.id}>
                                                {item.dsmodulo}
                                            </MenuItem>
                                        )
                                    )
                                }

                            </TextField>
                            {props.touched.crcModulosCollection && props.errors.crcModulosCollection ? (
                                <FormHelperText error={props.errors.crcModulosCollection}>{props.errors.crcModulosCollection}</FormHelperText>
                            ) : null}
                        </DialogContent>

                        <DialogContent>
                            <TextField
                                id="dssubmodulo"
                                label={t('lbl.descsubmodulo')} 
                                variant="outlined"
                                name="dssubmodulo"
                                fullWidth
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                value={props.values.dssubmodulo}
                                inputProps={{ maxLength: 200 }}
                            />
                            {props.touched.dssubmodulo && props.errors.dssubmodulo ? (
                                <FormHelperText error={props.errors.dssubmodulo}>{props.errors.dssubmodulo}</FormHelperText>
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

            }}
        </Formik>

    )

}