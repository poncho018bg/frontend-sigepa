import React, { useState, useEffect, useContext, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  DialogContent,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TablePagination,
  TableRow,
} from "@material-ui/core";
import { DialogAgregarArchivos } from "./DialogAgregarArchivos";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";
import Drawer from "@material-ui/core/Drawer";
import { pdfjs } from "react-pdf";
import ArrowBackIos from "@material-ui/icons/ArrowBackIos";
import GridItem from "components/Grid/GridItem";
import moment from "moment";
import "moment/locale/es";
import GetAppIcon from "@material-ui/icons/GetApp";
import DeleteIcon from "@material-ui/icons/Delete";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack";
import { ExpedienteContext } from "contexts/expedienteContext";
import GridContainer from "components/Grid/GridContainer";
import { useTranslation } from "react-i18next";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
import ReactToPrint from "react-to-print";
moment.locale("es");

//imports de los datos generales del expediente
import { DatosGeneralesExpediente } from "./DatosGeneralesExpediente";
import { DireccionExpediente } from "./DireccionExpediente";
import { ContactoExpediente } from "./ContactoExpediente";
import { ApoyosRecibidosExpediente } from "./ApoyosRecibidosExpediente";
import { ObservacionesExpediente } from "./ObservacionesExpediente";
import { FormularioExpediente } from "./FormularioExpediente";
import { Mensaje } from "components/Personalizados/Mensaje";
import { ModalContextConfirmacion } from "contexts/modalContextConfirmacion";
import { ModalContext } from "contexts/modalContex";
import { ComponentToPrint } from "views/TestPrintPdf/ComponentToPrint";
import { SuspensionExpediente } from "./SuspensionExpediente";
import { ComplementoFursContext } from "contexts/complementoFurContext";
import { ProgramasContext } from "contexts/catalogos/Programas/programasContext";
//Ruta para mandar a llamar de forma dinamica el formulario a agregar
const baseUrlFormio = process.env.REACT_APP_API_FORMIO_URL;
/**
 * Aqui se va a mostrar el detalle del expediente del beneficiario
 * @param {props} props
 * @returns
 */

export const DetalleExpDig = (props) => {
  const { t } = useTranslation();
  /**
   * props beneficiario
   */
  const {
    idBeneficiario,
    beneficiarioPadre,
    setIdentPrograma,
    idProgramaExpediente,
    direccionBeneficiario,
    idExpedienteBoveda,
  } = props;

  const location = useLocation();
  const dispatch = useDispatch();
  const [showCambio, setShowCambio] = useState(false);
  const [infoGral, setInfoGral] = useState(false);
  const [validarCargaDocs, setValidarCargaDocs] = useState(false);

  const {
    expDigDocumentosStartLoading,
    documentosExpedienteLst,
    expDigDocStartLoading,
    contenidoDocumento,
    deshabilitarDocumentoExpediente,
    deshabilitarDocumento,
    generarExpedientepdf,
    bitacoraActiv,
  } = useContext(ExpedienteContext);
  const [open, setOpen] = React.useState(false);
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState("sm");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(1);
  const [showDialogForm, setShowDialogForm] = useState(false);
  const idExpediente = idExpedienteBoveda;
  const componentRef = useRef();
  const { setShowModal } = useContext(ModalContext);
  const { setShowModalConfirmacion } = useContext(ModalContextConfirmacion);
  const [error, setError] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [msjConfirmacion, setMsjConfirmacion] = useState("");
  const [dtosgrlsprint, setDtosgrlsprint] = useState({});
  const [documentbs64, setDocumentbs64] = useState("");
  const [suspendido, setSuspendido] = useState(false);
  const [bajado, setBajado] = useState(false);
  const {  getComplementoFurs, complementoList } = useContext(ComplementoFursContext);
  const { programa, getByID } = useContext(ProgramasContext);
  let ruta = '';
  let jsonParseado = {};
  let idBusqueda = '';

  const handleChangePage = (event, newPage) => {
    expDigDocStartLoading(documentos[newPage].id);
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    getByID(idProgramaExpediente);
    getComplementoFurs(idProgramaExpediente, idBeneficiario)
   
}, [idProgramaExpediente,idBeneficiario]);

if (Array.isArray(complementoList)) {
  if (complementoList.length > 0) {
      jsonParseado = JSON.parse(complementoList[0]?.jsComplemento);
      console.log("idBusquedaasdfasdf ----------- ", jsonParseado._id)
      idBusqueda = jsonParseado._id
  }

} else {
  jsonParseado = JSON.parse(complementoList?.jsComplemento);
  console.log("complementoList ----------- ", jsonParseado._id)
  idBusqueda = jsonParseado._id
}

