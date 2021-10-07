import React, { useContext, useEffect, useState } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
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
import DeleteIcon from '@material-ui/icons/Delete';
import BlockIcon from '@mui/icons-material/Block';
import RefreshIcon from '@material-ui/icons/Refresh';
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
import { RegionMunicipiosContext } from 'contexts/catalogos/RegionMunicipiosContext';
import { RegionMunicipioForm } from './RegionMunicipioForm';
import { RegionMunicipioFormEdit } from './RegionMunicipioFormEdit';

const useStyles = makeStyles(stylesArchivo);

export const RegionMunicipioScreen = () => {

  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searched, setSearched] = useState('');
  const [idEliminar, setIdEliminar] = useState(0);
  const [regionMunicipioSeleccionada, setRegionMunicipioSeleccionada] = useState();
  const { regionList, getRegionMunicipios, eliminarRegionMunicipios } = useContext(RegionMunicipiosContext);
  const { setShowModal } = useContext(ModalContext);
  const { setShowModalDelete } = useContext(ModalContextDelete);
  const { setShowModalUpdate } = useContext(ModalContextUpdate);

  useEffect(() => {
    getRegionMunicipios();
  }, []);


  const onSelect = (e) => {
    setShowModalUpdate(true);
    setRegionMunicipioSeleccionada(e);
  }

  const addDialog = () => {
    setShowModal(true);
  }

  const deleteDialog = (e) => {
    setShowModalDelete(true);
    setIdEliminar(e.id);
  }


  const handleDeshabilitar = () => {
    eliminarRegionMunicipios(idEliminar)
    setShowModalDelete(false);
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <GridItem xs={12} sm={12} md={12}>

      <Card>
        <CardHeader color="primary">
          <h4 className={classes.cardTitleWhite}>Región</h4>
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
                < TableCell> Clave</TableCell >
                < TableCell> Región</TableCell >
                < TableCell> Fecha Registro</TableCell >
                < TableCell colSpan={2} align="center"> Acciones</TableCell >
              </TableRow >
            </TableHead >
            < TableBody >
              {
                (searched ?
                  regionList.filter(row => row.dsRegion ?
                    row.dsRegion.toLowerCase().includes(searched.toLowerCase()) : null)
                  : regionList
                ).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
                  
                  return (
                    < TableRow key={row.id}>
                      <TableCell>
                        <Checkbox
                          checked={row.activo}
                          color="primary"
                          inputProps={{ 'aria-label': 'Checkbox A' }}
                        />
                      </TableCell>
                      <TableCell>{row.noclaveregion}</TableCell >
                      <TableCell>{row.dsRegion}</TableCell >
                      <TableCell >{moment(row.fcfecharegistro).format("MMMM DD YYYY, h:mm:ss a")}</TableCell>
                      <TableCell align="center">

                        <IconButton aria-label="create" onClick={() => onSelect(row)}>
                          <CreateIcon />
                        </IconButton>
                      </TableCell>
                      <TableCell align="center">
                        <IconButton aria-label="create" onClick={() => deleteDialog(row)}>
                          {(row.activo) ? <BlockIcon /> : <BlockIcon />}
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
            count={regionList.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </CardBody>
      </Card>
      <Modal>
        <RegionMunicipioForm />
      </Modal>
      <ModalDelete
        handleDeshabilitar={handleDeshabilitar}
      />
      <ModalUpdate>
        <RegionMunicipioFormEdit regionMunicipioSeleccionada={regionMunicipioSeleccionada} />
      </ModalUpdate>
    </GridItem>

  )
}
