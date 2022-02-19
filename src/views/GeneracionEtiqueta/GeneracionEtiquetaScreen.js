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
} from "@material-ui/core";
import Button from "components/CustomButtons/Button.js";
import { useTranslation } from "react-i18next";
//useStyles
import { makeStyles } from "@material-ui/core/styles";
import { stylesArchivo } from "css/stylesArchivo";
const useStyles = makeStyles(stylesArchivo);

export const GeneracionEtiquetaScreen = () => {
  const { t } = useTranslation();
  const classes = useStyles();

  /**
   * funciones y datos del paginador
   */
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const onClickGenerarLayout = (e) => {};
  return (
    <GridItem xs={12} sm={12} md={12}>
      <Card>
        <CardHeader color="primary">
          <h4 className={classes.cardTitleWhite}>{t("lbl.generacionetiqueta")}</h4>
          <p className={classes.cardCategoryWhite}></p>
          <CardActions>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <Button color="white" aria-label="edit" round>
                 {t("btn.generararchivo")}
                </Button>
              </Grid>
            </Grid>
          </CardActions>
        </CardHeader>
        <CardBody>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow key="SE1MI">
                  <TableCell align="center">{t("lbl.secuencial")}</TableCell>
                  <TableCell align="center">{t("lbl.nombrecompleto")}</TableCell>
                  <TableCell align="center">{t("lbl.municipio")}</TableCell>
                  <TableCell align="center">{t("lbl.numeroetiqueta")}</TableCell>
                  <TableCell align="center">{t("lbl.codigoevento")}</TableCell>
                  <TableCell align="center">{t("lbl.fechaentregaevento")}</TableCell>
                  <TableCell align="center">{t("lbl.vertiente")}</TableCell>
                  <TableCell align="center">{t("lbl.terminaciontarjeta")}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell align="center">Secuencial</TableCell>
                  <TableCell align="center">Nombre Completo</TableCell>
                  <TableCell align="center">Nombre a embozar</TableCell>
                  <TableCell align="center">Calle, Numero exterior</TableCell>
                  <TableCell align="center">Numero interior</TableCell>
                  <TableCell align="center">Ciudad</TableCell>
                  <TableCell align="center">Colonia</TableCell>
                  <TableCell align="center">Teléfono</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={0}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </CardBody>
      </Card>
    </GridItem>
  );
};