if (programa !== null) {
  console.log("idBusqueda ----------- ", idBusqueda)
  if (Array.isArray(complementoList)) {
      if (complementoList.length === 0) {
          ruta = `${baseUrlFormio}${programa.dsnombreplantilla}`;
      } else {
          ruta = `${baseUrlFormio}${programa.dsnombreplantilla}/submission/${jsonParseado._id}`;
      }
  }
  console.log("ruta", ruta);
}
var valoresprint = dtosgrlsprint
valoresprint.ruta=ruta    



  useEffect(() => {
    if (validarCargaDocs) {
      expDigDocumentosStartLoading(
        props.etapaSeleccionada?.idEtapa,
        idExpediente
      )
        .then((response) => {
          setOpenSnackbar(true);

          setMsjConfirmacion(`${t("msg.registroguardadoexitosamente")}`);

          const timer = setTimeout(() => {
            setValidarCargaDocs(false);
            setError(false);
            setShowModalConfirmacion(false);
            setShowModal(false);

            console.log("4 Actualizar docs", documentos[page]?.id);
            expDigDocStartLoading(documentos[page]?.id);
          }, 1500);
          return () => clearTimeout(timer);
        })
        .catch((err) => {
          console.log("err", err);
          setOpenSnackbar(true);
          setError(true);
          setMsjConfirmacion(`${t("msg.ocurrioerrorcalidarinfo")}`);
        });
    }
  }, [validarCargaDocs]);

  useEffect(() => {
    console.log("CAMBIO DE ETAPA", props.etapaSeleccionada);
    if (
      props.etapaSeleccionada !== "00000000-0000-0000-0000-000000000000" &&
      props.etapaSeleccionada !== "00000000-0000-0000-0000-000000000001"
    ) {
      expDigDocumentosStartLoading(
        props.etapaSeleccionada?.idEtapa,
        idExpediente
      );
      console.log("CAMBIO DE ETAPA EXIT", props.etapaSeleccionada);
    }
    setShowCambio(true);
  }, [props.etapaSeleccionada]);

  const documentos = documentosExpedienteLst;

  useEffect(() => {
    if (
      documentos !== null &&
      documentos !== undefined &&
      documentos.length === 1
    ) {
      handleChangePage(null, 0);
    }
  }, [documentos]);

  useEffect(() => {
    if (
      documentosExpedienteLst !== null &&
      documentosExpedienteLst !== undefined &&
      documentosExpedienteLst.length > 0
    ) {
      expDigDocStartLoading(documentosExpedienteLst[0]?.id);
    }
  }, [documentosExpedienteLst]);

  useEffect(() => {
    const ad = idDocumentoBorrar === "";
    console.log("idDocumentoBorrar=>", ad);

    if (!ad) {
      console.log("entrando a bitacora");
      let bitcacora = {
        bitacoraaccion_id: "/cf648ed8-43aa-4230-9d5f-a65b8820b6d1",
        usuario_id: sessionStorage.getItem("idUSuario"),
        dsdescripcion: JSON.stringify(idDocumentoBorrar),
      };
      bitacoraActiv(bitcacora);
    }
  }, [documentos, idDocumentoBorrar]);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setInfoGral(open);
  };
  const downloadPDF = (bytes, nombredoc, folio) => {
    console.log("dta=>", bytes);
    const downloadLink = document.createElement("a");
    const fileName = `${nombredoc}_${folio}.pdf`;
    downloadLink.href = bytes;
    downloadLink.download = fileName;
    downloadLink.click();
  };

  const [showModalDelete, setShowModalDelete] = useState(false);
  const [idDocumentoBorrar, setIdDocumentoBorrar] = useState("");
  const deleteDialog = (e) => {
    console.log("se selecciona este archivo ==>", e);
    setShowModalDelete(true);
    setIdDocumentoBorrar(e.id);
  };

  const handleClose = () => {
    setShowModalDelete(false);
    setOpen(false);
  };

  const handleAceptar = () => {
    console.log("aceptar");
    deshabilitarDocumentos();
  };

  const deshabilitarDocumentos = () => {
    console.log("idDocumentoexp=>", idDocumentoBorrar);
    deshabilitarDocumentoExpediente(idDocumentoBorrar)
      .then((response) => {
        const timer = setTimeout(() => {
          expDigDocumentosStartLoading(
            props.etapaSeleccionada?.idEtapa,
            idExpediente
          );
        }, 1000);

        return () => clearTimeout(timer);
      })
      .catch((err) => {
        console.log(err);
      });

    setShowModalDelete(false);
  };

  const addDialog = () => {
    console.log("abriendo");
    setShowDialogForm(true);
  };

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const archivo = contenidoDocumento; // useSelector(state => state.expDig.archivo);
  const fileContent =
    "data:application/pdf;base64, " +
    (archivo === null ? " " : archivo?.base64);

  const imprimirpdf = () => {
    console.log("Dtosgrlsprint=>", dtosgrlsprint);

    console.log("Dtosgrlsprint=>", dtosgrlsprint);
    let data = {
      preguntasjson: {},
      respuestasjson: {},
      datosGeneralesExpedienteDTO: dtosgrlsprint,
      ruta: dtosgrlsprint.ruta,
    };
    generarExpedientepdf(data)
      .then((response) => {
        console.log("generarExpedientepdf=>", response);

        const timer = setTimeout(() => {
          const downloadLink = document.createElement("a");
          const fileName = `Expediente.pdf`;
          downloadLink.href = `data:application/pdf;base64,${response?.data}`;
          downloadLink.download = fileName;
          downloadLink.click();
          console.log("downloadLink=>", downloadLink);
        }, 1000);
        return () => clearTimeout(timer);
      })
      .catch((err) => {
        console.log(err);
      });
  };



  if (
    props.etapaSeleccionada === "00000000-0000-0000-0000-000000000000" ||
    props.etapaSeleccionada === null ||
    props.etapaSeleccionada === undefined
  ) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        borderColor="black"
        border={1}
        flex="auto"
      >
 
         
        {console.log("xp", idExpedienteBoveda)}
        {console.log("xp", idExpediente)}
        <Grid item xs={12} border={10} borderColor="primary.main">
          <h3>Datos generales</h3>
          <Grid item xs={12} style={{ textAlign: "end" }}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={() => imprimirpdf()}
            >
              Imprimir
            </Button>
          </Grid>

          <DatosGeneralesExpediente
            beneficiarioPadre={beneficiarioPadre}
            setIdentPrograma={setIdentPrograma}
            setDtosgrlsprint={setDtosgrlsprint}
            dtosgrlsprint={dtosgrlsprint}
            //setIdProgramaExpediente={setIdProgramaExpediente}
          />
          <DireccionExpediente
            direccionBeneficiario={direccionBeneficiario}
            idBeneficiario={idBeneficiario}
            setDtosgrlsprint={setDtosgrlsprint}
            dtosgrlsprint={dtosgrlsprint}
          />
          <ContactoExpediente
            direccionB={direccionBeneficiario}
            idBeneficiario={idBeneficiario}
            setDtosgrlsprint={setDtosgrlsprint}
            dtosgrlsprint={dtosgrlsprint}
          />
          <ApoyosRecibidosExpediente
            idBeneficiario={idBeneficiario}
            setDtosgrlsprint={setDtosgrlsprint}
            dtosgrlsprint={dtosgrlsprint}
          />
          <SuspensionExpediente
            idBeneficiario={idBeneficiario}
            idProgramaExpediente={idProgramaExpediente}
            setDtosgrlsprint={setDtosgrlsprint}
            dtosgrlsprint={dtosgrlsprint}
            setSuspendido={setSuspendido}
            bajado={bajado}
          />

          <ObservacionesExpediente
            idBeneficiario={idBeneficiario}
            idProgramaExpediente={idProgramaExpediente}
            setDtosgrlsprint={setDtosgrlsprint}
            dtosgrlsprint={dtosgrlsprint}
            setBajado={setBajado}
            suspendido={suspendido}
          />
        </Grid>

        <Dialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
          maxWidth="xs"
          fullWidth={true}
        >
          <DialogContent>
            {console.log("documentbs64=>", documentbs64.data)}
            <ComponentToPrint
              ref={componentRef}
              documenb64={documentbs64.data}
              testpdf={"hola munsooo"}
            />
          </DialogContent>
          <DialogActions>
            <ReactToPrint
              trigger={() => (
                <Button autoFocus color="primary">
                  Imprimir
                </Button>
              )}
              content={() => componentRef.current}
            />
          </DialogActions>
        </Dialog>
      </Box>
    );
  }

  if (props.etapaSeleccionada === "00000000-0000-0000-0000-000000000001") {
    return (
      <Box
        display="flex"
        justifyContent="center"
        borderColor="black"
        border={1}
        flex="auto"
      >
        <Grid item xs={11} border={10} borderColor="primary.main">
          <h3>Informaci??n de la beneficiaria</h3>
          <FormularioExpediente
            idBeneficiario={idBeneficiario}
            idProgramaExpediente={idProgramaExpediente}
            setDtosgrlsprint={setDtosgrlsprint}
            dtosgrlsprint={dtosgrlsprint}
          />
        </Grid>
      </Box>
    );
  }

  return (
    <Box
      display="flex"
      justifyContent="center"
      borderColor="black"
      border={1}
      flex="auto"
    >
      <Grid item xs={11} border={10} borderColor="primary.main">
        <h3>{props.etapaSeleccionada.dsetapa}</h3>
        <hr />
        <Button
          width={30}
          variant="contained"
          color="primary"
          onClick={addDialog}
          size="large"
        >
          Registrar expediente
        </Button>

        <TablePagination
          rowsPerPageOptions={[1]}
          component="div"
          labelRowsPerPage="Registros por p??gina"
          count={documentos.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
        <Table stickyHeader aria-label="sticky table">
          <TableBody>
            {documentos
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <>
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={1}>
                        <IconButton
                          aria-label="delete"
                          onClick={() =>
                            downloadPDF(
                              fileContent,
                              row.dsnombredocumento,
                              moment(new Date()).format("yyyy_MM_DD_HH_mm_ss")
                            )
                          }
                        >
                          <GetAppIcon fontSize="large" />
                        </IconButton>
                      </GridItem>
                      <GridItem xs={12} sm={12} md={1}>
                        <IconButton
                          aria-label="delete"
                          onClick={() => deleteDialog(row)}
                        >
                          <DeleteIcon fontSize="large" />
                        </IconButton>
                      </GridItem>
                      <GridItem xs={12} sm={12} md={3}>
                        <h5> {row.dsnombredocumento}</h5>
                      </GridItem>
                    </GridContainer>

                    <TableRow key={row.id}>
                      <TableCell>
                        <div style={{ width: "100%" }}>
                          <Button
                            style={{
                              right: "0",
                              position: "fixed",
                              top: "50%",
                              zIndex: "1000",
                            }}
                            color="primary"
                            variant="contained"
                            onClick={toggleDrawer(true)}
                            size="large"
                            aria-label="Ver Metadatos"
                            component="span"
                          >
                            <ArrowBackIos />
                          </Button>
                          {archivo !== null && (
                            <Document
                              file={fileContent}
                              onLoadSuccess={onDocumentLoadSuccess}
                            >
                              <Page pageNumber={pageNumber} />
                            </Document>
                          )}
                          {/* <p>Page {pageNumber} of {numPages}</p> */}
                        </div>
                        <Drawer
                          anchor={"right"}
                          open={infoGral}
                          onClose={toggleDrawer(false)}
                        >
                          <Container maxWidth="lg">
                            <h3>Informaci??n General</h3>

                            <GridItem xs={12} sm={12} md={12}>
                              <strong>Fecha de creaci??n</strong>
                              <br />
                              {moment(row.fcfecharegistro).format(
                                "DD/MMM/YYYY"
                              )}
                            </GridItem>
                            <GridItem xs={12} sm={12} md={12}>
                              <strong>Fecha de documento</strong>
                              <br />
                              {moment(row.fcfechadocumento).format(
                                "DD/MMM/YYYY"
                              )}
                            </GridItem>
                            <GridItem xs={12} sm={12} md={12}>
                              <strong>Nombre documento</strong>
                              <br />
                              {row.dsnombredocumento}
                            </GridItem>
                            <GridItem xs={12} sm={12} md={12}>
                              <strong>Subclasificaci??n</strong>
                              <br />
                              {row.etapa}
                            </GridItem>
                          </Container>
                        </Drawer>
                      </TableCell>
                    </TableRow>
                  </>
                );
              })}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[1]}
          component="div"
          labelRowsPerPage="Registros por p??gina"
          count={documentos.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
        <DialogAgregarArchivos
          showDialogForm={showDialogForm}
          setShowDialogForm={setShowDialogForm}
          etapaSeleccionada={props.etapaSeleccionada}
          idExpediente={idExpediente}
          idBeneficiario={idBeneficiario}
          idProgramaExpediente={idProgramaExpediente}
          setValidarCargaDocs={setValidarCargaDocs}
        />

        <Mensaje
          setOpen={setOpenSnackbar}
          open={openSnackbar}
          severity={error ? "error" : "success"}
          message={msjConfirmacion}
        />

        <Dialog
          open={showModalDelete}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Confirmaci??n"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              ??Esta seguro que desea borrar el archivo?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancelar
            </Button>
            <Button onClick={handleAceptar} color="primary" autoFocus>
              Aceptar
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
    </Box>
  );
};
