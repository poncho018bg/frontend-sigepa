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
import { DropzoneAreaBase } from "material-ui-dropzone";
import { ConsultaExpediente } from "views/Expediente/ConsultaExpediente";
import { useCSVReader } from "react-papaparse";
import { TarjetasEmbozadasContext } from "contexts/TarjetasEmbozadasContext";
import { ModalConfirmacion } from "commons/ModalConfirmacion";
import { ModalContextConfirmacion } from "contexts/modalContextConfirmacion";
import { Mensaje } from "components/Personalizados/Mensaje";
import moment from "moment";
import "moment/locale/es";

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
  const { CSVReader ,acceptedFile} = useCSVReader();
  const { registrarTarjetasEmbozo, tarjetasList } = useContext(
    TarjetasEmbozadasContext
  );
  const { setShowModalConfirmacion } = useContext(ModalContextConfirmacion);
  const [tarjetaslist, setTarjetaslist] = React.useState([]);
  const [error,setError ] = useState(false);
  const [errordoc,setErrordoc ] = useState({});
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [msjConfirmacion, setMsjConfirmacion] = useState("");
  const [fechaVig, setFechaVig] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [dsnombre, setDsnombre] = useState("");
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

  const isObjEmpty = (obj) => {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
  };

  const guardarTarjetas = () => {
   

    console.log("Metodo guardarTarjetas", tarjetaslist);
    registrarTarjetasEmbozo(tarjetaslist)
      .then((response) => {
        setOpenSnackbar(true);
        setMsjConfirmacion(`${t("msg.registroguardadoexitosamente")}`);
        setTarjetaslist([])
        const timer = setTimeout(() => {
          setError(false);
          setShowModalConfirmacion(false);
          setShowModal(false);
          
          console.log("GUARDO");
        }, 1000);
        return () => clearTimeout(timer);
      })
      .catch((err) => {
        console.log("NO GUARDO 1");
        setOpenSnackbar(true);
        setError(true);
        setMsjConfirmacion(`${t("msg.ocurrioerrorcalidarinfo")}`);
        console.log("NO GUARDO 2");
      });
  };

  const mensajeConfirmation = () => {
    console.log('acceptedFile=>',acceptedFile)
    const errorsd = {};
    if (tarjetaslist.length === 0) {
      errorsd.tarjetaslist = `${t('msg.debeimportararchivo')}`;
    }
    
    if (!isObjEmpty(errorsd)) {
      setErrordoc(errorsd);
      return;
    }

    setShowModalConfirmacion(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const ingresarFecha = () => {
    var fechafinal = moment(new Date()).add(3, "years").format("yyyy-MM-DD");
    var diashabiles = 7;
    while (diashabiles > 0) {
      if (
        moment(fechafinal).isoWeekday() !== 6 &&
        moment(fechafinal).isoWeekday() !== 7
      ) {
        diashabiles--;
      }
      fechafinal = moment(fechafinal).subtract(1, "days").format("yyyy-MM-DD");
    }
    setFechaVig(moment(fechafinal).format("DD-MM-yyyy"));
  };

  const aceptarNombre = () => {
    tarjetaslist.map((e) => {
      e.fecha_entrega = moment(new Date()).format("DD-MM-yyyy");
      e.recibe = dsnombre;
      e.vigencia_tarjetas = fechaVig;
    });
    setOpen(false);
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
              
                <CSVReader
                  config={{
                    header: true,
                  }}
                  onUploadAccepted={(results: any) => {
                    console.log("---------------------------");
                    console.log(results);
                    setTarjetaslist(results?.data);
                    console.log("---------------------------");
                    ingresarFecha();
                    setDsnombre("");
                    setOpen(true);
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

                        <Button onClick={(e) => mensajeConfirmation()}>
                          Guardar
                        </Button>
                      </div>
                      <ProgressBar style={styles.progressBarBackgroundColor} />
                      {console.log("doc=>", archivoPrograma)}
                    </>
                  )}
                 
                </CSVReader>
                {errordoc.tarjetaslist && (
                <FormHelperText error={errordoc.tarjetaslist}>
                  {errordoc.tarjetaslist}
                </FormHelperText>
              )}
              </Grid>
            </Grid>

            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow key="898as">
                  <TableCell align="center"> Cuenta</TableCell>
                  <TableCell align="center"> Tarjeta</TableCell>
                  <TableCell align="center"> Nombre</TableCell>
                  <TableCell align="center"> Nombre completo</TableCell>
                  <TableCell align="center"> CURP</TableCell>
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
  );
};
