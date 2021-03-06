import React, { useContext, useEffect, useState } from 'react';

import { DocumentosContext } from 'contexts/catalogos/documentosContext';

//componentes
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardActions from '@material-ui/core/CardActions';
import SearchBar from "material-ui-search-bar";
import { Table, TableBody, TableCell, TableHead, TablePagination, TableRow,Grid } from '@material-ui/core';

import { makeStyles } from "@material-ui/core/styles";
import { stylesArchivo } from 'css/stylesArchivo';
import { useTranslation } from 'react-i18next';
const useStyles = makeStyles(stylesArchivo);


export const DocumentosProgramas = ({ documentoProgramaSeleccionado, cerrarVistaProgramas }) => {
    const { t } = useTranslation();
    const classes = useStyles();
    const total = 0;
    const size = 0;
    const page = 0;

    const { getProgramaDocumentos, programasDocumento } = useContext(DocumentosContext);
    const [searched, setSearched] = useState('');

    useEffect(() => {
       console.log("documento seleccionado --->", documentoProgramaSeleccionado.id);
       getProgramaDocumentos(documentoProgramaSeleccionado.id);
        console.log("programas del documento ---> ", programasDocumento)
    }, [documentoProgramaSeleccionado.id]);

    const cerrarProgramas = () => {
        cerrarVistaProgramas();
    }

    return (
        <span>
            <Card>
                <CardHeader color="primary">
                    <h4 className={classes.cardTitleWhite}>{t('pnl.documentos')}</h4>
                    <p className={classes.cardCategoryWhite}>
                    {t('pnl.seccionpodraverprogramas')} {documentoProgramaSeleccionado.dsdocumento}
                    </p>
                    <CardActions>
                        <Grid container spacing={3}>
                            <Grid item xs={6}>
                                <SearchBar
                                    placeholder={t('lbl.buscar')}
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
                                    {t('btn.cerrar')}
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
                                < TableCell align="center">{t('dgv.programaapoyo')}</ TableCell>
                                < TableCell align="center" >{t('dgv.tipoapoyo')}</TableCell >
                                < TableCell align="center">{t('dgv.periodicidad')}</TableCell >
                                < TableCell align="center"> {t('dgv.Vigencia')}</TableCell >
                                < TableCell align="center" > {t('dgv.estatus')}</TableCell >
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
                        labelRowsPerPage={t('dgv.registrospaginas')}
                        count={total}
                        rowsPerPage={size}
                        page={page}
                    />
                </CardBody>
            </Card>

        </span>
    );
}