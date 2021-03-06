import React, { useContext, useEffect, useState } from "react";
// core components
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Grid,
  TextField,
  MenuItem,
} from "@material-ui/core";
import Button from "components/CustomButtons/Button.js";
import Checkbox from "@material-ui/core/Checkbox";
import moment from "moment";
import "moment/locale/es";

import ReplayIcon from "@material-ui/icons/Replay";
import SearchIcon from "@material-ui/icons/Search";

import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import RemoveRedEyeIcon from "@material-ui/icons/RemoveRedEye";
import CardActions from "@material-ui/core/CardActions";
import { makeStyles } from "@material-ui/core/styles";
import { stylesArchivo } from "css/stylesArchivo";
import { DialogEstatusGeneral } from "./DialogEstatusGeneral";
import { DialogEstatusSeleccionadas } from "./DialogEstatusSeleccionadas";
import { DialogEstatusReasignada } from "./DialogEstatusReasignada";

import { useTranslation } from "react-i18next";
import { RegistroSolicitudContext } from "contexts/registroSolicitudContext";
import { ProgramasContext } from "contexts/catalogos/Programas/programasContext";
import { EstatusRegistroContext } from "contexts/catalogos/EstatusRegistroContext";
import { MunicipiosContext } from "contexts/catalogos/MunicipiosContext";
import { useHistory } from "react-router";

const useStyles = makeStyles(stylesArchivo);

