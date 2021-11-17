import React, { useContext, useEffect, useState } from 'react';
// core components
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import { Table, TableBody, TableCell, TableHead, TablePagination, TableRow, Grid, TextField, MenuItem } from '@material-ui/core';
import Button from "components/CustomButtons/Button.js";

import 'moment/locale/es';
import CreateIcon from '@material-ui/icons/Create';
import IconButton from '@material-ui/core/IconButton';

import SearchBar from "material-ui-search-bar";
import CardActions from '@material-ui/core/CardActions';
import { makeStyles } from "@material-ui/core/styles";
import { stylesArchivo } from 'css/stylesArchivo';


import { useTranslation } from 'react-i18next';
import { RegistroSolicitudContext } from 'contexts/registroSolicitudContext';
import { ProgramasContext } from 'contexts/catalogos/Programas/programasContext';
import { EstatusRegistroContext } from 'contexts/catalogos/EstatusRegistroContext';
const useStyles = makeStyles(stylesArchivo);


export const BandejaSolicitudes = () => {
    const { t } = useTranslation();
    const { getSolicitudesPorParametros, solicitudParametros } = useContext(RegistroSolicitudContext);
    const { getCien, programasList } = useContext(ProgramasContext);
    const { getEstatusRegistro, estatusRegistroList } = useContext(EstatusRegistroContext);
    const classes = useStyles();

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);


    const [nombre, setNombre] = useState('');
    const [apellidopaterno, setApellidopaterno] = useState('');
    const [apellidoMaterno, setApellidoMaterno] = useState('');
    const [folio, setFolio] = useState('');
    const [programa, setPrograma] = useState('');
    const [estatus, setEstatus] = useState('');

    useEffect(() => {
        getCien()
        getEstatusRegistro()
    }, []);



    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const buscarSolitudes = () => {
        let solcitudFilter = {
            'paterno': apellidopaterno === '' ? 'NULL':apellidopaterno,
            'materno': apellidoMaterno === '' ? 'NULL':apellidoMaterno,
            'nombre': nombre === '' ? 'NULL':nombre,
            'idPrograma': programa === '' ? 'NULL':programa,
            'folio': folio === '' ? 'NULL':folio,
            'idEstatus': estatus === '' ? 'NULL':estatus
        }
        console.log(solcitudFilter)
        getSolicitudesPorParametros(solcitudFilter);
    }

    return (
        <GridItem xs={12} sm={12} md={12}>

            <Card>
                <CardHeader color="primary">
                    <h4 className={classes.cardTitleWhite}>Búsqueda de Solicitudes</h4>
                    <p className={classes.cardCategoryWhite}>

                    </p>
                    <CardActions>

                    </CardActions>
                </CardHeader>
                <CardBody>
                    <Grid container spacing={3}>
                        <Grid item xs={2}>
                            <TextField
                                id="paterno"
                                label="Apellido paterno"
                                variant="outlined"
                                name={apellidopaterno}
                                fullWidth
                                value={apellidopaterno}
                                onChange={(e) => setApellidopaterno(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={2}>
                            <TextField
                                id="materno"
                                label="Apellido materno"
                                variant="outlined"
                                name={apellidoMaterno}
                                fullWidth
                                value={apellidoMaterno}
                                onChange={(e) => setApellidoMaterno(e.target.value)}
                            />
                        </Grid>

                        <Grid item xs={2}>
                            <TextField
                                id="nombre"
                                label="Nombre"
                                variant="outlined"
                                name={nombre}
                                fullWidth
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                            />
                        </Grid>


                        <Grid item xs={2}>
                            <TextField
                                variant="outlined"
                                label="Selecciona un programa"
                                select
                                fullWidth
                                name="programa"
                                value={programa}
                                onChange={(e) => setPrograma(e.target.value)}
                            >
                                <MenuItem value="0">
                                    <em>{t('cmb.ninguno')}</em>
                                </MenuItem>
                                {
                                    programasList.map(
                                        item => (
                                            <MenuItem
                                                key={item.id}
                                                value={item.id}>
                                                {item.dsprograma}
                                            </MenuItem>
                                        )
                                    )
                                }
                            </TextField>
                        </Grid>

                        <Grid item xs={2}>
                            <TextField
                                id="folio"
                                label="Folio"
                                variant="outlined"
                                name={folio}
                                fullWidth
                                value={folio}
                                onChange={(e) => setFolio(e.target.value)}
                            />
                        </Grid>

                        <Grid item xs={2}>
                            <TextField
                                variant="outlined"
                                label="Selecciona un estatus"
                                select
                                fullWidth
                                name="estatus"
                                value={estatus}
                                onChange={(e) => setEstatus(e.target.value)}
                            >
                                <MenuItem value="0">
                                    <em>{t('cmb.ninguno')}</em>
                                </MenuItem>
                                {
                                    estatusRegistroList.map(
                                        item => (
                                            <MenuItem
                                                key={item.id}
                                                value={item.id}>
                                                {item.dsestatusregistro}
                                            </MenuItem>
                                        )
                                    )
                                }
                            </TextField>
                        </Grid>




                    </Grid>
                    <Grid container spacing={3}>
                        <Grid item xs={2}>
                            <Button variant="contained" color="primary" fullWidth onClick={buscarSolitudes}>
                                Buscar
                            </Button>
                        </Grid>
                    </Grid>
                    {console.log('sol=>',solicitudParametros)}
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
                        count={solicitudParametros.length}
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