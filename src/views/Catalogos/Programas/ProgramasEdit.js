import React, { useContext, useEffect, useState } from 'react';
import { Button, Checkbox, FormHelperText, FormLabel, Grid, List, ListItem, ListItemIcon, ListItemText, makeStyles, MenuItem, Paper, TextField } from '@material-ui/core'

import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';
import Card from 'components/Card/Card';
import CardHeader from 'components/Card/CardHeader';

import styles from "assets/jss/material-dashboard-pro-react/views/userProfileStyles.js";
import CardBody from 'components/Card/CardBody';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Clearfix from 'components/Clearfix/Clearfix';
const useStyles = makeStyles(styles);
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router";
import { ProgramasContext } from 'contexts/catalogos/Programas/programasContext';

import { Mensaje } from 'components/Personalizados/Mensaje';
import { TiposBeneficiariosContext } from 'contexts/catalogos/tiposBeneficiariosContext';
import { EdadesBeneficiariosContext } from 'contexts/catalogos/edadesBeneficiariosContext';
import { MultiSelect } from 'react-multi-select-component';
import { useTranslation } from 'react-i18next';
import { DropzoneAreaBase } from 'material-ui-dropzone';

import 'moment/locale/es';
import moment from 'moment';

//context
import { DocumentosContext } from "contexts/catalogos/documentosContext";

import { ModalConfirmacion } from 'commons/ModalConfirmacion';
import { ModalContextConfirmacion } from 'contexts/modalContextConfirmacion';
import { MunicipiosContext } from 'contexts/catalogos/MunicipiosContext';

function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

