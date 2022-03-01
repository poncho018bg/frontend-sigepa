import React, {
  useEffect,
  useState,
  useContext,
  forwardRef,
  useImperativeHandle,
} from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Button from "components/CustomButtons/Button.js";
import CardActions from "@material-ui/core/CardActions";

import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.js";
import customCheckboxRadioSwitch from "assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.js";
import { Grid, TextField, MenuItem, Breadcrumbs } from "@material-ui/core";

import moment from "moment";
import "moment/locale/es";

import { RegistroSolicitudContext } from "contexts/registroSolicitudContext";
import { ProgramasContext } from "contexts/catalogos/Programas/programasContext";
import { ExpedienteContext } from "contexts/expedienteContext";
import { useTranslation } from "react-i18next";

const styles = {
  infoText: {
    fontWeight: "300",
    margin: "10px 0 30px",
    textAlign: "center",
  },
  inputAdornmentIcon: {
    color: "#555",
  },
  choiche: {
    textAlign: "center",
    cursor: "pointer",
    marginTop: "20px",
  },
  ...customSelectStyle,
  ...customCheckboxRadioSwitch,
};

const useStyles = makeStyles(styles);

export const DatosGeneralesExpediente = forwardRef((props, ref) => {
  const { t } = useTranslation();
  console.log("LLEGA EL DatosGeneralesExpediente ---> ", props);
  const { beneficiarioPadre, setDtosgrlsprint, dtosgrlsprint } = props;

  const classes = useStyles();
  const [nombre, setNombre] = useState("");
  const [curp, setCurp] = useState("");
  const [apellidoPaterno, setApellidoPaterno] = useState("");
  const [apellidoMaterno, setapellidoMaterno] = useState("");
  const [genero, setGenero] = useState("");
  const [fechaNacimientoAxu, setFechaNacimientoAxu] = useState(
    moment(new Date()).format("YYYY-MM-DD")
  );
  const [fechaNacimientoReal, setFechaNacimientoReal] = useState(
    moment(new Date()).format("YYYY-MM-DD")
  );
  const [edad, setEdad] = useState("");
  const [loading, setLoading] = useState(true);
  const [estudios, setEstudios] = useState("");
  const [estadoCivil, setEstadoCivil] = useState("");
  const [identificacion, setIdentificacion] = useState("");
  const [rfc, setRfc] = useState("");
  const [idIdentificaion, setIdIdentificaion] = useState("");
  //const [idPrograma, setIdPrograma] = useState();
  const [folioInterno, setFolioInterno] = useState("");
  const [datosCorrectos, setDatosCorrectos] = useState(true);

  const [folioProgramaMostrar, setFolioProgramaMostrar] = useState("");
  const [idProgramaMostrar, setIdProgramaMostrar] = useState("");

  const [activaGuardar, setActivaGuardar] = useState(false);

  const {
    getGenerosActivos,
    generosList,
    estudiosList,
    getEstudios,
    estadoCivilList,
    getEstadoCivil,
    getIdentificacionesActivos,
    identificacionesList,
    actualizarBeneficiario,
    beneficiario,
    actualizarBeneficiarioFolio,
  } = useContext(RegistroSolicitudContext);

  const { programasList, get, getCien } = useContext(ProgramasContext);

  const { BeneficiarioPrograma, programaList } = useContext(ExpedienteContext);
  useEffect(() => {
    setLoading(true);
    console.log("expediente beneficiario DG ==>", beneficiarioPadre);
    if (beneficiarioPadre !== undefined) {
      setNombre(beneficiarioPadre.dsnombre);
      setCurp(beneficiarioPadre.dscurp);
      setApellidoPaterno(beneficiarioPadre.dsapellido1);
      setapellidoMaterno(beneficiarioPadre.dsapellido2);
      console.log("fecha --->", beneficiarioPadre.fcfechanacimiento);
      var dateParts = beneficiarioPadre.fcfechanacimiento.split("-");
      var dateParts2 = dateParts[2].split(" ");
      //console.log("date parts", +dateParts2[0], dateParts[1] - 1, dateParts[0])
      var date = new Date(dateParts[0], dateParts[1] - 1, +dateParts2[0]);
      console.log("date parts chale -->", date);
      console.log(
        "date parts fomateada fecha ---> ",
        moment(date).format("YYYY-MM-DD")
      );
      setFechaNacimientoReal(moment(date).format("YYYY-MM-DD"));
      setFechaNacimientoAxu(
        moment(beneficiarioPadre.fcfechanacimiento).format("YYYY-MM-DD")
      );
      setGenero(beneficiarioPadre.idgenero);
      setEstudios(beneficiarioPadre.idgradoestudios);
      setEstadoCivil(beneficiarioPadre.idestadocivil);
      setIdentificacion(beneficiarioPadre.ididentificacionoficial);
      setRfc(beneficiarioPadre.rfc);
      setIdIdentificaion(beneficiarioPadre.dsiddocumento);
      let fechaDif = Date.now() - date.getTime();
      let ageDate = new Date(fechaDif);
      console.log("date parts fechaDif ====>", fechaDif, ageDate);
      console.log(
        "date parts EDAD ===>",
        Math.abs(ageDate.getUTCFullYear() - 1970)
      );
      setEdad(Math.abs(ageDate.getUTCFullYear() - 1970));
      BeneficiarioPrograma(beneficiarioPadre.id);
      if (beneficiarioPadre.dsfolio != null) {
        setFolioInterno(beneficiarioPadre.dsfolio);
      }

      var valoresprint = dtosgrlsprint;

      valoresprint.apellidoPaterno = beneficiarioPadre.dsapellido1;
      valoresprint.apellidoMaterno = beneficiarioPadre.dsapellido2;
      valoresprint.nombre = beneficiarioPadre.dsnombre;
      valoresprint.curp = beneficiarioPadre.dscurp;
      valoresprint.rfc = beneficiarioPadre.rfc;
      valoresprint.genero = generosList.filter(
        (e) => e.id === beneficiarioPadre.idgenero
      )[0]?.dsgenero;
      valoresprint.fechaNacimiento = fechaNacimientoReal;
      valoresprint.edad = Math.abs(ageDate.getUTCFullYear() - 1970);
      valoresprint.estadoCivil = estadoCivilList.filter(
        (e) => e.id === beneficiarioPadre.idestadocivil
      )[0]?.dsestadocivil;
      valoresprint.identificacionOficial = identificacionesList.filter(
        (e) => e.id === beneficiarioPadre.ididentificacionoficial
      )[0]?.dsidentificacion;
      valoresprint.folioIdentificacion = beneficiarioPadre.dsiddocumento;
      valoresprint.folio = folioProgramaMostrar;
      valoresprint.programa = programasList.filter(
        (e) => e.id === idProgramaMostrar
      )[0]?.dsprograma;
      valoresprint.folioSedesem = folioInterno;

      setDtosgrlsprint(valoresprint);
    }
    getCien().then((data) => {
      setTimeout(() => setLoading(false), 500);
    });
    getGenerosActivos();
    getEstudios();
    getEstadoCivil();
    getIdentificacionesActivos();
  }, [beneficiarioPadre]);

  const generoCurp = (generocrp) => {
    console.log("", generocrp);
    let gen = "";
    generosList.map((e) => {
      console.log("e=>", e);
      if (e.dsabreviatura === generocrp) {
        gen = e.id;
      }
    });
    return gen;
  };

  const llenado = () => {
    let datosEnviar = {
      id: beneficiarioPadre.id,
      dsnombre: nombre,
      dsapellido1: apellidoPaterno,
      dsapellido2: apellidoMaterno,
      dscurp: curp,
      idgenero: genero,
      fcfechanacimiento: fechaNacimientoReal,
      idestadocivil: estadoCivil,
      idgradoestudios: estudios,
      ididentificacionoficial: identificacion,
      rfc: rfc,
      dsiddocumento: idIdentificaion,
      folioInterno: folioInterno,
    };

    console.log("expediente actualizar beneficiario ===>", datosEnviar);
    actualizarBeneficiarioFolio(datosEnviar,sessionStorage.getItem('idUSuario'));
  };

  const onChange = (event) => {
    setActivaGuardar(true);
    console.log("nombre del evento ==>", event.target);
    let testLetrasNum = /^[a-zA-Z0-9_.-\sñÑ]*$/;
    switch (event.target.name) {
      case "programa":
        console.log("programa value", event.target.value);
        //setIdPrograma(event.target.value);
        setIdProgramaMostrar(event.target.value);
        break;
      case "folioInterno":
        console.log("programa value", event.target.value);
        setFolioInterno(event.target.value);
        break;
    }
  };

  useEffect(() => {
    if (programaList.length > 0) {
      if (programaList.programa_id !== undefined) {
        console.log("folio ", programaList);
        setFolioProgramaMostrar(programaList.dsfolio);
        setIdProgramaMostrar(programaList.programa_id);
        //setIdProgramaExpediente(programaList.programa_id);
      } else {
        console.log("folio ", programaList[0]);
        setFolioProgramaMostrar(programaList[0].dsfolio);
        setIdProgramaMostrar(programaList[0].programa_id);
        //setIdProgramaExpediente(programaList[0].programa_id);
      }
    }
  }, [programaList]);

  const onClickGuardar = () => {
    //console.log("GUARDA LOS CAMBIOS");
    llenado();
    setActivaGuardar(false);
  };

  console.log("Beneficiario bem ==> ", beneficiario);
  return (
    <div>
      <h4 className={classes.infoText}></h4>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Datos de la beneficiaria</h4>
            <CardActions>
              {activaGuardar && (
                <Grid item xs={1}>
                  <Button round onClick={onClickGuardar}>
                    Guardar Cambios
                  </Button>
                </Grid>
              )}
            </CardActions>
          </CardHeader>
          <CardBody>
            <GridContainer justify="center">
              <Grid
                container
                spacing={{ xs: 2, md: 3 }}
                columns={{ xs: 4, sm: 8, md: 12 }}
              >
                <GridItem xs={12} sm={3}>
                  <TextField
                    style={{ marginBottom: "20px" }}
                    id="apellidoPaterno"
                    label={t("lbl.expApellidoPaterno")}
                    variant="outlined"
                    name="nombre"
                    fullWidth
                    value={apellidoPaterno}
                    inputProps={{
                      maxLength: 80,
                      pattern: "/^[a-zA-Z0-9_.-sñÑ]*$/",
                    }}
                    disabled="True"
                  />
                </GridItem>
                <GridItem xs={12} sm={3}>
                  <TextField
                    style={{ marginBottom: "20px" }}
                    id="apellidoMaterno"
                    label={t("lbl.expApellidoMaterno")}
                    variant="outlined"
                    name="apellidoMaterno"
                    fullWidth
                    value={apellidoMaterno}
                    inputProps={{
                      maxLength: 80,
                      pattern: "/^[a-zA-Z0-9_.-sñÑ]*$/",
                    }}
                    disabled="True"
                  />
                </GridItem>
                <GridItem xs={12} sm={3}>
                  <TextField
                    style={{ marginBottom: "20px" }}
                    id="nombre"
                    label={t("lbl.expNombre")}
                    variant="outlined"
                    name="nombre"
                    fullWidth
                    value={nombre}
                    inputProps={{
                      maxLength: 80,
                      pattern: "/^[a-zA-Z0-9_.-sñÑ]*$/",
                    }}
                    disabled="True"
                  />
                </GridItem>
                <GridItem xs={12} sm={3}>
                  <TextField
                    style={{ marginBottom: "20px" }}
                    id="curp"
                    label={t("lbl.expCurp")}
                    variant="outlined"
                    name="curp"
                    fullWidth
                    value={curp}
                    disabled="True"
                  />
                </GridItem>
              </Grid>
              <Grid
                container
                spacing={{ xs: 2, md: 3 }}
                columns={{ xs: 4, sm: 8, md: 12 }}
              >
                <GridItem xs={12} sm={3}>
                  <TextField
                    style={{ marginBottom: "20px" }}
                    id="rfc"
                    label={t("lbl.expRfc")}
                    variant="outlined"
                    name="rfc"
                    fullWidth
                    onChange={onChange}
                    value={rfc}
                    inputProps={{
                      maxLength: 13,
                      pattern: "/^[a-zA-Z0-9_.-sñÑ]*$/",
                    }}
                    disabled="True"
                  />
                </GridItem>
                <GridItem xs={12} sm={3}>
                  <TextField
                    style={{ marginBottom: "20px" }}
                    id="genero"
                    label={t("lbl.expGenero")}
                    variant="outlined"
                    name="genero"
                    fullWidth
                    select
                    onChange={onChange}
                    value={genero}
                    disabled="True"
                  >
                    <MenuItem value="0">
                      <em>{t("cmb.seleccionar")}</em>
                    </MenuItem>
                    {generosList.map((g, i) => (
                      <MenuItem key={i} value={g.id}>
                        {g.dsgenero}
                      </MenuItem>
                    ))}
                  </TextField>
                </GridItem>
                <GridItem xs={12} sm={3}>
                  {console.log(fechaNacimientoAxu)}
                  <TextField
                    style={{ marginBottom: "20px" }}
                    id="fechaNacimientoAxu"
                    label={t("lbl.expFechaNacimiento")}
                    variant="outlined"
                    type="date"
                    name="fechaNacimientoReal"
                    fullWidth
                    value={fechaNacimientoReal}
                    disabled="True"
                  />
                </GridItem>
                <GridItem xs={12} sm={3}>
                  <TextField
                    style={{ marginBottom: "20px" }}
                    id="edad"
                    label={t("lbl.expEdad")}
                    variant="outlined"
                    name="edad"
                    fullWidth
                    value={edad}
                    disabled="True"
                  />
                </GridItem>
              </Grid>
              <Grid
                container
                spacing={{ xs: 2, md: 3 }}
                columns={{ xs: 4, sm: 8, md: 12 }}
              >
                <GridItem xs={12} sm={3}>
                  <TextField
                    style={{ marginBottom: "20px" }}
                    id="estadoCivil"
                    label={t("lbl.expEstadocivil")}
                    variant="outlined"
                    name="estadoCivil"
                    fullWidth
                    select
                    onChange={onChange}
                    value={estadoCivil}
                    disabled="True"
                  >
                    <MenuItem value="0">
                      <em>{t("cmb.seleccionar")}</em>
                    </MenuItem>
                    {estadoCivilList.map((g, i) => (
                      <MenuItem key={i} value={g.id}>
                        {g.dsestadocivil}
                      </MenuItem>
                    ))}
                  </TextField>
                </GridItem>
                <GridItem xs={12} sm={3}>
                  <TextField
                    style={{ marginBottom: "20px" }}
                    id="ine"
                    label={t("lbl.expIdentificacionoficial")}
                    variant="outlined"
                    name="identificacion"
                    fullWidth
                    select
                    onChange={onChange}
                    value={identificacion}
                    disabled="True"
                  >
                    <MenuItem value="0">
                      <em>{t("cmb.seleccionar")}</em>
                    </MenuItem>
                    {identificacionesList.map((g, i) => (
                      <MenuItem key={i} value={g.id}>
                        {g.dsidentificacion}
                      </MenuItem>
                    ))}
                  </TextField>
                </GridItem>
                <GridItem xs={12} sm={3}>
                  <TextField
                    style={{ marginBottom: "20px" }}
                    id="idIdentificaion"
                    label={t("lbl.expFolioidentificacion")}
                    variant="outlined"
                    name="idIdentificaion"
                    fullWidth
                    onChange={onChange}
                    value={idIdentificaion}
                    disabled="True"
                  />
                </GridItem>
              </Grid>
              <Grid
                container
                spacing={{ xs: 2, md: 3 }}
                columns={{ xs: 4, sm: 8, md: 12 }}
              >
                <GridItem xs={12} sm={3}>
                  <TextField
                    style={{ marginBottom: "20px" }}
                    id="dsfolio"
                    label={t("lbl.expFolio")}
                    variant="outlined"
                    name="dsfolio"
                    fullWidth
                    value={folioProgramaMostrar}
                    disabled="True"
                  ></TextField>
                </GridItem>
                <GridItem xs={12} sm={3}>
                  <TextField
                    style={{ marginBottom: "20px" }}
                    id="programa"
                    label={t("lbl.expPrograma")}
                    variant="outlined"
                    name="programa"
                    fullWidth
                    select
                    onChange={onChange}
                    disabled="True"
                    value={idProgramaMostrar}
                  >
                    {programasList.map((g, i) => (
                      <MenuItem key={i} value={g.id}>
                        {g.dsprograma}
                      </MenuItem>
                    ))}
                  </TextField>
                </GridItem>
                <GridItem xs={12} sm={3}>
                  <TextField
                    style={{ marginBottom: "20px" }}
                    id="folioInterno"
                    label={t("lbl.expFolioSEDESEM")}
                    variant="outlined"
                    name="folioInterno"
                    fullWidth
                    value={folioInterno}
                    inputProps={{
                      maxLength: 80,
                      pattern: "/^[a-zA-Z0-9_.-sñÑ]*$/",
                    }}
                    onChange={onChange}
                  />
                </GridItem>
              </Grid>
            </GridContainer>
          </CardBody>
        </Card>
      </GridItem>
    </div>
  );
});
