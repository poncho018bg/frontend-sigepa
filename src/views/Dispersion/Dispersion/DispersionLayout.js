import React, { useEffect, useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardActions from "@material-ui/core/CardActions";
import { makeStyles } from "@material-ui/core/styles";
import { stylesArchivo } from "css/stylesArchivo";
import Button from "components/CustomButtons/Button.js";
import Add from "@material-ui/icons/Add";
import Checkbox from "@material-ui/core/Checkbox";
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
  FormHelperText,
} from "@material-ui/core";
import { useTranslation } from "react-i18next";

import { ConsultaExpediente } from "views/Expediente/ConsultaExpediente";

import { DispersionLayoutContext } from "contexts/DispersionLayoutContext";
import { ModalConfirmacion } from "commons/ModalConfirmacion";
import { ModalContextConfirmacion } from "contexts/modalContextConfirmacion";
import { Mensaje } from "components/Personalizados/Mensaje";
import moment from "moment";
import "moment/locale/es";

const useStyles = makeStyles(stylesArchivo);

export const DispersionLayout = () => {
  const { t } = useTranslation();
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [msjConfirmacion, setMsjConfirmacion] = useState("");
  const [error, setError] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [fechainicio, setFechainicio] = useState("");
  const {
    getDispersionLayout,
    getDispersionLayoutByParametros,
    dispersionLayouList,
    registrarDispersionLayout,
  } = useContext(DispersionLayoutContext);
  const [selected, setSelected] = React.useState([]);

  useEffect(() => {
    getDispersionLayout();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const guardarTarjetas = () => {
    console.log("METODO DE GUARDAR");
  };

  const buscarTarjetas = () => {
    getDispersionLayoutByParametros(fechainicio);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  return (
    <>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>
              Reporte de dispersión de recursos
            </h4>
            <p className={classes.cardCategoryWhite}></p>
            <CardActions>
              <Grid container spacing={3}>
                <Grid item xs={4}>
                  Fecha de solicitud de dispersión:{" "}
                  {moment(new Date()).format("DD-MM-yyyy")}
                </Grid>
              </Grid>
            </CardActions>
          </CardHeader>
          <CardBody>
            <Grid container spacing={12}>
              <Grid item xs={4}>
                <TextField
                  id="fechainicio"
                  label="Fecha de búsqueda"
                  type="date"
                  fullWidth
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={fechainicio}
                  name={fechainicio}
                  onChange={(e) => setFechainicio(e.target.value)}
                  InputProps={{
                    inputProps: {},
                  }}
                />
              </Grid>

              <Grid item xs={4}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={buscarTarjetas}
                >
                  {t("lbl.buscar")}
                </Button>
              </Grid>
            </Grid>

            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow key="898as">
                  <TableCell align="center"> Selecciona todo</TableCell>
                  <TableCell align="center"> Secuencial</TableCell>
                  <TableCell align="center"> Nombre (s)</TableCell>
                  <TableCell align="center"> Primer Apellido</TableCell>
                  <TableCell align="center"> Segundo Apellido</TableCell>
                  <TableCell align="center"> Fecha Nacimiento</TableCell>
                  <TableCell align="center"> Teléfono</TableCell>
                  <TableCell align="center"> Número de serie INE</TableCell>
                  <TableCell align="center"> CURP</TableCell>
                  <TableCell align="center"> Municipio </TableCell>
                  <TableCell align="center"> Región </TableCell>
                  <TableCell align="center"> Cuenta </TableCell>
                  <TableCell align="center"> Tarjeta </TableCell>
                  <TableCell align="center"> Año </TableCell>
                  <TableCell align="center"> Apoyo </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {dispersionLayouList
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row,index ) => {
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
                        <TableCell align="center">{row.secuencial}</TableCell>
                        <TableCell align="center">{row.nombre}</TableCell>
                        <TableCell align="center">
                          {row.apellidoPaterno}
                        </TableCell>
                        <TableCell align="center">
                          {row.apellidoMaterno}
                        </TableCell>
                        <TableCell align="center">
                          {row.fechaNacimiento}
                        </TableCell>
                        <TableCell align="center">{row.telefono}</TableCell>
                        <TableCell align="center">{row.numIne}</TableCell>
                        <TableCell align="center">{row.curp}</TableCell>
                        <TableCell align="center">{row.municipio}</TableCell>
                        <TableCell align="center">{row.region}</TableCell>
                        <TableCell align="center">{row.cuenta}</TableCell>
                        <TableCell align="center">{row.tarjeta}</TableCell>
                        <TableCell align="center">{row.anio}</TableCell>
                        <TableCell align="center">{row.apoyo}</TableCell>
                        <TableCell align="center">
                          {row.fecha_entrega}
                        </TableCell>
                        <TableCell align="center">{row.recibe}</TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[25, 50, 100, 500]}
              component="div"
              labelRowsPerPage={t("dgv.registrospaginas")}
              count={dispersionLayouList.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          </CardBody>
        </Card>
        <ModalConfirmacion
          handleRegistrar={guardarTarjetas}
          evento="Registrar"
        />
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
            <h2> Nombre de quien recibe </h2>
          </DialogTitle>
          <DialogContent>
            <DialogContent></DialogContent>
          </DialogContent>
          <DialogActions>
            <Button autoFocus color="primary">
              Cerrar
            </Button>
          </DialogActions>
        </Dialog>
      </GridItem>
    </>
  );
};
