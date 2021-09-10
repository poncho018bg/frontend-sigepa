import React, { useContext, useEffect, useState } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
// core components
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import { Table, TableBody, TableCell, TableHead, TablePagination, TableRow } from '@material-ui/core';
import Button from "components/CustomButtons/Button.js";
import Add from "@material-ui/icons/Add";

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

//contexts
import { EdadesBeneficiariosContext } from 'contexts/catalogos/edadesBeneficiariosContext';
import { ModalContext } from 'contexts/modalContex';
import { Modal } from 'commons/Modal';


import { EdadesBeneficiariosForm } from './EdadesBeneficiariosForm';
import { EdadesBeneficiariosEdit } from './EdadesBeneficiariosEdit';

import { ModalDelete } from 'commons/ModalDelete';
import { ModalContextDelete } from 'contexts/modalContexDelete';
import { ModalContextUpdate } from 'contexts/modalContexUpdate';
import { ModalUpdate } from 'commons/ModalUpdate';

const useStyles = makeStyles(stylesArchivo);

export const EdadesBeneficiariosScreen = () => {

    const classes = useStyles();
    //const [page, setPage] = useState(0);

    const [searched, setSearched] = useState('');
    const [idEliminar, setIdEliminar] = useState(0);
    const [edadesBeneficiariosSeleccionado, setEdadesBeneficiariosSeleccionado] = useState();
    const { getEdadesBeneficiarios, eliminarEdadesBeneficiarios, edadesBeneficiariosList } = useContext(EdadesBeneficiariosContext);
    const { setShowModal } = useContext(ModalContext);
    const { setShowModalDelete } = useContext(ModalContextDelete);

    const { setShowModalUpdate }
        = useContext(ModalContextUpdate);

    useEffect(() => {
        getEdadesBeneficiarios();
        // eslint-disable-next-line
        console.log("tipo de apoyo", edadesBeneficiariosList);
    }, []);

    const total = 0;
    const size = 0;
    const page = 0;

    const onSelect = (e) => {
        setShowModalUpdate(true);
        setEdadesBeneficiariosSeleccionado(e);
    }

    const addDialog = () => {
        setShowModal(true);
    }

    const deleteDialog = (e) => {
        setShowModalDelete(true);
        setIdEliminar(e.id);
    }


    const handleDeshabilitar = () => {
        eliminarEdadesBeneficiarios(idEliminar)
        setShowModalDelete(false);
    }

    return (
        <GridItem xs={12} sm={12} md={12}>

            <Card>
                <CardHeader color="primary">
                    <h4 className={classes.cardTitleWhite}>Edades Beneficiarios</h4>
                    <p className={classes.cardCategoryWhite}>
                        Esta pantalla permite agregar las Edades para Beneficiarios
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
                            < TableRow key="ta1" >
                                < TableCell > Estado</TableCell >
                                < TableCell > ID</TableCell >
                                < TableCell> Desc. Tipo Beneficiario</TableCell >
                                < TableCell> Fecha Registro</TableCell >
                                < TableCell colSpan={2} align="center"> Acciones</TableCell >
                            </TableRow >
                        </TableHead >
                        < TableBody >
                            {
                                (searched ?
                                    edadesBeneficiariosList.filter(row => row.dsedadbeneficiario ?
                                        row.dsedadbeneficiario.toLowerCase().includes(searched.toLowerCase()) : null)
                                    : edadesBeneficiariosList
                                ).map(row => {
                                    console.log("page:" + page + " size:" + size)
                                    return (
                                        < TableRow key={row.id}>
                                            <TableCell>
                                                <Checkbox
                                                    checked={row.boactivo}
                                                    color="primary"
                                                    inputProps={{ 'aria-label': 'Checkbox A' }}
                                                />
                                            </TableCell>
                                            <TableCell>{row.id}</TableCell>
                                            <TableCell>{row.dsedadbeneficiario}</TableCell >
                                            <TableCell >{moment(row.fcfechacreacion).format("MMMM DD YYYY, h:mm:ss a")}</TableCell>
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
                        count={total}
                        rowsPerPage={size}
                        page={page}
                    />
                </CardBody>
            </Card>
            <Modal>
                <EdadesBeneficiariosForm />
            </Modal>
            <ModalDelete
                handleDeshabilitar={handleDeshabilitar}
            />
            <ModalUpdate>
                <EdadesBeneficiariosEdit edadesBeneficiariosSeleccionado={edadesBeneficiariosSeleccionado} />
            </ModalUpdate>
        </GridItem>

    )

}