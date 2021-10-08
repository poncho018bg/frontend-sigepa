import React, { useContext, useEffect, useState } from 'react';

import { DocumentosContext } from 'contexts/catalogos/documentosContext';

//componentes
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardActions from '@material-ui/core/CardActions';
import SearchBar from "material-ui-search-bar";
import { Table, TableBody, TableCell, TableHead, TablePagination, TableRow,Grid, Checkbox } from '@material-ui/core';

import { makeStyles } from "@material-ui/core/styles";
import { stylesArchivo } from 'css/stylesArchivo';

const useStyles = makeStyles(stylesArchivo);


export const DocumentosProgramas = ({ documentoProgramaSeleccionado, cerrarVistaProgramas }) => {
    const classes = useStyles();
    const total = 0;
    const size = 0;
    const page = 0;

    const { getProgramaDocumentos, programasDocumento } = useContext(DocumentosContext);
    const [searched, setSearched] = useState('');

    useEffect(() => {
       
        getProgramaDocumentos(documentoProgramaSeleccionado.id);
        console.log("programas del documento ---> ", programasDocumento)
    }, []);

    const cerrarProgramas = () => {
        cerrarVistaProgramas();
    }

    return (
        <span>
            <Card>
                <CardHeader color="primary">
                    <h4 className={classes.cardTitleWhite}>Programas</h4>
                    <p className={classes.cardCategoryWhite}>
                        En esta sección se podra ver los programas que contienen el documento {documentoProgramaSeleccionado.dsdocumento}
                    </p>
                    <CardActions>
                        <Grid container spacing={3}>
                            <Grid item xs={6}>
                                <SearchBar
                                    placeholder="Buscar"
                                    value={searched}
                                    onChange={(searchVal) => setSearched(searchVal)}
                                    onCancelSearch={() => setSearched('')}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <Button
                                    color="white"
                                    aria-label="edit"
                                    round
                                    onClick={cerrarProgramas}
                                >
                                    Cerrar
                                </Button>
                            </Grid>
                        </Grid>
                    </CardActions>
                </CardHeader>
                <CardBody>
                    {console.log('programasDocumento=>>=>>',programasDocumento)}
                    < Table stickyHeader aria-label="sticky table" >
                        < TableHead >
                            < TableRow key="ta1" >
                                < TableCell align="center">Programa de Apoyo</ TableCell>
                                < TableCell align="center" >Tipo de Apoyo</TableCell >
                                < TableCell align="center">Periodicidad</TableCell >
                                < TableCell align="center"> Vigencia</TableCell >
                                < TableCell align="center" > Estatus</TableCell >
                            </TableRow >
                        </TableHead>
                        < TableBody >
                            {
                                (searched ?
                                    programasDocumento.filter(row => row.dsdescripcion ?
                                        row.dsdescripcion.toLowerCase().includes(searched.toLowerCase()) : null)
                                    : programasDocumento
                                ).map((row, i) => {
                                    console.log("page:" + page + " size:" + size)
                                    return (
                                        < TableRow key={i}>
                                            <TableCell align="center">
                                                {row.dsdescripcion}
                                            </TableCell>

                                            <TableCell align="center">
                                                {row.dstipoapoyo}
                                            </TableCell >
                                            <TableCell align="center">
                                                {row.dsperiodicidad}
                                            </TableCell>

                                            <TableCell align="center">
                                                {row.dsvigencia}
                                            </TableCell>

                                            <TableCell align="center">
                                                
                                                {row.boactivo === true ? 'Activo' : 'Inactivo'}
                                            </TableCell>
                                        </TableRow >
                                    );
                                })
                            }
                        </TableBody>
                    </Table>
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

        </span>
    );
}