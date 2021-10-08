import React, { useContext, useEffect, useState } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
// core components
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import { Table, TableBody, TableCell, TableHead, TablePagination, TableRow, Grid } from '@material-ui/core';
import Button from "components/CustomButtons/Button.js";
import Add from "@material-ui/icons/Add";

import moment from 'moment';
import 'moment/locale/es';
import CreateIcon from '@material-ui/icons/Create';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import BlockIcon from '@material-ui/icons/Block';
import RefreshIcon from '@material-ui/icons/Refresh';
import SearchBar from "material-ui-search-bar";
import CardActions from '@material-ui/core/CardActions';
import { makeStyles } from "@material-ui/core/styles";
import { stylesArchivo } from 'css/stylesArchivo';
import { SubModuloContext } from 'contexts/subModuloContext';
import { ModalContext } from 'contexts/modalContex';
import { Modal } from 'commons/Modal';
import { SubModuloForm } from './SubModuloForm';
import { ModalDelete } from 'commons/ModalDelete';
import { ModalContextDelete } from 'contexts/modalContexDelete';
import { ModalContextUpdate } from 'contexts/modalContexUpdate';
import { SubModuloFormEdit } from './SubModuloFormEdit';
import { ModalUpdate } from 'commons/ModalUpdate';

const useStyles = makeStyles(stylesArchivo);

export const SubModuloScreen = () => {

    const classes = useStyles();
    const [searched, setSearched] = useState('');
    const [idEliminar, setIdEliminar] = useState(0);
    const [subModuloSeleccionado, setSubModuloSeleccionado] = useState();
    const { getSubModulos, eliminarSubModulo, submoduloList, size, page, total, changePageSize, changePage } = useContext(SubModuloContext);
    const { setShowModal } = useContext(ModalContext);
    const { setShowModalDelete } = useContext(ModalContextDelete);


    const { setShowModalUpdate } = useContext(ModalContextUpdate);

    useEffect(() => {
        getSubModulos();
        // eslint-disable-next-line
        console.log('Mod =>>', submoduloList);
    }, []);

    const onSelect = (e) => {

        setShowModalUpdate(true);
        setSubModuloSeleccionado(e);
    }

    const addDialog = () => {
        setShowModal(true);
    }

    const deleteDialog = (e) => {
        setShowModalDelete(true);
        setIdEliminar(e.id);
    }


    const handleDeshabilitar = () => {
        eliminarSubModulo(idEliminar)
        setShowModalDelete(false);
    }

    const handleChangePage = (event, newPage) => {
        changePage(newPage)
    };

    const handleChangeRowsPerPage = event => {
        changePageSize(+event.target.value);
        changePage(0)
    };

    return (
        <GridItem xs={12} sm={12} md={12}>

            <Card>
                <CardHeader color="primary">
                    <h4 className={classes.cardTitleWhite}>Submodulos</h4>
                    <p className={classes.cardCategoryWhite}>
                        Pantalla que permite configurar los Submodulos
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
                                < TableCell align="center"> Estatus</TableCell >
                                < TableCell align="center"> ID</TableCell >
                                < TableCell align="center"> Submódulo</TableCell >
                                < TableCell align="center"> Fecha registro</TableCell >
                                < TableCell colSpan={1} align="center"> Acciones</TableCell >
                            </TableRow >
                        </TableHead >
                        < TableBody >
                            {
                                (searched ?
                                    submoduloList.filter(row => row.dssubmodulo ?
                                        row.dssubmodulo.toLowerCase().includes(searched.toLowerCase()) : null)
                                    : submoduloList
                                ).map(row => {
                                    console.log("page:" + page + " size:" + size)
                                    return (
                                        < TableRow key={row.id}>
                                            <TableCell>                                           
                                                {row.activoval ? 'Activo':'Inactivo'}
                                            </TableCell>
                                            <TableCell>{row.id}</TableCell>
                                            <TableCell>{row.dssubmodulo}</TableCell >
                                            <TableCell >{moment(row.fcfechacreacion).format("MMMM DD YYYY, h:mm:ss a")}</TableCell>
                                            <TableCell align="center">

                                                <IconButton aria-label="create" onClick={() => onSelect(row)}>
                                                    <CreateIcon />
                                                </IconButton>
                                            </TableCell>
                                            {/*
                                            <TableCell align="center">
                                                <IconButton aria-label="create" onClick={() => deleteDialog(row)}>
                                                    {(row.activo) ? <DeleteIcon /> : <RefreshIcon />}
                                                </IconButton>
                                            </TableCell>
                                            */}
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
                        count={total}
                        rowsPerPage={size}
                        page={page}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                </CardBody>
            </Card>
            <Modal>
                <SubModuloForm />
            </Modal>
            <ModalDelete
                handleDeshabilitar={handleDeshabilitar}
            />
            <ModalUpdate>
                <SubModuloFormEdit subModuloSeleccionado={subModuloSeleccionado} />
            </ModalUpdate>
        </GridItem>

    )

}