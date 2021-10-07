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


import {  Checkbox, FormHelperText, FormLabel, Grid, List, ListItem, ListItemIcon, ListItemText, MenuItem, Paper, TextField } from "@material-ui/core";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { ProgramasContext } from "contexts/catalogos/Programas/programasContext";

import { Mensaje } from "components/Personalizados/Mensaje";
import CardIcon from "components/Card/CardIcon";
import { useHistory } from "react-router";

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import DateFnsUtils from '@date-io/date-fns';
import deLocale from "date-fns/locale/es";
import { Loading } from "components/Personalizados/Loading";
import { TiposBeneficiariosContext } from "contexts/catalogos/tiposBeneficiariosContext";
import { EdadesBeneficiariosContext } from "contexts/catalogos/edadesBeneficiariosContext";
import { RegionMunicipiosContext } from "contexts/catalogos/RegionMunicipiosContext";
import { MultiSelect } from "react-multi-select-component";
import { DocumentosContext } from "contexts/catalogos/documentosContext";

const useStyles = makeStyles(styles);


function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1);
}


export const ProgramasForm = () => {
    const { registrar} = useContext(ProgramasContext);
    const { tiposBeneficiariosList } = useContext(TiposBeneficiariosContext);
    const { edadesBeneficiariosList } = useContext(EdadesBeneficiariosContext);
    const [loading, setLoading] = useState(false);
    const classes = useStyles();
    let history = useHistory();

    const [error, setError] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [msjConfirmacion, setMsjConfirmacion] = useState('');
    const [municipiosSelect, setMunicipiosSelect] = useState([]);

    const { regionList, getRegionMunicipios } = useContext(RegionMunicipiosContext);

    const { getDocumentos, documentosList } = useContext(DocumentosContext);

    const [left, setLeft] = React.useState([]);
    const [right, setRight] = React.useState([]);
    
    const [checked, setChecked] = React.useState([]);
    const leftChecked = intersection(checked, left);
    const rightChecked = intersection(checked, right);
    const [selected, setSelected] = useState([]);

    const [documentslst, setDocumentslst] = React.useState([]);
    setDocumentslst

    useEffect(() => {
      getRegionMunicipios('a3de85a7-6c23-46a4-847b-d79b3a90963d')
      getDocumentos();
    }, []);

    useEffect(() => {
      const lstmun = []
      regionList.map((mn) => {
          lstmun.push({ label: mn.dsMunicipio, value: mn.idMunicipio })
      })
      setMunicipiosSelect(lstmun)
  }, [regionList]);

    useEffect(() => {
      setLeft(documentosList)
  }, [documentosList]);

  useEffect(() => {
    var docslst = []
    right.map((mp) => {
        docslst.push(mp.id)
    })
    setDocumentslst(docslst)
}, [right]);


  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
        newChecked.push(value);
    } else {
        newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
};

    const handleCheckedRight = () => {
      setRight(right.concat(leftChecked));
      setLeft(not(left, leftChecked));
      setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
      setLeft(left.concat(rightChecked));
      setRight(not(right, rightChecked));
      setChecked(not(checked, rightChecked));
  };

  const customList = (items) => (
    <Paper className={classes.paper}>
        <List dense component="div" role="list">
            {items.map((value) => {
                const labelId = `transfer-list-item-${value}-label`;

                return (
                    <ListItem key={value} role="listitem" button onClick={handleToggle(value)}>
                        <ListItemIcon>
                            <Checkbox
                                checked={checked.indexOf(value) !== -1}
                                tabIndex={-1}
                                disableRipple
                                inputProps={{ 'aria-labelledby': labelId }}
                            />
                        </ListItemIcon>
                        <ListItemText id={labelId} primary={`${value.dsdocumento}`} />
                    </ListItem>
                );
            })}
            <ListItem />
        </List>
    </Paper>
);

    const formik = useFormik({
      initialValues: {
          nombrePrograma: null,
          clavePrograma:null,
          vigenciaDesde:null,
          vigenciaHasta:null,
          periodoRegistroWebDesde:null,
          periodoRegistroWebHasta:null,
          periodoRegistroPresencialDesde:null,
          periodoRegistroPresencialHasta:null,
          desripcionPrograma: null,
          criterioPrograma: null,
          actividadesPrograma: null,
          obervacionesPrograma: null,
          idBeneficiario: null,
          idRangoEdadBeneficiario: null,
      },
      validationSchema: Yup.object({
        nombrePrograma: Yup.string().nullable()
            .required('El nombre del programa  es obligatorio'),
        clavePrograma: Yup.string().nullable()
            .required('La clave del programa es obligatoria'),
        vigenciaDesde: Yup.string().nullable()
            .required('La vigencia desde es obligatorio'),
        vigenciaHasta: Yup.date().nullable()
            .required('La vigencia hasta es obligatorio'),
        periodoRegistroWebDesde:Yup.date().nullable()
            .required('El periodo del registro web desde es obligatorio'),
        periodoRegistroWebHasta:Yup.date().nullable()
          .required('El periodo del registro web hasta es obligatorio'),
        periodoRegistroPresencialDesde: Yup.date().nullable()
          .required('El periodo del registro presencial desde es obligatorio'),
        periodoRegistroPresencialHasta: Yup.date()
        .nullable()
          .required('El periodo del registro presencial hasta es obligatorio'),
        desripcionPrograma: Yup.string().nullable()
          .required('La descripcion del pograma de apoyo  es obligatorio'),
        criterioPrograma: Yup.string().nullable()
          .required('Los criterios de elegibilidad son obligatorios'),
        actividadesPrograma: Yup.string().nullable()
          .required('Las actividades por realizar son obligatorios'),
        idBeneficiario: Yup.string()
          .required('El tipo de beneficiario es obligatorio'),
        idRangoEdadBeneficiario: Yup.string()
                .required('El rango de edad es obligatorio'),
    }),
      onSubmit: async valores => {
        setLoading(true);
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
               obervacionesPrograma,
               idBeneficiario,
               idRangoEdadBeneficiario
            } = valores;
            console.log('miramira');
          console.log(selected);
          const lstmunSeleccionados = []
            selected.map((mn) => {
              lstmunSeleccionados.push(mn.value);
          })
          console.log('sasdsa');
          console.log(lstmunSeleccionados);
          
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
            boactivo: true,
            idBeneficiario,
            idRangoEdadBeneficiario,
            coberturaMunicipal: lstmunSeleccionados,
            documentosRequisitos: documentslst,
          }
          console.log(programas);
            registrar(programas).then(response => {
              console.log(response);
              setOpenSnackbar(true);
             
              setMsjConfirmacion(`El programa ${response.data.dsprograma}  fue registrado correctamente `  );
             
           /*  const timer = setTimeout(() => {
              setLoading(false);
              setError(false);
                history.push("/admin/programas")

              }, 5000);
              return () => clearTimeout(timer);*/
            })
            .catch(err => {   
              setOpenSnackbar(true);
              setError(true);
              setMsjConfirmacion(`Ocurrio un error, ${err}`  );
            });;        
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
                    {formik.touched.nombrePrograma && formik.errors.nombrePrograma ? (
                    <FormHelperText  style={{marginBottom: '20px'}} error={formik.errors.nombrePrograma}>
                      {formik.errors.nombrePrograma}
                    </FormHelperText>
                ) : null}
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
                    {formik.touched.clavePrograma && formik.errors.clavePrograma ? (
                    <FormHelperText  style={{marginBottom: '20px'}} 
                      error={formik.errors.clavePrograma}>{formik.errors.clavePrograma}
                    </FormHelperText>
                ) : null}
                  </GridItem>
                  
                </GridContainer>
                
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                  <MuiPickersUtilsProvider  locale={deLocale} utils={DateFnsUtils}>
                            <KeyboardDatePicker
                            id="vigenciaDesde"
                            name="vigenciaDesde"
                            fullWidth
                            style={{marginBottom: '20px'}}
                            label="Vigencia del Programa Inicio"
                            inputVariant="outlined"
                            format="MM/dd/yyyy"
                            clearable
                            value={formik.values.vigenciaDesde}
                            onChange={value => formik.setFieldValue("vigenciaDesde", value)}
                            onBlur={formik.handleBlur}
                            KeyboardButtonProps={{
                              "aria-label": "change date"
                            }}
                            maxDate= {formik.values.vigenciaHasta}
                          />
                    </MuiPickersUtilsProvider>
                     {formik.touched.vigenciaDesde && formik.errors.vigenciaDesde ? (
                    <FormHelperText 
                      style={{marginBottom: '20px'}}
                      error={formik.errors.vigenciaDesde}>{formik.errors.vigenciaDesde}</FormHelperText>
                ) : null}
                  </GridItem>

                  <GridItem xs={12} sm={12} md={6}>
                    <MuiPickersUtilsProvider  locale={deLocale} utils={DateFnsUtils}>
                              <KeyboardDatePicker
                              id="vigenciaHasta"
                              name="vigenciaHasta"
                              fullWidth
                              style={{marginBottom: '20px'}}
                              label="Vigencia del Programa Hasta"
                              inputVariant="outlined"
                              format="MM/dd/yyyy"
                              clearable
                              value={formik.values.vigenciaHasta}
                              onChange={value => formik.setFieldValue("vigenciaHasta", value)}
                              onBlur={formik.handleBlur}
                              KeyboardButtonProps={{
                                "aria-label": "change date"
                              }}
                              minDate={formik.values.vigenciaDesde}
                            />
                      </MuiPickersUtilsProvider>
                     {formik.touched.vigenciaHasta && formik.errors.vigenciaHasta ? (
                    <FormHelperText style={{marginBottom: '20px'}} error={formik.errors.vigenciaHasta}>
                        {formik.errors.vigenciaHasta}
                    </FormHelperText>
                ) : null}

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
                              value={formik.values.periodoRegistroWebDesde}
                              onChange={value => formik.setFieldValue("periodoRegistroWebDesde", value)}
                              onBlur={formik.handleBlur}
                              KeyboardButtonProps={{
                                "aria-label": "change date"
                              }}
                              maxDate={formik.values.periodoRegistroWebHasta}
                            />
                      </MuiPickersUtilsProvider>
                      {formik.touched.periodoRegistroWebDesde && formik.errors.periodoRegistroWebDesde ? (
                      <FormHelperText style={{marginBottom: '20px'}} error={formik.errors.periodoRegistroWebDesde}>
                        {formik.errors.periodoRegistroWebDesde}
                      </FormHelperText>
                ) : null}
                  </GridItem>

                  <GridItem xs={12} sm={12} md={6}>
                    

                    <MuiPickersUtilsProvider  locale={deLocale} utils={DateFnsUtils}>
                              <KeyboardDatePicker
                              id="periodoRegistroWebHasta"
                              name="periodoRegistroWebHasta"
                              fullWidth
                              style={{marginBottom: '20px'}}
                              label="Periodo Registro web Hasta"
                              inputVariant="outlined"
                              format="MM/dd/yyyy"
                              clearable
                              value={formik.values.periodoRegistroWebHasta}
                              onChange={value => formik.setFieldValue("periodoRegistroWebHasta", value)}
                              onBlur={formik.handleBlur}
                              KeyboardButtonProps={{
                                "aria-label": "change date"
                              }}
                              minDate={formik.values.periodoRegistroWebDesde}
                            />
                      </MuiPickersUtilsProvider>
                      {formik.touched.periodoRegistroWebHasta && formik.errors.periodoRegistroWebHasta ? (
                        <FormHelperText style={{marginBottom: '20px'}} error={formik.errors.periodoRegistroWebHasta}>
                          {formik.errors.periodoRegistroWebHasta}
                        </FormHelperText>
                ) : null}
                  </GridItem>

                  <GridItem xs={12} sm={12} md={6}>
                      <MuiPickersUtilsProvider  locale={deLocale} utils={DateFnsUtils}>
                              <KeyboardDatePicker
                              id="periodoRegistroPresencialDesde"
                              name="periodoRegistroPresencialDesde"
                              fullWidth
                              style={{marginBottom: '20px'}}
                              label="Periodo Registro Presencial Desde"
                              inputVariant="outlined"
                              format="MM/dd/yyyy"
                              clearable
                              value={formik.values.periodoRegistroPresencialDesde}
                              onChange={value => formik.setFieldValue("periodoRegistroPresencialDesde", value)}
                              onBlur={formik.handleBlur}
                              KeyboardButtonProps={{
                                "aria-label": "change date"
                              }}
                              maxDate={formik.values.periodoRegistroPresencialHasta}
                            />
                      </MuiPickersUtilsProvider>

                      {formik.touched.periodoRegistroPresencialDesde && formik.errors.periodoRegistroPresencialDesde ? (
                         <FormHelperText 
                            style={{marginBottom: '20px'}}
                            error={formik.errors.periodoRegistroPresencialDesde}>
                            {formik.errors.periodoRegistroPresencialDesde}
                        </FormHelperText>
                ) : null}
                  </GridItem>

                  <GridItem xs={12} sm={12} md={6}>
               
                        <MuiPickersUtilsProvider  locale={deLocale} utils={DateFnsUtils}>
                              <KeyboardDatePicker
                              id="periodoRegistroPresencialHasta"
                              name="periodoRegistroPresencialHasta"
                              fullWidth
                              style={{marginBottom: '20px'}}
                              label="Periodo Registro Presencial Hasta"
                              inputVariant="outlined"
                              format="MM/dd/yyyy"
                              clearable
                              value={formik.values.periodoRegistroPresencialHasta}
                              onChange={value => formik.setFieldValue("periodoRegistroPresencialHasta", value)}
                              onBlur={formik.handleBlur}
                              KeyboardButtonProps={{
                                "aria-label": "change date"
                              }}
                              minDate={formik.values.periodoRegistroPresencialDesde}
                            />
                      </MuiPickersUtilsProvider>
                      {formik.touched.periodoRegistroPresencialHasta && formik.errors.periodoRegistroPresencialHasta ? (
                        <FormHelperText style={{marginBottom: '20px'}} error={formik.errors.periodoRegistroPresencialHasta}>
                          {formik.errors.periodoRegistroPresencialHasta}
                        </FormHelperText>
                ) : null}       
                      
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
                     {formik.touched.desripcionPrograma && formik.errors.desripcionPrograma ? (
                    <FormHelperText 
                      style={{marginBottom: '20px'}}
                      error={formik.errors.desripcionPrograma}>
                        {formik.errors.desripcionPrograma}
                    </FormHelperText>
                ) : null}  
                  </GridItem>
                </GridContainer>
                
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                  <TextField
                        variant="outlined"
                        label="Selecciona un tipo de beneficiario"
                        select
                        style={{marginBottom: '20px'}}
                        fullWidth
                        name="idBeneficiario"
                        value={formik.values.idBeneficiario}
                        onChange={formik.handleChange}
                    >
                        <MenuItem value="0">
                            <em>Ninguno</em>
                        </MenuItem>
                        {
                            tiposBeneficiariosList.map(
                                item => (
                                    <MenuItem
                                        key={item.id}
                                        value={item.id}>
                                        {item.dstipobeneficiario}
                                    </MenuItem>
                                )
                            )
                        }
                    </TextField>
                    {formik.touched.idBeneficiario && formik.errors.idBeneficiario ? (
                        <FormHelperText error={formik.errors.idBeneficiario}>{formik.errors.idBeneficiario}</FormHelperText>
                    ) : null}
                  </GridItem>
                  <GridItem xs={12} sm={12} md={12}>
                  <TextField
                        variant="outlined"
                        label="Selecciona un rango de edad"
                        select
                        style={{marginBottom: '20px'}}
                        fullWidth
                        name="idRangoEdadBeneficiario"
                        value={formik.values.idRangoEdadBeneficiario}
                        onChange={formik.handleChange}
                    >
                        <MenuItem value="0">
                            <em>Ninguno</em>
                        </MenuItem>
                        {
                            edadesBeneficiariosList.map(
                                item => (
                                    <MenuItem
                                        key={item.id}
                                        value={item.id}>
                                        {item.dsedadbeneficiario}
                                    </MenuItem>
                                )
                            )
                        }

                    </TextField>
                    {formik.touched.idRangoEdadBeneficiario && formik.errors.idRangoEdadBeneficiario ? (
                        <FormHelperText error={formik.errors.idRangoEdadBeneficiario}>{formik.errors.idRangoEdadBeneficiario}</FormHelperText>
                    ) : null}
                  </GridItem>
                  <GridItem xs={12} sm={12} md={12}>
                  <FormLabel component="legend">Cobertura municipal </FormLabel>
                    <MultiSelect
                         style={{marginBottom: '120px'}}
                        options={municipiosSelect}
                        value={selected}
                        onChange={setSelected}
                        labelledBy="Seleccionar"
                    />
                  </GridItem>

                  <GridItem xs={12} sm={12} md={12}  style={{marginBottom: '20px'}}>
                  <FormLabel  style={{marginBottom: '20px'}} component="legend">Documentación y formatos requeridos para el tipo de apoyo</FormLabel>
                    <Grid
                        container
                        spacing={2}
                        style={{marginBottom: '20px'}}
                        justifyContent="center"
                        alignItems="center"
                        className={classes.root}
                        fullWidth
                    >
                        <Grid item>{customList(left)}</Grid>
                        <Grid item>
                            <Grid container direction="column" alignItems="center">

                                <Button
                                    variant="outlined"
                                    size="small"
                                    className={classes.button}
                                    onClick={handleCheckedRight}
                                    disabled={leftChecked.length === 0}
                                    aria-label="move selected right"
                                >
                                    &gt;
                                </Button>
                                <Button
                                    variant="outlined"
                                    size="small"
                                    className={classes.button}
                                    onClick={handleCheckedLeft}
                                    disabled={rightChecked.length === 0}
                                    aria-label="move selected left"
                                >
                                    &lt;
                                </Button>

                            </Grid>
                        </Grid>
                        <Grid item>{customList(right)}</Grid>
                    </Grid>
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
                    {formik.touched.criterioPrograma && formik.errors.criterioPrograma ? (
                      <FormHelperText style={{marginBottom: '20px'}} error={formik.errors.criterioPrograma}>
                          {formik.errors.criterioPrograma}
                      </FormHelperText>
                ) : null}  
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
                       {formik.touched.actividadesPrograma && formik.errors.actividadesPrograma ? (
                        <FormHelperText style={{marginBottom: '20px'}} error={formik.errors.actividadesPrograma}>
                            {formik.errors.actividadesPrograma}
                        </FormHelperText>
                ) : null}  
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
                setOpen={setOpenSnackbar}
                open={openSnackbar}
                severity={error?"error":"success"}
                message={msjConfirmacion}
            />
            <Loading
                  loading={loading} 
                />
      </form>

    );
}

