import React, { useContext, useEffect, useState } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
// core components
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import { Table, TableBody, TableCell, TableHead, TablePagination, TableRow } from '@material-ui/core';
import Button from "components/CustomButtons/Button.js";
import Add from "@material-ui/icons/Add";

import moment from 'moment';
import 'moment/locale/es';
import CreateIcon from '@material-ui/icons/Create';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import RefreshIcon from '@material-ui/icons/Refresh';
import SearchBar from "material-ui-search-bar";
import CardActions from '@material-ui/core/CardActions';
import { Grid } from '@material-ui/core';
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

const useStyles = makeStyles(stylesArchivo);

export const EstadosScreen = () => {

  const classes = useStyles();
  const [searched, setSearched] = useState('');
  const [idEliminar, setIdEliminar] = useState(0);
  const [estadoSeleccionada, setEstadoSeleccionada] = useState();
  const { estadosList, getEstados, eliminarEstados } = useContext(EstadosContext);  
  const { setShowModal } = useContext(ModalContext);
  const { setShowModalDelete } = useContext(ModalContextDelete);
  const { setShowModalUpdate } = useContext(ModalContextUpdate);


    useEffect(() => {
        getEstados();
      
    }, []);


  const total=0
  const size =0;
  const page=0;

  const onSelect = (e) => {
    setShowModalUpdate(true);
    setEstadoSeleccionada(e);
  }

  const addDialog = () => {
    setShowModal(true);
  }
  
  const deleteDialog = (e) => {
    setShowModalDelete(true);
    setIdEliminar(e.id);
  }
  

  const handleDeshabilitar = () => {
    eliminarEstados(idEliminar)
    setShowModalDelete(false);
  }



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
                placeholder="Buscar"
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
              < TableCell > Estado</TableCell >
              < TableCell > ID</TableCell >
              < TableCell> Num. estado</TableCell >
              < TableCell> Desc. Estado </TableCell >
              < TableCell> Fecha Registro</TableCell >
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
                console.log("page:"+page + " size:" + size)
                return (
                  < TableRow key={row.id}>
                    <TableCell>
                      <Checkbox
                        checked={row.activo}
                        color="primary"
                        inputProps={{ 'aria-label': 'Checkbox A' }}
                      />
                    </TableCell>
                    <TableCell>{row.id}</TableCell>
                    <TableCell>{row.noestado}</TableCell >
                    <TableCell>{row.dsestado}</TableCell >
                    <TableCell >{moment(row.fechaRegistro).format("MMMM DD YYYY, h:mm:ss a")}</TableCell>
                    <TableCell align="center">

                      <IconButton aria-label="create" onClick={() => onSelect(row)}>
                        <CreateIcon />
                      </IconButton>
                    </TableCell>
                    <TableCell align="center">
                      <IconButton aria-label="create" onClick={() => deleteDialog(row)}>
                        {(row.activo) ? <DeleteIcon /> : <RefreshIcon />}
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
          labelRowsPerPage="Registros por página"
          count={total}
          rowsPerPage={size}
          page={page}
        />
      </CardBody>
    </Card>
    <Modal>
      <EstadosForm/>
    </Modal>
    <ModalDelete
       handleDeshabilitar={handleDeshabilitar}
    />
    <ModalUpdate>
      <EstadosFormEdit estadoSeleccionada={estadoSeleccionada}/>
    </ModalUpdate>
  </GridItem>

  )
}
