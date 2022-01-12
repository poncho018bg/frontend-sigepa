import React, { useEffect, useState, useContext, forwardRef, useImperativeHandle } from "react";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import { Table, TableBody, TableCell, TableHead, TablePagination, TableRow } from '@material-ui/core';
import moment from 'moment';
import 'moment/locale/es';
import { useTranslation } from 'react-i18next';

import { Grid, TextField } from '@material-ui/core'
import { makeStyles } from "@material-ui/core/styles";
import { stylesArchivo } from 'css/stylesArchivo';
import { ExpedienteContext } from 'contexts/expedienteContext';
const useStyles = makeStyles(stylesArchivo);

export const ApoyosRecibidosExpediente = forwardRef((props) => {
    const classes = useStyles();
    const { t } = useTranslation();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [apoyosList, setApoyosList] = useState([]);
    const { expedienteBeneficiario, programaList } = useContext(ExpedienteContext);

    const { idBeneficiario ,setDtosgrlsprint,  dtosgrlsprint} = props;

    useEffect(() => {
        console.log("consulta");
        expedienteBeneficiario(idBeneficiario);
    }, [idBeneficiario]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    useEffect(() => {
       
        
        var valoresprint = dtosgrlsprint
        valoresprint.programaList = programaList
        setDtosgrlsprint(valoresprint)
    }, [programaList]);
    return (
        <GridItem xs={12} sm={12} md={12}>
            <Card>
                <CardHeader color="primary">
                    <h5 className={classes.cardTitleWhite}>{t('pnl.Apoyosrecibidos')}</h5>
                </CardHeader>
                <CardBody>
                    < Table stickyHeader aria-label="sticky table" >
                        < TableHead >
                            < TableRow key="ta1" >
                                < TableCell align="center"> {t('dgv.expProgramaotorgado')}</TableCell >
                                < TableCell align="center"> {t('dgv.expTipoapoyo')}</TableCell >
                                < TableCell align="center"> {t('dgv.expAnioapoyootorgado')}</TableCell >
                            </TableRow >
                        </TableHead >
                        < TableBody >
                            {
                                programaList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                                    //const isItemSelected = isSelected(row);
                                    //const labelId = `enhanced-table-checkbox-${index}`;
                                    return (
                                        < TableRow key={index}>
                                            <TableCell align="center">{row.dsprograma}</TableCell >
                                            <TableCell align="center">{row.dstipoapoyo}</TableCell >
                                            <TableCell align="center">{moment(row.fcvigenciainicio).format("MMMM DD YYYY, h:mm:ss a")}</TableCell>
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
                        count={apoyosList.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                        labelDisplayedRows={({ from, to, count }) => `${from}-${to} de un total ${count} registros`}
                    />
                </CardBody>
            </Card >
        </GridItem >
    )
});