export const BandejaSolicitudesValidadas = () => {
  const { t } = useTranslation();
  const {
    getSolParametrosBandeja,
    solicitudParametrosBandeja,
    bandejaCambioEstatusPendiente,
    bandejaValidadaCambioEstatusReasignada,
    getCoberturaProgramas,
    coberturalist,
  } = useContext(RegistroSolicitudContext);
  const { getCien, programasList } = useContext(ProgramasContext);
  const { getEstatusRegistro, estatusRegistroList } = useContext(
    EstatusRegistroContext
  );
  const { getMunicipiosAll, municipiosList } = useContext(MunicipiosContext);
  const classes = useStyles();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  let history = useHistory();

  const [municipio, setMunicipio] = useState("");
  const [programa, setPrograma] = useState("");
  const [estatus, setEstatus] = useState("");
  const [selected, setSelected] = React.useState([]);
  const [showDialogEstatusGeneral, setShowDialogEstatusGeneral] = useState(
    false
  );
  const [
    showDialogEstatusReasignada,
    setShowDialogEstatusReasignada,
  ] = useState(false);
  const [
    showDialogEstatusSeleccionadas,
    setShowDialogEstatusSeleccionadas,
  ] = useState(false);
  const [totalRegistros, setTotalRegistros] = useState("");
  const [lstMunicipios, setLstMunicipios] = useState([]);

  const [nombre, setNombre] = useState("");
  const [apellidopaterno, setApellidopaterno] = useState("");
  const [apellidoMaterno, setApellidoMaterno] = useState("");
  const [folio, setFolio] = useState("");

  useEffect(() => {
    getCien();
    getEstatusRegistro();
    getMunicipiosAll();
    let solicitudFilter = {
      idEstatus: "0",
      idPrograma: "0",
      idMunicipio: "0",
      paterno: "0",
      materno: "0",
      nombre: "0",
      folio: "0",
    };
    getSolParametrosBandeja(solicitudFilter);
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const buscarSolitudes = () => {
    let solicitudFilter = {
      idEstatus: estatus === "" ? "Validadas" : estatus,
      idPrograma: programa === "" ? "NULL" : programa,
      idMunicipio: municipio === "" ? "NULL" : municipio,
      paterno: apellidopaterno === "" ? "NULL" : apellidopaterno,
      materno: apellidoMaterno === "" ? "NULL" : apellidoMaterno,
      nombre: nombre === "" ? "NULL" : nombre,
      folio: folio === "" ? "NULL" : folio,
    };
    console.log(solicitudFilter);
    getSolParametrosBandeja(solicitudFilter);
  };

  const pendienteAprobarSeleccionadas = () => {
    setShowDialogEstatusSeleccionadas(true);
  };

  const pendienteAprobarGeneral = () => {
    console.log("cambio estatus general");
    setTotalRegistros(solicitudParametrosBandeja.length);
    setShowDialogEstatusGeneral(true);
  };

  // Cambio de estatus seleccioandas
  const handleCambiarEstatusSeleccionada = () => {
    console.log("entra a handleCambiarEstatusSeleccionada", selected.length);
    for (let i = 0; i < selected.length; i++) {
      selected[i].idUsuario = sessionStorage.getItem("idUSuario");
    }
    let solicitudFilter = {
      idEstatus: estatus === "" ? "Validadas" : estatus,
      idPrograma: programa === "" ? "NULL" : programa,
      idMunicipio: municipio === "" ? "NULL" : municipio,
      paterno: apellidopaterno === "" ? "NULL" : apellidopaterno,
      materno: apellidoMaterno === "" ? "NULL" : apellidoMaterno,
      nombre: nombre === "" ? "NULL" : nombre,
      folio: folio === "" ? "NULL" : folio,
    };
    bandejaCambioEstatusPendiente(selected, solicitudFilter);
    setShowDialogEstatusSeleccionadas(false);
    getSolParametrosBandeja(solicitudFilter);
  };

  //cambio de estatus general
  const handleCambiarGeneral = () => {
    console.log("entra a handleCambiarGeneral");
    for (let i = 0; i < solicitudParametrosBandeja.length; i++) {
      solicitudParametrosBandeja[i].idUsuario = sessionStorage.getItem(
        "idUSuario"
      );
    }
    let solicitudFilter = {
      idEstatus: estatus === "" ? "Validadas" : estatus,
      idPrograma: programa === "" ? "NULL" : programa,
      idMunicipio: municipio === "" ? "NULL" : municipio,
      paterno: apellidopaterno === "" ? "NULL" : apellidopaterno,
      materno: apellidoMaterno === "" ? "NULL" : apellidoMaterno,
      nombre: nombre === "" ? "NULL" : nombre,
      folio: folio === "" ? "NULL" : folio,
    };
    bandejaCambioEstatusPendiente(solicitudParametrosBandeja, solicitudFilter);
    setShowDialogEstatusGeneral(false);
    getSolParametrosBandeja(solicitudFilter);
  };

  const handleClick = (event, solicitud) => {
    const selectedIndex = selected.indexOf(solicitud);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, solicitud);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
    console.log("selected final", selected);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.dsfoliosolicitud);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const onSelectVerExpediente = (row) => {
    console.log("EXPEDIENTE=>>", row);
    history.push("/admin/expedienteapi", {
      id: row.idBeneficiario,
      curp: row.curp,
    });
  };

  const confirmarReasignacion = (row) => {
    console.log("Entra a confirmar reasigacion");
    setShowDialogEstatusReasignada(true);
  };

  const handleCambiarEstatusReasignada = () => {
    console.log("entra a handleCambiarEstatusReasiganda");
    for (let i = 0; i < selected.length; i++) {
      selected[i].idUsuario = sessionStorage.getItem("idUSuario");
    }
    let solicitudFilter = {
      idEstatus: estatus === "" ? "Validadas" : estatus,
      idPrograma: programa === "" ? "NULL" : programa,
      idMunicipio: municipio === "" ? "NULL" : municipio,
      paterno: apellidopaterno === "" ? "NULL" : apellidopaterno,
      materno: apellidoMaterno === "" ? "NULL" : apellidoMaterno,
      nombre: nombre === "" ? "NULL" : nombre,
      folio: folio === "" ? "NULL" : folio,
    };
    console.log("selected=>>", selected);
    bandejaValidadaCambioEstatusReasignada(selected, solicitudFilter);
    setShowDialogEstatusReasignada(false);
  };

  const isSelected = (dsfoliosolicitud) =>
    selected.indexOf(dsfoliosolicitud) !== -1;

  const obtenerCobertura = (e) => {
    console.log("valorr=>", e);
    setPrograma(e.target.value);
    getCoberturaProgramas(e.target.value);
  };

  useEffect(() => {
    var municipios = [];
    if (coberturalist?.length > 0) {
      municipiosList.map((e) => {
        coberturalist.map((cb) => {
          if (cb.idMunicipio === e.id) {
            municipios.push(e);
          }
        });
      });
      setLstMunicipios(municipios);
    }
  }, [programa, coberturalist]);

  return (
    <GridItem xs={12} sm={12} md={12}>
      <Card>
        <CardHeader color="primary">
          <h4 className={classes.cardTitleWhite}>
          {t('pnl.bandejageneralsolicitudes')} 
          </h4>
          <p className={classes.cardCategoryWhite}></p>
          <CardActions></CardActions>
        </CardHeader>
        <CardBody>
          <Grid container spacing={3}>
            <Grid item xs={3}>
              <TextField
                id="paterno"
                label={t('lbl.apellidopaterno')}
                variant="outlined"
                name={apellidopaterno}
                fullWidth
                value={apellidopaterno}
                onChange={(e) => setApellidopaterno(e.target.value)}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                id="materno"
                label={t('lbl.apellidomaterno')}
                variant="outlined"
                name={apellidoMaterno}
                fullWidth
                value={apellidoMaterno}
                onChange={(e) => setApellidoMaterno(e.target.value)}
              />
            </Grid>

            <Grid item xs={3}>
              <TextField
                id="nombre"
                label={t('lbl.nombre')}
                variant="outlined"
                name={nombre}
                fullWidth
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                id="folio"
                label={t('lbl.folio')}
                variant="outlined"
                name={folio}
                fullWidth
                value={folio}
                onChange={(e) => setFolio(e.target.value)}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                variant="outlined"
                label={t('lbl.seleccionaunprograma')}
                select
                fullWidth
                name="programa"
                value={programa}
                onChange={(e) => obtenerCobertura(e)}
              >
                <MenuItem value="">
                  <em>{t("cmb.ninguno")}</em>
                </MenuItem>
                {programasList.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.dsprograma}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={3}>
              <TextField
                variant="outlined"
                label={t('cmb.seleccionamunicipio')}
                select
                fullWidth
                name="municipio"
                value={municipio}
                onChange={(e) => setMunicipio(e.target.value)}
              >
                <MenuItem value="">
                  <em>{t("cmb.ninguno")}</em>
                </MenuItem>
                {lstMunicipios.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.dsmunicipio}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={2} style={{ textAlign: "right", float: "right" }}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={buscarSolitudes}
              >
                <SearchIcon />
                {t('lbl.buscar')}
              </Button>
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <GridItem xs={12} sm={12} md={12}>
              <Grid item xs={3} style={{ textAlign: "center", float: "right" }}>
                <Button
                  color="primary"
                  fullWidth
                  onClick={pendienteAprobarSeleccionadas}
                >
                 {t('lbl.pendientesdeaprobarseleccionadas')} 
                </Button>
              </Grid>
            </GridItem>
          </Grid>

          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow key="898as">
                <TableCell align="center">{t('cmb.seleccionar')}</TableCell>
                <TableCell align="center">{t('dgv.folio')}  </TableCell>
                <TableCell align="center">{t('dgv.estatus')}  </TableCell>
                <TableCell align="center">{t('dgv.solicitante')}  </TableCell>
                <TableCell align="center">{t('dgv.programaapoyo')}  </TableCell>
                <TableCell align="center">{t('dgv.fecharegistro')}  </TableCell>
                <TableCell align="center">{t('dgv.observaciones')}  </TableCell>
                <TableCell align="center">{t('dgv.motivobajarechazo')}  </TableCell>
                <TableCell align="center"> {t("dgv.acciones")}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {solicitudParametrosBandeja
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row);
                  const labelId = `${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{ "aria-labelledby": labelId }}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {row.dsfoliosolicitud}
                      </TableCell>
                      <TableCell align="center">
                        {row.dsestatusregistro}
                      </TableCell>
                      <TableCell align="center">{row.nombre}</TableCell>
                      <TableCell align="center">{row.dsprograma}</TableCell>
                      <TableCell align="center">
                        {moment(row.fechaRegistro).format(
                          "MMMM DD YYYY, h:mm:ss a"
                        )}
                      </TableCell>
                      {row.validarObservaciones === "" ? (
                        <TableCell align="center">{t('lbl.no')}</TableCell>
                      ) : (
                        <TableCell align="center">
                          <Tooltip
                            id="tooltip-expedienteobser"
                            title={row?.observaciones}
                            placement="top"
                          >
                            <></>
                          </Tooltip>
                        </TableCell>
                      )}

                      <TableCell align="center">{row.motivobaja}</TableCell>
                      <TableCell align="center">
                        <Tooltip
                          id="tooltip-expediente"
                          title="Ver expediente"
                          placement="top"
                        >
                          <IconButton
                            aria-label="view"
                            onClick={() => onSelectVerExpediente(row)}
                          >
                            <RemoveRedEyeIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip
                          id="tooltip-regresar"
                          title="Reasignar"
                          placement="top"
                        >
                          <IconButton
                            aria-label="return"
                            onClick={() => confirmarReasignacion(row)}
                          >
                            <ReplayIcon />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[25, 50, 75, 100]}
            component="div"
            labelRowsPerPage={t("dgv.registrospaginas")}
            count={solicitudParametrosBandeja.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
            labelDisplayedRows={({ from, to, count }) =>
              `${from}-${to} de un total ${count} registros`
            }
          />
          <Grid container spacing={2}>
            <GridItem xs={12} sm={12} md={12}>
              <Grid item xs={3} style={{ textAlign: "center", float: "right" }}>
                <Button
                  color="primary"
                  fullWidth
                  onClick={pendienteAprobarGeneral}
                >
                  {t('lbl.pendientesdeaprobarerparte')} {solicitudParametrosBandeja.length}{" "}
                  {t('lbl.seleccionadassedparte')} 
                </Button>
              </Grid>
            </GridItem>
          </Grid>
        </CardBody>
      </Card>
      <DialogEstatusGeneral
        showDialogEstatusGeneral={showDialogEstatusGeneral}
        setShowDialogEstatusGeneral={setShowDialogEstatusGeneral}
        totalRegistros={totalRegistros}
        handleCambiarGeneral={handleCambiarGeneral}
      />
      <DialogEstatusSeleccionadas
        showDialogEstatusSeleccionadas={showDialogEstatusSeleccionadas}
        setShowDialogEstatusSeleccionadas={setShowDialogEstatusSeleccionadas}
        handleCambiarEstatusSeleccionada={handleCambiarEstatusSeleccionada}
      />
      <DialogEstatusReasignada
        showDialogEstatusReasignada={showDialogEstatusReasignada}
        setShowDialogEstatusReasignada={setShowDialogEstatusReasignada}
        handleCambiarEstatusReasignada={handleCambiarEstatusReasignada}
      />
    </GridItem>
  );
};
