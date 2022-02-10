import React, { useContext, useEffect, useState } from "react";
// core components
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Grid,
} from "@material-ui/core";
import Button from "components/CustomButtons/Button.js";
import Add from "@material-ui/icons/Add";

import moment from "moment";
import "moment/locale/es";
import CreateIcon from "@material-ui/icons/Create";
import IconButton from "@material-ui/core/IconButton";
import BlockIcon from "@material-ui/icons/Block";
import SearchBar from "material-ui-search-bar";
import CardActions from "@material-ui/core/CardActions";

import { makeStyles } from "@material-ui/core/styles";
import { stylesArchivo } from "css/stylesArchivo";

//contexts
import { MotivoSuspensionContext } from "contexts/MotivoSuspensionContext";
import { ModalContext } from "contexts/modalContex";
import { Modal } from "commons/Modal";

import { ModalDelete } from "commons/ModalDelete";
import { ModalContextDelete } from "contexts/modalContexDelete";
import { ModalContextUpdate } from "contexts/modalContexUpdate";
import { ModalUpdate } from "commons/ModalUpdate";
import { Mensaje } from "components/Personalizados/Mensaje";
import { useTranslation } from "react-i18next";
import { MotivoSuspensionForm } from "./MotivoSuspensionForm";
import { MotivoSuspensionEdit } from "./MotivoSuspensionEdit";

const useStyles = makeStyles(stylesArchivo);

export const MotivoSuspensionScreen = () => {
  const { t } = useTranslation();
  const classes = useStyles();
  const [searched] = useState("");
  const [idEliminar, setIdEliminar] = useState(0);
  const [
    motivoSuspensionSeleccionado,
    setMotivoSuspensionSeleccionado,
  ] = useState();
  const {
    getMotivoSuspension,
    eliminarMotivoSuspension,
    motivoSuspensionList,
    size,
    page,
    total,
    changePageSizes,
    changePage,
    getMotivoSuspensionByParametros,
  } = useContext(MotivoSuspensionContext);
  const { setShowModal } = useContext(ModalContext);
  const { setShowModalDelete } = useContext(ModalContextDelete);

  const { setShowModalUpdate } = useContext(ModalContextUpdate);

  const [error] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [msjConfirmacion, setMsjConfirmacion] = useState("");
  const [setOpenDialog] = useState(false);

  useEffect(() => {
    getMotivoSuspension();
  }, []);

  useEffect(() => {
    getMotivoSuspension();
  }, [size, page]);

  const onSelect = (e) => {
    setShowModalUpdate(true);
    setMotivoSuspensionSeleccionado(e);
  };

  const addDialog = () => {
    setShowModal(true);
  };

  const deleteDialog = (e) => {
    setShowModalDelete(true);
    setIdEliminar(e);
  };

  const handleDeshabilitar = () => {
    eliminarMotivoSuspension(idEliminar);
    setShowModalDelete(false);
    setOpenDialog(false);
    setOpenSnackbar(true);
    setMsjConfirmacion(`${t("msg.registroguardadoexitosamente")}`);
  };

  const handleChangePage = (event, newPage) => {
    changePage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    changePageSizes(+event.target.value);
    changePage(0);
  };

  const buscaPorParametros = (search) => {
    if (search === "") {
      getMotivoSuspension();
    } else {
      getMotivoSuspensionByParametros(search);
    }
  };

  return (
    <GridItem xs={12} sm={12} md={12}>
      <Card>
        <CardHeader color="primary">
          <h4 className={classes.cardTitleWhite}>
            {t("pnl.causassuspension")}
          </h4>
          <p className={classes.cardCategoryWhite}></p>
          <CardActions>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <Button
                  color="white"
                  aria-label="edit"
                  justIcon
                  round
                  onClick={addDialog}
                >
                  <Add />
                </Button>
              </Grid>
              <Grid item xs={6}>
                <SearchBar
                  placeholder={t("lbl.buscar")}
                  value={searched}
                  onChange={(searchVal) => buscaPorParametros(searchVal)}
                  onCancelSearch={() => buscaPorParametros("")}
                />
              </Grid>
            </Grid>
          </CardActions>
        </CardHeader>
        <CardBody>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow key="ta1">
                <TableCell align="center"> {t("dgv.estatus")}</TableCell>
                <TableCell align="center">
                  {" "}
                  {t("dgv.descmotivosuspension")}
                </TableCell>
                <TableCell align="center"> {t("dgv.fechareg")}</TableCell>
                <TableCell colSpan={2} align="center">
                  {" "}
                  {t("dgv.acciones")}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(searched
                ? motivoSuspensionList.filter((row) =>
                    row.dsmotivosuspesion
                      ? row.dsmotivosuspesion
                          .toLowerCase()
                          .includes(searched.toLowerCase())
                      : null
                  )
                : motivoSuspensionList
              ).map((row) => {
                console.log("page:" + page + " size:" + size);
                return (
                  <TableRow key={row.id}>
                    <TableCell align="center">
                      {row.activo === true ? "Activo" : "Inactivo"}
                    </TableCell>
                    <TableCell align="center">{row.dsmotivosuspesion}</TableCell>
                    <TableCell align="center">
                      {moment(row.fechaRegistro).format(
                        "MMMM DD YYYY, h:mm:ss a"
                      )}
                    </TableCell>
                    <TableCell align="center">
                      <IconButton
                        aria-label="create"
                        onClick={() => onSelect(row)}
                      >
                        <CreateIcon />
                      </IconButton>
                    </TableCell>
                    <TableCell align="center">
                      <IconButton
                        aria-label="create"
                        onClick={() => deleteDialog(row)}
                      >
                        <BlockIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 15]}
            component="div"
            labelRowsPerPage={t("dgv.registrospaginas")}
            count={total}
            rowsPerPage={size}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
            labelDisplayedRows={({ from, to, count }) =>
              `${from}-${to} de un total ${count} registros`
            }
          />
        </CardBody>
      </Card>
      <Modal>
        <MotivoSuspensionForm />
      </Modal>
      <ModalDelete handleDeshabilitar={handleDeshabilitar} />
      <ModalUpdate>
        <MotivoSuspensionEdit
          motivoSuspensionSeleccionado={motivoSuspensionSeleccionado}
        />
      </ModalUpdate>

      <Mensaje
        setOpen={setOpenSnackbar}
        open={openSnackbar}
        severity={error ? "error" : "success"}
        message={msjConfirmacion}
      />
    </GridItem>
  );
};
