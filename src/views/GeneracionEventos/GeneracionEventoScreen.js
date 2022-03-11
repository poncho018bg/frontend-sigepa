import React, { useContext, useState, useEffect } from "react";
import "./styles.css";
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
  FormHelperText,
} from "@material-ui/core";
import Button from "components/CustomButtons/Button.js";
import { useTranslation } from "react-i18next";
//useStyles
import { makeStyles } from "@material-ui/core/styles";
import { stylesArchivo } from "css/stylesArchivo";
import { PuntosEntregaContext } from "../../contexts/catalogos/PuntosEntregaContext";
import { RegionMunicipiosContext } from "../../contexts/catalogos/RegionMunicipiosContext";
import { MultiSelect } from "react-multi-select-component";
import { ModalConfirmacion } from "commons/ModalConfirmacion";
import { Mensaje } from "components/Personalizados/Mensaje";
import { ModalContextConfirmacion } from "contexts/modalContextConfirmacion";
import { LoteEntregaTarjetaContext } from "contexts/LoteEntregaTarjetaContext";
import { LocalidadesContext } from "contexts/catalogos/Localidades/localidadesContext";
import { MunicipiosContext } from "contexts/catalogos/MunicipiosContext";
import { RegionesContext } from "contexts/catalogos/RegionesContext";
const useStyles = makeStyles(stylesArchivo);

export const GeneracionEventoScreen = () => {
  const { t } = useTranslation();
  const classes = useStyles();
  const {
    puntosEntregaList,
    getPuntosEntrega,
    getTarjetasParaLotes,
    terjetasEntregaList,
    registrarLotesEntrega,
  } = useContext(PuntosEntregaContext);
  const { municipiosregList, getMunicipioPorRegion } = useContext(
    MunicipiosContext
  );
  const { regionesList, getRegionesAll } = useContext(RegionesContext);
  
  const [dsEvento, setDsEvento] = useState("");
  const [puntoentrega, setPuntoentrega] = useState("");
  const [municipiosSelect, setMunicipiosSelect] = useState([]);
  const [lotesTarjSelect, setLotesTarjSelect] = useState([]);
  const [selected, setSelected] = useState([]);
  const [selectedlotesTarj, setSelectedlotesTarj] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { setShowModalConfirmacion } = useContext(ModalContextConfirmacion);
  const [error, setError] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [msjConfirmacion, setMsjConfirmacion] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    getPuntosEntrega();
    getRegionesAll();
  }, []);



  useEffect(() => {
    const lstmun = [];
    console.log('regionesList1=>>',municipiosregList)
    municipiosregList?.map((mn) => {
      lstmun.push({ label: mn.dsmunicipio, value: mn.id });
    });
    setMunicipiosSelect(lstmun);
  }, [municipiosregList]);


  useEffect(() => {
    const lstmun = [];
    console.log('LOTES=>>',regionesList)
    regionesList.map((mn) => {
      lstmun.push({ label: mn.dsregion, value: mn.id });
    });
    setLotesTarjSelect(lstmun);
  }, [regionesList]);


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleRegistrar = () => {
     
    terjetasEntregaList.map(e=>{
      e.evento=dsEvento;
      e.idPunto = puntoentrega;
    })
    registrarLotesEntrega(terjetasEntregaList)
      .then((response) => {
        setOpenSnackbar(true);

        setMsjConfirmacion(`${t("msg.registroguardadoexitosamente")}`);

        const timer = setTimeout(() => {
          setError(false);
          setShowModalConfirmacion(false);
          setShowModalUpdate(false);
        }, 1500);
        return () => clearTimeout(timer);
      })
      .catch((err) => {
        setOpenSnackbar(true);
        setError(true);
        setMsjConfirmacion(`${t("msg.ocurrioerrorcalidarinfo")}`);

        setShowModalConfirmacion(false);
        setShowModalUpdate(false);
      });
  };

  const isObjEmpty = (obj) => {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
  };
  
  const confirmacionDialog = (e) => {   
    const errors = {};
    if (dsEvento === "") {
      errors.dsEvento = `${t('msg.debeselecionarunembozo')}`;
    }
    if (puntoentrega === "") {
      errors.puntoentrega = `${t('msg.debeselecionarunafecha')}`;
    }
    if (!isObjEmpty(errors)) {
      setErrors(errors);
      return;
    }

    setShowModalConfirmacion(true);   
}

const buscarPorMunicipio = () => {
  const lstmunicipios = [];
  const lstregiones = [];
  selectedlotesTarj?.map((reg) => {
    lstregiones.push(reg.value);
  });

  selected?.map((mun) => {
    lstmunicipios.push(mun.value);
  });

  let parametrosbusqueda = {
    regionesList: lstregiones,
    municipiosList: lstmunicipios,
  };

  getTarjetasParaLotes(parametrosbusqueda);
};

