import React, { useContext, useEffect, useState } from 'react';
// core components
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import { Table, TableBody, TableCell, TableHead, TablePagination, TableRow, Grid, TextField, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';
import Button from "components/CustomButtons/Button.js";
import moment from 'moment';
import 'moment/locale/es';


import { BeneficiariosContext } from 'contexts/BeneficiariosContext';
import IconButton from '@material-ui/core/IconButton';
import AddBoxIcon from '@material-ui/icons/AddBox';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CancelPresentationIcon from '@material-ui/icons/CancelPresentation';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import CardActions from '@material-ui/core/CardActions';
import { makeStyles } from "@material-ui/core/styles";
import { stylesArchivo } from 'css/stylesArchivo';


import { useTranslation } from 'react-i18next';
import { TiposApoyosContext } from 'contexts/catalogos/tiposApoyosContext';
import { MotivoRechazosContext } from 'contexts/catalogos/motivoRechazosContext';
import { ProgramasContext } from 'contexts/catalogos/Programas/programasContext';
import { BandejaRechazosContext } from 'contexts/BandejaRechazosContext';
import { Mensaje } from 'components/Personalizados/Mensaje';



const useStyles = makeStyles(stylesArchivo);


export const PadronBeneficiariasScreen = () => {
    const { t } = useTranslation();
    const { padronList, getPadronBeneficiarios, getDetalleBeneficiarios, beneficiariaList } = useContext(BeneficiariosContext);
    const { getCien, programasList } = useContext(ProgramasContext);
    const { tiposApoyosList, getTiposApoyos } = useContext(TiposApoyosContext);
    const { motivoRechazosList, getMotivoRechazos } = useContext(MotivoRechazosContext);
    const { registrarBandejaRechazos } = useContext(BandejaRechazosContext);

    const classes = useStyles();

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);


    const [nombre, setNombre] = useState('');
    const [curp, setCurp] = useState('');
    const [idPrograma, setIdPrograma] = useState('');
    const [idTipoApoyo, setIdTipoApoyo] = useState('');
    const [anio, setAnio] = useState('');
    const [idMotivoBaja, setIdMotivoBaja] = useState('');
    const [masprogramas, setMasprogramas] = useState(true);

    const [llMotivoBaja, setLlMotivoBaja] = useState('');
    const [dsMotivoBaja, setDsMotivoBaja] = useState('');
    const [idMvBandejaSol, setIdMvBandejaSol] = useState('');
    const [error, setError] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [msjConfirmacion, setMsjConfirmacion] = useState('');
    const [open, setOpen] = React.useState(false);
    useEffect(() => {
        getCien()
        getTiposApoyos()
        getMotivoRechazos()

    }, []);

    const handleClose = () => {
        setOpen(false);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const buscarSolitudes = () => {
        let solcitudFilter = {
            'nombrebeneficiario': nombre === '' ? 'NULL' : nombre,
            'curp': curp === '' ? 'NULL' : curp,
            'idPrograma': idPrograma === '' ? 'NULL' : idPrograma,
            'idTipoApoyo': idTipoApoyo === '' ? 'NULL' : idTipoApoyo,
            'anioPrograma': anio === '' ? 'NULL' : anio,
            'motivoRechazo': idMotivoBaja === '' ? 'NULL' : idMotivoBaja
        }
        setMasprogramas(true)

        getPadronBeneficiarios(solcitudFilter);
    }

    const buscarDetalle = beneficiario => {
        getDetalleBeneficiarios(beneficiario.id)
        setMasprogramas(false)

    }

    useEffect(() => {
        if (!masprogramas) {
            if (beneficiariaList.length === 0) {
                setMasprogramas(false)
            } else {
                setMasprogramas(true)
            }
        }

    }, [beneficiariaList]);

    const redirectRegister = () => {


        let bandejaRechz = {
            'dsobservaciones': dsMotivoBaja,
            'motivo_rechazo_id': llMotivoBaja,
            'mv_bandeja_id': `${idMvBandejaSol}`
        }

        registrarBandejaRechazos(bandejaRechz).then(response => {
            setOpenSnackbar(true);

            setMsjConfirmacion(`${t('msg.registroguardadoexitosamente')}`);

            const timer = setTimeout(() => {

                setError(false);
                setOpen(false);

            }, 1500);
            return () => clearTimeout(timer);
        })
            .catch(err => {
                console.log('err', err)
                setOpenSnackbar(true);
                setError(true);
                setMsjConfirmacion(`${t('msg.ocurrioerrorcalidarinfo')}`);
            });
    }

    const cambiarMotivoBaja = (row, dta) => {
        setOpen(true);
        row.idMotivoBaja = dta
        row.activo = true
        setLlMotivoBaja(dta)
        setIdMvBandejaSol(row.idMvBandejaSol)
        padronList.map(e => {
            if (e.id === row.id) {
                e.idMotivoBaja = dta
                e.activo = true
            }
        })


    }

    return (
        <GridItem xs={12} sm={12} md={12}>

            <Card>
                <CardHeader color="primary">
                    <h4 className={classes.cardTitleWhite}>Padrón de beneficiarias</h4>
                    <p className={classes.cardCategoryWhite}>

                    </p>
                    <CardActions>

                    </CardActions>
                </CardHeader>
                <CardBody>
                    <Grid container spacing={3}>
                        <Grid item xs={2}>

                            <TextField
                                id="nombre"
                                label="Nombre beneficiarias"
                                variant="outlined"
                                name={nombre}
                                fullWidth
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={2}>
                            <TextField
                                id="curp"
                                label="CURP"
                                variant="outlined"
                                name={curp}
                                fullWidth
                                value={curp}
                                onChange={(e) => setCurp(e.target.value)}
                            />
                        </Grid>




                        <Grid item xs={2}>
                            <TextField
                                variant="outlined"
                                label="Selecciona un programa"
                                select
                                fullWidth
                                name="idPrograma"
                                value={idPrograma}
                                onChange={(e) => setIdPrograma(e.target.value)}
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
                                variant="outlined"
                                label="Selecciona un tipo de apoyo"
                                select
                                fullWidth
                                name="idTipoApoyo"
                                value={idTipoApoyo}
                                onChange={(e) => setIdTipoApoyo(e.target.value)}
                            >
                                <MenuItem value="0">
                                    <em>{t('cmb.ninguno')}</em>
                                </MenuItem>
                                {
                                    tiposApoyosList.map(
                                        item => (
                                            <MenuItem
                                                key={item.id}
                                                value={item.id}>
                                                {item.dstipoapoyo}
                                            </MenuItem>
                                        )
                                    )
                                }
                            </TextField>
                        </Grid>


                        <Grid item xs={2}>
                            <TextField
                                id="anio"
                                label="Año de registro del programa"
                                variant="outlined"
                                name={anio}
                                fullWidth
                                value={anio}
                                onChange={(e) => setAnio(e.target.value)}
                            />
                        </Grid>


                        <Grid item xs={2}>
                            <TextField
                                variant="outlined"
                                label="Selecciona un motivo de baja"
                                select
                                fullWidth
                                name="idMotivoBaja"
                                value={idMotivoBaja}
                                onChange={(e) => setIdMotivoBaja(e.target.value)}
                            >
                                <MenuItem value="0">
                                    <em>{t('cmb.ninguno')}</em>
                                </MenuItem>
                                {
                                    motivoRechazosList.map(
                                        item => (
                                            <MenuItem
                                                key={item.id}
                                                value={item.id}>
                                                {item.dsmotivorechazo}
                                            </MenuItem>
                                        )
                                    )
                                }
                            </TextField>
                        </Grid>




                    </Grid>
                    <Grid container spacing={3}>
                        <Grid item xs={2} style={{ textAlign: 'right', float: 'right' }}>
                            <Button variant="contained" color="primary" fullWidth onClick={buscarSolitudes}>
                                Buscar
                            </Button>
                        </Grid>
                    </Grid>

                    < Table stickyHeader aria-label="sticky table" >
                        < TableHead >
                            < TableRow key="898as" >
                                < TableCell align="center"> Consecutivo </TableCell >
                                < TableCell align="center"> Beneficiaria  </TableCell >
                                < TableCell align="center"> CURP  </TableCell >
                                < TableCell align="center"> Programa de apoyo  </TableCell >
                                < TableCell align="center"> Tipo de apoyo </TableCell >
                                < TableCell align="center"> Folio SEDESEM </TableCell >
                                < TableCell align="center"> Año de registro al programa </TableCell >
                                < TableCell align="center"> Motivo de baja </TableCell >
                            </TableRow >
                        </TableHead >
                        < TableBody >
                            {

                                padronList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
                                    return (
                                        < TableRow key={row.id}>
                                            <TableCell align="center">{row.number}</TableCell >

                                            <TableCell align="center">
                                                <IconButton aria-label="delete" className={classes.margin}
                                                    size="small" hidden={!row.monetario} onClick={() => buscarDetalle(row)}>
                                                    <ExpandMoreIcon fontSize="inherit" />
                                                </IconButton>
                                                {row.nombre}
                                            </TableCell >
                                            <TableCell align="center">{row.dscurp}</TableCell >
                                            <TableCell align="center">{row.dsprograma}</TableCell >
                                            <TableCell align="center">{row.dstipoapoyo}</TableCell >
                                            <TableCell align="center"> </TableCell >
                                            <TableCell align="center">{row.anio}</TableCell >
                                            <TableCell align="center">
                                                <TextField
                                                    variant="outlined"
                                                    label="Seleccione"
                                                    select
                                                    disabled={row.activo}
                                                    fullWidth
                                                    name={row.idMotivoBaja}
                                                    value={row.idMotivoBaja}
                                                    onChange={(e) => cambiarMotivoBaja(row, e.target.value)}

                                                >
                                                    <MenuItem value="0">
                                                        <em>{t('cmb.ninguno')}</em>
                                                    </MenuItem>
                                                    {
                                                        motivoRechazosList.map(
                                                            item => (
                                                                <MenuItem
                                                                    key={item.id}
                                                                    value={item.id}>
                                                                    {item.dsmotivorechazo}
                                                                </MenuItem>
                                                            )
                                                        )
                                                    }
                                                </TextField>
                                            </TableCell >

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
                        count={padronList.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                        labelDisplayedRows={({ from, to, count }) => `${from}-${to} de un total ${count} registros`}
                    />
                </CardBody>
            </Card>
            <Card>

                <CardBody hidden={masprogramas}>
                    <h5>El beneficiario no tiene mas apoyos</h5>
                </CardBody>

                <CardBody hidden={beneficiariaList.length === 0}>

                    < Table stickyHeader aria-label="sticky table" >
                        < TableHead >
                            < TableRow key="898as" >
                                < TableCell align="center"> Consecutivo </TableCell >
                                < TableCell align="center">  Año de registro al programa   </TableCell >
                                < TableCell align="center"> Programa de apoyo  </TableCell >
                                < TableCell align="center"> Apoyo otorgado </TableCell >
                                < TableCell align="center"> Activo </TableCell >
                                < TableCell align="center"> Motivo de baja </TableCell >
                            </TableRow >
                        </TableHead >
                        < TableBody >
                            {console.log(beneficiariaList)}
                            {

                                beneficiariaList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
                                    return (
                                        < TableRow key={row.id}>
                                            <TableCell align="center">{row.number}</TableCell >
                                            <TableCell align="center">{row.anio}</TableCell >
                                            <TableCell align="center">{row.dsprograma}</TableCell >
                                            <TableCell align="center">{row.dstipoapoyo}</TableCell >
                                            <TableCell align="center"> {!row.activo ? <CheckBoxIcon fontSize="inherit" /> : <CancelPresentationIcon fontSize="inherit" />}  </TableCell >
                                            <TableCell align="center">{row.dsmotivorechazo}</TableCell >

                                        </TableRow >
                                    );
                                })
                            }
                        </TableBody >
                    </ Table>
                </CardBody>
            </Card>

            <Mensaje
                setOpen={setOpenSnackbar}
                open={openSnackbar}
                severity={error ? "error" : "success"}
                message={msjConfirmacion}
            />


            <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open} maxWidth="lg" fullWidth={true}>
                <DialogTitle id="customized-dialog-title" onClose={handleClose}>

                    <h2> Motivo de baja </h2>
                </DialogTitle>
                <DialogContent >
                    <DialogContent >
                        <TextField
                            id="dsMotivoBaja"
                            label="Motivo de baja"
                            variant="outlined"
                            fullWidth
                            name={dsMotivoBaja}
                            fullWidth
                            value={dsMotivoBaja}
                            onChange={(e) => setDsMotivoBaja(e.target.value)}
                        />

                    </DialogContent>


                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={() => redirectRegister()} color="primary">
                        Guardar
                    </Button>
                </DialogActions>
            </Dialog>



        </GridItem>

    )
}