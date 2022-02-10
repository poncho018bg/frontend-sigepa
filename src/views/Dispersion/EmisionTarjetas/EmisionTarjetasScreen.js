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
} from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { DropzoneAreaBase } from "material-ui-dropzone";
import { ConsultaExpediente } from "views/Expediente/ConsultaExpediente";
import { useCSVReader } from "react-papaparse";
import { TarjetasEmbozadasContext } from "contexts/TarjetasEmbozadasContext";

const useStyles = makeStyles(stylesArchivo);

const styles = {
  csvReader: {
    display: "flex",
    flexDirection: "row",
    marginBottom: 10,
  },
  browseFile: {
    width: "20%",
  },
  acceptedFile: {
    border: "0px solid #ccc",
    height: 45,
    lineHeight: 2.5,
    paddingLeft: 10,
    width: "20%",
  },
  remove: {
    borderRadius: 0,
    padding: "0 20px",
  },
  progressBarBackgroundColor: {
    backgroundColor: "red",
  },
};

export const EmisionTarjetasScreen = () => {
  const { t } = useTranslation();
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [archivoPrograma, setArchivoPrograma] = React.useState([]);
  const { CSVReader } = useCSVReader();
  const { registrarTarjetasEmbozo, tarjetasList } = useContext(
    TarjetasEmbozadasContext
  );
  const [tarjetaslist, setTarjetaslist] = React.useState([]);

  useEffect(() => {}, []);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleChangeFile = (e) => {
    console.log("files=>>>", e);
    console.log(archivoPrograma);
  };

  const guardarTarjetas = () => {
    console.log("Metodo guardarTarjetas", tarjetaslist);
    registrarTarjetasEmbozo(tarjetaslist);
  };
  return (
    <>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Tarjetas embozadas</h4>
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
                {/* <DropzoneAreaBase
                  acceptedFiles={[
                    ".csv, text/csv, application/vnd.ms-excel, application/csv, text/x-csv, application/x-csv, text/comma-separated-values, text/x-comma-separated-values",
                  ]}
                  onAdd={(fileObjs) => setArchivoPrograma(fileObjs)}
                  fileObjects={archivoPrograma}
                  filesLimit="1"
                  showPreviews={false}
                  showPreviewsInDropzone={false}
                  useChipsForPreview={false}
                  previewChipProps={false}
                  onDrop={handleChangeFile}
                /> */}

                <CSVReader
                  config={{
                    header: true,
                  }}
                  onUploadAccepted={(results: any) => {
                    console.log("---------------------------");
                    console.log(results);
                    setTarjetaslist(results?.data);
                    console.log("---------------------------");
                  }}
                >
                  {({
                    getRootProps,
                    acceptedFile,
                    ProgressBar,
                    getRemoveFileProps,
                    
                  }: any) => (
                    <>
                      <div style={styles.csvReader}>
                        <Button type="button" {...getRootProps()}>
                          Importar
                        </Button>

                        <div style={styles.acceptedFile}>
                          {acceptedFile && acceptedFile.name}
                        </div>
                        <Button
                          {...getRemoveFileProps()}
                          onClick={(e) => setTarjetaslist([])}
                        >
                          Remover
                        </Button>

                        <Button onClick={(e) => guardarTarjetas()}>
                          Guardar
                        </Button>
                      </div>
                      <ProgressBar style={styles.progressBarBackgroundColor} />
                      {console.log('doc=>',archivoPrograma)}
                      
                    </>
                  )}
                </CSVReader>
              </Grid>
            </Grid>

            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow key="898as">
                  <TableCell align="center"> Cuenta</TableCell>
                  <TableCell align="center"> Tarjeta</TableCell>
                  <TableCell align="center"> Nombre</TableCell>
                  <TableCell align="center"> Nombre completo</TableCell>
                  <TableCell align="center">Vigencia de las tarjetas</TableCell>
                  <TableCell align="center"> Empresa</TableCell>
                  <TableCell align="center"> Clave cliente</TableCell>
                  <TableCell align="center"> Fecha de entrega</TableCell>
                  <TableCell align="center"> Recibe </TableCell>
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
                        <TableCell align="center">
                          {row.nombre_embozado}
                        </TableCell>
                        <TableCell align="center">
                          {row.nombre_completo}
                        </TableCell>
                        <TableCell align="center">
                          {row.vigencia_tarjetas}
                        </TableCell>
                        <TableCell align="center">{row.empresa}</TableCell>
                        <TableCell align="center">
                          {row.clave_cliente}
                        </TableCell>
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
      </GridItem>
    </>
  );
};
