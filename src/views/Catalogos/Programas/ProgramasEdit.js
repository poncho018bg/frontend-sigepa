import React, { useContext, useEffect, useState } from 'react';
import { Button,  DialogContent, FormHelperText, Grid, makeStyles, TextField } from '@material-ui/core'

import { ModalContextUpdate } from 'contexts/modalContexUpdate';
import { CursosCapacitacionesContext } from 'contexts/catalogos/CursosCapacitaciones/cursosCapacitacionesContext';
import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';
import Card from 'components/Card/Card';
import CardHeader from 'components/Card/CardHeader';
import CardIcon from 'components/Card/CardIcon';
import PermIdentity from '@material-ui/icons/PermIdentity';
import styles from "assets/jss/material-dashboard-pro-react/views/userProfileStyles.js";
import CardBody from 'components/Card/CardBody';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Clearfix from 'components/Clearfix/Clearfix';
const useStyles = makeStyles(styles);
import {  useLocation } from "react-router-dom";
import moment from 'moment';

export const ProgramasEdit = (props) => {
    const { setShowModalUpdate } = useContext(ModalContextUpdate);
    const [objetoActualizar, setObjetoActualizar] = useState();

    //console.log(props);
    const { actualizar} = useContext(CursosCapacitacionesContext);
    const classes = useStyles();
    let query = useLocation();

    useEffect(() => {
        setObjetoActualizar(query.state?.mobNo);
    }, [location]);

    // Schema de validación
    const schemaValidacion = Yup.object({
        dsestado: Yup.string()
            .required('El curso  es obligatorio')
    });

    const actualizarInfo= async valores => {
        actualizar(valores);
        setShowModalUpdate(false);
    }

   

    return (

        <Formik
            enableReinitialize
            initialValues={objetoActualizar}
            validationSchema={schemaValidacion}
            onSubmit={(valores) => {
                actualizarInfo(valores)
            }}
        >

            {props => {
                return (


                    <form
                        className="bg-white shadow-md px-8 pt-6 pb-8 mb-4"
                        onSubmit={props.handleSubmit}>
                            <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="rose" icon>
                <CardIcon  color="rose">
                  <PermIdentity />
                </CardIcon>
                <h4 className={classes.cardIconTitle}>
                  Programas
                </h4>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                      <TextField
                        style={{marginBottom: '20px'}}
                        id="nombrePrograma"
                     
                        label="Nombre del Programa de apoyo"
                        variant="outlined"
                        name="nombrePrograma"
                        fullWidth
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values?.dsprograma}
                    />
                   
                  </GridItem>
                  <GridItem xs={12} sm={12} md={12}>
                   <TextField
                        id="clavePrograma"
                        label="Clave del Programa"
                        name="clavePrograma"
                        variant="outlined"
                        style={{marginBottom: '20px'}}
                        fullWidth
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values?.dsclaveprograma}
                    />
                  </GridItem>
                  
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                  <TextField
                        id="vigenciaDesde"
                        style={{marginBottom: '20px'}}
                        label="Vigencia del Programa Desde"
                        name="vigenciaDesde"
                        type="date"
                        fullWidth
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                     
                        value={moment(props.values?.fcvigenciainicio).format("MM/DD/YYYY")}
                        InputLabelProps={{
                          shrink: true,
                        }}
                    />
                  </GridItem>

                  <GridItem xs={12} sm={12} md={6}>
                  <TextField
                        id="vigenciaHasta"
                        label="Vigencia del Programa Hasta"
                        style={{marginBottom: '20px'}}
                        name="vigenciaHasta"
                        type="date"
                        fullWidth
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        InputLabelProps={{
                          shrink: true,
                        }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <TextField
                          id="periodoRegistroWebDesde"
                          style={{marginBottom: '20px'}}
                          label="Periodo Registro Web Desde"
                          name="periodoRegistroWebDesde"
                          type="date"
                          fullWidth
                          onChange={props.handleChange}
                          onBlur={props.handleBlur}
                          InputLabelProps={{
                            shrink: true,
                          }}
                      />
                  </GridItem>

                  <GridItem xs={12} sm={12} md={6}>
                    <TextField
                          id="periodoRegistroWebHasta"
                          style={{marginBottom: '20px'}}
                          label="Periodo Registro web Hasta"
                          name="periodoRegistroWebHasta"
                          type="date"
                          fullWidth
                          onChange={props.handleChange}
                          onBlur={props.handleBlur}
                          InputLabelProps={{
                            shrink: true,
                          }}
                      />
                  </GridItem>

                  <GridItem xs={12} sm={12} md={6}>
                    <TextField
                          id="periodoRegistroPresencialDesde"
                          style={{marginBottom: '20px'}}
                          label="Periodo Registro Presencial Desde"
                          name="periodoRegistroPresencialDesde"
                          type="date"
                          fullWidth
                          onChange={props.handleChange}
                          onBlur={props.handleBlur}
                          InputLabelProps={{
                            shrink: true,
                          }}
                      />
                  </GridItem>

                  <GridItem xs={12} sm={12} md={6}>
                    <TextField
                          id="periodoRegistroPresencialHasta"
                          style={{marginBottom: '20px'}}
                          label="Periodo Registro Presencial Hasta"
                          name="periodoRegistroPresencialHasta"
                          type="date"
                          fullWidth
                          onChange={props.handleChange}
                          onBlur={props.handleBlur}
                          InputLabelProps={{
                            shrink: true,
                          }}
                      />
                  </GridItem>

                  <GridItem xs={12} sm={12} md={12}>
                      <TextField
                              id="outlined-multiline-static"
                              label="Descripción del Programa de Apoyo"
                              style={{marginBottom: '20px'}}
                              fullWidth
                              multiline
                              rows={4}
                              variant="outlined"
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                  <TextField
                              id="outlined-multiline-static"
                              label="Criterios de Elegibilidad del Programa (opcional)"
                              style={{marginBottom: '20px'}}
                              fullWidth
                              multiline
                              rows={4}
                              variant="outlined"
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={12}>
                    <TextField
                                id="outlined-multiline-static"
                                label="Actividades por realizar para continuar con el programa (opcional)"
                                style={{marginBottom: '20px'}}
                                fullWidth
                                multiline
                                rows={4}
                                variant="outlined"
                      />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={12}>
                  <TextField
                                id="outlined-multiline-static"
                                label="Observaciones (opcional)"
                                style={{marginBottom: '20px'}}
                                fullWidth
                                multiline
                                rows={4}
                                variant="outlined"
                      />
                  </GridItem>
                </GridContainer>
                
                <Button  className={classes.updateProfileButton}
                  type='submit'>
                  Editar
                </Button>
                <Clearfix />
              </CardBody>
            </Card>
          </GridItem>
          
        </GridContainer>
                
                    </form>
                )
            }}
        </Formik>

    )

}