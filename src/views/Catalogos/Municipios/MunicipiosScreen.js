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

import moment from 'moment';
import 'moment/locale/es';
import CreateIcon from '@material-ui/icons/Create';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import RefreshIcon from '@material-ui/icons/Refresh';
import SearchBar from "material-ui-search-bar";
import CardActions from '@material-ui/core/CardActions';
import { makeStyles } from "@material-ui/core/styles";
import { stylesArchivo } from 'css/stylesArchivo';
import { ModalContext } from 'contexts/modalContex';
import { Modal } from 'commons/Modal';
import { ModalDelete } from 'commons/ModalDelete';
import { ModalContextDelete } from 'contexts/modalContexDelete';
import { ModalContextUpdate } from 'contexts/modalContexUpdate';
import { ModalUpdate } from 'commons/ModalUpdate';
import { MunicipiosContext } from 'contexts/catalogos/MunicipiosContext';
import { MunicipioForm } from './MunicipioForm';
import { MunicipioFormEdit } from './MunicipioFormEdit';
import { EstadosContext } from 'contexts/catalogos/EstadosContext';

const useStyles = makeStyles(stylesArchivo);

export const MunicipiosScreen = () => {

    const classes = useStyles();
    const [searched, setSearched] = useState('');
    const [idEliminar, setIdEliminar] = useState(0);
    const [municipioSeleccionada, setMunicipioSeleccionada] = useState();

    const { municipiosList, getMunicipios, eliminarMunicipio } = useContext(MunicipiosContext);
    const { getEstadoByIdHetoas, estado } = useContext(EstadosContext);
    const { setShowModal } = useContext(ModalContext);
    const { setShowModalDelete } = useContext(ModalContextDelete);
    const { setShowModalUpdate }
        = useContext(ModalContextUpdate);

    useEffect(() => {
        getMunicipios();

    }, []);

    useEffect(() => {
        if(municipioSeleccionada !== undefined){
            const { _links: { estadoId: { href } } } = municipioSeleccionada
            console.log('ID=>',href)
            getEstadoByIdHetoas(href);

        }
       

    }, [municipioSeleccionada]);

    useEffect(() => {
        console.log('ESTADOOO=>',estado)

    }, [estado  ]);

    const total = 0;
    const size = 0;
    const page = 0;

    const onSelect = (e) => {
        setShowModalUpdate(true);
         
        setMunicipioSeleccionada(e);
    }
    const addDialog = () => {
        setShowModal(true);
    }
    const deleteDialog = (e) => {
        setShowModalDelete(true);
        setIdEliminar(e.id);
    }
    const handleDeshabilitar = () => {
        eliminarMunicipio(idEliminar)
        setShowModalDelete(false);
    }



    return (
        <GridItem xs={12} sm={12} md={12}>

            <Card>
                <CardHeader color="primary">
                    <h4 className={classes.cardTitleWhite}>Municipios</h4>
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
                                < TableCell> Clave municipio</TableCell >
                                < TableCell> Municipio</TableCell >
                                < TableCell> Fecha Registro</TableCell >
                                < TableCell colSpan={2} align="center"> Acciones</TableCell >
                            </TableRow >
                        </TableHead >
                        < TableBody >
                            {
                                (searched ?
                                    municipiosList.filter(row => row.dsmunicipio ?
                                        row.dsmunicipio.toLowerCase().includes(searched.toLowerCase()) : null)
                                    : municipiosList
                                ).map(row => {
                                    console.log("page:" + page + " size:" + size)
                                    return (
                                        < TableRow key={row.id}>
                                            <TableCell>
                                                <Checkbox
                                                    checked={row.activo}
                                                    color="primary"
                                                    inputProps={{ 'aria-label': 'Checkbox A' }}
                                                />
                                            </TableCell>
                                            <TableCell>{row.id}</TableCell>
                                            <TableCell>{row.dsclavemunicipio}</TableCell >
                                            <TableCell>{row.dsmunicipio}</TableCell >
                                            <TableCell >{moment(row.fechaRegistro).format("MMMM DD YYYY, h:mm:ss a")}</TableCell>
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
                <MunicipioForm />
            </Modal>
            <ModalDelete
                handleDeshabilitar={handleDeshabilitar}
            />
            <ModalUpdate>
                <MunicipioFormEdit municipioSeleccionada={municipioSeleccionada} />
            </ModalUpdate>
        </GridItem>

    )
}