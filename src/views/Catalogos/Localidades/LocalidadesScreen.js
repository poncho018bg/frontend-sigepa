import React, { useContext, useEffect, useState } from 'react'
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardActions from '@material-ui/core/CardActions';

import { Grid,makeStyles, Table, TableBody, TableCell, TableHead, TablePagination, TableRow } from '@material-ui/core';
import { stylesArchivo } from 'css/stylesArchivo';
import SearchBar from 'material-ui-search-bar';
import { LocalidadesContext } from 'contexts/catalogos/Localidades/localidadesContext';
import { Localidad } from './Localidad';

import Button from "components/CustomButtons/Button.js";
import Add from "@material-ui/icons/Add";
import { ModalContext } from 'contexts/modalContex';
import { LocalidadForm } from './LocalidadForm';
import { Modal } from 'commons/Modal';
import { MunicipiosContext } from 'contexts/catalogos/MunicipiosContext';
const useStyles = makeStyles(stylesArchivo);

export const LocalidadesScreen = () => {
    const classes = useStyles();
    const [searched, setSearched] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const { get,localidadesList } = useContext(LocalidadesContext);
    const {  setShowModal  } = useContext(ModalContext);

    const { municipiosList, getMunicipios } = useContext(MunicipiosContext);
  
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
  
    const handleChangeRowsPerPage = event => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const addDialog = () => {
      console.log('asasasassssssssssssssss');
      setShowModal(true);
    }
 
    useEffect(() => {
          get();
      }, []);

    useEffect(() => {
        getMunicipios();

    }, []);

    return (
        <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Localidades</h4>
            
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
                    < TableCell > Activo</TableCell >
                    < TableCell > Clave</TableCell >
                    < TableCell > Localidad  </TableCell >
                    < TableCell> CP</TableCell >
                    < TableCell> Registro</TableCell >
                    < TableCell colSpan={2} align="center"> Acciones</TableCell >
                  </TableRow >
                </TableHead >
                < TableBody >
                  {
                       (searched ?
                        localidadesList.filter(row => row.dsPagina ?
                          row.dsPagina.toLowerCase().includes(searched.toLowerCase()) : null)
                        : localidadesList
                      ).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
                        return (
                          <Localidad 
                             key={row.id}
                             localidad={row}
                          />
                        );
                      })
                    }
              </TableBody >
            </ Table>
            < TablePagination
                rowsPerPageOptions={[5, 10, 15]}
                component="div"
                labelRowsPerPage="Registros por página"
                count={localidadesList.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
              />
          </CardBody>

          <Modal>
                <LocalidadForm />
            </Modal>
        </Card>
      </GridItem>
    )
  }
  