import React, { useContext, useEffect, useState } from 'react';
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
import { ModalContext } from 'contexts/modalContex';
import { Modal } from 'commons/Modal';
import { useTranslation } from 'react-i18next';
import { ModalDelete } from 'commons/ModalDelete';
import { ModalContextDelete } from 'contexts/modalContexDelete';
import { ModalContextUpdate } from 'contexts/modalContexUpdate';
import { ModalUpdate } from 'commons/ModalUpdate';
import { Mensaje } from 'components/Personalizados/Mensaje';
import { LocalidadesContext } from 'contexts/catalogos/Localidades/localidadesContext';
import { MunicipiosContext } from 'contexts/catalogos/MunicipiosContext';
import { LocalidadForm } from './LocalidadForm';
import { LocalidadEdit } from './LocalidadEdit';

const useStyles = makeStyles(stylesArchivo);

export const LocalidadScreen = () => {

    const { t } = useTranslation();
    const classes = useStyles();
    const [searched, setSearched] = useState('');
    const [idEliminar, setIdEliminar] = useState(0);
    const { setShowModalDelete } = useContext(ModalContextDelete);
    const [objetoActualizar, setObjetoActualizar] = useState();
    const {
        get,
        localidadesList,
        size,
        page,
        total,
        changePageSize,
        changePage,
        eliminar
    } = useContext(LocalidadesContext);
    const { setShowModal } = useContext(ModalContext);
    const { getMunicipiosId } = useContext(MunicipiosContext);
    const { setShowModalUpdate } = useContext(ModalContextUpdate);
    const [error, setError] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [msjConfirmacion, setMsjConfirmacion] = useState('');
    const [openDialog, setOpenDialog] = useState(false);

    const handleChangePage = (event, newPage) => {
        changePage(newPage)
    };

    const handleChangeRowsPerPage = event => {
        changePageSize(+event.target.value);
        changePage(0)
    };

    const addDialog = () => {
        setShowModal(true);
    }

    useEffect(() => {
        get();
    }, []);

    useEffect(() => {
        getMunicipiosId();

    }, []);

    const deleteDialog = (e) => {
        setShowModalDelete(true);
        setIdEliminar(e);
    }

    const handleDeshabilitar = () => {
        eliminar(idEliminar)
        setShowModalDelete(false);
        setOpenDialog(false);
        setOpenSnackbar(true);
        setMsjConfirmacion(`${t('msg.registroinhabilitadoexitosamente')}`);
    }

    const onSelect = (e) => {
        setShowModalUpdate(true);
        setObjetoActualizar(e);
    }

    return (
        <GridItem xs={12} sm={12} md={12}>
            <Card>
                <CardHeader color="primary">
                    <h4 className={classes.cardTitleWhite}>{t('pnl.localidades')}</h4>

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
                  < TableRow key="898as" >
                    < TableCell align="center">{t('dgv.estatus')}</TableCell >
                    < TableCell align="center">{t('dgv.clave')} </TableCell >
                    < TableCell align="center">{t('dgv.localidad')}</TableCell >
                    < TableCell align="center">{t('dgv.cp')}</TableCell >
                    < TableCell align="center">{t('dgv.registro')}</TableCell >
                    < TableCell colSpan={2} align="center">{t('dgv.acciones')}</TableCell >
                  </TableRow >
                </TableHead >
                < TableBody >
                  {
                       (searched ?
                        localidadesList.filter(row => row.dslocalidad ?
                          row.dslocalidad.toLowerCase().includes(searched.toLowerCase()) : null)
                        : localidadesList
                      ).map((row, i) => {
                        return (
                            < TableRow key={i}>
                            <TableCell align="center">
                                
                                {row.activo ? 'Activo':'Inactivo'}
                            </TableCell>
                            <TableCell align="center">{row.dsclavelocalidad}</TableCell>
                            <TableCell align="center">{row.dslocalidad}</TableCell>
                            <TableCell align="center">{row.dscodigopostal}</TableCell >
                            <TableCell align="center">{moment(row.fechaRegistro).format("MMMM DD YYYY, h:mm:ss a")}</TableCell>
                            <TableCell align="center">
                                <IconButton aria-label="create" onClick={() => onSelect(row)}>
                                    <CreateIcon />
                                </IconButton>
                            </TableCell>
                            <TableCell align="center">
                                <IconButton aria-label="create" onClick={() => deleteDialog(row)}>
                                    {(row.activo) ? <BlockIcon /> : <BlockIcon />}
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
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
              />
          </CardBody>
            </Card>

            <Modal>
                <LocalidadForm />
            </Modal>
            <ModalDelete
                handleDeshabilitar={handleDeshabilitar}
            />
            <ModalUpdate>
                <LocalidadEdit objetoActualizar={objetoActualizar} />
            </ModalUpdate>
            <Mensaje
                setOpen={setOpenSnackbar}
                open={openSnackbar}
                severity={error ? "error" : "success"}
                message={msjConfirmacion}
            />


        </GridItem>)

}