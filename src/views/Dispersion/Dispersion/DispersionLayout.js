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

import { TarjetasEmbozadasContext } from "contexts/TarjetasEmbozadasContext";
import { ModalConfirmacion } from "commons/ModalConfirmacion";
import { ModalContextConfirmacion } from "contexts/modalContextConfirmacion";
import { Mensaje } from "components/Personalizados/Mensaje";
import moment from "moment";
import "moment/locale/es";

const useStyles = makeStyles(stylesArchivo);

export const DispersionLayout = () => {
  const { t } = useTranslation();
  const classes = useStyles();

  return (
    <>

<GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Reporte de Dispersión de recursos</h4>
            <p className={classes.cardCategoryWhite}></p>
            <CardActions>
              <Grid container spacing={3}>
                <Grid item xs={2}></Grid>
              </Grid>
            </CardActions>
          </CardHeader>
          <CardBody>
            <Grid container spacing={12}>
              <Grid item xs={12}>
                

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
                {console.log("tarjetaslist=>", tarjetaslist)}

                {tarjetaslist
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow>
                        <TableCell align="center">{row.cuenta}</TableCell>
                        <TableCell align="center">{row.tarjeta}</TableCell>
                        <TableCell align="center">{row.nombre}</TableCell>
                        <TableCell align="center">{row.nombre_com}</TableCell>
                        <TableCell align="center">{row.curp}</TableCell>
                        <TableCell align="center">
                          {row.vigencia_tarjetas}
                        </TableCell>
                        <TableCell align="center">{row.empresa}</TableCell>
                        <TableCell align="center">{row.cve_cte}</TableCell>
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
              count={tarjetaslist.length}
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
            <DialogContent>
              <TextField
                id="dsnombre"
                label="Nombre de quien recibe"
                variant="outlined"
                fullWidth
                name={dsnombre}
                fullWidth
                value={dsnombre}
                onChange={(e) => setDsnombre(e.target.value)}
                inputProps={{ maxLength: 80 }}
              />
            </DialogContent>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={() => aceptarNombre()} color="primary">
              Cerrar
            </Button>
          </DialogActions>
        </Dialog>
      </GridItem>

    </>
    )
};
