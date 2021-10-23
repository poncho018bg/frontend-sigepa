import React, { useContext, useEffect, useState } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
// core components
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import { Table, TableBody, TableCell, TableHead, TablePagination, TableRow,Grid } from '@material-ui/core';
import Button from "components/CustomButtons/Button.js";
import Add from "@material-ui/icons/Add";
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import 'moment/locale/es';
import CreateIcon from '@material-ui/icons/Create';
import IconButton from '@material-ui/core/IconButton';
import BlockIcon from '@material-ui/icons/Block';
import SearchBar from "material-ui-search-bar";
import CardActions from '@material-ui/core/CardActions';

import { makeStyles } from "@material-ui/core/styles";
import { stylesArchivo } from 'css/stylesArchivo';

//contexts
import { ComiteSecretariasContext } from 'contexts/catalogos/comiteSecretariasContext';
import { ModalContext } from 'contexts/modalContex';
import { Modal } from 'commons/Modal';


import { ComiteSecretariasForm } from './ComiteSecretariasForm';
import { ComiteSecretariasEdit } from './ComiteSecretariasEdit';

import { ModalDelete } from 'commons/ModalDelete';
import { ModalContextDelete } from 'contexts/modalContexDelete';
import { ModalContextUpdate } from 'contexts/modalContexUpdate';
import { ModalUpdate } from 'commons/ModalUpdate';

const useStyles = makeStyles(stylesArchivo);

export const ComiteSecretariasScreen = () => {
    const { t } = useTranslation();
    const classes = useStyles();
    const [searched, setSearched] = useState('');
    const [idEliminar, setIdEliminar] = useState(0);
    const [comiteSecretariasSeleccionado, setComiteSecretariasSeleccionado] = useState();
    const { getComiteSecretarias, eliminarComiteSecretarias, comiteSecretariasList } = useContext(ComiteSecretariasContext);
    const { setShowModal } = useContext(ModalContext);
    const { setShowModalDelete } = useContext(ModalContextDelete);

    const { setShowModalUpdate }= useContext(ModalContextUpdate);

    useEffect(() => {
        getComiteSecretarias();
        // eslint-disable-next-line
        console.log("tipo de apoyo", comiteSecretariasList);
    }, []);

    const total = 0;
    const size = 0;
    const page = 0;

    const onSelect = (e) => {
        setShowModalUpdate(true);
        setComiteSecretariasSeleccionado(e);
    }

    const addDialog = () => {
        setShowModal(true);
    }

    const deleteDialog = (e) => {
        setShowModalDelete(true);
        setIdEliminar(e.id);
    }


    const handleDeshabilitar = () => {
        eliminarComiteSecretarias(idEliminar)
        setShowModalDelete(false);
    }

    return (
        <GridItem xs={12} sm={12} md={12}>

            <Card>
                <CardHeader color="primary">
                    <h4 className={classes.cardTitleWhite}>Comites Secretarías</h4>
                    <p className={classes.cardCategoryWhite}>
                        Esta pantalla permite agregar los comites de secretarías
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
                                    placeholder={t('lbl.buscar')}
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
                                < TableCell align="center"> Estado</TableCell >
                                < TableCell align="center"> Descripcion tipo beneficiario</TableCell >
                                < TableCell align="center"> Fecha registro</TableCell >
                                < TableCell colSpan={2} align="center"> Acciones</TableCell >
                            </TableRow >
                        </TableHead >
                        < TableBody >
                            {
                                (searched ?
                                    comiteSecretariasList.filter(row => row.dssecretaria ?
                                        row.dssecretaria.toLowerCase().includes(searched.toLowerCase()) : null)
                                    : comiteSecretariasList
                                ).map(row => {
                                    console.log("page:" + page + " size:" + size)
                                    return (
                                        < TableRow key={row.id}>
                                            <TableCell align="center">
                                                <Checkbox
                                                    checked={row.boactivo}
                                                    color="primary"
                                                    inputProps={{ 'aria-label': 'Checkbox A' }}
                                                />
                                            </TableCell>
                                            <TableCell align="center">{row.dssecretaria}</TableCell >
                                            <TableCell align="center">{moment(row.fcfechacreacion).format("MMMM DD YYYY, h:mm:ss a")}</TableCell>
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
                        count={total}
                        rowsPerPage={size}
                        page={page}
                    />
                </CardBody>
            </Card>
            <Modal>
                <ComiteSecretariasForm />
            </Modal>
            <ModalDelete
                handleDeshabilitar={handleDeshabilitar}
            />
            <ModalUpdate>
                <ComiteSecretariasEdit comiteSecretariasSeleccionado={comiteSecretariasSeleccionado} />
            </ModalUpdate>
        </GridItem>

    )

}