const buscarporregion=(e)=>{
  setSelectedlotesTarj(e)
  const lstmun = [];
  e?.map((mn) => {
    lstmun.push(mn.value);
  });
  getMunicipioPorRegion(lstmun)
 
}



  return (
    <GridItem xs={12} sm={12} md={12}>
      <Card>
        <CardHeader color="primary">
          <h4 className={classes.cardTitleWhite}>
            {t("pnl.creaciondlotesporpuntoentrega")}
          </h4>
          <p className={classes.cardCategoryWhite}></p>
        </CardHeader>
        <CardBody>
          <Grid container spacing={3}>
            
            <Grid item xs={3}>
              <MultiSelect
                style={{ marginBottom: "120px" }}
                options={lotesTarjSelect}
                value={selectedlotesTarj}
                onChange={(e)=>buscarporregion(e)}
                labelledBy={t("cmb.seleccionar")}
              />
            </Grid>
            <Grid item xs={3}>
              <MultiSelect
                style={{ marginBottom: "120px" }}
                options={municipiosSelect}
                value={selected}
                onChange={setSelected}
                labelledBy={t("cmb.seleccionar")}
              />
            </Grid>
            <Grid item xs={3}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={() => buscarPorMunicipio()}
              >
                Buscar
              </Button>
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={3}>
              <TextField
                id="dsEvento"
                label="Número de Evento-Lote"
                variant="outlined"
                fullWidth
                name={dsEvento}              
                value={dsEvento}
                onChange={(e) => setDsEvento(e.target.value)}
              />
              {errors.dsEvento && (
                <FormHelperText error={errors.dsEvento}>
                  {errors.dsEvento}
                </FormHelperText>
              )}
            </Grid>
            <Grid item xs={3}>
              <TextField
                variant="outlined"
                label={t("lbl.puntoentrega")}
                select
                fullWidth
                name="puntoentrega"
                value={puntoentrega}
                onChange={(e) => setPuntoentrega(e.target.value)}
              >
                <MenuItem value="0">
                  <em>{t("cmb.ninguno")}</em>
                </MenuItem>
                {puntosEntregaList.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.dspuntoentrega}
                  </MenuItem>
                ))}
              </TextField>
              {errors.puntoentrega && (
                <FormHelperText error={errors.puntoentrega}>
                  {errors.puntoentrega}
                </FormHelperText>
              )}
            </Grid>
            <Grid item xs={3}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={() => confirmacionDialog()}
              >
                {t("btn.generarlayouttarjetas")}
              </Button>
            </Grid>
          </Grid>
        </CardBody>
        <CardBody>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow key="898as">
                <TableCell align="center">{t("dgv.consecutivo")} </TableCell>
                <TableCell align="center">{t("dgv.nombrecompleto")} </TableCell>
                <TableCell align="center">
                  {t("dgv.fechadenacimiento")}{" "}
                </TableCell>
                <TableCell align="center">{t("dgv.curp")} </TableCell>
                <TableCell align="center">{t("dgv.municipio")} </TableCell>
                <TableCell align="center">{t("dgv.folio")} </TableCell>
                <TableCell align="center">{t("dgv.etiquetas")} </TableCell>
                <TableCell align="center">{t("dgv.tarjeta")} </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              
              {terjetasEntregaList
                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow key={row?.idTarjeta}>
                     
                      <TableCell align="center">{row?.consecutivo}</TableCell>
                      <TableCell align="center">
                        {row?.nombrecompleto}
                      </TableCell>
                      <TableCell align="center">
                        {row?.fechanacimiento}
                      </TableCell>
                      <TableCell align="center">{row?.curp}</TableCell>
                      <TableCell align="center">{row?.municipio}</TableCell>
                      <TableCell align="center">{row?.folio}</TableCell>
                      <TableCell align="center">{row?.etiqueta}</TableCell>
                      <TableCell align="center">{row?.tarjeta}</TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[25, 50, 75, 100]}
            component="div"
            labelRowsPerPage={t("dgv.registrospaginas")}
            count={terjetasEntregaList.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
            labelDisplayedRows={({ from, to, count }) =>
              `${from}-${to} de un total ${count} registros`
            }
          />
        </CardBody>
        <ModalConfirmacion handleRegistrar={handleRegistrar} evento="Editar" />
        <Mensaje
          setOpen={setOpenSnackbar}
          open={openSnackbar}
          severity={error ? "error" : "success"}
          message={msjConfirmacion}
        />
      </Card>
    </GridItem>
  );
};
