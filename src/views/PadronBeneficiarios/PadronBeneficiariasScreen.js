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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TableContainer,
} from "@material-ui/core";
import Button from "components/CustomButtons/Button.js";
import moment from "moment";
import "moment/locale/es";

import { BeneficiariosContext } from "contexts/BeneficiariosContext";
import { BtActividadesContext } from "contexts/catalogos/BtActividadesContext";
import IconButton from "@material-ui/core/IconButton";
import AddBoxIcon from "@material-ui/icons/AddBox";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import CancelPresentationIcon from "@material-ui/icons/CancelPresentation";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import CardActions from "@material-ui/core/CardActions";
import { makeStyles } from "@material-ui/core/styles";
import { stylesArchivo } from "css/stylesArchivo";

import { useTranslation } from "react-i18next";
import { TiposApoyosContext } from "contexts/catalogos/tiposApoyosContext";
import { MotivoRechazosContext } from "contexts/catalogos/motivoRechazosContext";
import { ProgramasContext } from "contexts/catalogos/Programas/programasContext";
import { BandejaRechazosContext } from "contexts/BandejaRechazosContext";
import { Mensaje } from "components/Personalizados/Mensaje";
import { ModalConfirmacion } from "commons/ModalConfirmacion";
import { ModalContextConfirmacion } from "contexts/modalContextConfirmacion";
import { MotivoSuspensionContext } from "contexts/MotivoSuspensionContext";
import { BandejaSuspensionContext } from "contexts/BandejaSuspensionContext";
import AgregarFolioSedesem from "./AgregarFolioSedesem";

const useStyles = makeStyles(stylesArchivo);

