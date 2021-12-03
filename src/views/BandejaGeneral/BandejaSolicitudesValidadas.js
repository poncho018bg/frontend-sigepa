import React, { useContext, useEffect, useState } from 'react';
// core components
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import { Table, TableBody, TableCell, TableHead, TablePagination, TableRow, Grid, TextField, MenuItem } from '@material-ui/core';
import Button from "components/CustomButtons/Button.js";
import Checkbox from '@material-ui/core/Checkbox';
import moment from 'moment';
import 'moment/locale/es';

import ReplayIcon from '@material-ui/icons/Replay';
import SearchIcon from '@material-ui/icons/Search';

import Tooltip from "@material-ui/core/Tooltip";
import IconButton from '@material-ui/core/IconButton';
import RemoveRedEyeIcon from '@material-ui/icons/RemoveRedEye';
import CardActions from '@material-ui/core/CardActions';
import { makeStyles } from "@material-ui/core/styles";
import { stylesArchivo } from 'css/stylesArchivo';
import { DialogEstatusGeneral } from './DialogEstatusGeneral';
import { DialogEstatusSeleccionadas } from './DialogEstatusSeleccionadas';

import { useTranslation } from 'react-i18next';
import { RegistroSolicitudContext } from 'contexts/registroSolicitudContext';
import { ProgramasContext } from 'contexts/catalogos/Programas/programasContext';
import { EstatusRegistroContext } from 'contexts/catalogos/EstatusRegistroContext';
import { MunicipiosContext } from "contexts/catalogos/MunicipiosContext";
const useStyles = makeStyles(stylesArchivo);


