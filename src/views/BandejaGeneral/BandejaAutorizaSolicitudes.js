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
  FormHelperText,
  TextField,
  MenuItem,
} from "@material-ui/core";
import Button from "components/CustomButtons/Button.js";
import Checkbox from "@material-ui/core/Checkbox";
import moment from "moment";
import "moment/locale/es";

import ReplayIcon from "@material-ui/icons/Replay";
import SearchIcon from "@material-ui/icons/Search";
import RemoveRedEyeIcon from "@material-ui/icons/RemoveRedEye";

import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import CardActions from "@material-ui/core/CardActions";
import { makeStyles } from "@material-ui/core/styles";
import { stylesArchivo } from "css/stylesArchivo";
import { DialogEstatusGeneral } from "./DialogEstatusGeneral";
import { DialogEstatusSeleccionadas } from "./DialogEstatusSeleccionadas";
import { DialogEstatusReasignada } from "./DialogEstatusReasignada";
import { useHistory } from "react-router";
import { useTranslation } from "react-i18next";
import { RegistroSolicitudContext } from "contexts/registroSolicitudContext";
import { ProgramasContext } from "contexts/catalogos/Programas/programasContext";
import { EstatusRegistroContext } from "contexts/catalogos/EstatusRegistroContext";
import { ComiteSecretariasContext } from "contexts/catalogos/comiteSecretariasContext";
const useStyles = makeStyles(stylesArchivo);