export const PadronBeneficiariasScreen = () => {
  const { t } = useTranslation();
  const {
    padronList,
    getPadronBeneficiarios,
    getDetalleBeneficiarios,
    beneficiariaList,
  } = useContext(BeneficiariosContext);
  const { registrarBtActividades } = useContext(BtActividadesContext);
  const { getCien, programasList } = useContext(ProgramasContext);
  const { tiposApoyosList, getTiposApoyos } = useContext(TiposApoyosContext);
  const { motivoRechazosList, getMotivoRechazos } = useContext(
    MotivoRechazosContext
  );
  const { motivoSuspensionList, getMotivoSuspension } = useContext(
    MotivoSuspensionContext
  );
  const { registrarBandejaRechazosPadron } = useContext(BandejaRechazosContext);
  const { registrarBandejaSuspensionPadron } = useContext(
    BandejaSuspensionContext
  );

  const classes = useStyles();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { showModalConfirmacion, setShowModalConfirmacion } = useContext(
    ModalContextConfirmacion
  );

  const [nombre, setNombre] = useState("");
  const [curp, setCurp] = useState("");
  const [idPrograma, setIdPrograma] = useState("");
  const [idTipoApoyo, setIdTipoApoyo] = useState("");
  const [anio, setAnio] = useState("");
  const [idMotivoBaja, setIdMotivoBaja] = useState("");
  const [idMotivoSuspension, setIdMotivoSuspension] = useState("");
  const [masprogramas, setMasprogramas] = useState(true);

  const [llMotivoBaja, setLlMotivoBaja] = useState("");
  const [dsMotivoBaja, setDsMotivoBaja] = useState("");
  const [dsSuspension, setDsSuspension] = useState("");
  const [idMvBandejaSol, setIdMvBandejaSol] = useState("");
  const [error, setError] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [msjConfirmacion, setMsjConfirmacion] = useState("");
  const [open, setOpen] = React.useState(false);
  const [opensuspension, setOpensuspension] = React.useState(false);
  const [esBajaOSuspension, setEsBajaOSuspension] = useState("");
  useEffect(() => {
    getCien();
    getTiposApoyos();
    getMotivoRechazos();
    getMotivoSuspension();
    buscarSolitudes();
  }, []);

  const handleClose = () => {
    setOpen(false);
    setIdMotivoBaja("");
  };
  const handleClosesuspension = () => {
    setOpensuspension(false);
    setIdMotivoSuspension("");
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const buscarSolitudes = () => {
    let solcitudFilter = {
      nombrebeneficiario: nombre === "" ? "NULL" : nombre,
      curp: curp === "" ? "NULL" : curp,
      idPrograma: idPrograma === "" ? "NULL" : idPrograma,
      idTipoApoyo: idTipoApoyo === "" ? "NULL" : idTipoApoyo,
      anioPrograma: anio === "" ? "NULL" : anio,
      motivoRechazo: idMotivoBaja === "" ? "NULL" : idMotivoBaja,
      motivoSuspension: idMotivoSuspension === "" ? "NULL" : idMotivoSuspension,
    };
    setMasprogramas(true);

    getPadronBeneficiarios(solcitudFilter);
  };

  const buscarDetalle = (beneficiario) => {
    getDetalleBeneficiarios(beneficiario.id);
    setMasprogramas(false);
  };

  useEffect(() => {
    if (!masprogramas) {
      if (beneficiariaList.length === 0) {
        setMasprogramas(false);
      } else {
        setMasprogramas(true);
      }
    }
  }, [beneficiariaList]);

  useEffect(() => {
    console.log("idMotivoBaja", llMotivoBaja);
    console.log("idMotivoSuspension", llMotivoBaja);
    if (llMotivoBaja !== "" && !showModalConfirmacion) {
      setOpen(false);
      buscarSolitudes();
    }
  }, [showModalConfirmacion]);

  const mostrarConfirmacion = (esBaja) => {
    setShowModalConfirmacion(true);
    setEsBajaOSuspension(esBaja);
  };

  const redirectRegister = () => {
    console.log("operación =>", esBajaOSuspension);

    let bandejaRechz = {
      dsobservaciones: dsMotivoBaja,
      motivo_rechazo_id: llMotivoBaja,
      mv_bandeja_id: `${idMvBandejaSol}`,
      idUsuario: sessionStorage.getItem("idUSuario"),
      idMvBandeja: `${idMvBandejaSol}`,
    };

    if (esBajaOSuspension === "BAJA") {
      registrarBandejaRechazosPadron(bandejaRechz)
        .then((response) => {
          setOpenSnackbar(true);

          setMsjConfirmacion(`${t("msg.registroguardadoexitosamente")}`);

          const timer = setTimeout(() => {
            setError(false);
            setShowModalConfirmacion(false);
            setOpen(false);
          }, 1500);
          return () => clearTimeout(timer);
        })
        .catch((err) => {
          console.log("err", err);
          setOpenSnackbar(true);
          setError(true);
          setMsjConfirmacion(`${t("msg.ocurrioerrorcalidarinfo")}`);
        });
    }
    if (esBajaOSuspension === "SUSPENSION") {
      registrarBandejaSuspensionPadron(bandejaRechz)
        .then((response) => {
          setOpenSnackbar(true);

          setMsjConfirmacion(`${t("msg.registroguardadoexitosamente")}`);

          const timer = setTimeout(() => {
            setError(false);
            setShowModalConfirmacion(false);
            setOpen(false);
          }, 1500);
          return () => clearTimeout(timer);
        })
        .catch((err) => {
          console.log("err", err);
          setOpenSnackbar(true);
          setError(true);
          setMsjConfirmacion(`${t("msg.ocurrioerrorcalidarinfo")}`);
        });
    }

    setShowModalConfirmacion(false);
  };

  const cambiarMotivoBaja = (row, dta) => {
    setOpen(true);
    setDsMotivoBaja("");
    row.idMotivoBaja = dta;
    //row.activo = true;
    setLlMotivoBaja(dta);
    setIdMvBandejaSol(row.idMvBandejaSol);
    padronList.map((e) => {
      if (e.id === row.id) {
        e.idMotivoBaja = dta;
        e.activo = true;
      }
    });
  };

  const cambiarMotivoSuspension = (row, dta) => {
    //setOpensuspension(true);
    setDsSuspension("");
    row.idMotivoSuspension = dta;
    row.activo = true;
    setLlMotivoBaja(dta);
    setIdMvBandejaSol(row.idMvBandejaSol);
    padronList.map((e) => {
      if (e.id === row.id) {
        e.idMotivoSuspension = dta;
        e.activo = true;
      }
    });
    mostrarConfirmacion("SUSPENSION");
  };

  return (
    <GridItem xs={12} sm={12} md={12}>
      <Card>
        <CardHeader color="primary">
          <h4 className={classes.cardTitleWhite}>Padrón de embozo</h4>
          <p className={classes.cardCategoryWhite}></p>
          <CardActions></CardActions>
        </CardHeader>
        <CardBody>
          <Grid container spacing={3}>
            <Grid item xs={3}>
              <TextField
                id="nombre"
                label="Nombre beneficiaria"
                variant="outlined"
                name={nombre}
                fullWidth
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                id="curp"
                label="CURP"
                variant="outlined"
                name={curp}
                fullWidth
                value={curp}
                onChange={(e) => setCurp(e.target.value)}
              />
            </Grid>

            <Grid item xs={3}>
              <TextField
                variant="outlined"
                label="Selecciona un programa"
                select
                fullWidth
                name="idPrograma"
                value={idPrograma}
                onChange={(e) => setIdPrograma(e.target.value)}
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
                variant="outlined"
                label="Selecciona un tipo de apoyo"
                select
                fullWidth
                name="idTipoApoyo"
                value={idTipoApoyo}
                onChange={(e) => setIdTipoApoyo(e.target.value)}
              >
                <MenuItem value="0">
                  <em>{t("cmb.ninguno")}</em>
                </MenuItem>
                {tiposApoyosList.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.dstipoapoyo}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={3}>
              <TextField
                id="anio"
                label="Año de registro del programa"
                variant="outlined"
                name={anio}
                fullWidth
                value={anio}
                onChange={(e) => setAnio(e.target.value)}
              />
            </Grid>

            <Grid item xs={3} style={{ textAlign: "right", float: "right" }}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={buscarSolitudes}
              >
                Buscar
              </Button>
            </Grid>
          </Grid>
          <TableContainer>
            <Table
              stickyHeader
              aria-label="sticky table"
              style={{ paddingTop: "20px", width: "auto", tableLayout: "auto" }}
            >
              <TableHead>
                <TableRow key="898as">
                  <TableCell align="center"> Consecutivo </TableCell>
                  <TableCell align="center"> Beneficiaria </TableCell>
                  <TableCell align="center"> CURP </TableCell>
                  <TableCell align="center"> Programa de apoyo </TableCell>
                  <TableCell align="center"> Tipo de apoyo </TableCell>
                  <TableCell align="center"> Folio SEDESEM </TableCell>
                  <TableCell align="center">
                    {" "}
                    Año de registro al programa{" "}
                  </TableCell>
                  
                </TableRow>
              </TableHead>
              <TableBody>
                {padronList
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow key={row.id}>
                        <TableCell align="center">{row.number}</TableCell>

                        <TableCell align="center">                         
                          {row.nombre}
                        </TableCell>
                        <TableCell align="center">{row.dscurp}</TableCell>
                        <TableCell align="center">{row.dsprograma}</TableCell>
                        <TableCell align="center">{row.dstipoapoyo}</TableCell>
                        <TableCell align="center">
                          {" "}
                          <AgregarFolioSedesem row={row} />
                        </TableCell>
                        <TableCell align="center">{row.anio}</TableCell>
                        
               
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[25, 50, 75, 100]}
            component="div"
            labelRowsPerPage={t("dgv.registrospaginas")}
            count={padronList.length}
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
      <Card>
        <CardBody hidden={masprogramas}>
          <h5>El beneficiario no tiene mas apoyos</h5>
        </CardBody>

        <CardBody hidden={beneficiariaList.length === 0}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow key="898as">
                <TableCell align="center"> Consecutivo </TableCell>
                <TableCell align="center">
                  {" "}
                  Año de registro al programa{" "}
                </TableCell>
                <TableCell align="center"> Programa de apoyo </TableCell>
                <TableCell align="center"> Apoyo otorgado </TableCell>
                <TableCell align="center"> Activo </TableCell>
                <TableCell align="center"> Motivo de baja </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {console.log(beneficiariaList)}
              {beneficiariaList
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow key={row.id}>
                      <TableCell align="center">{row.number}</TableCell>
                      <TableCell align="center">{row.anio}</TableCell>
                      <TableCell align="center">{row.dsprograma}</TableCell>
                      <TableCell align="center">{row.dstipoapoyo}</TableCell>
                      <TableCell align="center">
                        {" "}
                        {!row.activo ? (
                          <CheckBoxIcon fontSize="inherit" />
                        ) : (
                          <CancelPresentationIcon fontSize="inherit" />
                        )}{" "}
                      </TableCell>
                      <TableCell align="center">
                        {row.dsmotivorechazo}
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </CardBody>
      </Card>

      <Mensaje
        setOpen={setOpenSnackbar}
        open={openSnackbar}
        severity={error ? "error" : "success"}
        message={msjConfirmacion}
      />

      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        maxWidth="lg"
        fullWidth={true}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          <h2> Motivo de baja </h2>
        </DialogTitle>
        <DialogContent>
          <DialogContent>
            <TextField
              id="dsMotivoBaja"
              label="Motivo de baja"
              variant="outlined"
              fullWidth
              name={dsMotivoBaja}
              fullWidth
              value={dsMotivoBaja}
              onChange={(e) => setDsMotivoBaja(e.target.value)}
            />
          </DialogContent>
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            onClick={() => mostrarConfirmacion("BAJA")}
            color="primary"
          >
            Guardar
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        onClose={handleClosesuspension}
        aria-labelledby="customized-dialog-title"
        open={opensuspension}
        maxWidth="lg"
        fullWidth={true}
      >
        <DialogTitle
          id="customized-dialog-title"
          onClose={handleClosesuspension}
        >
          <h2> Motivo de suspensión </h2>
        </DialogTitle>
        <DialogContent>
          <DialogContent>
            <TextField
              id="dsSuspension"
              label="Motivo de suspensión"
              variant="outlined"
              fullWidth
              name={dsSuspension}
              fullWidth
              value={dsSuspension}
              onChange={(e) => setDsSuspension(e.target.value)}
            />
          </DialogContent>
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            onClick={() => mostrarConfirmacion("SUSPENSION")}
            color="primary"
          >
            Guardar
          </Button>
        </DialogActions>
      </Dialog>

      <ModalConfirmacion
        handleRegistrar={redirectRegister}
        evento="Registrar"
      />
    </GridItem>
  );
};
