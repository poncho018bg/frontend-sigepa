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
//context
import { SolicitudEmbozoTarjetasContext } from "contexts/solicitudEmbozoTarjetasContext";
//archivosComponentes
import { SolicitudEmbozoTarjetaBeneficiario } from "./SolicitudEmbozoTarjetaBeneficiario";
import { DialogSolicitudEmbozo } from "./DialogSolicitudEmbozo";
import { DialogLayoutExitoso } from "./DialogLayoutExitoso";
//useStyles
import { makeStyles } from "@material-ui/core/styles";
import { stylesArchivo } from "css/stylesArchivo";
const useStyles = makeStyles(stylesArchivo);

/**
 * En esta función se retorna la vista con la lista de solicitud de embozo de tarjetas
 * @returns
 */
export const SolicitudEmbozoTarjetasScreen = () => {
  const { t } = useTranslation();
  const classes = useStyles();
  //
  const [listaEmbozo, setListaEmbozo] = useState([]);
  const [showGenerarLayoutDialog, setShowGenerarLayoutDialog] = useState(false);
  const [showLayoutExitoso, setShowLayoutExitoso] = useState(false);
  //context
  const {
    embozoBeneficiarios,
    getEmbozoBeneficiarios,
    guardarEmbozoTarjetas,
  } = useContext(SolicitudEmbozoTarjetasContext);

  /**
   * Se realiza la consulta al endpoint
   */
  useEffect(() => {
    console.log("solicitu embozo tarjetas");
    getEmbozoBeneficiarios();
  }, []);

  /**
   * Se abre el dialog para guardar a los beneficiarios
   * @param {embozoBeneficiarios} e
   */
  const onClickGenerarLayout = (e) => {
    console.log("llega al onClick", e);
    //este for solo es informativo
    for (let i = 0; i < e.length; i++) {
      console.log("dentro del for", e[i]);
    }
    /**
     * se guarda en memoria la lista de los datos
     */
    setListaEmbozo(e);
    /**
     * Muestra el dialog
     */
    setShowGenerarLayoutDialog(true);
  };

  /**
   * en esta función se van a guardar los beneficiarios
   * @param {embozoBeneficiarios} e
   */
  const guardarLayout = () => {
    console.log("Lista para generar el layout ==>", listaEmbozo);
    guardarEmbozoTarjetas(listaEmbozo);
    setShowGenerarLayoutDialog(false);
    setShowLayoutExitoso(true);
  };

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

  return (
    <GridItem xs={12} sm={12} md={12}>
      <Card>
        <CardHeader color="primary">
          <h4 className={classes.cardTitleWhite}>
            Solicitud de Embozo de Tarjetas
          </h4>
          <p className={classes.cardCategoryWhite}></p>
          <CardActions>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <Button
                  color="white"
                  aria-label="edit"
                  round
                  onClick={() => onClickGenerarLayout(embozoBeneficiarios)}
                >
                  Generar Layout para Emisión de Tarjetas
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
                  <TableCell align="center">Secuencial</TableCell>
                  <TableCell align="center">Nombre Completo</TableCell>
                  <TableCell align="center">Nombre a embozar</TableCell>
                  <TableCell align="center">Calle, Numero exterior</TableCell>
                  <TableCell align="center">Numero interior</TableCell>
                  <TableCell align="center">Ciudad</TableCell>
                  <TableCell align="center">Colonia</TableCell>
                  <TableCell align="center">Teléfono</TableCell>
                  <TableCell align="center">Código Postal</TableCell>
                  <TableCell align="center">Código Provincia</TableCell>
                  <TableCell align="center">Email</TableCell>
                  <TableCell align="center">Tipo de Documento</TableCell>
                  <TableCell align="center">Número de Documento</TableCell>
                  <TableCell align="center">Sexo</TableCell>
                  <TableCell align="center">Fecha de Nacimiento</TableCell>
                  <TableCell align="center">RFC</TableCell>
                  <TableCell align="center">CURP</TableCell>
                  <TableCell align="center">Celular</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {embozoBeneficiarios.map((row, i) => {
                  return (
                    <SolicitudEmbozoTarjetaBeneficiario datos={row} index={i} />
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={embozoBeneficiarios.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </CardBody>
      </Card>
      <DialogSolicitudEmbozo
        showGenerarLayoutDialog={showGenerarLayoutDialog}
        setShowGenerarLayoutDialog={setShowGenerarLayoutDialog}
        guardarLayout={guardarLayout}
      />
      <DialogLayoutExitoso
        showLayoutExitoso={showLayoutExitoso}
        setShowLayoutExitoso={setShowLayoutExitoso}
      />
    </GridItem>
  );
};
