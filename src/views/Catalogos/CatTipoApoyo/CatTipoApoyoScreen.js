import React, { useEffect, useState, useContext } from 'react';
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import { Table, TableBody, TableCell, TableHead, TablePagination, TableRow, Grid, TextField, MenuItem } from '@material-ui/core';
import Button from "components/CustomButtons/Button.js";
import Add from "@material-ui/icons/Add";
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import 'moment/locale/es';
import CreateIcon from '@material-ui/icons/Create';
import IconButton from '@material-ui/core/IconButton';
import BlockIcon from '@material-ui/icons/Block';
import CardActions from '@material-ui/core/CardActions';
import { makeStyles } from "@material-ui/core/styles";
import { stylesArchivo } from 'css/stylesArchivo';
import { Loading } from 'views/Loading/Loading';
import { DialogDelete } from 'views/Dialogs/DialogDelete';
import { tipoApoyoEditar,  obtenerTipoApoyoAction } from 'actions/TipoApoyoAction';
import { Link } from 'react-router-dom';
import { DialogTipoApoyoFormEdit } from './DialogTipoApoyoFormEdit';
import { ModalUpdate } from 'commons/ModalUpdate';
import { ModalContextUpdate } from 'contexts/modalContexUpdate';
import { PeriodicidadApoyosContext } from 'contexts/catalogos/periodicidadApoyosContext';
import { TiposApoyosContext } from 'contexts/catalogos/tiposApoyosContext';
import { ApoyoContext } from 'contexts/catalogos/ApoyoContext';
import { Mensaje } from 'components/Personalizados/Mensaje';
import { ModalContextDelete } from 'contexts/modalContexDelete';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles(stylesArchivo);

