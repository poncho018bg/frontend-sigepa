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
import Checkbox from "@material-ui/core/Checkbox";
import Button from "components/CustomButtons/Button.js";
import { useTranslation } from "react-i18next";
//context
import { SolicitudEmbozoTarjetasContext } from "contexts/solicitudEmbozoTarjetasContext";
import { LoteEntregaTarjetaContext } from "contexts/LoteEntregaTarjetaContext";
//complementos
import { GeneracionEtiquetaDatosBeneficiarios } from "./GeneracionEtiquetaDatosBeneficiarios";
import DialogConfirmacionEtiquetado from "./DialogConfirmacionEtiquetado";
//useStyles
import { makeStyles } from "@material-ui/core/styles";
import { stylesArchivo } from "css/stylesArchivo";
const useStyles = makeStyles(stylesArchivo);

export const GeneracionEtiquetaScreen = () => {
  const { t } = useTranslation();
  const classes = useStyles();
  const [fechaEntrega, setFechaEntrega] = useState();
  const [dialogConfirmar, setDialogConfirmar] = useState(false);
  const [listaEtiquetado, setListaEtiquetado] = useState([]);
  const [idLote, setIdLote] = useState();
  const [selected, setSelected] = useState([]);
  // context
  const {
    etiquetadoBeneficiarios,
    guardarEtiquetadoTarjetas,
    getEtiquedadoBeneficiariosLote,
  } = useContext(SolicitudEmbozoTarjetasContext);
  const { getLoteEntregaTarjetaAll, lotesEntregaTarjetaList } = useContext(
    LoteEntregaTarjetaContext
  );
  /**
   * Datos del paginador
   */
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  //Useeffects
  useEffect(() => {
    console.log("consulta el listado de beneficiarios para etiquetar");
    //
    //getEtiquedadoBeneficiarios();
    getLoteEntregaTarjetaAll();
  }, []);

  //funciones
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const onClickGenerarLayout = (e) => {
    console.log("lista etiquetas selected ==>", e);

    console.log("genarar archivo");
    for (let i = 0; i < e.length; i++) {
      e[i].fechaEntrega = fechaEntrega;
    }
    console.log("GUARDAR ETIQUETADO ===>", e);
    setListaEtiquetado(e);
    setDialogConfirmar(true);
  };

  /**
   * Dialogo de confirmación manda llamar esta función
   * Guarda los beneficiarios etiquetados
   */
  const guardarLayourEtiquetas = () => {
    guardarEtiquetadoTarjetas(listaEtiquetado,idLote);
    setDialogConfirmar(false);
    //getEtiquedadoBeneficiarios();
    //getEtiquedadoBeneficiariosLote(idLote);
  };

  /**
   * busqueda por lote
   */
  const onChangeLote = (e) => {
    console.log(e.target.value);
    setIdLote(e.target.value);
    getEtiquedadoBeneficiariosLote(e.target.value);
  };

  /**
   * Seleccionar
   */
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = etiquetadoBeneficiarios.map((n) => n);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
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
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  return (
    <GridItem xs={12} sm={12} md={12}>
      <Card>
        <CardHeader color="primary">
          <h4 className={classes.cardTitleWhite}>
            {t("lbl.generacionetiqueta")}
          </h4>
          <p className={classes.cardCategoryWhite}></p>
          <CardActions>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                {fechaEntrega && (
                  <Button
                    color="white"
                    aria-label="edit"
                    round
                    onClick={() =>
                      //onClickGenerarLayout(etiquetadoBeneficiarios)
                      onClickGenerarLayout(selected)
                    }
                  >
                    {t("btn.generararchivo")}
                  </Button>
                )}
              </Grid>
            </Grid>
          </CardActions>
        </CardHeader>
        <CardBody>
          <TextField
            style={{ marginBottom: "20px" }}
            id="loteEntrega"
            label="Lote entrega"
            variant="outlined"
            name="loteEntrega"
            fullWidth
            select
            onChange={onChangeLote}
          >
            {lotesEntregaTarjetaList.map((g, i) => (
              <MenuItem key={i} value={g.id}>
                {g.dscodigolote}
              </MenuItem>
            ))}
          </TextField>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow key="SE1MI">
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      indeterminate={
                        selected.length > 0 &&
                        selected.length < etiquetadoBeneficiarios.length
                      }
                      checked={
                        etiquetadoBeneficiarios.length > 0 &&
                        selected.length === etiquetadoBeneficiarios.length
                      }
                      onChange={handleSelectAllClick}
                      inputProps={{
                        "aria-label": "select all desserts",
                      }}
                    />
                  </TableCell>
                  <TableCell align="center">{t("lbl.secuencial")}</TableCell>
                  <TableCell align="center">
                    {t("lbl.nombrecompleto")}
                  </TableCell>
                  <TableCell align="center">{t("lbl.municipio")}</TableCell>
                  <TableCell align="center">
                    {t("lbl.numeroetiqueta")}
                  </TableCell>
                  <TableCell align="center">{t("lbl.codigoevento")}</TableCell>
                  <TableCell align="center">
                    <TextField
                      id="fechaEntrega"
                      label={t("lbl.fechaentregaevento")}
                      type="date"
                      fullWidth
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      value={fechaEntrega}
                      name="fechaEntrega"
                      onChange={(event) => {
                        console.log(event.target.value);
                        setFechaEntrega(event.target.value);
                      }}
                    />
                  </TableCell>
                  <TableCell align="center">{t("lbl.vertiente")}</TableCell>
                  <TableCell align="center">
                    {t("lbl.terminaciontarjeta")}
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {etiquetadoBeneficiarios &&
                  etiquetadoBeneficiarios
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, i) => {
                      const isItemSelected = isSelected(row);
                      const labelId = `enhanced-table-checkbox-${i}`;
                      return (
                        <TableRow
                          hover
                          onClick={(event) => handleClick(event, row)}
                          role="checkbox"
                          aria-checked={isItemSelected}
                          tabIndex={-1}
                          key={row.nombreCompleto}
                          selected={isItemSelected}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox
                              color="primary"
                              checked={isItemSelected}
                              inputProps={{
                                "aria-labelledby": labelId,
                              }}
                            />
                          </TableCell>
                          <TableCell align="center">{i + 1}</TableCell>
                          <TableCell align="center">
                            {row.nombreCompleto}
                          </TableCell>
                          <TableCell align="center">{row.municipio}</TableCell>
                          <TableCell align="center">
                            {row.consecutivo}
                          </TableCell>
                          <TableCell align="center">
                            {row.codigoEvento}
                          </TableCell>
                          <TableCell align="center">{fechaEntrega}</TableCell>
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
            count={etiquetadoBeneficiarios.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </CardBody>
      </Card>
      <DialogConfirmacionEtiquetado
        dialogConfirmar={dialogConfirmar}
        setDialogConfirmar={setDialogConfirmar}
        guardarLayourEtiquetas={guardarLayourEtiquetas}
      />
    </GridItem>
  );
};
