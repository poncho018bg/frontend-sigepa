import React, { useEffect, useState } from 'react';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import { stylesConfiguracionBandeja } from './css/configuracionBandeja';
import {  Table, TableBody, TableCell, TableHead, TablePagination, TableRow } from '@material-ui/core';
import Button from "components/CustomButtons/Button.js";
import Add from "@material-ui/icons/Add";
import { DialogConfiguracioBandejaForm } from './DialogConfiguracioBandejaForm';
import { useDispatch, useSelector } from 'react-redux';
import { tipoBandejaStartLoading ,bandejaSetActive} from '../../actions/tipoBandajeAction';
import moment from 'moment';
import 'moment/locale/es';
const useStyles = makeStyles(stylesConfiguracionBandeja);
moment.locale('es');

export const ConfiguracionBandejaScreen = () => {

  const dispatch = useDispatch();
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [showDialogForm, setShowDialogForm] = useState(false);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
      dispatch(tipoBandejaStartLoading());
    }, [dispatch]);

    const  {tipoBandeja}  = useSelector( state => state.tipoBandeja );

    const addDialog=()=>{
      console.log('abriendo');      
      setShowDialogForm(true);
    }
    

    const onSelectBandeja = (e) => {
   
      dispatch(bandejaSetActive(e));
      setShowDialogForm(true);
    }


    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">

              
              <h4 className={classes.cardTitleWhite}>Tipo de bandeja</h4>
              <p className={classes.cardCategoryWhite}>
                Pantalla que permite configurar el tipo de bandeja
              </p>
              <Button 
                  color="white" 
                  aria-label="edit"
                  justIcon round 
                  onClick={addDialog}
                >
                  <Add />
              </Button>
            </CardHeader>
            <CardBody>
                < Table stickyHeader aria-label="sticky table" >
                  < TableHead >
                    < TableRow key="898as" >
                      < TableCell > ID</TableCell >
                      < TableCell> Endpoint</TableCell >
                      < TableCell> Descripcion</TableCell >
                      < TableCell> Fecha Registro</TableCell >
                      < TableCell> Editar</TableCell >
                    </TableRow >
                  </TableHead >
                  < TableBody >
                    {
                        tipoBandeja.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
                          return (
                            < TableRow key={row.id}>
                              <TableCell>{row.id}</TableCell>
                              <TableCell>{row.endPoint}</TableCell >
                              <TableCell>{row.descripcion}</TableCell>
                              <TableCell >{moment(row.fechaRegistro).format("MMMM Do YYYY, h:mm:ss a")}</TableCell>
                              <TableCell align="center">
                                  <Button color='primary'
                                       onClick={() => onSelectBandeja(row)}
                                     
                                  >
                                        Editar
                                  </Button>
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
                  count={tipoBandeja.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onChangePage={handleChangePage}
                  onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </CardBody>
          </Card>
        </GridItem>
        
          <DialogConfiguracioBandejaForm 
            showDialogForm={showDialogForm}
            setShowDialogForm={setShowDialogForm}
          />
        
    </GridContainer>
    );
}
