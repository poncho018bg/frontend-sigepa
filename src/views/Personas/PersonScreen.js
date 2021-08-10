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
import { PersonContext } from 'contexts/personContext';
import { ModalContext } from 'contexts/modalContex';
import { Modal } from 'commons/Modal';
import { PersonaForm } from './PersonaForm';
import { ModalDelete } from 'commons/ModalDelete';
import { ModalContextDelete } from 'contexts/modalContexDelete';

const useStyles = makeStyles(stylesArchivo);

export const PersonScreen = () => {

  const classes = useStyles();
  //const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(1);
  const [searched, setSearched] = useState('');

  const { personList, getPersons } = useContext(PersonContext);
  
  const { showModal, modalTitle, setShowModal, setModalTitle } = useContext(ModalContext);


  const {  showModalDelete,setShowModalDelete } = useContext(ModalContextDelete);

    useEffect(() => {
        getPersons();
      // eslint-disable-next-line
      console.log(personList);
    }, []);

  const total=0;

  const idiomas=[];

  const size =0;

  const page=0;

  const handleChangePage = (event, newPage) => {

  };

  const handleChangeRowsPerPage = event => {
  };

  const onSelect = (e) => {
  }

  const addDialog = () => {
    setShowModal(true);
  }
  
  const deleteDialog = (e) => {
    setShowModalDelete(true);
  }
  

  const handleDeshabilitar = () => {
}


console.log(personList);

  return (
    <GridItem xs={12} sm={12} md={12}>
    <Card>
      <CardHeader color="primary">
        <h4 className={classes.cardTitleWhite}>Personas</h4>
        <p className={classes.cardCategoryWhite}>
          Pantalla que permite configurar lass personas  {total}
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
              < TableCell> Nombre</TableCell >
              < TableCell> Apellido Paterno</TableCell >
              < TableCell> Fecha Registro</TableCell >
              < TableCell colSpan={2} align="center"> Acciones</TableCell >
            </TableRow >
          </TableHead >
          < TableBody >
            {
              (searched ?
                personList.filter(row => row.firstName ?
                  row.dsidioma.toLowerCase().includes(searched.toLowerCase()) : null)
                : personList
              ).map(row => {
                console.log("page:"+page + " size:" + size)
                return (
                  < TableRow >
                    <TableCell>
                      <Checkbox
                        checked={row.activo}
                        color="primary"
                        inputProps={{ 'aria-label': 'Checkbox A' }}
                      />
                    </TableCell>
                    <TableCell>{row.id}</TableCell>
                    <TableCell>{row.firstName}</TableCell >
                    <TableCell>{row.lastName}</TableCell >
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
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </CardBody>
    </Card>
    <Modal>
      <PersonaForm/>
    </Modal>
    <ModalDelete/>
  </GridItem>

  )
}
