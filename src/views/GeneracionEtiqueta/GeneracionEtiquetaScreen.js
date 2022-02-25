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
} from "@material-ui/core";
import Button from "components/CustomButtons/Button.js";
import { useTranslation } from "react-i18next";
//context
import { SolicitudEmbozoTarjetasContext } from "contexts/solicitudEmbozoTarjetasContext";
//complementos
import { GeneracionEtiquetaDatosBeneficiarios } from "./GeneracionEtiquetaDatosBeneficiarios";
//useStyles
import { makeStyles } from "@material-ui/core/styles";
import { stylesArchivo } from "css/stylesArchivo";
const useStyles = makeStyles(stylesArchivo);

export const GeneracionEtiquetaScreen = () => {
  const { t } = useTranslation();
  const classes = useStyles();
  const [fechaEntrega, setFechaEntrega] = useState();
  // context
  const {
    etiquetadoBeneficiarios,
    getEtiquedadoBeneficiarios,
    guardarEtiquetadoTarjetas,
  } = useContext(SolicitudEmbozoTarjetasContext);
  /**
   * Datos del paginador
   */
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  //Useeffects
  useEffect(() => {
    console.log("consulta el listado de beneficiarios para etiquetar");
    //
    getEtiquedadoBeneficiarios();
  }, []);

  //funciones
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const onClickGenerarLayout = () => {
    console.log("genarar archivo");
    for (let i = 0; i < etiquetadoBeneficiarios.length; i++) {
      etiquetadoBeneficiarios[i].fechaEntrega = fechaEntrega;
    }
    console.log("GUARDAR ETIQUETADO ===>", etiquetadoBeneficiarios);
    guardarEtiquetadoTarjetas(etiquetadoBeneficiarios);
    getEtiquedadoBeneficiarios();
  };

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
                    onClick={onClickGenerarLayout}
                  >
                    {t("btn.generararchivo")}
                  </Button>
                )}
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
                  etiquetadoBeneficiarios.map((row, i) => {
                    return (
                      <GeneracionEtiquetaDatosBeneficiarios
                        datos={row}
                        index={i}
                        fechaEntrega={fechaEntrega}
                      />
                    );
                  })}
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
