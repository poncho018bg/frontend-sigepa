import React, { useContext, useEffect, useState } from 'react';
// core components
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import { Table, TableBody, TableCell, TableHead, TablePagination, TableRow, Grid } from '@material-ui/core';
import Button from "components/CustomButtons/Button.js";
import Add from "@material-ui/icons/Add";

import moment from 'moment';
import 'moment/locale/es';
import CreateIcon from '@material-ui/icons/Create';
import IconButton from '@material-ui/core/IconButton';
import BlockIcon from '@material-ui/icons/Block';
import SearchBar from "material-ui-search-bar";
import CardActions from '@material-ui/core/CardActions';
import { makeStyles } from "@material-ui/core/styles";
import { stylesArchivo } from 'css/stylesArchivo';

import { ModalContext } from 'contexts/modalContex';
import { Modal } from 'commons/Modal';

import { ModalDelete } from 'commons/ModalDelete';
import { ModalContextDelete } from 'contexts/modalContexDelete';
import { ModalContextUpdate } from 'contexts/modalContexUpdate';

import { ModalUpdate } from 'commons/ModalUpdate';
import { EstadosContext } from 'contexts/catalogos/EstadosContext';
import { EstadosForm } from './EstadosForm';
import { EstadosFormEdit } from './EstadosFormEdit';
import { Mensaje } from 'components/Personalizados/Mensaje';
import { useTranslation } from 'react-i18next';
const useStyles = makeStyles(stylesArchivo);

export const EstadosScreen = () => {
  const { t } = useTranslation();
  const classes = useStyles();
  const [searched, setSearched] = useState('');
  const [idEliminar, setIdEliminar] = useState(0);
  const [estadoSeleccionada, setEstadoSeleccionada] = useState();
  const { estadosList, getEstados, eliminarEstados, size, page, total, changePageSize, changePage } = useContext(EstadosContext);
  const { setShowModal } = useContext(ModalContext);
  const { setShowModalDelete } = useContext(ModalContextDelete);
  const { setShowModalUpdate } = useContext(ModalContextUpdate);
  const [error] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [msjConfirmacion, setMsjConfirmacion] = useState('');
  const [ setOpenDialog] = useState(false);


  useEffect(() => {
    getEstados();

  }, []);



  const onSelect = (e) => {
    setShowModalUpdate(true);
    setEstadoSeleccionada(e);
  }

  const addDialog = () => {
    setShowModal(true);
  }

  const deleteDialog = (e) => {
    setShowModalDelete(true);
    setIdEliminar(e);
  }


  const handleDeshabilitar = () => {
    eliminarEstados(idEliminar)
    setShowModalDelete(false);
    setOpenDialog(false);
    setOpenSnackbar(true);
    setMsjConfirmacion(`${t('msg.registroguardadoexitosamente')}`);
  }

  const handleChangePage = (event, newPage) => {
    changePage(newPage)
  };

  const handleChangeRowsPerPage = event => {
    changePageSize(+event.target.value);
    changePage(0)
  };

  return (
    <GridItem xs={12} sm={12} md={12}>

      <Card>
        <CardHeader color="primary">
          <h4 className={classes.cardTitleWhite}>Estados</h4>
          <p className={classes.cardCategoryWhite}>
          </p>
          <CardActions>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <Button
                  color="white"
                  aria-label="edit"
                  justIcon round
                  onClick={addDialog}
                >
                  <Add />
                </Button>
              </Grid>
              <Grid item xs={6}>
                <SearchBar
                  placeholder={t('lbl.buscar')}
                  value={searched}
                  onChange={(searchVal) => setSearched(searchVal)}
                  onCancelSearch={() => setSearched('')}
                />
              </Grid>
            </Grid>
          </CardActions>
        </CardHeader>
        <CardBody>
          < Table stickyHeader aria-label="sticky table" >
            < TableHead >
              < TableRow key="898as" >
                < TableCell align="center"> Estatus</TableCell >
                < TableCell align="center"> Numero estado</TableCell >
                < TableCell align="center"> Descripcion estado </TableCell >
                < TableCell align="center"> Abreviatura </TableCell >
                < TableCell align="center"> Fecha registro</TableCell >
                < TableCell colSpan={2} align="center"> Acciones</TableCell >
              </TableRow >
            </TableHead >
            < TableBody >
              {
                (searched ?
                  estadosList.filter(row => row.dsestado ?
                    row.dsestado.toLowerCase().includes(searched.toLowerCase()) : null)
                  : estadosList
                ).map(row => {
                  console.log("page:" + page + " size:" + size)
                  return (
                    < TableRow key={row.id}>
                      <TableCell align="center">
                        {row.activo ? 'Activo' : 'Inactivo'}
                      </TableCell>
                      <TableCell align="center">{row.noestado}</TableCell >
                      <TableCell align="center">{row.dsestado}</TableCell >
                      <TableCell align="center">{row.dsabreviatura}</TableCell >
                      <TableCell align="center">{moment(row.fechaRegistro).format("MMMM DD YYYY, h:mm:ss a")}</TableCell>
                      <TableCell align="center">

                        <IconButton aria-label="create" onClick={() => onSelect(row)}>
                          <CreateIcon />
                        </IconButton>
                      </TableCell>
                      <TableCell align="center">
                        <IconButton aria-label="create" onClick={() => deleteDialog(row)}>
                        <BlockIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow >
                  );
                })
              }
            </TableBody >
          </ Table>
          < TablePagination
            rowsPerPageOptions={[5, 10, 15]}
            component="div"
            labelRowsPerPage={t('dgv.registrospaginas')}
            count={total}
            rowsPerPage={size}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </CardBody>
      </Card>
      <Modal>
        <EstadosForm />
      </Modal>
      <ModalDelete
        handleDeshabilitar={handleDeshabilitar}
      />
      <ModalUpdate>
        <EstadosFormEdit estadoSeleccionada={estadoSeleccionada} />
      </ModalUpdate>

      <Mensaje
        setOpen={setOpenSnackbar}
        open={openSnackbar}
        severity={error ? "error" : "success"}
        message={msjConfirmacion}
      />
    </GridItem>

  )
}