export const BandejaSolicitudesValidadas = () => {
    const { t } = useTranslation();
    const { getSolParametrosBandeja, solicitudParametrosBandeja, bandejaCambioEstatusPendiente } = useContext(RegistroSolicitudContext);
    const { getCien, programasList } = useContext(ProgramasContext);
    const { getEstatusRegistro, estatusRegistroList } = useContext(EstatusRegistroContext);
    const { getMunicipiosAll, municipiosList } = useContext(MunicipiosContext);
    const classes = useStyles();

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);


    const [municipio, setMunicipio] = useState('');
    const [programa, setPrograma] = useState('');
    const [estatus, setEstatus] = useState('');
    const [selected, setSelected] = React.useState([]);
    const [showDialogEstatusGeneral, setShowDialogEstatusGeneral] = useState(false);
    const [showDialogEstatusSeleccionadas, setShowDialogEstatusSeleccionadas] = useState(false);
    const [totalRegistros, setTotalRegistros] = useState('');

    useEffect(() => {
        getCien()
        getEstatusRegistro()
        getMunicipiosAll()
    }, []);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const buscarSolitudes = () => {
        let solicitudFilter = {
            'idEstatus': estatus === '' ? 'Validadas' : estatus,
            'idPrograma': programa === '' ? 'NULL' : programa,
            'idMunicipio': municipio === '' ? 'NULL' : municipio
        }
        console.log(solicitudFilter)
        getSolParametrosBandeja(solicitudFilter);
    }

    const pendienteAprobarSeleccionadas = () => {
        console.log("Manda pendiente de aprobar las seleccionadas")
        setShowDialogEstatusMultiple(true);
    }

    const pendienteAprobarGeneral = () => {
        console.log("cambio estatus multiple");        
        setTotalRegistros(solicitudParametrosBandeja.length);
        setShowDialogEstatusGeneral(true);
    }

    // Cambio de estatus seleccioandas
    const handleCambiarEstatusSeleccionada = () => {
        console.log("entra a handleCambiarEstatusSeleccionada");
        for (let i = 0; i < selected.length; i++) {
            selected[i].idUsuario = sessionStorage.getItem('idUSuario');
        }
        bandejaCambioEstatusPendiente(selected);
        setShowDialogEstatusSeleccionadas(false);
        // buscarSolitudes();
    }

    //cambio de estatus general
    const handleCambiarGeneral = () => {
        console.log("entra a handleCambiarGeneral");
        for (let i = 0; i < solicitudParametrosBandeja.length; i++) {
            solicitudParametrosBandeja[i].idUsuario = sessionStorage.getItem('idUSuario');
        }
        bandejaCambioEstatusPendiente(solicitudParametrosBandeja);
        setShowDialogEstatusGeneral(false);
        //buscarSolitudes();
    }


    const handleClick = (event, solicitud) => {
        const selectedIndex = selected.indexOf(solicitud);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, solicitud);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }
        setSelected(newSelected);
        console.log("selected final", selected);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = rows.map((n) => n.dsfoliosolicitud);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const isSelected = (dsfoliosolicitud) => selected.indexOf(dsfoliosolicitud) !== -1;

    return (
        <GridItem xs={12} sm={12} md={12}>

            <Card>
                <CardHeader color="primary">
                    <h4 className={classes.cardTitleWhite}>Bandeja general de solicitudes</h4>
                    <p className={classes.cardCategoryWhite}>

                    </p>
                    <CardActions>

                    </CardActions>
                </CardHeader>
                <CardBody>
                    <Grid container spacing={3}>
                        {/* <Grid item xs={3}>
                            <TextField
                                variant="outlined"
                                label="Selecciona un estatus"
                                select
                                fullWidth
                                name="estatus"
                                value={estatus}
                                onChange={(e) => setEstatus(e.target.value)}
                            >
                                <MenuItem value="">
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
                        </Grid>*/}

                        <Grid item xs={3}>
                            <TextField
                                variant="outlined"
                                label="Selecciona un programa"
                                select
                                fullWidth
                                name="programa"
                                value={programa}
                                onChange={(e) => setPrograma(e.target.value)}
                            >
                                <MenuItem value="">
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

                        <Grid item xs={3}>
                            <TextField
                                variant="outlined"
                                label="Selecciona un municipio"
                                select
                                fullWidth
                                name="municipio"
                                value={municipio}
                                onChange={(e) => setMunicipio(e.target.value)}
                            >
                                <MenuItem value="">
                                    <em>{t('cmb.ninguno')}</em>
                                </MenuItem>
                                {
                                    municipiosList.map(
                                        item => (
                                            <MenuItem
                                                key={item.id}
                                                value={item.id}>
                                                {item.dsmunicipio}
                                            </MenuItem>
                                        )
                                    )
                                }
                            </TextField>
                        </Grid>
                        <Grid item xs={2} style={{ textAlign: 'right', float: 'right' }}>
                            <Button variant="contained" color="primary" fullWidth onClick={buscarSolitudes}>
                                <SearchIcon />
                                Buscar
                            </Button>
                        </Grid>
                    </Grid>

                    <Grid container spacing={2}>
                        <GridItem xs={12} sm={12} md={12}>
                            <Grid item xs={3} style={{ textAlign: 'center', float: 'right' }}>
                                <Button color="primary" fullWidth onClick={pendienteAprobarSeleccionadas}>
                                    Pendientes de aprobar seleccionadas
                                </Button>
                            </Grid>
                        </GridItem>
                    </Grid>

                    < Table stickyHeader aria-label="sticky table" >
                        < TableHead >
                            < TableRow key="898as" >
                                < TableCell align="center">checkbox  </TableCell >
                                < TableCell align="center"> Folio  </TableCell >
                                < TableCell align="center"> Estatus  </TableCell >
                                < TableCell align="center"> Solicitante </TableCell >
                                < TableCell align="center"> Programa de apoyo  </TableCell >
                                < TableCell align="center"> Fecha de registro </TableCell >
                                < TableCell align="center"> Observaciones </TableCell >
                                < TableCell align="center"> Motivo de baja/rechazo </TableCell >
                                < TableCell align="center"> {t('dgv.acciones')}</TableCell >
                            </TableRow >
                        </TableHead >
                        < TableBody >
                            {
                                solicitudParametrosBandeja.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                                    const isItemSelected = isSelected(row);
                                    const labelId = `${index}`;

                                    return (
                                        <TableRow
                                            hover
                                            onClick={(event) => handleClick(event, row)}
                                            role="checkbox"
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={row.id}
                                            selected={isItemSelected}
                                        >

                                            <TableCell padding="checkbox">
                                                <Checkbox
                                                    checked={isItemSelected}
                                                    inputProps={{ 'aria-labelledby': labelId }}
                                                />
                                            </TableCell>
                                            <TableCell component="th" id={labelId} scope="row" padding="none">
                                                {row.dsfoliosolicitud}
                                            </TableCell>
                                            <TableCell align="center">{row.dsestatusregistro}</TableCell >
                                            <TableCell align="center">{row.nombre}</TableCell >
                                            <TableCell align="center">{row.dsprograma}</TableCell >
                                            <TableCell align="center">{moment(row.fechaRegistro).format("MMMM DD YYYY, h:mm:ss a")}</TableCell>
                                            <TableCell align="center">{row.observaciones}</TableCell >
                                            <TableCell align="center">{row.motivobaja}</TableCell >
                                            <TableCell align="center">
                                                <Tooltip
                                                    id="tooltip-expediente"
                                                    title="Ver expediente"
                                                    placement="top"
                                                >
                                                    <IconButton aria-label="view" onClick={() => onSelect(row)}>
                                                        <RemoveRedEyeIcon />
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip
                                                    id="tooltip-regresar"
                                                    title="Reasignar"
                                                    placement="top"
                                                >
                                                    <IconButton aria-label="return" onClick={() => onSelect(row)}>
                                                        <ReplayIcon />
                                                    </IconButton>
                                                </Tooltip>
                                            </TableCell>
                                        </TableRow >
                                    );
                                })
                            }
                        </TableBody >
                    </ Table>
                    < TablePagination
                        rowsPerPageOptions={[25, 50, 75, 100]}
                        component="div"
                        labelRowsPerPage={t('dgv.registrospaginas')}
                        count={solicitudParametrosBandeja.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                        labelDisplayedRows={({ from, to, count }) => `${from}-${to} de un total ${count} registros`}
                    />
                    <Grid container spacing={2}>
                        <GridItem xs={12} sm={12} md={12}>
                            <Grid item xs={3} style={{ textAlign: 'center', float: 'right' }}>
                                <Button color="primary" fullWidth onClick={pendienteAprobarGeneral}>
                                    Pendientes de aprobar {solicitudParametrosBandeja.length} Seleccionadas
                                </Button>
                            </Grid>
                        </GridItem>
                    </Grid>
                </CardBody>
            </Card>
            <DialogEstatusGeneral
                showDialogEstatusGeneral={showDialogEstatusGeneral}
                setShowDialogEstatusGeneral={setShowDialogEstatusGeneral}
                totalRegistros={totalRegistros}
                handleCambiarGeneral={handleCambiarGeneral}
            />
            <DialogEstatusSeleccionadas
                showDialogEstatusSeleccionadas={showDialogEstatusSeleccionadas}
                setShowDialogEstatusSeleccionadas={setShowDialogEstatusSeleccionadas}
                handleCambiarEstatusSeleccionada={handleCambiarEstatusSeleccionada}
            />
        </GridItem>

    )
}