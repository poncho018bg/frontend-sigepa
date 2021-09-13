import React, { useContext } from 'react';
import {  Button, DialogContent, FormHelperText, Grid, TextField } from '@material-ui/core'
import { Formik } from 'formik';
import * as Yup from 'yup';
import { ModalContextUpdate } from 'contexts/modalContexUpdate';
import { EstadosContext } from 'contexts/catalogos/EstadosContext';

export const EstadosFormEdit = ({estadoSeleccionada}) => {
  
  
    const { setShowModalUpdate }  = useContext(ModalContextUpdate);
    const { actualizarEstados } = useContext(EstadosContext);

        // Schema de validación
    const schemaValidacion = Yup.object({
        noestado: Yup.string() 
            .required('El num. de estado  es obligatorio'),
            dsestado: Yup.string() 
            .required('La desc. del estado es obligatorio')
        });

        const actualizarInfoEstado = async valores => {
            actualizarEstados(valores);
            setShowModalUpdate(false);
        }

    return (
  
         <Formik 
             enableReinitialize
             initialValues={estadoSeleccionada}
             validationSchema={ schemaValidacion }
             onSubmit={(valores)=>{
                actualizarInfoEstado(valores)
             }}
        >

            {props => {
                    return (


                        <form
                                    className="bg-white shadow-md px-8 pt-6 pb-8 mb-4"
                                    onSubmit={props.handleSubmit}>
                            
                        <DialogContent>
                                <TextField
                                    id="noestado"
                                    label="Num. estado"
                                    variant="outlined"
                                    name="noestado"
                                    fullWidth
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                    value={props.values.noestado}
                                />
                                 { props.touched.noestado && props.errors.noestado ? (
                                 <FormHelperText error={props.errors.noestado}>{props.errors.noestado}</FormHelperText>
                    ) : null  }
                            </DialogContent> 
                            <DialogContent>

                                <TextField
                                    id="dsestado"
                                    label="Desc. estado"
                                    variant="outlined"
                                    name="dsestado"
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                    value={props.values.dsestado}
                                />

                            { props.touched.dsestado && props.errors.dsestado ? (
                                <FormHelperText error={props.errors.dsestado}>{props.errors.dsestado}</FormHelperText>
                            ) : null  }

                            </DialogContent>
                            <DialogContent >  
                                <Grid container justify="flex-end">
                                <Button  variant="contained" color="primary"  type='submit'>
                                    Editar
                                    </Button>
                                </Grid>

                               
                            </DialogContent>
                        </form>
                    )
                }}
        </Formik>
        
    )
}
