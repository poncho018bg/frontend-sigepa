import React, { useContext, useState, useEffect } from "react";
//componentes
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardActions from "@material-ui/core/CardActions";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Grid,
  TableContainer,
  TextField,
  MenuItem,
} from "@material-ui/core";
import Button from "components/CustomButtons/Button.js";
import { useTranslation } from "react-i18next";
//useStyles
import { makeStyles } from "@material-ui/core/styles";
import { stylesArchivo } from "css/stylesArchivo";
import { PuntosEntregaContext } from "../../contexts/catalogos/PuntosEntregaContext";
import { RegionMunicipiosContext } from "../../contexts/catalogos/RegionMunicipiosContext";
import { MultiSelect } from "react-multi-select-component";
import { ModalConfirmacion } from "commons/ModalConfirmacion";
import { Mensaje } from "components/Personalizados/Mensaje";
import { ModalContextConfirmacion } from "contexts/modalContextConfirmacion";
const useStyles = makeStyles(stylesArchivo);

export const GeneracionEventoScreen = () => {
  const { t } = useTranslation();
  const classes = useStyles();
  const {
    puntosEntregaList,
    getPuntosEntrega,
    getTarjetasParaLotes,
    terjetasEntregaList,
    registrarLotesEntrega,
  } = useContext(PuntosEntregaContext);
  const { regionList, getRegionMunicipios } = useContext(
    RegionMunicipiosContext
  );

  const [puntoentrega, setPuntoentrega] = useState("");
  const [municipiosSelect, setMunicipiosSelect] = useState([]);
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { setShowModalConfirmacion } = useContext(ModalContextConfirmacion);
  const [error, setError] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [msjConfirmacion, setMsjConfirmacion] = useState('');

  useEffect(() => {
    getPuntosEntrega();
    getRegionMunicipios();
  }, []);

  useEffect(() => {
    const lstSelectMun = [];
    selected.map((e) => {
      lstSelectMun.push(e.value);
    });

    getTarjetasParaLotes(lstSelectMun);
  }, [selected]);

  useEffect(() => {
    const lstmun = [];
    regionList.map((mn) => {
      lstmun.push({ label: mn.dsMunicipio, value: mn.idMunicipio });
    });
    setMunicipiosSelect(lstmun);
  }, [regionList]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleRegistrar = () => {
     
    registrarLotesEntrega(terjetasEntregaList)
      .then((response) => {
        setOpenSnackbar(true);

        setMsjConfirmacion(`${t("msg.registroguardadoexitosamente")}`);

        const timer = setTimeout(() => {
          setError(false);
          setShowModalConfirmacion(false);
          setShowModalUpdate(false);
        }, 1500);
        return () => clearTimeout(timer);
      })
      .catch((err) => {
        setOpenSnackbar(true);
        setError(true);
        setMsjConfirmacion(`${t("msg.ocurrioerrorcalidarinfo")}`);

        setShowModalConfirmacion(false);
        setShowModalUpdate(false);
      });
  };

  const confirmacionDialog = (e) => {
    
    setShowModalConfirmacion(true);
   
}

  return (
    <GridItem xs={12} sm={12} md={12}>
      <Card>
        <CardHeader color="primary">
          <h4 className={classes.cardTitleWhite}>
            {t("pnl.creaciondlotesporpuntoentrega")}
          </h4>
          <p className={classes.cardCategoryWhite}></p>
        </CardHeader>
        <CardBody>
          <Grid container spacing={3}>
            <Grid item xs={3}>
              <MultiSelect
                style={{ marginBottom: "120px" }}
                options={municipiosSelect}
                value={selected}
                onChange={setSelected}
                labelledBy={t("cmb.seleccionar")}
              />
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={3}>
              <TextField
                id="paterno"
                label="Número de Evento-Lote"
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                variant="outlined"
                label={t("lbl.puntoentrega")}
                select
                fullWidth
                name="puntoentrega"
                value={puntoentrega}
                onChange={(e) => setPuntoentrega(e.target.value)}
              >
                <MenuItem value="0">
                  <em>{t("cmb.ninguno")}</em>
                </MenuItem>
                {puntosEntregaList.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.dspuntoentrega}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={3}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={() => confirmacionDialog()}
              >
                {t("btn.generarlayouttarjetas")}
              </Button>
            </Grid>
          </Grid>
        </CardBody>
        <CardBody>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow key="898as">
                <TableCell align="center">{t("dgv.consecutivo")} </TableCell>
                <TableCell align="center">{t("dgv.nombrecompleto")} </TableCell>
                <TableCell align="center">
                  {t("dgv.fechadenacimiento")}{" "}
                </TableCell>
                <TableCell align="center">{t("dgv.curp")} </TableCell>
                <TableCell align="center">{t("dgv.municipio")} </TableCell>
                <TableCell align="center">{t("dgv.folio")} </TableCell>
                <TableCell align="center">{t("dgv.etiquetas")} </TableCell>
                <TableCell align="center">{t("dgv.tarjeta")} </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {terjetasEntregaList
                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow key={row?.idTarjeta}>
                      <TableCell align="center">{row?.consecutivo}</TableCell>
                      <TableCell align="center">
                        {row?.nombrecompleto}
                      </TableCell>
                      <TableCell align="center">
                        {row?.fechanacimiento}
                      </TableCell>
                      <TableCell align="center">{row?.curp}</TableCell>
                      <TableCell align="center">{row?.municipio}</TableCell>
                      <TableCell align="center">{row?.folio}</TableCell>
                      <TableCell align="center">{row?.etiqueta}</TableCell>
                      <TableCell align="center">{row?.tarjeta}</TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[25, 50, 75, 100]}
            component="div"
            labelRowsPerPage={t("dgv.registrospaginas")}
            count={terjetasEntregaList.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
            labelDisplayedRows={({ from, to, count }) =>
              `${from}-${to} de un total ${count} registros`
            }
          />
        </CardBody>
        <ModalConfirmacion handleRegistrar={handleRegistrar} evento="Editar" />
        <Mensaje
          setOpen={setOpenSnackbar}
          open={openSnackbar}
          severity={error ? "error" : "success"}
          message={msjConfirmacion}
        />
      </Card>
    </GridItem>
  );
};