export const BandejaAutorizaSolicitudes = () => {
  const { t } = useTranslation();
  const {
    getSolParametrosBandejaAprobar,
    solicitudParametrosBandeja,
    bandejaCambioEstatusAprobar,
    bandejaAprobarCambioEstatusReasignada,
  } = useContext(RegistroSolicitudContext);
  const { getCien, programasList } = useContext(ProgramasContext);
  const { getEstatusRegistro, estatusRegistroList } = useContext(
    EstatusRegistroContext
  );
  const { getComiteSecretarias, comiteSecretariasList } = useContext(
    ComiteSecretariasContext
  );
  const classes = useStyles();
  let history = useHistory();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [programa, setPrograma] = useState("");
  const [estatus, setEstatus] = useState("");
  const [fecha, setFecha] = useState("");
  const [errors, setErrors] = useState({});
  const [comite, setComite] = useState("");
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

  useEffect(() => {
    setErrors({});
    getCien();
    getEstatusRegistro();
    getComiteSecretarias();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const buscarSolitudes = () => {
    setErrors({});
    let solicitudFilter = {
      idPrograma: programa === "" ? "NULL" : programa,
      idEstatus: estatus === "" ? "NULL" : estatus,
    };
    setFecha("");
    setComite("");
    console.log(solicitudFilter);
    getSolParametrosBandejaAprobar(solicitudFilter);
  };

  const isObjEmpty = (obj) => {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
  };

  const handleSeleccionarFecha = (event) => {
    //Aqui en donde vamos a mandar el valor por default a todos los registros de la solicitud
    console.log("Selecionar y asignar fecha");
    setFecha(event.target.value);
    for (let i = 0; i < solicitudParametrosBandeja.length; i++) {
      solicitudParametrosBandeja[i].fechaSesionComiteSecretarias =
        event.target.value;
    }
  };

  const handleSeleccionarComite = (event) => {
    //Aqui en donde vamos a mandar el valor por default a todos los registros de la solicitud el comite
    console.log("Selecionar y asignar comite");
    setComite(event.target.value);
    console.log("event.target.value.dssecretaria", event.target.value);
    for (let i = 0; i < solicitudParametrosBandeja.length; i++) {
      solicitudParametrosBandeja[i].sesionComiteId = event.target.value.id;
      solicitudParametrosBandeja[i].sesionComiteNombre =
        event.target.value.dssecretaria;
      solicitudParametrosBandeja[i].idUsuario = sessionStorage.getItem(
        "idUSuario"
      );
    }
  };

  const aprobarSeleccionadas = () => {
    console.log("Entra a aprobar seleccionadas");
    const errors = {};
    if (comite === "") {
      errors.comite = "Debe selecionar un comite!";
    }
    if (fecha === "") {
      errors.fecha = "Debe selecionar una fecha de comite!";
    }
    if (!isObjEmpty(errors)) {
      setErrors(errors);
      return;
    }
    setErrors({});
    setShowDialogEstatusSeleccionadas(true);
  };

  const aprobarSeleccionadasGeneral = () => {
    console.log("Entra a aprobar General");
    const errors = {};
    if (comite === "") {
      errors.comite = "Debe selecionar un comite!";
    }
    if (fecha === "") {
      errors.fecha = "Debe selecionar una fecha de comite!";
    }
    if (!isObjEmpty(errors)) {
      setErrors(errors);
      return;
    }
    setErrors({});
    setTotalRegistros(solicitudParametrosBandeja.length);
    setShowDialogEstatusGeneral(true);
  };

  // Cambio de estatus seleccioandas
  const handleCambiarEstatusSeleccionada = () => {
    let solicitudFilter = {
        idPrograma: programa === "" ? "NULL" : programa,
        idEstatus: estatus === "" ? "NULL" : estatus,
      };
    bandejaCambioEstatusAprobar(selected,solicitudFilter);
    setShowDialogEstatusSeleccionadas(false);
  };

  //cambio de estatus general
  const handleCambiarGeneral = () => {
    let solicitudFilter = {
        idPrograma: programa === "" ? "NULL" : programa,
        idEstatus: estatus === "" ? "NULL" : estatus,
      };
    bandejaCambioEstatusAprobar(solicitudParametrosBandeja,solicitudFilter);
    setShowDialogEstatusGeneral(false);
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
      const newSelecteds = rows.map((n) => n);
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
    let solicitudFilter = {
        idPrograma: programa === "" ? "NULL" : programa,
        idEstatus: estatus === "" ? "NULL" : estatus,
      };
    console.log("entra a handleCambiarEstatusReasiganda");
    for (let i = 0; i < selected.length; i++) {
      selected[i].idUsuario = sessionStorage.getItem("idUSuario");
    }
    console.log("selected=>>", selected);
    bandejaAprobarCambioEstatusReasignada(selected,solicitudFilter);
    setShowDialogEstatusReasignada(false);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  return (
    <GridItem xs={12} sm={12} md={12}>
      <Card>
        <CardHeader color="primary">
          <h4 className={classes.cardTitleWhite}>
            Bandeja general de solicitudes
          </h4>
          <p className={classes.cardCategoryWhite}></p>
          <CardActions></CardActions>
        </CardHeader>
        <CardBody>
          <Grid container spacing={3}>
            <Grid item xs={3}>
              <TextField
                variant="outlined"
                label="Selecciona un programa"
                select
                fullWidth
                name="programa"
                value={programa}
                onChange={(e) => setPrograma(e.target.value)}
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
            <Grid item xs={2} style={{ textAlign: "right", float: "right" }}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={buscarSolitudes}
              >
                <SearchIcon />
                Buscar
              </Button>
            </Grid>
          </Grid>

          <Grid container spacing={3} style={{ marginTop: 30 }}>
            <Grid item xs={3}>
              <TextField
                variant="outlined"
                label="Sesión de comite que autoriza"
                select
                fullWidth
                name="comite"
                value={comite}
                onChange={handleSeleccionarComite}
              >
                <MenuItem value="">
                  <em>{t("cmb.ninguno")}</em>
                </MenuItem>
                {comiteSecretariasList.map((item) => (
                  <MenuItem key={item.id} value={item}>
                    {item.dssecretaria}
                  </MenuItem>
                ))}
              </TextField>
              {errors.comite && (
                <FormHelperText error={errors.comite}>
                  {errors.comite}
                </FormHelperText>
              )}
            </Grid>
            <Grid item xs={3}>
              <TextField
                id="fcsesionComite"
                label="Fecha de sesión del comité"
                type="date"
                fullWidth
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
                value={fecha}
                name={fecha}
                onChange={handleSeleccionarFecha}
                InputProps={{
                  inputProps: {
                    min: moment(new Date()).format("yyyy-MM-DD"),
                  },
                }}
              />
              {errors.fecha && (
                <FormHelperText error={errors.fecha}>
                  {errors.fecha}
                </FormHelperText>
              )}
            </Grid>
            <Grid item xs={3}></Grid>
            <Grid item xs={3} style={{ textAlign: "center", float: "right" }}>
              <Button color="primary" fullWidth onClick={aprobarSeleccionadas}>
                Aprobar Seleccionadas
              </Button>
            </Grid>
          </Grid>

          <Table
            stickyHeader
            aria-label="sticky table"
            style={{ marginTop: 30 }}
          >
            <TableHead>
              <TableRow key="898as">
                <TableCell align="center"> </TableCell>
                <TableCell align="center"> Folio </TableCell>
                <TableCell align="center"> Estatus </TableCell>
                <TableCell align="center"> Solicitante </TableCell>
                <TableCell align="center"> Programa de apoyo </TableCell>
                <TableCell align="center"> Fecha de registro </TableCell>
                <TableCell align="center"> Observaciones </TableCell>
                <TableCell align="center"> Firmas de autorización </TableCell>
                <TableCell align="center"> Sesión del cómite </TableCell>
                <TableCell align="center">
                  {" "}
                  Fecha de sesión del cómite{" "}
                </TableCell>
                <TableCell align="center"> {t("dgv.acciones")}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {solicitudParametrosBandeja
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row);
                  const labelId = `enhanced-table-checkbox-${index}`;
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
                      <TableCell align="center">
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
                      <TableCell align="center">{row.observaciones}</TableCell>
                      <TableCell align="center">
                        {row.firmaAutorizacion}
                      </TableCell>
                      <TableCell align="center">
                        {row.sesionComiteNombre}
                      </TableCell>
                      <TableCell align="center">
                        {moment(row.fechaSesionComiteSecretarias).format(
                          "MMMM DD YYYY, h:mm:ss a"
                        )}
                      </TableCell>
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
                  onClick={aprobarSeleccionadasGeneral}
                >
                  Aprobar {solicitudParametrosBandeja.length} Seleccionadas
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