export const ProgramasEdit = () => {
  const { t } = useTranslation();

  const { actualizar, programa, getByID,
    getMunicipiosProg, getDocumentosProg, programasMunicipiosList, programasDocumentosList,
    getImgDocumentosProg, imagenprg } = useContext(ProgramasContext);
  const classes = useStyles();
  let query = useLocation();
  let history = useHistory();

  const [error, setError] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [msjConfirmacion, setMsjConfirmacion] = useState('');

  const { tiposBeneficiariosList, getTipoBeneficiarios } = useContext(TiposBeneficiariosContext);
  const { edadesBeneficiariosList } = useContext(EdadesBeneficiariosContext);

  const [municipiosSelect, setMunicipiosSelect] = useState([]);


  const [left, setLeft] = React.useState([]);
  const [right, setRight] = React.useState([]);

  const [checked, setChecked] = React.useState([]);
  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);
  const [selected, setSelected] = useState([]);
  const [archivo, setArchivos] = React.useState();
  const [documentslst, setDocumentslst] = React.useState([]);

  const [dataEditar] = useState({});

  const { getMunicipiosAll, municipiosList } = useContext(MunicipiosContext)
  const { getDocumentos, documentosList } = useContext(DocumentosContext);
  const [archivoPrograma, setArchivoPrograma] = React.useState([]);
  useEffect(() => {
    getMunicipiosAll()
    getDocumentos();
    getTipoBeneficiarios();
  }, []);

  useEffect(() => {

    if (query.state?.mobNo) {
      getByID(query.state.mobNo);
      getMunicipiosProg(query.state.mobNo)
      getDocumentosProg(query.state.mobNo)
      getImgDocumentosProg(query.state.mobNo)
    }

  }, [location]);

  useEffect(() => {

    const lstmun = []
    programasMunicipiosList?.map(mp => {
      const mpi = municipiosSelect.filter(e => e.value === mp.municipio_id)
      lstmun.push({ label: mpi[0]?.label, value: mp.id })
    })

    setSelected(lstmun)

  }, [municipiosSelect]);


  useEffect(() => {
    console.log('<1', imagenprg)

    const blobpgr = new Blob([imagenprg], { type: 'image/png' });

    const file2 = new File([blobpgr], 'Proceso aduanal.png', { type: 'image/png' })

    setArchivoPrograma(`data:image/png;base64,${imagenprg}`)
    console.log('blobpgr>>>', blobpgr)
    console.log('file2>>>>', file2)

  }, [imagenprg]);





  useEffect(() => {
    const lstDocsRg = []
    const lstDocsLf = []

    documentosList.map((mp1) => {
      const docsagr = programasDocumentosList.filter(e => e.id === mp1.id)

      if (docsagr.length > 0) {
        lstDocsRg.push(mp1)
      } else {
        lstDocsLf.push(mp1)
      }

    })


    setChecked(lstDocsRg)
    setRight(lstDocsRg);
    setLeft(lstDocsLf);
    setLeft(not(lstDocsLf, leftChecked))
    setChecked(not(checked, leftChecked))

  }, [programasDocumentosList]);

  let data = programa;


  useEffect(() => {
    const lstmun = []
    municipiosList.map((mn) => {
      lstmun.push({ label: mn.dsmunicipio, value: mn.id })
    })
    setMunicipiosSelect(lstmun)
  }, [municipiosList]);

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




  console.log("data", dataEditar);
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


  // Schema de validación
  const schemaValidacion = Yup.object({
    dsprograma: Yup.string().nullable()
      .required('El nombre del programa  es obligatorio')
      .matches(/^[a-zA-Z0-9_.-\sñÑ]*$/, `${t('msg.nocarateresespeciales')}`),
    dsclaveprograma: Yup.string().nullable()
      .required('La clave del programa es obligatoria')
      .matches(/^[a-zA-Z0-9_.-\sñÑ]*$/, `${t('msg.nocarateresespeciales')}`),
    /*  vigenciaDesde: Yup.string()
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
        .required('El periodo del registro presencial hasta es obligatorio'),*/
    dsdescripcion: Yup.string().nullable()
      .required('La descripcion del pograma de apoyo  es obligatorio')
      .matches(/^[a-zA-Z0-9_.-\sñÑ]*$/, `${t('msg.nocarateresespeciales')}`),
    dscriterioelegibilidad: Yup.string().nullable()
      .matches(/^[a-zA-Z0-9_.-\sñÑ]*$/, `${t('msg.nocarateresespeciales')}`),
    dscontinuidad: Yup.string()
      .matches(/^[a-zA-Z0-9_.-\sñÑ]*$/, `${t('msg.nocarateresespeciales')}`),
    dsobservaciones: Yup.string()
      .matches(/^[a-zA-Z0-9_.-\sñÑ]*$/, `${t('msg.nocarateresespeciales')}`),
    dsidentificadorplantilla: Yup.string()
      .required('El identificador plantilla es obligatorio'),
    dsnombreplantilla: Yup.string()
      .required('El nombre de la plantilla es obligatorio'),
    dsobjetivo: Yup.string()
      .required('El objetivo es obligatorio'),
    urlpublica: Yup.string()
      .required('URL pública es obligatorio'),

  });

  const [valores, setValores] = useState();
  const { setShowModalConfirmacion } = useContext(ModalContextConfirmacion);


  const confirmacionDialog = (e) => {
    console.log("Aqui hace el llamado al dialog", e);
    setShowModalConfirmacion(true);
    setValores(e)
  }

  const handleRegistrar = () => {
    actualizar(query.state?.mobNo, valores, archivo, documentslst).then(response => {

      setOpenSnackbar(true);
      setMsjConfirmacion(`${t('msg.registroguardadoexitosamente')}`);
      const timer = setTimeout(() => {
        setError(false);
        history.push("/admin/programas");
        setShowModalConfirmacion(false);

      }, 1000);
      return () => clearTimeout(timer);
    })
      .catch(err => {
        setOpenSnackbar(true);
        setError(true);
        setMsjConfirmacion(`${t('msg.ocurrioerrorcalidarinfo')}`);
      });
  }

  const actualizarInfo = async valores => {
    confirmacionDialog(valores);
  }

  const handleChangeFile = e => {
    console.log("files=>>>", e);

    setArchivos(new Blob([JSON.stringify(e)], {
      type: 'application/json',
    }));
    console.log('archivo', archivo)
  }




  return (

    <Formik
      enableReinitialize
      initialValues={data}
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
                  <CardHeader color="primary"> Programas </CardHeader>
                  <CardBody>
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={12}>
                        <TextField
                          style={{ marginBottom: '20px' }}
                          id="dsprograma"
                          error={props.errors.dsprograma}
                          label="Nombre del Programa de apoyo"
                          variant="outlined"
                          name="dsprograma"
                          fullWidth
                          onChange={props.handleChange}
                          onBlur={props.handleBlur}
                          value={props.values?.dsprograma}
                          InputLabelProps={{ shrink: true }}
                          inputProps={{ maxLength: "500" }}
                        />
                        {props.touched.dsprograma && props.errors.dsprograma ? (
                          <FormHelperText style={{ marginBottom: '20px' }} error={props.errors.dsprograma}>
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
                          style={{ marginBottom: '20px' }}
                          fullWidth
                          onChange={props.handleChange}
                          onBlur={props.handleBlur}
                          value={props.values?.dsclaveprograma}
                          InputLabelProps={{ shrink: true }}
                          inputProps={{ maxLength: "100" }}
                        />
                        {props.touched.dsclaveprograma && props.errors.dsclaveprograma ? (
                          <FormHelperText style={{ marginBottom: '20px' }} error={props.errors.dsclaveprograma}>
                            {props.errors.dsclaveprograma}
                          </FormHelperText>
                        ) : null}
                      </GridItem>

                    </GridContainer>


                    <GridContainer>
                      <GridItem xs={12} sm={12} md={6}>
                        <CardBody>
                          <TextField
                            id="fcvigenciainicio"
                            label="Vigencia del programa inicio"
                            type="date"
                            fullWidth
                            className={classes.textField}
                            InputLabelProps={{
                              shrink: true,
                            }}
                            value={moment(new Date(parseInt(props.values?.fcvigenciainicio))).format("YYYY-MM-DD")}
                            name="fcvigenciainicio"
                            onChange={props.handleChange}
                            InputProps={{
                              inputProps: {
                                max: moment(new Date(parseInt(props.values?.fcvigenciafin))).format("YYYY-MM-DD")
                              }
                            }}
                          />
                        </CardBody>

                      </GridItem>

                      <GridItem xs={12} sm={12} md={6}>
                        <CardBody>
                          <TextField
                            id="fcvigenciafin"
                            label="Vigencia del programa hasta"
                            type="date"
                            fullWidth
                            className={classes.textField}
                            InputLabelProps={{
                              shrink: true,
                            }}
                            value={moment(new Date(parseInt(props.values?.fcvigenciafin))).format("YYYY-MM-DD")}
                            name="fcvigenciafin"
                            onChange={props.handleChange}
                            InputProps={{
                              inputProps: {
                                min: moment(new Date(parseInt(props.values?.fcvigenciainicio))).format("YYYY-MM-DD")
                              }
                            }}
                          />
                        </CardBody>

                      </GridItem>


                      <GridItem xs={12} sm={12} md={6}>

                        <CardBody>
                          <TextField
                            id="fcregistropresencialinicio"
                            label="Periodo registro presencial desde"
                            type="date"
                            fullWidth
                            className={classes.textField}
                            InputLabelProps={{
                              shrink: true,
                            }}
                            value={moment(new Date(parseInt(props.values?.fcregistropresencialinicio))).format("YYYY-MM-DD")}
                            name="fcregistropresencialinicio"
                            onChange={props.handleChange}
                            InputProps={{
                              inputProps: {
                                max: moment(new Date(parseInt(props.values?.fcregistropresencialfin))).format("YYYY-MM-DD")
                              }
                            }}
                          />
                        </CardBody>

                      </GridItem>

                      <GridItem xs={12} sm={12} md={6}>
                        <CardBody>
                          <TextField
                            id="fcregistropresencialfin"
                            label="Periodo registro presencial hasta"
                            type="date"
                            fullWidth
                            className={classes.textField}
                            InputLabelProps={{
                              shrink: true,
                            }}
                            value={moment(new Date(parseInt(props.values?.fcregistropresencialfin))).format("YYYY-MM-DD")}
                            name="fcregistropresencialfin"
                            onChange={props.handleChange}
                            InputProps={{
                              inputProps: {
                                min: moment(new Date(parseInt(props.values?.fcregistropresencialinicio))).format("YYYY-MM-DD")
                              }
                            }}
                          />
                        </CardBody>

                      </GridItem>

                      <GridItem xs={12} sm={12} md={6}>
                        <CardBody>
                          <TextField
                            id="fcregistrowebinicio"
                            label="Periodo registro web desde"
                            type="date"
                            fullWidth
                            className={classes.textField}
                            InputLabelProps={{
                              shrink: true,
                            }}
                            value={moment(new Date(parseInt(props.values?.fcregistrowebinicio))).format("YYYY-MM-DD")}
                            name="fcregistrowebinicio"
                            onChange={props.handleChange}
                            InputProps={{
                              inputProps: {
                                max: moment(new Date(parseInt(props.values?.fcregistrowebfin))).format("YYYY-MM-DD")
                              }
                            }}
                          />
                        </CardBody>

                      </GridItem>

                      <GridItem xs={12} sm={12} md={6}>
                        <CardBody>
                          <TextField
                            id="fcregistrowebfin"
                            label="Periodo registro web hasta"
                            type="date"
                            fullWidth
                            className={classes.textField}
                            InputLabelProps={{
                              shrink: true,
                            }}
                            value={moment(new Date(parseInt(props.values?.fcregistrowebfin))).format("YYYY-MM-DD")}
                            name="fcregistrowebfin"
                            onChange={props.handleChange}
                            InputProps={{
                              inputProps: {
                                min: moment(new Date(parseInt(props.values?.fcregistrowebinicio))).format("YYYY-MM-DD")
                              }
                            }}
                          />
                        </CardBody>

                      </GridItem>



                      <GridItem xs={12} sm={12} md={12}>
                        <TextField
                          style={{ marginBottom: '20px' }}
                          id="urlpublica"
                          error={props.errors.urlpublica}
                          label="URL Pública para registro Web"
                          variant="outlined"
                          name="urlpublica"
                          fullWidth
                          onChange={props.handleChange}
                          onBlur={props.handleBlur}
                          value={props.values?.urlpublica}
                          InputLabelProps={{ shrink: true }}
                          inputProps={{ maxLength: "500" }}
                        />
                        {props.touched.urlpublica && props.errors.urlpublica ? (
                          <FormHelperText style={{ marginBottom: '20px' }} error={props.errors.urlpublica}>
                            {props.errors.urlpublica}
                          </FormHelperText>
                        ) : null}
                      </GridItem>


                      <GridItem xs={12} sm={12} md={12}>
                        <TextField
                          id="dsdescripcion"
                          name="dsdescripcion"
                          label="Descripción del Programa de Apoyo"
                          style={{ marginBottom: '20px' }}
                          fullWidth
                          multiline
                          rows={4}
                          variant="outlined"
                          onChange={props.handleChange}
                          onBlur={props.handleBlur}
                          value={props.values?.dsdescripcion}
                          InputLabelProps={{ shrink: true }}
                          inputProps={{ maxLength: "800" }}
                        />
                        {props.touched.dsdescripcion && props.errors.dsdescripcion ? (
                          <FormHelperText style={{ marginBottom: '20px' }} error={props.errors.dsdescripcion}>
                            {props.errors.dsdescripcion}
                          </FormHelperText>
                        ) : null}
                      </GridItem>
                    </GridContainer>

                    <GridContainer>
                      <GridItem xs={12} sm={12} md={12}>
                        {props.values !== null ?

                          <TextField
                            variant="outlined"
                            label="Selecciona un tipo de beneficiario"
                            select
                            style={{ marginBottom: '20px' }}
                            fullWidth
                            name="idBeneficiario"
                            value={props?.values?.idBeneficiario}
                            onChange={props.handleChange}
                          >
                            <MenuItem value="0">
                              <em>{t('cmb.ninguno')}</em>
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
                          </TextField> :
                          <></>
                        }


                      </GridItem>
                      <GridItem xs={12} sm={12} md={12}>
                        {props.values !== null ?

                          <TextField
                            variant="outlined"
                            label="Selecciona un rango de edad"
                            select
                            style={{ marginBottom: '20px' }}
                            fullWidth
                            name="idRangoEdadBeneficiario"
                            value={props.values?.idRangoEdadBeneficiario}
                            onChange={props.handleChange}
                          >

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
                          :
                          <></>

                        }

                        {props.touched.idRangoEdadBeneficiario && props.errors.idRangoEdadBeneficiario ? (
                          <FormHelperText error={props.errors.idRangoEdadBeneficiario}>{props.errors.idRangoEdadBeneficiario}</FormHelperText>
                        ) : null}
                      </GridItem>

                      <GridItem xs={12} sm={12} md={12}>
                        <FormLabel component="legend">Cobertura municipal </FormLabel>

                        <MultiSelect
                          style={{ marginBottom: '120px' }}
                          options={municipiosSelect}
                          value={selected}
                          onChange={setSelected}
                          labelledBy="Seleccionar"
                        />
                      </GridItem>

                      <GridItem xs={12} sm={12} md={12} style={{ marginBottom: '20px' }}>
                        <FormLabel style={{ marginBottom: '20px' }} component="legend">Documentación y formatos requeridos para el tipo de apoyo</FormLabel>
                        <Grid
                          container
                          spacing={2}
                          style={{ marginBottom: '20px' }}
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
                          id="dscriterioelegibilidad"
                          name="dscriterioelegibilidad"
                          label="Criterios de Elegibilidad del Programa (opcional)"
                          style={{ marginBottom: '20px' }}
                          fullWidth
                          multiline
                          rows={4}
                          variant="outlined"
                          onChange={props.handleChange}
                          onBlur={props.handleBlur}
                          value={props.values?.dscriterioelegibilidad}
                          InputLabelProps={{ shrink: true }}
                          inputProps={{ maxLength: "800" }}
                        />
                        {props.touched.dscriterioelegibilidad && props.errors.dscriterioelegibilidad ? (
                          <FormHelperText style={{ marginBottom: '20px' }} error={props.errors.dscriterioelegibilidad}>
                            {props.errors.dscriterioelegibilidad}
                          </FormHelperText>
                        ) : null}
                      </GridItem>
                    </GridContainer>
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={12}>
                        <TextField
                          id="dscontinuidad"
                          name="dscontinuidad"
                          label="Actividades por realizar para continuar con el programa (opcional)"
                          style={{ marginBottom: '20px' }}
                          fullWidth
                          multiline
                          rows={4}
                          variant="outlined"
                          onChange={props.handleChange}
                          onBlur={props.handleBlur}
                          value={props.values?.dscontinuidad}
                          InputLabelProps={{ shrink: true }}
                          inputProps={{ maxLength: "300" }}
                        />
                        {props.touched.dscontinuidad && props.errors.dscontinuidad ? (
                          <FormHelperText style={{ marginBottom: '20px' }} error={props.errors.dscontinuidad}>
                            {props.errors.dscontinuidad}
                          </FormHelperText>
                        ) : null}
                      </GridItem>
                    </GridContainer>
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={12}>
                        <TextField
                          id="dsobservaciones"
                          name="dsobservaciones"
                          label="Observaciones (opcional)"
                          style={{ marginBottom: '20px' }}
                          fullWidth
                          multiline
                          rows={4}
                          variant="outlined"
                          onChange={props.handleChange}
                          onBlur={props.handleBlur}
                          value={props.values?.dsobservaciones}
                          InputLabelProps={{ shrink: true }}
                          inputProps={{ maxLength: "500" }}
                        />
                      </GridItem>

                    </GridContainer>

                    <GridContainer>
                      <GridItem xs={12} sm={12} md={12}>


                        <TextField
                          style={{ marginBottom: '20px' }}
                          id="dsnombreplantilla"
                          error={props.errors.dsnombreplantilla}
                          label="Nombre de la plantilla FR"
                          variant="outlined"
                          name="dsnombreplantilla"
                          fullWidth
                          onChange={props.handleChange}
                          onBlur={props.handleBlur}
                          value={props.values?.dsnombreplantilla}
                          InputLabelProps={{ shrink: true }}
                          inputProps={{ maxLength: "500" }}
                        />
                        {props.touched.dsnombreplantilla && props.errors.dsnombreplantilla ? (
                          <FormHelperText style={{ marginBottom: '20px' }} error={props.errors.dsnombreplantilla}>
                            {props.errors.dsnombreplantilla}
                          </FormHelperText>
                        ) : null}
                      </GridItem>
                    </GridContainer>
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={12}>
                        <TextField
                          style={{ marginBottom: '20px' }}
                          id="dsidentificadorplantilla"
                          error={props.errors.dsidentificadorplantilla}
                          label="Identificador de plantilla FR"
                          variant="outlined"
                          name="dsidentificadorplantilla"
                          fullWidth
                          onChange={props.handleChange}
                          onBlur={props.handleBlur}
                          value={props.values?.dsidentificadorplantilla}
                          InputLabelProps={{ shrink: true }}
                          inputProps={{ maxLength: "500" }}
                        />
                        {props.touched.dsidentificadorplantilla && props.errors.dsidentificadorplantilla ? (
                          <FormHelperText style={{ marginBottom: '20px' }} error={props.errors.dsidentificadorplantilla}>
                            {props.errors.dsidentificadorplantilla}
                          </FormHelperText>
                        ) : null}
                      </GridItem>

                    </GridContainer>

                    <GridContainer>
                      <GridItem xs={12} sm={12} md={12}>
                        <TextField
                          id="dsobjetivo"
                          name="dsobjetivo"
                          label="Texto descriptivo del programa (html)"
                          style={{ marginBottom: '20px' }}
                          fullWidth
                          multiline
                          rows={20}
                          variant="outlined"
                          onChange={props.handleChange}
                          onBlur={props.handleBlur}
                          value={props.values?.dsobjetivo}
                          InputLabelProps={{ shrink: true }}

                        />

                        {props.touched.dsobjetivo && props.errors.dsobjetivo ? (
                          <FormHelperText style={{ marginBottom: '20px' }} error={props.errors.dsobjetivo}>
                            {props.errors.dsobjetivo}
                          </FormHelperText>
                        ) : null}
                      </GridItem>
                    </GridContainer>


            



                    <GridContainer>
                      {console.log('imgxxx=>', archivoPrograma)}
                      {console.log('${archivoPrograma[0]?.data}', `${archivoPrograma[0]?.data}`)}
                      <GridItem xs={12} sm={12} md={6}>
                        <DropzoneAreaBase
                          acceptedFiles={['image/png']}
                          onAdd={(fileObjs) => setArchivoPrograma(fileObjs)}
                          fileObjects={archivoPrograma}
                          filesLimit='1'
                          showPreviews={false}
                          showPreviewsInDropzone={false}
                          useChipsForPreview={false}
                          previewChipProps={false}

                        />

                      </GridItem>
                      <GridItem xs={12} sm={12} md={6}>

                        <img width='500' height='200' src={`${archivoPrograma[0]?.data}`} />

                      </GridItem>
                    </GridContainer>

                    <Button className={classes.updateProfileButton}
                      type='submit'>
                      Guardar
                    </Button>
                    <Clearfix />
                  </CardBody>
                </Card>
              </GridItem>

            </GridContainer>

            <ModalConfirmacion
              handleRegistrar={handleRegistrar} evento="Editar"
            />
            <Mensaje
              setOpen={setOpenSnackbar}
              open={openSnackbar}
              severity={error ? "error" : "success"}
              message={msjConfirmacion}
            />
          </form>

        )
      }}
    </Formik>

  )

}
