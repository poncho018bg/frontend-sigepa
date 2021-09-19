import React, { useContext, useEffect } from 'react';
import { Button, FormHelperText, makeStyles, TextField } from '@material-ui/core'
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
            .required('El nombre del programa  es obligatorio'),
        clavePrograma: Yup.string()
            .required('La clave del programa es obligatoria'),
        vigenciaDesde: Yup.string()
            .required('La vigencia desde es obligatorio'),
        vigenciaHasta: Yup.string()
            .required('La vigencia hasta es obligatorio'),
        periodoRegistroWebDesde: Yup.string()
            .required('El periodo del registro web desde es obligatorio'),
        periodoRegistroWebHasta: Yup.string()
          .required('El periodo del registro web hasta es obligatorio'),
        periodoRegistroPresencialDesde: Yup.string()
          .required('El periodo del registro presencial desde es obligatorio'),
        periodoRegistroPresencialHasta: Yup.string()
          .required('El periodo del registro presencial hasta es obligatorio'),
        desripcionPrograma: Yup.string()
          .required('La descripcion del pograma de apoyo  es obligatorio'),
        criterioPrograma: Yup.string()
          .required('Los criterios de elegibilidad son obligatorios'),
        actividadesPrograma: Yup.string()
          .required('Las actividades por realizar son obligatorios'),
    
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
                        error={props.errors.dsprograma}
                        label="Nombre del Programa de apoyo"
                        variant="outlined"
                        name="dsprograma"
                        fullWidth
                        onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                value={props.values?.dsprograma}
                    />
                     {props.touched.dsprograma && props.errors.dsprograma ? (
                    <FormHelperText  style={{marginBottom: '20px'}} error={props.errors.dsprograma}>
                      {props.errors.dsprograma}
                    </FormHelperText>
                ) : null}
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
                            style={{marginBottom: '20px'}}
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

                <MuiPickersUtilsProvider  locale={deLocale} utils={DateFnsUtils}>
                            <KeyboardDatePicker
                            id="fcvigenciafin"
                            name="fcvigenciafin"
                            fullWidth
                            style={{marginBottom: '20px'}}
                            label="Vigencia del Programa Hasta"
                            inputVariant="outlined"
                            format="MM/dd/yyyy"
                            clearable
                            value={props.values?.fcvigenciafin}
                            onChange={value => props.setFieldValue("fcvigenciafin", value)}
                            KeyboardButtonProps={{
                              "aria-label": "change date"
                            }}
                          />
                        </MuiPickersUtilsProvider>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                   
                       <MuiPickersUtilsProvider  locale={deLocale} utils={DateFnsUtils}>
                            <KeyboardDatePicker
                            id="periodoRegistroWebDesde"
                            name="periodoRegistroWebDesde"
                            fullWidth
                            style={{marginBottom: '20px'}}
                            label="Periodo Registro Web Desde"
                            inputVariant="outlined"
                            format="MM/dd/yyyy"
                            clearable
                            value={props.values?.periodoRegistroWebDesde}
                            onChange={value => props.setFieldValue("periodoRegistroWebDesde", value)}
                            KeyboardButtonProps={{
                              "aria-label": "change date"
                            }}
                          />
                        </MuiPickersUtilsProvider>
                  </GridItem>

                  <GridItem xs={12} sm={12} md={6}>

                  <MuiPickersUtilsProvider  locale={deLocale} utils={DateFnsUtils}>
                            <KeyboardDatePicker
                            id="periodoRegistroWebHasta"
                            name="periodoRegistroWebHasta"
                            fullWidth
                            label="Periodo Registro web Hasta"
                            inputVariant="outlined"
                            format="MM/dd/yyyy"
                            style={{marginBottom: '20px'}}
                            clearable
                            value={props.values?.periodoRegistroWebHasta}
                            onChange={value => props.setFieldValue("periodoRegistroWebHasta", value)}
                            KeyboardButtonProps={{
                              "aria-label": "change date"
                            }}
                          />
                        </MuiPickersUtilsProvider>
                  
                  </GridItem>

                  <GridItem xs={12} sm={12} md={6}>
                   

                    <MuiPickersUtilsProvider  locale={deLocale} utils={DateFnsUtils}>
                            <KeyboardDatePicker
                            id="periodoRegistroPresencialDesde"
                            name="periodoRegistroPresencialDesde"
                            fullWidth
                            label="Periodo Registro Presencial Desde"
                            inputVariant="outlined"
                            format="MM/dd/yyyy"
                            style={{marginBottom: '20px'}}
                            clearable
                            value={props.values?.periodoRegistroPresencialDesde}
                            onChange={value => props.setFieldValue("periodoRegistroPresencialDesde", value)}
                            KeyboardButtonProps={{
                              "aria-label": "change date"
                            }}
                          />
                      </MuiPickersUtilsProvider>
                  </GridItem>

                  <GridItem xs={12} sm={12} md={6}>
                  
                    <MuiPickersUtilsProvider  locale={deLocale} utils={DateFnsUtils}>
                            <KeyboardDatePicker
                            id="periodoRegistroPresencialHasta"
                            name="periodoRegistroPresencialHasta"
                            fullWidth
                            label="Periodo Registro Presencial Hasta"
                            inputVariant="outlined"
                            format="MM/dd/yyyy"
                            style={{marginBottom: '20px'}}
                            clearable
                            value={props.values?.periodoRegistroPresencialHasta}
                            onChange={value => props.setFieldValue("periodoRegistroPresencialHasta", value)}
                            KeyboardButtonProps={{
                              "aria-label": "change date"
                            }}
                          />
                      </MuiPickersUtilsProvider>
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