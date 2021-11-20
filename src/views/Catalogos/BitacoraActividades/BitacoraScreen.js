import React, { useContext, useEffect, useState } from 'react';
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import { MenuItem, Table, TableBody, TableCell, TableHead, TablePagination, TableRow, TextField, Grid, FormLabel } from '@material-ui/core';
import Button from "components/CustomButtons/Button.js";
import 'moment/locale/es';


import CardActions from '@material-ui/core/CardActions';
import { makeStyles } from "@material-ui/core/styles";
import { stylesArchivo } from 'css/stylesArchivo';


import { BtActividadesContext } from 'contexts/catalogos/BtActividadesContext';

import { useDispatch, useSelector } from 'react-redux';
import { BitacoraActividades } from './BitacoraActividades';
import { useTranslation } from 'react-i18next';
import GridContainer from 'components/Grid/GridContainer';

const useStyles = makeStyles(stylesArchivo);

export const BitacoraScreen = () => {
    const { t } = useTranslation();
    const classes = useStyles();
    const dispatch = useDispatch();
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [page, setPage] = useState(0);


    const { btActividadesList, getBitacoraActividadesby } = useContext(BtActividadesContext);


    const [nombre, setNombre] = useState('');
    const [fechainicio, setFechainicio] = useState('');
    const [fechafin, setFechafin] = useState('');





    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = event => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };



    const buscarMovimientos = () => {
        getBitacoraActividadesby(nombre, fechainicio, fechafin);
    }
    return (
        <GridItem xs={12} sm={12} md={12}>

            <Card>
                <CardHeader color="primary">
                    <h4 className={classes.cardTitleWhite}> Bitácora </h4>
                    <p className={classes.cardCategoryWhite}>

                    </p>
                    <CardActions>
                        <Grid container spacing={3}>

                        </Grid>
                    </CardActions>
                </CardHeader>
                <CardBody>
                    <Grid container spacing={3}>
                        <Grid item xs={2}>
                            <TextField
                                id="nombre"
                                label="Nombre del funcionario"
                                variant="outlined"
                                name={nombre}
                                fullWidth
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={8}>

                          
                                <div><FormLabel component="legend"> Fecha de Movimiento </FormLabel></div>
                                <GridContainer>
                                    <GridItem xs={4} sm={4} md={4}>
                                        <TextField
                                            id="fechainicio"
                                            label="Desde"
                                            type="date"
                                            fullWidth
                                            className={classes.textField}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            value={fechainicio}
                                            name={fechainicio}
                                            onChange={(e) => setFechainicio(e.target.value)}
                                            InputProps={{
                                                inputProps: {

                                                }
                                            }}
                                        />
                                    </GridItem>
                                    <GridItem xs={4} sm={4} md={4}>
                                        <TextField
                                            id="fechafin"
                                            label="Hasta"
                                            type="date"
                                            fullWidth
                                            className={classes.textField}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            value={fechafin}
                                            name={fechafin}
                                            onChange={(e) => setFechafin(e.target.value)}
                                            InputProps={{
                                                inputProps: {

                                                }
                                            }}
                                        />

                                    </GridItem>
                                </GridContainer>
                           

                        </Grid>




                        <Grid item xs={2}>
                            <Button variant="contained" color="primary" fullWidth onClick={buscarMovimientos}>
                                Buscar
                            </Button>
                        </Grid>
                    </Grid>
                    < Table stickyHeader aria-label="sticky table" >
                        < TableHead >
                            < TableRow key="898as" >
                                < TableCell align="center"> Detalle del movimiento</TableCell >
                                < TableCell align="center"> Horario del movimiento</TableCell >

                            </TableRow >
                        </TableHead >
                        < TableBody >
                            {
                                btActividadesList.map(row => {

                                    return (
                                        < TableRow key={row.idbitacoraactividad}>

                                            <TableCell align="center">{row.dsaccion}</TableCell >
                                            <TableCell align="center">{row.fcfecharegistro}</TableCell >

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
                        count={btActividadesList.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                </CardBody>
            </Card>



        </GridItem>

    )
}
