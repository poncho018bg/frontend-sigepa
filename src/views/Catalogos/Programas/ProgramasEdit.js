import React, { useContext, useEffect } from 'react';
import { Button, makeStyles, TextField } from '@material-ui/core'
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
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
import { useHistory } from "react-router";
import { ProgramasContext } from 'contexts/catalogos/Programas/programasContext';
import DateFnsUtils from '@date-io/date-fns';
import deLocale from "date-fns/locale/es";
export const ProgramasEdit = () => {
  
  
    const { actualizar, programa, getByID} = useContext(ProgramasContext);
    const classes = useStyles();
    let query = useLocation();
    let history = useHistory();

    useEffect(() => {
      if(query.state?.mobNo){
        getByID(query.state.mobNo);
      }
        
    }, [location]);

    let data = programa;

    // Schema de validación
    const schemaValidacion = Yup.object({
      dsprograma: Yup.string()
            .required('El nombre del programa es obligatorio')
    });

    const actualizarInfo= async valores => {
        actualizar(valores);
        history.push("/admin/programas")
    }

   
    return (
      
        <Formik
            enableReinitialize
            initialValues={data}
            validationSchema={schemaValidacion}
            onSubmit={(valores) => {
              console.log(valores);
              console.log('elex');
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
                        id="dsprograma"
                     
                        label="Nombre del Programa de apoyo"
                        variant="outlined"
                        name="dsprograma"
                        fullWidth
                        onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                value={props.values?.dsprograma}
                    />
                   
                  </GridItem>
                  <GridItem xs={12} sm={12} md={12}>
                   <TextField
                        id="dsclaveprograma"
                        label="Clave del Programa"
                        name="dsclaveprograma"
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
                  <MuiPickersUtilsProvider  locale={deLocale} utils={DateFnsUtils}>
                            <KeyboardDatePicker
                            id="fcvigenciainicio"
                            name="fcvigenciainicio"
                            fullWidth
                            label="Vigencia del Programa Inicio"
                            inputVariant="outlined"
                            format="MM/dd/yyyy"
                            clearable
                            value={props.values?.fcvigenciainicio}
                            onChange={value => props.setFieldValue("fcvigenciainicio", value)}
                            KeyboardButtonProps={{
                              "aria-label": "change date"
                            }}
                          />
                            </MuiPickersUtilsProvider>
                    </GridItem>

                  <GridItem xs={12} sm={12} md={6}>
                  <TextField
                        id="fcvigenciafin"
                        name="fcvigenciafin"
                        label="Vigencia del Programa Hasta"
                        style={{marginBottom: '20px'}}
                        type="date"
                        fullWidth
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values?.fcvigenciafin}
                     //   onChange={props.handleChange}
                     //   onBlur={props.handleBlur}
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
                        //  onChange={props.handleChange}
                        //  onBlur={props.handleBlur}
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
                          //onChange={props.handleChange}
                          //onBlur={props.handleBlur}
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
                         // onChange={props.handleChange}
                        //  onBlur={props.handleBlur}
                          InputLabelProps={{
                            shrink: true,
                          }}
                      />
                  </GridItem>

                  <GridItem xs={12} sm={12} md={12}>
                      <TextField
                              id="dsdescripcion"
                              name="dsdescripcion"
                              label="Descripción del Programa de Apoyo"
                              style={{marginBottom: '20px'}}
                              fullWidth
                              multiline
                              rows={4}
                              variant="outlined"
                              onChange={props.handleChange}
                              onBlur={props.handleBlur}
                              value={props.values?.dsdescripcion}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                  <TextField
                              id="dscriterioelegibilidad"
                              name="dscriterioelegibilidad"
                              label="Criterios de Elegibilidad del Programa (opcional)"
                              style={{marginBottom: '20px'}}
                              fullWidth
                              multiline
                              rows={4}
                              variant="outlined"
                              onChange={props.handleChange}
                              onBlur={props.handleBlur}
                              value={props.values?.dscriterioelegibilidad}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={12}>
                    <TextField
                                id="dscontinuidad"
                                name="dscontinuidad"
                                label="Actividades por realizar para continuar con el programa (opcional)"
                                style={{marginBottom: '20px'}}
                                fullWidth
                                multiline
                                rows={4}
                                variant="outlined"
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                value={props.values?.dscontinuidad}

                      />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={12}>
                  <TextField
                                id="dsobservaciones"
                                name="dsobservaciones"
                                label="Observaciones (opcional)"
                                style={{marginBottom: '20px'}}
                                fullWidth
                                multiline
                                rows={4}
                                variant="outlined"
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                value={props.values?.dsobservaciones}
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