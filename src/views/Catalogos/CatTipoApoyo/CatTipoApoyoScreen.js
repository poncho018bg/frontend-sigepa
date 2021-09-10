import React, { useEffect, useState } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import { Table, TableBody, TableCell, TableHead, TablePagination, TableRow } from '@material-ui/core';
import Button from "components/CustomButtons/Button.js";
import Add from "@material-ui/icons/Add";
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import 'moment/locale/es';
import CreateIcon from '@material-ui/icons/Create';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import RefreshIcon from '@material-ui/icons/Refresh';
import SearchBar from "material-ui-search-bar";
import CardActions from '@material-ui/core/CardActions';
import { Grid } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import { stylesArchivo } from 'css/stylesArchivo';
import { Loading } from 'views/Loading/Loading';
import { DialogDelete } from 'views/Dialogs/DialogDelete';
import { tipoApoyoEditar } from 'actions/TipoApoyoAction';
import { tipoApoyoEliminar } from 'actions/TipoApoyoAction';
import { borrarModuloAction } from 'actions/TipoApoyoAction';
import { obtenerTipoApoyoAction } from 'actions/TipoApoyoAction';
import { DialogTipoApoyoForm } from './DialogTipoApoyoForm';


const useStyles = makeStyles(stylesArchivo);

export const CatTipoApoyoScreen = () => {

    const classes = useStyles();
    const dispatch = useDispatch();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [searched, setSearched] = useState('');

    const [showDialogForm, setShowDialogForm] = useState(false);
    const [open, setOpen] = useState(false);
    const [severity, setSeverity] = useState('info');
    const [message, setMessage] = useState('mensaje');
    const [idSelect, setIdSelect] = useState('');
    const [openDialog, setOpenDialog] = useState(false);


    useEffect(() => {

        const cargarTiposApoyo = () => dispatch(obtenerTipoApoyoAction());
        cargarTiposApoyo()
    }, []);

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
        dispatch(tipoApoyoEditar(e));
        setShowDialogForm(true);
    }

    const addDialog = () => {
        dispatch(tipoApoyoEditar(null));
        setShowDialogForm(true);
    }

    const deleteDialog = (e) => {
        dispatch(tipoApoyoEliminar(e))
        setOpenDialog(true);
    }

    const handleDeshabilitar = () => {
        dispatch(borrarModuloAction());
        setOpenDialog(false);
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
                            <h4 className={classes.cardTitleWhite}>Tipo Apoyo</h4>
                            <p className={classes.cardCategoryWhite}>
                               
                            </p>
                            <CardActions>
                                <Grid container spacing={3}>
                                    <Grid item xs={6}>
                                        <Button
                                            color="white"
                                            aria-label="edit"
                                            justIcon round
                                            onClick={addDialog}
                                        >
                                            <Add />
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <SearchBar
                                            placeholder="Buscar"
                                            value={searched}
                                            onChange={(searchVal) => setSearched(searchVal)}
                                            onCancelSearch={() => setSearched('')}
                                        />
                                    </Grid>
                                </Grid>
                            </CardActions>
                        </CardHeader>
                        <CardBody>
                            < Table stickyHeader aria-label="sticky table" >
                                < TableHead >
                                    < TableRow key="898as" >
                                        < TableCell > Estado</TableCell >
                                        < TableCell > ID</TableCell >
                                        < TableCell> Clave</TableCell >
                                        < TableCell> Idioma</TableCell >
                                        < TableCell> Fecha Registro</TableCell >
                                        < TableCell colSpan={2} align="center"> Acciones</TableCell >
                                    </TableRow >
                                </TableHead >
                                < TableBody >
                                    {
                                        (searched ?
                                            tipoApoyo.filter(row => row.dstipoapoyo ?
                                                row.dstipoapoyo.toLowerCase().includes(searched.toLowerCase()) : null)
                                            : tipoApoyo
                                        ).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
                                            return (
                                                < TableRow key={row.idIdioma}>
                                                    <TableCell>
                                                        <Checkbox
                                                            checked={row.activo}
                                                            color="primary"
                                                            inputProps={{ 'aria-label': 'Checkbox A' }}
                                                        />
                                                    </TableCell>
                                                    <TableCell>{row.dstipoapoyo}</TableCell>
                                                    <TableCell>{row.dsdescripcion}</TableCell >
                                                    <TableCell>{row.dsprograma}</TableCell >
                                                    <TableCell>{row.dsperiodicidad}</TableCell >
                                                    <TableCell>{row.noapoyo}</TableCell >
                                                    <TableCell >{moment(row.fcvigenciainicio).format("MMMM DD YYYY, h:mm:ss a")}</TableCell>
                                                    <TableCell >{moment(row.fcfecharegistro).format("MMMM DD YYYY, h:mm:ss a")}</TableCell>
                                                    <TableCell align="center">

                                                        <IconButton aria-label="create" onClick={() => onSelect(row)}>
                                                            <CreateIcon />
                                                        </IconButton>
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        <IconButton aria-label="create" onClick={() => deleteDialog(row)}>
                                                            {(row.activo) ? <DeleteIcon /> : <RefreshIcon />}
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
                                labelRowsPerPage="Registros por página"
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

        </>
    )
}