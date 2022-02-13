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
import moment from "moment";
import "moment/locale/es";

import ReplayIcon from "@material-ui/icons/Replay";
import CreateIcon from "@material-ui/icons/Create";
import IconButton from "@material-ui/core/IconButton";

import RemoveRedEyeIcon from "@material-ui/icons/RemoveRedEye";
import CardActions from "@material-ui/core/CardActions";
import { makeStyles } from "@material-ui/core/styles";
import { stylesArchivo } from "css/stylesArchivo";
import Tooltip from "@material-ui/core/Tooltip";

import { useTranslation } from "react-i18next";
import { RegistroSolicitudContext } from "contexts/registroSolicitudContext";
import { ProgramasContext } from "contexts/catalogos/Programas/programasContext";
import { EstatusSolicitudContext } from "contexts/catalogos/EstatusSolicitudContext";
import { useHistory } from "react-router-dom";
const useStyles = makeStyles(stylesArchivo);

import { DialogEstatusReasignada } from "./DialogEstatusReasignada";

export const BandejaSolicitudes = () => {
  const { t } = useTranslation();
  const {
    getSolicitudesPorParametros,
    solicitudParametros,
    bandejaCambioEstatusReasignada,
  } = useContext(RegistroSolicitudContext);
  const { getCien, programasList } = useContext(ProgramasContext);
  const { getEstatusSolicitud, estatusSolicitudList } = useContext(
    EstatusSolicitudContext
  );
  const classes = useStyles();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [nombre, setNombre] = useState("");
  const [apellidopaterno, setApellidopaterno] = useState("");
  const [apellidoMaterno, setApellidoMaterno] = useState("");
  const [folio, setFolio] = useState("");
  const [programa, setPrograma] = useState("");
  const [estatus, setEstatus] = useState("");
  let history = useHistory();

  const [selected, setSelected] = useState([]);

  useEffect(() => {
    getCien();
    getEstatusSolicitud();
    console.log("estatusSolicitudList ----->", estatusSolicitudList);
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const buscarSolitudes = () => {
    let solcitudFilter = {
      paterno: apellidopaterno === "" ? "NULL" : apellidopaterno,
      materno: apellidoMaterno === "" ? "NULL" : apellidoMaterno,
      nombre: nombre === "" ? "NULL" : nombre,
      idPrograma: programa === "" ? "NULL" : programa,
      folio: folio === "" ? "NULL" : folio,
      idEstatus: estatus === "" ? "NULL" : estatus,
    };
    console.log(solcitudFilter);
    getSolicitudesPorParametros(solcitudFilter);
  };

  const onSelectBuscar = (linea) => {
    console.log("expediente beneficiario BS ===>", linea);
    history.push("/admin/expedienteapi", {
      id: linea.idBeneficiario,
      curp: linea.dscurp,
    });
  };

  const [
    showDialogEstatusReasignada,
    setShowDialogEstatusReasignada,
  ] = useState(false);

  const confirmarReasignacion = (row) => {
    console.log("Entra a confirmar reasigacion");
    setShowDialogEstatusReasignada(true);
    setSelected(row);
  };

  const handleCambiarEstatusReasignada = () => {
    console.log("entra a handleCambiarEstatusReaXsiganda", selected);
    for (let i = 0; i < selected.length; i++) {
      selected[i].idUsuario = sessionStorage.getItem("idUSuario");
    }

    let guardarDatos = [
      {
        id: selected.id,
        nombre: selected.nombre,
        dsprograma: selected.dsprograma,
        dsfoliosolicitud: selected.dsfoliosolicitud,
        dsestatusregistro: selected.dsestatusregistro,
        fechaRegistro: selected.fechaRegistro,
        observaciones: selected.observaciones,
        motivobaja: selected.motivobaja,
        idUsuario: sessionStorage.getItem("idUSuario"),
        idBeneficiario: selected.idBeneficiario,
        curp: selected.dscurp,
        validarObservaciones: "false",
      },
    ];

    let parametros = {
      idEstatus: estatus === "" ? "Registradas" : estatus,
      idPrograma: programa === "" ? "NULL" : programa,
      idMunicipio: "NULL",
      paterno: apellidopaterno === "" ? "NULL" : apellidopaterno,
      materno: apellidoMaterno === "" ? "NULL" : apellidoMaterno,
      nombre: nombre === "" ? "NULL" : nombre,
      folio: folio === "" ? "NULL" : folio,
    };
    console.log("guardar datos=>>", guardarDatos);
    bandejaCambioEstatusReasignada(guardarDatos, parametros);

    let solcitudFilter = {
      paterno: apellidopaterno === "" ? "NULL" : apellidopaterno,
      materno: apellidoMaterno === "" ? "NULL" : apellidoMaterno,
      nombre: nombre === "" ? "NULL" : nombre,
      idPrograma: programa === "" ? "NULL" : programa,
      folio: folio === "" ? "NULL" : folio,
      idEstatus: estatus === "" ? "NULL" : estatus,
    };
    console.log(solcitudFilter);
    getSolicitudesPorParametros(solcitudFilter);

    setShowDialogEstatusReasignada(false);
  };

  return (
    <GridItem xs={12} sm={12} md={12}>
      <Card>
        <CardHeader color="primary">
          <h4 className={classes.cardTitleWhite}>{t('pnl.busquedasolicitudes')}</h4>
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
                variant="outlined"
                label={t('	lbl.seleccionaunprograma')}
                select
                fullWidth
                name="programa"
                value={programa}
                onChange={(e) => setPrograma(e.target.value)}
              >
                <MenuItem value="0">
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
                label={t('lbl.seleccionaestatus')}
                select
                fullWidth
                name="estatus"
                value={estatus}
                onChange={(e) => setEstatus(e.target.value)}
              >
                <MenuItem value="">
                  <em>{t("cmb.ninguno")}</em>
                </MenuItem>
                {estatusSolicitudList.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.dsestatussolicitud}
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
                {t('lbl.buscar')} 
              </Button>
            </Grid>
          </Grid>
        </CardBody>
        <CardBody>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow key="898as">
                <TableCell align="center">{t('dgv.solicitante')} </TableCell>
                <TableCell align="center">{t('dgv.programaapoyo')} </TableCell>
                <TableCell align="center">{t('dgv.folio')}  </TableCell>
                <TableCell align="center">{t('dgv.estatus')}  </TableCell>
                <TableCell align="center">{t('dgv.fecharegistro')} </TableCell>
                <TableCell align="center">{t('dgv.observaciones')} </TableCell>
                <TableCell align="center">{t('dgv.motivobajarechazo')} </TableCell>
                <TableCell align="center"> {t("dgv.acciones")}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {solicitudParametros
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow key={row.id}>
                      <TableCell align="center">{row.nombre}</TableCell>
                      <TableCell align="center">{row.dsprograma}</TableCell>
                      <TableCell align="center">
                        {row.dsfoliosolicitud}
                      </TableCell>
                      <TableCell align="center">
                        {row.dsestatusregistro}
                      </TableCell>
                      <TableCell align="center">
                        {moment(row.fechaRegistro).format(
                          "MMMM DD YYYY, h:mm:ss a"
                        )}
                      </TableCell>
                      <TableCell align="center">
                        <Tooltip
                          id="tooltip-observaciones"
                          title={row.dsobservaciones}
                          placement="top"
                        >
                          <span
                            style={{
                              color: "blue",
                              borderBottom: "2px solid currentColor",
                            }}
                          >
                            {row.observaciones}
                          </span>
                        </Tooltip>
                      </TableCell>
                      <TableCell align="center">{row.motivobaja}</TableCell>
                      <TableCell align="center">
                        <IconButton
                          aria-label="create"
                          onClick={() => onSelectBuscar(row)}
                        >
                          <RemoveRedEyeIcon />
                        </IconButton>
                        {row.dsestatusregistro === "Suspensión" && (
                          <IconButton
                            aria-label="return"
                            onClick={() => confirmarReasignacion(row)}
                          >
                            <ReplayIcon />
                          </IconButton>
                        )}
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
            count={solicitudParametros.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
            labelDisplayedRows={({ from, to, count }) =>
              `${from}-${to} de un total ${count} registros`
            }
          />
        </CardBody>
      </Card>
      <DialogEstatusReasignada
        showDialogEstatusReasignada={showDialogEstatusReasignada}
        setShowDialogEstatusReasignada={setShowDialogEstatusReasignada}
        handleCambiarEstatusReasignada={handleCambiarEstatusReasignada}
      />
    </GridItem>
  );
};
