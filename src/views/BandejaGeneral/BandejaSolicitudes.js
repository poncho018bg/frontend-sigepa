import React, { useContext, useEffect, useState } from 'react';
// core components
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import { Table, TableBody, TableCell, TableHead, TablePagination, TableRow, Grid } from '@material-ui/core';


import 'moment/locale/es';
import CreateIcon from '@material-ui/icons/Create';
import IconButton from '@material-ui/core/IconButton';

import SearchBar from "material-ui-search-bar";
import CardActions from '@material-ui/core/CardActions';
import { makeStyles } from "@material-ui/core/styles";
import { stylesArchivo } from 'css/stylesArchivo';


import { useTranslation } from 'react-i18next';
import { RegistroSolicitudContext } from 'contexts/registroSolicitudContext';
const useStyles = makeStyles(stylesArchivo);


export const BandejaSolicitudes = () => {
    const { t } = useTranslation();
    const { getSolicitudesPorParametros, solicitudParametros } = useContext(RegistroSolicitudContext);



    return (
        <GridItem xs={12} sm={12} md={12}>

            <Card>
                <CardHeader color="primary">
                    <h4 className={classes.cardTitleWhite}>{t('pnl.apoyoservicio')}</h4>
                    <p className={classes.cardCategoryWhite}>

                    </p>
                    <CardActions>
                        <Grid container spacing={3}>
                            <Grid item xs={6}>

                            </Grid>
                            <Grid item xs={6}>
                                <SearchBar
                                    placeholder={t('lbl.buscar')}


                                />
                            </Grid>
                        </Grid>
                    </CardActions>
                </CardHeader>
                <CardBody>
                    < Table stickyHeader aria-label="sticky table" >
                        < TableHead >
                            < TableRow key="898as" >
                                < TableCell align="center"> Solicitante </TableCell >
                                < TableCell align="center"> Programa de apoyo  </TableCell >
                                < TableCell align="center"> Folio  </TableCell >
                                < TableCell align="center"> Estatus  </TableCell >
                                < TableCell align="center"> Fecha de registro </TableCell >
                                < TableCell align="center"> Observaciones </TableCell >
                                < TableCell align="center"> Motivo de baja/rechazo </TableCell >
                                < TableCell align="center"> {t('dgv.acciones')}</TableCell >
                            </TableRow >
                        </TableHead >
                        < TableBody >
                            {
                                solicitudParametros.map(row => {

                                    return (
                                        < TableRow key={row.id}>

                                            <TableCell align="center">{row.nombre}</TableCell >
                                            <TableCell align="center">{row.dsprograma}</TableCell >
                                            <TableCell align="center">{row.dsfoliosolicitud}</TableCell >
                                            <TableCell align="center">{row.dsestatusregistro}</TableCell >
                                            <TableCell align="center">{row.observaciones}</TableCell >
                                            <TableCell align="center">{row.motivobaja}</TableCell >

                                            <TableCell align="center">
                                                <IconButton aria-label="create" onClick={() => onSelect(row)}>
                                                    <CreateIcon />
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
                <ApoyoServicioForm />
            </Modal>
            <ModalDelete
                handleDeshabilitar={handleDeshabilitar}
            />
            <ModalUpdate>
                <ApoyoServicioFormEdit ApoyoServicioSeleccionada={ApoyoServicioSeleccionada} />
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