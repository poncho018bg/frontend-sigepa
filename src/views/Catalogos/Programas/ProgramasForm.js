import React, { useContext, useEffect, useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons
import PermIdentity from "@material-ui/icons/PermIdentity";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";

import Clearfix from "components/Clearfix/Clearfix.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";


import styles from "assets/jss/material-dashboard-pro-react/views/userProfileStyles.js";


import {  TextField } from "@material-ui/core";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { ProgramasContext } from "contexts/catalogos/Programas/programasContext";

import { Mensaje } from "components/Personalizados/Mensaje";
import CardIcon from "components/Card/CardIcon";
import { useHistory } from "react-router";


const useStyles = makeStyles(styles);



export const ProgramasForm = () => {
    const { registrar, error} = useContext(ProgramasContext);
    const [open, setOpen] = useState(false);
    const classes = useStyles();
    let history = useHistory();

    useEffect(() => {
      if(error){
        setOpen(true);
      }else{
        setOpen(false);
      }
    }, [error])

    const formik = useFormik({
      initialValues: {
          nombrePrograma: '',
          clavePrograma:'',
          vigenciaDesde:'',
          vigenciaHasta:'',
          periodoRegistroWebDesde:'',
          periodoRegistroWebHasta:'',
          periodoRegistroPresencialDesde:'',
          periodoRegistroPresencialHasta:'',
          desripcionPrograma: '',
          criterioPrograma: '',
          actividadesPrograma: '',
          obervacionesPrograma: '',
      },
      validationSchema: Yup.object({
        nombrePrograma: Yup.string()
            .required('El nombre del programa  es obligatorio')

    }),
      onSubmit: async valores => {

          const {
               nombrePrograma,
               clavePrograma,
               vigenciaDesde,
               vigenciaHasta,
               periodoRegistroWebDesde,
               periodoRegistroWebHasta,
               periodoRegistroPresencialDesde,
               periodoRegistroPresencialHasta,
               desripcionPrograma,
               criterioPrograma,
               actividadesPrograma,
               obervacionesPrograma
            } = valores;


          let programas = {
            dsprograma:nombrePrograma,
            dsclaveprograma:clavePrograma,
            
            fcvigenciainicio:vigenciaDesde,
            fcvigenciafin: vigenciaHasta,
            fcregistrowebinicio: periodoRegistroWebDesde,
            fcregistrowebfin: periodoRegistroWebHasta,
            fcregistropresencialinicio: periodoRegistroPresencialDesde,
            fcregistropresencialfin: periodoRegistroPresencialHasta,
            dsdescripcion: desripcionPrograma,
            dscriterioelegibilidad: criterioPrograma,
            dscontinuidad: actividadesPrograma,
            dsobservaciones: obervacionesPrograma,
            boactivo: true
          }
          
            registrar(programas);
            history.push("/admin/programas")
         
        
      }
  })

    return (
      <form
            onSubmit={formik.handleSubmit}
        >
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
                        error={formik.errors.nombrePrograma}
                        label="Nombre del Programa de apoyo"
                        variant="outlined"
                        name="nombrePrograma"
                        fullWidth
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.nombrePrograma}
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
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.clavePrograma}
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
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.vigenciaDesde}
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
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.vigenciaHasta}
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
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.periodoRegistroWebDesde}
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
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.periodoRegistroWebHasta}
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
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.periodoRegistroPresencialDesde}
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
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.periodoRegistroPresencialHasta}
                          InputLabelProps={{
                            shrink: true,
                          }}
                      />
                  </GridItem>

                  <GridItem xs={12} sm={12} md={12}>
                      <TextField
                              id="desripcionPrograma"
                              name="desripcionPrograma"
                              label="Descripción del Programa de Apoyo"
                              style={{marginBottom: '20px'}}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={formik.values.desripcionPrograma}
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
                              id="criterioPrograma"
                              name="criterioPrograma"
                              value={formik.values.criterioPrograma}
                              label="Criterios de Elegibilidad del Programa (opcional)"
                              style={{marginBottom: '20px'}}
                              fullWidth
                              multiline
                              rows={4}
                              variant="outlined"
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={12}>
                    <TextField
                                id="actividadesPrograma,,"
                                name="actividadesPrograma"
                                value={formik.values.actividadesPrograma}
                                label="Actividades por realizar para continuar con el programa (opcional)"
                                style={{marginBottom: '20px'}}
                                fullWidth
                                multiline
                                rows={4}
                                variant="outlined"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                      />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={12}>
                  <TextField
                                id="obervacionesPrograma"
                                name="obervacionesPrograma"
                                value={formik.values.obervacionesPrograma}
                                label="Observaciones (opcional)"
                                style={{marginBottom: '20px'}}
                                fullWidth
                                multiline
                                rows={4}
                                variant="outlined"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                      />
                  </GridItem>
                </GridContainer>
                
                <Button  className={classes.updateProfileButton}
                  type='submit'>
                  Registrar
                </Button>
                <Clearfix />
              </CardBody>
            </Card>
          </GridItem>
          
        </GridContainer>
        <Mensaje
             setOpen={setOpen}
             open={open}
            severity={"error"}
            message={"Ocurrio un erriro"}
          />
      </form>

    );
}

