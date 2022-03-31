import React, { useContext, useState, useEffect } from "react";

//context
import { SolicitudEmbozoTarjetasContext } from "contexts/solicitudEmbozoTarjetasContext";
import { LoteEntregaTarjetaContext } from "contexts/LoteEntregaTarjetaContext";
//
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
//useStyles
import { makeStyles } from "@material-ui/core/styles";
import { stylesArchivo } from "css/stylesArchivo";
const useStyles = makeStyles(stylesArchivo);
//
import { useTranslation } from "react-i18next";

/**
 * Esta funcion muestra los beneficiarios etiquetados a un evento
 * @returns etiquetados
 */
export default function GeneracionEtiquetaEvento(props) {
  const { dialogConfirmar } = props;
  const { t } = useTranslation();
  const classes = useStyles();
  // context
  const { getEtiquetasEvento, eventoTarjetasEtiquetadas } = useContext(
    SolicitudEmbozoTarjetasContext
  );
  const { loteEventoList, getLoteEventoTarjetaActivos } = useContext(
    LoteEntregaTarjetaContext
  );

  //
  const [idEvento, setIdEvento] = useState();
  //Useeffects
  useEffect(() => {
    getLoteEventoTarjetaActivos();
  }, []);

  useEffect(() => {
    console.log("busca eventos")
    getLoteEventoTarjetaActivos();
  }, [dialogConfirmar]);

  const onChangeEvento = (e) => {
    console.log(e.target.value);
    setIdEvento(e.target.value);
    getEtiquetasEvento(e.target.value);
  };

  /**
   * Datos del paginador
   */
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  //funciones paginador
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Card>
      <CardHeader color="primary">
        <h4 className={classes.cardTitleWhite}>Tarjetas Etiquetadas</h4>
        <p className={classes.cardCategoryWhite}></p>
        <CardActions>
          <Grid container spacing={3}>
            <Grid item xs={6}></Grid>
          </Grid>
        </CardActions>
      </CardHeader>
      <CardBody>
        <TextField
          id="EELT"
          label="Buscar Evento"
          variant="outlined"
          name="entrarEvento"
          fullWidth
          select
          onChange={onChangeEvento}
        >
          {loteEventoList.map((g, i) => (
            <MenuItem key={i} value={g.id}>
              {g.dsclaveevento}
            </MenuItem>
          ))}
        </TextField>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow key="TELE01">
                <TableCell align="center">{t("lbl.secuencial")}</TableCell>
                <TableCell align="center">{t("lbl.nombrecompleto")}</TableCell>
                <TableCell align="center">{t("lbl.municipio")}</TableCell>
                <TableCell align="center">{t("lbl.numeroetiqueta")}</TableCell>
                <TableCell align="center">{t("lbl.codigoevento")}</TableCell>
                <TableCell align="center">Fecha de Entrega</TableCell>
                <TableCell align="center">{t("lbl.vertiente")}</TableCell>
                <TableCell align="center">
                  {t("lbl.terminaciontarjeta")}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {eventoTarjetasEtiquetadas &&
                eventoTarjetasEtiquetadas
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, i) => {
                    const labelId = `enhanced-table-checkbox-${i}`;
                    return (
                      <TableRow>
                        <TableCell align="center">{i + 1}</TableCell>
                        <TableCell align="center">
                          {row.nombreCompleto}
                        </TableCell>
                        <TableCell align="center">{row.municipio}</TableCell>
                        <TableCell align="center">{row.consecutivo}</TableCell>
                        <TableCell align="center">{row.codigoEvento}</TableCell>
                        <TableCell align="center">{row.fechaEntrega}</TableCell>
                        <TableCell align="center">{row.vertiente}</TableCell>
                        <TableCell align="center">
                          {row.terminacionTarjeta}
                        </TableCell>
                      </TableRow>
                    );
                  })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={eventoTarjetasEtiquetadas.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </CardBody>
    </Card>
  );
}
