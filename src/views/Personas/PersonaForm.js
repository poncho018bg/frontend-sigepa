import {  Button, Dialog, DialogContent, FormHelperText, Grid, TextField } from '@material-ui/core'
import React, { useContext } from 'react';

import { useFormik } from 'formik'
import * as Yup from 'yup'
import { PersonContext } from 'contexts/personContext';
import { ModalContext } from 'contexts/modalContex';

export const PersonaForm = () => {

    const { registrarPersona } = useContext(PersonContext);

    const {  setShowModal } = useContext(ModalContext);


    const formik = useFormik({
        initialValues: {
            nombre: '',
            apellido: ''
        },
        validationSchema: Yup.object({
            nombre: Yup.string() 
                        .required('El nombre  es obligatorio'),
            apellido: Yup.string() 
                        .required('El apellido es obligatorio')
        }), 
        onSubmit: async valores => {

            const {nombre, apellido } = valores

            console.log(nombre, apellido);
            console.log('asjasjasj');

            let persona={
                firstName:nombre,
                lastName:apellido,
                activo:true
            }
            registrarPersona(persona);
            setShowModal(false);

        }
    })


    return (
            <form
                  onSubmit={formik.handleSubmit}
                >
                <DialogContent>
                    <TextField
                        id="nombre"
                        label="Nombre"
                        variant="outlined"
                        name="nombre"
                        fullWidth
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.nombre}
                    />
                    { formik.touched.nombre && formik.errors.nombre ? (
                                 <FormHelperText error={formik.errors.nombre}>{formik.errors.nombre}</FormHelperText>
                    ) : null  }
                </DialogContent> 
                <DialogContent>

                    <TextField
                        id="apellido"
                        label="Apellido"
                        variant="outlined"
                        name="apellido"
                        fullWidth
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.apellido}
                    />

                    { formik.touched.apellido && formik.errors.apellido ? (
                                 <FormHelperText error={formik.errors.apellido}>{formik.errors.apellido}</FormHelperText>
                    ) : null  }
                </DialogContent>
                <DialogContent >  
                    <Grid container justify="flex-end">
                       <Button  variant="contained" color="primary"  type='submit'>
                         Enviar
                        </Button>
                    </Grid>
                </DialogContent>
            </form>
        
    )
}
