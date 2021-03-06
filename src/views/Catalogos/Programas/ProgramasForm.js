import React, { useContext, useEffect, useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";

import Clearfix from "components/Clearfix/Clearfix.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import { useDispatch, useSelector } from 'react-redux';


import styles from "assets/jss/material-dashboard-pro-react/views/userProfileStyles.js";


import { Checkbox, FormHelperText, FormLabel, Grid, List, ListItem, ListItemIcon, ListItemText, MenuItem, Paper, TextField } from "@material-ui/core";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { ProgramasContext } from "contexts/catalogos/Programas/programasContext";

import { Mensaje } from "components/Personalizados/Mensaje";
import { useHistory } from "react-router";


import { Loading } from "components/Personalizados/Loading";
import { TiposBeneficiariosContext } from "contexts/catalogos/tiposBeneficiariosContext";
import { EdadesBeneficiariosContext } from "contexts/catalogos/edadesBeneficiariosContext";
import { RegionMunicipiosContext } from "contexts/catalogos/RegionMunicipiosContext";
import { MultiSelect } from "react-multi-select-component";
import { DocumentosContext } from "contexts/catalogos/documentosContext";
import { useTranslation } from 'react-i18next';
import { DropzoneAreaBase } from "material-ui-dropzone";
const useStyles = makeStyles(styles);


function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

import { ModalConfirmacion } from 'commons/ModalConfirmacion';
import { ModalContextConfirmacion } from 'contexts/modalContextConfirmacion';
import { formioComplementoLoading } from 'actions/FormioComplementoAction';


export const ProgramasForm = () => {
  const { t } = useTranslation();
  const { registrar } = useContext(ProgramasContext);
  const { tiposBeneficiariosList,getTipoBeneficiariosActivos} = useContext(TiposBeneficiariosContext);
  const { edadesBeneficiariosList ,getEdadesBeneficiariosActivos } = useContext(EdadesBeneficiariosContext);
  const [loading, setLoading] = useState(false);
  const classes = useStyles();
  let history = useHistory();

  const [error, setError] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [msjConfirmacion, setMsjConfirmacion] = useState('');
  const [municipiosSelect, setMunicipiosSelect] = useState([]);

  const { regionList, getRegionMunicipios } = useContext(RegionMunicipiosContext);

  const {  documentosList, getDocumentosByRequisito, getDocumentosByComplementarios, documentosComplementariosList } = useContext(DocumentosContext);

  const [left, setLeft] = React.useState([]);
  const [right, setRight] = React.useState([]);

  const [checked, setChecked] = React.useState([]);
  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);
  const [selected, setSelected] = useState([]);

  const [leftComplement, setLeftComplement] = React.useState([]);
  const [rightComplement, setRightComplement] = React.useState([]);
  const [checkedComplement, setCheckedComplement] = React.useState([]);
  const leftCheckedComplement = intersection(checkedComplement, leftComplement);
  const rightCheckedComplement = intersection(checkedComplement, rightComplement);
 


  const [documentslst, setDocumentslst] = React.useState([]);
  const [documentslstComplement, setDocumentslstComplement] = React.useState([]);

  const [valores, setValores] = useState();

  const { setShowModalConfirmacion } = useContext(ModalContextConfirmacion);
  const [archivoPrograma, setArchivoPrograma] = React.useState([]);
  const formioComplemento = useSelector(state => state.formioComplemento.formioComplemento);
  const [selectedPlantilla, setSelectedPlantilla] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    getRegionMunicipios('a3de85a7-6c23-46a4-847b-d79b3a90963d')  
    getDocumentosByRequisito('c946c03b-eae1-4ee1-aa93-d99c08825f97')
    getDocumentosByComplementarios('36bd3924-24aa-4ce6-bbad-2c4bdbf5ed82')
    const cargarFormioComplemento = () => dispatch(formioComplementoLoading());
    cargarFormioComplemento();
    console.log("Esto es lo que trae la consulta formioComplemento", formioComplemento);
    getTipoBeneficiariosActivos();
    getEdadesBeneficiariosActivos();
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
    setLeftComplement(documentosComplementariosList)
  }, [documentosComplementariosList]);

  useEffect(() => {
    var docslst = []
    right.map((mp) => {
      docslst.push(mp.id)
    })
    setDocumentslst(docslst)
  }, [right]);

  useEffect(() => {
    var docslst = []
    rightComplement.map((mp) => {
      docslst.push(mp.id)
    })
    setDocumentslstComplement(docslst)
  }, [rightComplement]);


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

  const handleToggleComplement = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setCheckedComplement(newChecked);
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

  const handleCheckedRightComplement = () => {
    setRightComplement(rightComplement.concat(leftCheckedComplement));
    setLeftComplement(not(leftComplement, leftCheckedComplement));
    setCheckedComplement(not(checkedComplement, leftCheckedComplement));
  };

  const handleCheckedLeftComplement = () => {
    setLeftComplement(leftComplement.concat(rightCheckedComplement));
    setRightComplement(not(rightComplement, rightCheckedComplement));
    setCheckedComplement(not(checkedComplement, rightCheckedComplement));
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

  const customListComplementarios = (items) => (
    <Paper className={classes.paper}>
      <List dense component="div" role="list">
        {items.map((value) => {
          const labelId = `transfer-list-item-${value}-label`;

          return (
            <ListItem key={value} role="listitem" button onClick={handleToggleComplement(value)}>
              <ListItemIcon>
                <Checkbox
                  checked={checkedComplement.indexOf(value) !== -1}
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
      clavePrograma: null,
      vigenciaDesde: null,
      vigenciaHasta: null,
      periodoRegistroWebDesde: null,
      periodoRegistroWebHasta: null,
      periodoRegistroPresencialDesde: null,
      periodoRegistroPresencialHasta: null,
      desripcionPrograma: null,
      criterioPrograma: '',
      actividadesPrograma: '',
      obervacionesPrograma: '',
      idBeneficiario: null,
      idRangoEdadBeneficiario: null,
      byimagen: null,
      dsidentificadorplantilla: '',
      dsnombreplantilla: '',
      dsobjetivo: '',
      dsurl: '',
      

    },
    validationSchema: Yup.object({
      nombrePrograma: Yup.string().nullable()
        .required(`${t('msg.nombreprogramaobligatorio')}`)
        .matches('[A-Za-z0-9]', `${t('msg.nocarateresespeciales')}`),
      clavePrograma: Yup.string().nullable()
        .required(`${t('msg.claveprogramaobligatoria')}`)
        .matches('[A-Za-z0-9]', `${t('msg.nocarateresespeciales')}`),
      vigenciaDesde: Yup.string().nullable()
        .required(`${t('msg.vigenciadesdeobligatorio')}`),
      vigenciaHasta: Yup.date().nullable()
        .required(`${t('msg.vigenciahastaobligatorio')}`),
      periodoRegistroWebDesde: Yup.date().nullable()
        .required(`${t('msg.periodoregistrowebdesdeobligatorio')}`),
      periodoRegistroWebHasta: Yup.date().nullable()
        .required(`${t('msg.periodoregistrowebhastaobligatorio')}`),
      periodoRegistroPresencialDesde: Yup.date().nullable()
        .required(`${t('msg.periodoregistropresencialobligatorio')}`),
      periodoRegistroPresencialHasta: Yup.date()
        .nullable()
        .required(`${t('msg.periodoregistropresencialhastaobligatorio')}`),
      desripcionPrograma: Yup.string().nullable()
        .required(`${t('msg.descripcionpogramaapoyoobligatorio')}`)
        .matches('[A-Za-z0-9]', `${t('msg.nocarateresespeciales')}`),
      criterioPrograma: Yup.string()
        .matches('[A-Za-z0-9]', `${t('msg.nocarateresespeciales')}`),
      actividadesPrograma: Yup.string()
        .matches('[A-Za-z0-9]', `${t('msg.nocarateresespeciales')}`),
      obervacionesPrograma: Yup.string()
        .matches('[A-Za-z0-9]', `${t('msg.nocarateresespeciales')}`),
      idBeneficiario: Yup.string()
        .required(`${t('msg.tipobeneficiarioobligatorio')}`),
      idRangoEdadBeneficiario: Yup.string()
        .required(`${t('msg.rangoedadobligatorio')}`),

      dsobjetivo: Yup.string()
        .required(`${t('msg.objetivoobligatorio')}`),
      dsurl: Yup.string()
        .required(`${t('msg.urlpublicaobligatorio')}`),

    }),
    onSubmit: async valores => {
      setLoading(true);
      confirmacionDialog(valores);
    }
  })

  /**
     * abre el dialogo de confirmaci??n
     * @param {valores} e 
     */
  const confirmacionDialog = (e) => {
    console.log("Aqui hace el llamado al dialog", e);
    setShowModalConfirmacion(true);
    setValores(e)
  }

  const handleRegistrar = () => {
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
      idRangoEdadBeneficiario,
      dsidentificadorplantilla,

      dsobjetivo,
      dsurl

    } = valores;
    console.log('miramira');
    console.log(selected);
    const lstmunSeleccionados = []
    selected.map((mn) => {
      lstmunSeleccionados.push(mn.value);
    })
    console.log('sasdsa');
    console.log(lstmunSeleccionados);

    console.log('archivoPrograma', archivoPrograma)
    let nmplantilla = '';
    formioComplemento.map(e => {
      if (e._id === dsidentificadorplantilla) {
        console.log('e.path', e.path)
        nmplantilla = e.path
      }
    })
    const blobpgr = new Blob([archivoPrograma], { type: 'image/png' });
    console.log('blobpgr', blobpgr)
    let programas = {
      dsprograma: nombrePrograma,
      dsclaveprograma: clavePrograma,

      fcvigenciainicio: vigenciaDesde,
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
      file: archivoPrograma[0].data,
      dsidentificadorplantilla: dsidentificadorplantilla,
      dsnombreplantilla: nmplantilla,
      dsobjetivo: dsobjetivo,
      dsurl: dsurl,
      documentosComplementarios:documentslstComplement
    }
    console.log(programas);
    registrar(programas, blobpgr).then(response => {
      console.log(response);
      setOpenSnackbar(true);

      setMsjConfirmacion(`${t('msg.registroguardadoexitosamente')}`);

      const timer = setTimeout(() => {
        setLoading(false);
        setError(false);
        history.push("/admin/programas");
        setShowModalConfirmacion(false);

      }, 5000);
      return () => clearTimeout(timer);
    })
      .catch(err => {
        setOpenSnackbar(true);
        setError(true);
        setMsjConfirmacion(`${t('msg.ocurrioerrorcalidarinfo')}`);
      })
  }

  const handleChangeFile = e => {
    console.log("files=>>>", e);
    console.log(archivoPrograma)

  }

  const handleChangePlantilla = (event) => {
    formik.values.dsidentificadorplantilla = event.target.value._id;
    formik.values.dsnombreplantilla = event.target.value.path;
    setSelectedPlantilla(event.target.value);
    console.log("formik.values.dsidentificadorplantilla", formik.values.dsidentificadorplantilla);
    console.log("formik.values.dsnombreplantilla", formik.values.dsnombreplantilla);
  }

  return (
    <form
      onSubmit={formik.handleSubmit}
    >
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary"> {t('pnl.programas')} </CardHeader>

            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <TextField
                    style={{ marginBottom: '20px' }}
                    id="nombrePrograma"
                    error={formik.errors.nombrePrograma}
                    label={t('lbl.nombreprogramaapoyo')}
                    variant="outlined"
                    name="nombrePrograma"
                    fullWidth
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.nombrePrograma}
                    inputProps={{ maxLength: "500" }}
                  />
                  {formik.touched.nombrePrograma && formik.errors.nombrePrograma ? (
                    <FormHelperText style={{ marginBottom: '20px' }} error={formik.errors.nombrePrograma}>
                      {formik.errors.nombrePrograma}
                    </FormHelperText>
                  ) : null}
                </GridItem>
                <GridItem xs={12} sm={12} md={12}>
                  <TextField
                    id="clavePrograma"
                    label={t('lbl.claveprograma')}
                    name="clavePrograma"
                    variant="outlined"
                    style={{ marginBottom: '20px' }}
                    fullWidth
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.clavePrograma}
                    inputProps={{ maxLength: "100" }}
                  />
                  {formik.touched.clavePrograma && formik.errors.clavePrograma ? (
                    <FormHelperText style={{ marginBottom: '20px' }}
                      error={formik.errors.clavePrograma}>{formik.errors.clavePrograma}
                    </FormHelperText>
                  ) : null}
                </GridItem>

              </GridContainer>

              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <CardBody>
                    <TextField
                      id="vigenciaDesde"
                      label={t('lbl.vigenciaprogramadesde')}
                      type="date"
                      fullWidth
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      value={formik.values.vigenciaDesde}
                      name="vigenciaDesde"
                      onChange={formik.handleChange}
                      InputProps={{
                        inputProps: {

                        }
                      }}
                    />
                    {formik.touched.vigenciaDesde && formik.errors.vigenciaDesde ? (
                      <FormHelperText
                        style={{ marginBottom: '20px' }}
                        error={formik.errors.vigenciaDesde}>{formik.errors.vigenciaDesde}</FormHelperText>
                    ) : null}
                  </CardBody>

                </GridItem>

                <GridItem xs={12} sm={12} md={6}>
                  <CardBody>
                    <TextField
                      id="vigenciaHasta"
                      label={t('lbl.vigenciaprogramahasta')}
                      type="date"
                      fullWidth
                      disabled={formik.values.vigenciaDesde === null}
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      value={formik.values.vigenciaHasta}
                      name="vigenciaHasta"
                      onChange={formik.handleChange}
                      InputProps={{
                        inputProps: {
                          min: formik.values.vigenciaDesde
                        }
                      }}
                    />
                    {formik.touched.vigenciaHasta && formik.errors.vigenciaHasta ? (
                      <FormHelperText style={{ marginBottom: '20px' }} error={formik.errors.vigenciaHasta}>
                        {formik.errors.vigenciaHasta}
                      </FormHelperText>
                    ) : null}
                  </CardBody>


                </GridItem>


                <GridItem xs={12} sm={12} md={6}>
                  <CardBody>
                    <TextField
                      id="periodoRegistroPresencialDesde"
                      label={t('lbl.periodoregistropresencialdesde')}
                      type="date"
                      fullWidth
                      disabled={formik.values.vigenciaDesde === null}
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      value={formik.values.periodoRegistroPresencialDesde}
                      name="periodoRegistroPresencialDesde"
                      onChange={formik.handleChange}
                      InputProps={{
                        inputProps: {
                          min: formik.values.vigenciaDesde,
                          max: formik.values.vigenciaHasta
                        }
                      }}
                    />

                    {formik.touched.periodoRegistroPresencialDesde && formik.errors.periodoRegistroPresencialDesde ? (
                      <FormHelperText
                        style={{ marginBottom: '20px' }}
                        error={formik.errors.periodoRegistroPresencialDesde}>
                        {formik.errors.periodoRegistroPresencialDesde}
                      </FormHelperText>
                    ) : null}
                  </CardBody>

                </GridItem>

                <GridItem xs={12} sm={12} md={6}>
                  <CardBody>

                    <TextField
                      id="periodoRegistroPresencialHasta"
                      label={t('lbl.periodoregistropresencialhasta')}
                      type="date"
                      fullWidth
                      disabled={formik.values.periodoRegistroPresencialDesde === null}
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      value={formik.values.periodoRegistroPresencialHasta}
                      name="periodoRegistroPresencialHasta"
                      onChange={formik.handleChange}
                      InputProps={{
                        inputProps: {
                          min: formik.values.periodoRegistroPresencialDesde,
                          max: formik.values.vigenciaHasta
                        }
                      }}
                    />
                    {formik.touched.periodoRegistroPresencialHasta && formik.errors.periodoRegistroPresencialHasta ? (
                      <FormHelperText style={{ marginBottom: '20px' }} error={formik.errors.periodoRegistroPresencialHasta}>
                        {formik.errors.periodoRegistroPresencialHasta}
                      </FormHelperText>
                    ) : null}

                  </CardBody>




                </GridItem>

                <GridItem xs={12} sm={12} md={6}>
                  <CardBody>
                    <TextField
                      id="periodoRegistroWebDesde"
                      label={t('lbl.periodoregistrowebdesde')}
                      type="date"
                      fullWidth
                      disabled={formik.values.vigenciaDesde === null}
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      value={formik.values.periodoRegistroWebDesde}
                      name="periodoRegistroWebDesde"
                      onChange={formik.handleChange}
                      InputProps={{
                        inputProps: {
                          min: formik.values.vigenciaDesde,
                          max: formik.values.vigenciaHasta
                        }
                      }}
                    />
                    {formik.touched.periodoRegistroWebDesde && formik.errors.periodoRegistroWebDesde ? (
                      <FormHelperText style={{ marginBottom: '20px' }} error={formik.errors.periodoRegistroWebDesde}>
                        {formik.errors.periodoRegistroWebDesde}
                      </FormHelperText>
                    ) : null}
                  </CardBody>

                </GridItem>

                <GridItem xs={12} sm={12} md={6}>
                  <CardBody>
                    <TextField
                      id="periodoRegistroWebHasta"
                      label={t('lbl.periodoregistrowebhasta')}
                      type="date"
                      fullWidth
                      disabled={formik.values.periodoRegistroWebDesde === null}
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      value={formik.values.periodoRegistroWebHasta}
                      name="periodoRegistroWebHasta"
                      onChange={formik.handleChange}
                      InputProps={{
                        inputProps: {
                          min: formik.values.periodoRegistroWebDesde,
                          max: formik.values.vigenciaHasta
                        }
                      }}
                    />
                    {formik.touched.periodoRegistroWebHasta && formik.errors.periodoRegistroWebHasta ? (
                      <FormHelperText style={{ marginBottom: '20px' }} error={formik.errors.periodoRegistroWebHasta}>
                        {formik.errors.periodoRegistroWebHasta}
                      </FormHelperText>
                    ) : null}
                  </CardBody>

                </GridItem>

                <GridItem xs={12} sm={12} md={12}>
                  <label>URL: </label>{window.location.origin}/frontend-sigepa/public/registroProgramas?programa={formik.values.dsurl}
                  <TextField
                    style={{ marginBottom: '20px' }}
                    id="dsurl"
                    error={formik.errors.dsurl}
                    label={t('lbl.urlpublicaregistroweb')}
                    variant="outlined"
                    name="dsurl"
                    fullWidth
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.dsurl}
                    inputProps={{ maxLength: "500" }}
                  />
                  {formik.touched.dsurl && formik.errors.dsurl ? (
                    <FormHelperText style={{ marginBottom: '20px' }} error={formik.errors.dsurl}>
                      {formik.errors.dsurl}
                    </FormHelperText>
                  ) : null}
                </GridItem>

                <GridItem xs={12} sm={12} md={12}>
                  <TextField
                    id="desripcionPrograma"
                    name="desripcionPrograma"
                    label={t('lbl.descripcionprogramaapoyo')}
                    style={{ marginBottom: '20px' }}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.desripcionPrograma}
                    fullWidth
                    multiline
                    rows={4}
                    variant="outlined"
                    inputProps={{ maxLength: "800" }}
                  />
                  {formik.touched.desripcionPrograma && formik.errors.desripcionPrograma ? (
                    <FormHelperText
                      style={{ marginBottom: '20px' }}
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
                    label={t('cmb.seleccionatipobeneficiario')}
                    select
                    style={{ marginBottom: '20px' }}
                    fullWidth
                    name="idBeneficiario"
                    value={formik.values.idBeneficiario}
                    onChange={formik.handleChange}
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
                  </TextField>
                  {formik.touched.idBeneficiario && formik.errors.idBeneficiario ? (
                    <FormHelperText error={formik.errors.idBeneficiario}>{formik.errors.idBeneficiario}</FormHelperText>
                  ) : null}
                </GridItem>
                <GridItem xs={12} sm={12} md={12}>
                  <TextField
                    variant="outlined"
                    label={t('cmb.seleccionarangoedad')}
                    select
                    style={{ marginBottom: '20px' }}
                    fullWidth
                    name="idRangoEdadBeneficiario"
                    value={formik.values.idRangoEdadBeneficiario}
                    onChange={formik.handleChange}
                  >
                    <MenuItem value="0">
                      <em>{t('cmb.ninguno')}</em>
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
                  <FormLabel component="legend">{t('pnl.coberturamunicipal')} </FormLabel>
                    <MultiSelect
                    style={{ marginBottom: '120px' }}
                    options={municipiosSelect}
                    value={selected}
                    onChange={setSelected}
                    labelledBy={t('cmb.seleccionar')}
                  />
                </GridItem>

                <GridItem xs={12} sm={12} md={12} style={{ marginBottom: '20px' }}>
                  <FormLabel style={{ marginBottom: '20px' }} component="legend">{t('pnl.documentosformatosrequeridos')}</FormLabel>
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

                <GridItem xs={12} sm={12} md={12} style={{ marginBottom: '20px' }}>
                  <FormLabel style={{ marginBottom: '20px' }} component="legend">{t('pnl.documentosformatosrequeridoscomplementarexpediente')} </FormLabel>
                  <Grid
                    container
                    spacing={2}
                    style={{ marginBottom: '20px' }}
                    justifyContent="center"
                    alignItems="center"
                    className={classes.root}
                    fullWidth
                  >
                    <Grid item>{customListComplementarios(leftComplement)}</Grid>
                    <Grid item>
                      <Grid container direction="column" alignItems="center">

                        <Button
                          variant="outlined"
                          size="small"
                          className={classes.button}
                          onClick={handleCheckedRightComplement}
                          disabled={leftCheckedComplement.length === 0}
                          aria-label="move selected right"
                        >
                          &gt;
                        </Button>
                        <Button
                          variant="outlined"
                          size="small"
                          className={classes.button}
                          onClick={handleCheckedLeftComplement}
                          disabled={rightCheckedComplement.length === 0}
                          aria-label="move selected left"
                        >
                          &lt;
                        </Button>

                      </Grid>
                    </Grid>
                    <Grid item>{customListComplementarios(rightComplement)}</Grid>
                  </Grid>
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <TextField
                    id="criterioPrograma"
                    name="criterioPrograma"
                    value={formik.values.criterioPrograma}
                    label={t('lbl.criterioselegibilidadprogramaopcional')}
                    style={{ marginBottom: '20px' }}
                    fullWidth
                    multiline
                    rows={4}
                    variant="outlined"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    inputProps={{ maxLength: "800" }}
                  />
                  {formik.touched.criterioPrograma && formik.errors.criterioPrograma ? (
                    <FormHelperText style={{ marginBottom: '20px' }} error={formik.errors.criterioPrograma}>
                      {formik.errors.criterioPrograma}
                    </FormHelperText>
                  ) : null}
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <TextField
                    id="actividadesPrograma,,"
                    name="actividadesPrograma"
                    value={formik.values.actividadesPrograma}
                    label={t('lbl.actividadesrealizarcontinuarprogramaopcional')}
                    style={{ marginBottom: '20px' }}
                    fullWidth
                    multiline
                    rows={4}
                    variant="outlined"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    inputProps={{ maxLength: "300" }}
                  />
                  {formik.touched.actividadesPrograma && formik.errors.actividadesPrograma ? (
                    <FormHelperText style={{ marginBottom: '20px' }} error={formik.errors.actividadesPrograma}>
                      {formik.errors.actividadesPrograma}
                    </FormHelperText>
                  ) : null}
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <TextField
                    id="obervacionesPrograma"
                    name="obervacionesPrograma"
                    value={formik.values.obervacionesPrograma}
                    label={t('lbl.observacionesopcional')}
                    style={{ marginBottom: '20px' }}
                    fullWidth
                    multiline
                    rows={4}
                    variant="outlined"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    inputProps={{ maxLength: "500" }}
                  />
                </GridItem>
              </GridContainer>

              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <TextField
                    variant="outlined"
                    label={t('cmb.seleccionaplantilla')}
                    select
                    style={{ marginBottom: '20px' }}
                    fullWidth
                    name="dsidentificadorplantilla"
                    id="dsidentificadorplantilla"
                    onChange={formik.handleChange}
                    value={formik.values.dsidentificadorplantilla}
                  >
                    {
                      formioComplemento.map(
                        item => (
                          <MenuItem
                            key={item._id}
                            value={item._id}>
                            {item.path} -  {item.title}
                          </MenuItem>
                        )
                      )
                    }
                    {formik.touched.dsnombreplantilla && formik.errors.dsnombreplantilla ? (
                      <FormHelperText style={{ marginBottom: '20px' }} error={formik.errors.dsnombreplantilla}>
                        {formik.errors.dsnombreplantilla}
                      </FormHelperText>
                    ) : null}
                  </TextField>
                </GridItem>
              </GridContainer>


              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <TextField
                    id="dsobjetivo"
                    name="dsobjetivo"
                    value={formik.values.dsobjetivo}
                    label={t('lbl.textodescriptivoprogramahtml')}
                    style={{ marginBottom: '20px' }}
                    fullWidth
                    multiline
                    rows={20}
                    variant="outlined"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}

                  />
                  {formik.touched.dsobjetivo && formik.errors.dsobjetivo ? (
                    <FormHelperText style={{ marginBottom: '20px' }} error={formik.errors.dsobjetivo}>
                      {formik.errors.dsobjetivo}
                    </FormHelperText>
                  ) : null}
                </GridItem>
              </GridContainer>






              <GridContainer>
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
                    onDrop={handleChangeFile}
                  />

                </GridItem>
                <GridItem xs={12} sm={12} md={6}>

                  <img width='500' height='200' src={`${archivoPrograma[0]?.data}`} />

                </GridItem>
              </GridContainer>





              <Button className={classes.updateProfileButton}
                type='submit'>
               {t('btn.guardar')} 
              </Button>
              <Clearfix />
            </CardBody>
          </Card>
        </GridItem>

      </GridContainer>
      <ModalConfirmacion
        handleRegistrar={handleRegistrar} evento="Registrar"
      />
      <Mensaje
        setOpen={setOpenSnackbar}
        open={openSnackbar}
        severity={error ? "error" : "success"}
        message={msjConfirmacion}
      />
      <Loading
        loading={loading}
      />
    </form>

  );
}