export const CatTipoApoyoScreen = () => {
    const { t } = useTranslation();
    const classes = useStyles();
    const dispatch = useDispatch();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [searched] = useState('');

    const [ setShowDialogForm] = useState(false);
    const [open, setOpen] = useState(false);
    const [severity] = useState('info');
    const [message] = useState('mensaje');

    const [openDialog, setOpenDialog] = useState(false);
    const [personaSeleccionada, setPersonaSeleccionada] = useState();
    const { showModalUpdate,  setShowModalUpdate }
        = useContext(ModalContextUpdate);
    const { getPeriodicidadApoyos, periodicidadApoyosList } = useContext(PeriodicidadApoyosContext);
    const { getTiposApoyos, tiposApoyosList } = useContext(TiposApoyosContext);
    const [idApoyosl, setIdApoyosl] = useState('');
    const [idPeriodicidadsl, setIdPeriodicidadsl] = useState('');
    const { eliminarApoyo } = useContext(ApoyoContext)
    const { setShowModalDelete } = useContext(ModalContextDelete);
    const [error] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [msjConfirmacion, setMsjConfirmacion] = useState('');
    const [idEliminar, setIdEliminar] = useState(0);



    useEffect(() => {
        getPeriodicidadApoyos()
        getTiposApoyos()
    }, []);

    useEffect(() => {
        const cargarTiposApoyo = () => dispatch(obtenerTipoApoyoAction(idApoyosl,idPeriodicidadsl));
        cargarTiposApoyo()
    }, [showModalUpdate]);

    useEffect(() => {
        const cargarTiposApoyo = () => dispatch(obtenerTipoApoyoAction(idApoyosl,idPeriodicidadsl));
        cargarTiposApoyo()      
    }, [openDialog,openSnackbar]);

    const { loading } = useSelector(state => state.tipoApoyo);
    const tipoApoyo = useSelector(state => state.tipoApoyo.tipoApoyo);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const onSelect = (e) => {

        setShowModalUpdate(true);
        setPersonaSeleccionada(e);
    }

    const addDialog = () => {
        dispatch(tipoApoyoEditar(null));
        setShowDialogForm(true);
    }

    const deleteDialog = (e) => {
        console.log('delete dialog =>',e)
        setIdEliminar(e)             
        setOpenDialog(true);    

               
    }

    const handleDeshabilitar = () => {    
       eliminarApoyo(idEliminar)

        setShowModalDelete(false);
        setOpenDialog(false);
        setOpenSnackbar(true);
        setMsjConfirmacion(`${t('msg.registroguardadoexitosamente')}`);
    }

    const buscarTiposApoyos = () => {
        console.log('idApoyosl',idApoyosl)
        console.log('idPeriodicidadsl',idPeriodicidadsl)
        const cargarTiposApoyo = () => dispatch(obtenerTipoApoyoAction(idApoyosl,idPeriodicidadsl));
        cargarTiposApoyo()
    }

    return (
        <>

            {loading ? (
                <Loading
                    loading={loading}
                />
            ) : (
                <GridItem xs={12} sm={12} md={12}>
                    <Card>
                        <CardHeader color="primary">
                            <h4 className={classes.cardTitleWhite}>Tipo apoyo</h4>
                            <p className={classes.cardCategoryWhite}>

                            </p>
                            <CardActions>
                                <Grid container spacing={3}>
                                    <Grid item xs={2}>
                                        <Link to="../admin/nuevoApoyo">
                                            <Button
                                                color="white"
                                                aria-label="edit"
                                                justIcon round
                                                onClick={addDialog}
                                            >
                                                <Add />
                                            </Button>
                                        </Link>
                                    </Grid>

                                </Grid>
                            </CardActions>
                        </CardHeader>
                        <CardBody>
                            <Grid container spacing={3}>

                                <Grid item xs={3}>
                                    <TextField
                                        variant="outlined"
                                        label="Selecciona un tipo de apoyo"
                                        select
                                        fullWidth
                                        name={idApoyosl}
                                        value={idApoyosl}
                                        onChange={(e) => setIdApoyosl(e.target.value)}
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
                                <Grid item xs={3}>
                                    <TextField
                                        variant="outlined"
                                        label="Selecciona una periodicidad"
                                        select
                                        fullWidth
                                        name={idPeriodicidadsl}
                                        value={idPeriodicidadsl}
                                        onChange={(e) => setIdPeriodicidadsl(e.target.value)}
                                    >
                                        <MenuItem value="0">
                                            <em>{t('cmb.ninguno')}</em>
                                        </MenuItem>
                                        {
                                            periodicidadApoyosList.map(
                                                item => (
                                                    <MenuItem
                                                        key={item.id}
                                                        value={item.id}>
                                                        {item.dsperiodicidad}
                                                    </MenuItem>
                                                )
                                            )
                                        }

                                    </TextField>
                                </Grid>
                                <Grid item xs={2}>
                                    <Button variant="contained" color="primary" fullWidth onClick={buscarTiposApoyos}>
                                        Buscar
                                    </Button>
                                </Grid>
                            </Grid>

                            < Table stickyHeader aria-label="sticky table" >
                                < TableHead >
                                    < TableRow key="898as" >
                                        < TableCell align="center"> Estatus</TableCell >
                                        < TableCell align="center"> Tipo apoyo</TableCell >
                                        < TableCell align="center"> Apoyo</TableCell >
                                        < TableCell align="center"> Programa de apoyo en el que se otorga</TableCell >
                                        < TableCell align="center"> Periodicidad</TableCell >
                                        < TableCell align="center"> Número de entregas</TableCell >
                                        < TableCell align="center"> Vigencia</TableCell >
                                        < TableCell align="center"> Fecha de alta</TableCell >
                                        < TableCell colSpan={2} align="center"> Acciones</TableCell >
                                    </TableRow >
                                </TableHead >
                                < TableBody >
                                    {
                                        (searched ?
                                            tipoApoyo.filter(row => row.descTiposApoyos ?
                                                row.descTiposApoyos.toLowerCase().includes(searched.toLowerCase()) : null)
                                            : tipoApoyo
                                        ).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
                                            return (
                                                < TableRow key={row.id}>
                                                    <TableCell align="center">
                                                       
                                                        {row.estatus === 'true' ? 'Activo':'Inactivo'}
                                                    </TableCell>
                                                    <TableCell align="center">{row.descTiposApoyos}</TableCell>
                                                    <TableCell align="center">{row.dsapoyo}</TableCell >
                                                    <TableCell align="center">{row.desPrograma}</TableCell >
                                                    <TableCell align="center">{row.descPeriodicidad}</TableCell >
                                                    <TableCell align="center">{row.descNumApoyo}</TableCell >
                                                    <TableCell align="center">{moment(row.fcvigenciafin).format("MMMM DD YYYY, h:mm:ss a")}</TableCell>
                                                    <TableCell align="center">{moment(row.fcfecharegistro).format("MMMM DD YYYY, h:mm:ss a")}</TableCell>
                                                    <TableCell align="center">

                                                        <IconButton aria-label="create" onClick={() => onSelect(row)}>
                                                            <CreateIcon />
                                                        </IconButton>

                                                    </TableCell>
                                                    <TableCell align="center">
                                                        <IconButton aria-label="create" onClick={() => deleteDialog(row)}>                                                           
                                                            <BlockIcon />
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
                                count={tipoApoyo.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onChangePage={handleChangePage}
                                onChangeRowsPerPage={handleChangeRowsPerPage}
                            />
                        </CardBody>
                    </Card>
                </GridItem>
            )}

            <DialogDelete
                openDialog={openDialog}
                setOpenDialog={setOpenDialog}
                handleDeshabilitar={handleDeshabilitar}
            />

            <ModalUpdate>
                <DialogTipoApoyoFormEdit personaSeleccionada={personaSeleccionada} />
            </ModalUpdate>

            <Mensaje
                setOpen={setOpenSnackbar}
                open={openSnackbar}
                severity={error ? "error" : "success"}
                message={msjConfirmacion}
            />

        </>
    )
}