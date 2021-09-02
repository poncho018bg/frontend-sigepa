import React, { useContext, useEffect, useState } from 'react';
import Checkbox from '@material-ui/core/Checkbox';

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
import { BtActividadesContext } from 'contexts/catalogos/BtActividadesContext';

const useStyles = makeStyles(stylesArchivo);

export const BitacoraActividadesScreen = () => {

    const classes = useStyles();
    //const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(1);
    const [searched, setSearched] = useState('');
    const [idEliminar, setIdEliminar] = useState(0);
    const [bitacoraActividadSeleccionada, setBitacoraActividadSeleccionada] = useState();

    const { btActividadesList, getBtActividadesby } = useContext(BtActividadesContext);
    const { showModal, modalTitle, setShowModal, setModalTitle } = useContext(ModalContext);
    const { showModalDelete, setShowModalDelete } = useContext(ModalContextDelete);
    const { showModalUpdate, modalTitleUpdate, setShowModalUpdate, setModalTitleUpdate }
        = useContext(ModalContextUpdate);


        useEffect(() => {
            getBtActividadesby("NULL","NULL","NULL","NULL","NULL","NULL","NULL");      
          
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
            setShowModalUpdate(true);
            setBitacoraActividadSeleccionada(e);
          }
        
          const addDialog = () => {
            setShowModal(true);
          }
          
          const deleteDialog = (e) => {
            setShowModalDelete(true);
            setIdEliminar(e.id);
          }
          
        
          const handleDeshabilitar = () => {
            //eliminarPersona(idEliminar)
            setShowModalDelete(false);
          }
        

          return (
            <GridItem xs={12} sm={12} md={12}>
            
            <Card>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>Bitacora</h4>
                <p className={classes.cardCategoryWhite}>
                  Pantalla que visualizar los movimientos de un usuario  
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
                      < TableCell > fcfecharegistro</TableCell >
                      < TableCell> dsaccion</TableCell >
                      
                    </TableRow >
                  </TableHead >
                  < TableBody >
                    {
                      (searched ?
                        btActividadesList.filter(row => row.dsaccion ?
                          row.dsaccion.toLowerCase().includes(searched.toLowerCase()) : null)
                        : btActividadesList
                      ).map(row => {
                        console.log("page:"+page + " size:" + size)
                        return (
                          < TableRow key={row.id}>                            
                            <TableCell >{moment(row.fcfecharegistro).format("MMMM DD YYYY, h:mm:ss a")}</TableCell>
                            <TableCell>{row.dsaccion}</TableCell >
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
           
           
           
          </GridItem>
        
          )

}