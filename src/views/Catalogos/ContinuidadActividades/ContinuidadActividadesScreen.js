import React, { useContext, useEffect, useState } from 'react';
// core components
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import { Table, TableBody, TableCell, TableHead, TablePagination, TableRow, Grid } from '@material-ui/core';
import Button from "components/CustomButtons/Button.js";
import Add from "@material-ui/icons/Add";


import 'moment/locale/es';
import CreateIcon from '@material-ui/icons/Create';
import IconButton from '@material-ui/core/IconButton';
import BlockIcon from '@material-ui/icons/Block';
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
import { ContinuidadActividadesForm } from './ContinuidadActividadesForm';
import { ContinuidadActividadesEdit } from './ContinuidadActividadesEdit';
import { ActividadesContinuarContext } from 'contexts/catalogos/ActividadesContinuarContext';
import { Mensaje } from 'components/Personalizados/Mensaje';
import { useTranslation } from 'react-i18next';
const useStyles = makeStyles(stylesArchivo);

export const ContinuidadActividadesScreen = () => {
    const { t } = useTranslation();
    const classes = useStyles();
    const [searched] = useState('');
    const [idEliminar, setIdEliminar] = useState(0);
    const [continuidadActividadesSeleccionada, setContinuidadActividadesSeleccionada] = useState();

    const { actividadescontinuarList, getActividadesContinuar, eliminarActividadesContinuar,
         actualizarActividadesContinuar, size, page, 
         total,  changePage,changePageSizes,getActividadesContinuarByParametros } = useContext(ActividadesContinuarContext);
    const { setShowModal } = useContext(ModalContext);
    const { setShowModalDelete } = useContext(ModalContextDelete);
    const { setShowModalUpdate } = useContext(ModalContextUpdate);
    const [error] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [msjConfirmacion, setMsjConfirmacion] = useState('');
    const [ setOpenDialog] = useState(false);

    useEffect(() => {
        getActividadesContinuar();
    }, []);

    useEffect(() => {
        getActividadesContinuar();
    }, [size,page]);




    const onSelect = (e) => {
        setShowModalUpdate(true);
        setContinuidadActividadesSeleccionada(e);
    }

    const addDialog = () => {
        setShowModal(true);
    }

    const deleteDialog = (e) => {
        setShowModalDelete(true);
        setIdEliminar(e);
    }

    const handleDeshabilitar = () => {
        eliminarActividadesContinuar(idEliminar)
        setShowModalDelete(false);
        setOpenDialog(false);
        setOpenSnackbar(true);
        setMsjConfirmacion(`${t('msg.registroguardadoexitosamente')}`);
    }

    const handleChangeCheck = (event) => {
        console.log("funciona re bien espero ---->", event.target);
        console.log("funciona re bien espero ---->",
            event.target.checked);
        console.log("funciona re bien espero ---->", event.target.name);
        const activo = event.target.checked;
        const lista = actividadescontinuarList.map((r) => {
            if (r.id === event.target.name) {
                console.log("antiguo r", r)
                const nuevaR = { ...r, activo };
                console.log("nuevo r", nuevaR);
                actualizarActividadesContinuar(nuevaR);
                return { ...r, activo };
            }
            return r;
        });
        console.log("actividades ---> ", lista);
    }

    const handleChangePage = (event, newPage) => {        
        changePage(newPage)       
    };

    const handleChangeRowsPerPage = event => {              
        changePageSizes(+event.target.value);
        changePage(0)       
        
    };

    const buscaPorParametros = (search) => {
        if(search === ''){
            getActividadesContinuar();
        }else{
            getActividadesContinuarByParametros(search)
        }
       
    }


    return (
        <GridItem xs={12} sm={12} md={12}>

            <Card>
                <CardHeader color="primary">
                    <h4 className={classes.cardTitleWhite}>{t('pnl.actividadesrealizarparacontinuarbeneficio')}</h4>
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
                                    placeholder={t('lbl.buscar')}
                                    value={searched}
                                    onChange={(searchVal) => buscaPorParametros(searchVal)}
                                    onCancelSearch={() => buscaPorParametros('')}
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
                                < TableCell align="center">{t('dgv.descripciondeactividad')}</TableCell>
                                < TableCell colSpan={2} align="center">{t('dgv.acciones')}</TableCell >
                            </TableRow >
                        </TableHead >
                        < TableBody >
                            {
                                actividadescontinuarList.map(row => {
                                    console.log("page:" + page + " size:" + size)
                                    return (
                                        < TableRow key={row.id}>
                                            <TableCell align="center">
                                            {row.activo === true ? 'Activo':'Inactivo'}
                                            </TableCell>
                                            <TableCell align="center">{row.dsactividadcontinuidad}</TableCell >
                                            
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
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                </CardBody>
            </Card>
            <Modal>
                <ContinuidadActividadesForm />
            </Modal>
            <ModalDelete
                handleDeshabilitar={handleDeshabilitar}
            />
            <ModalUpdate>
                <ContinuidadActividadesEdit continuidadActividadesSeleccionada={continuidadActividadesSeleccionada} />
            </ModalUpdate>

            <Mensaje
                setOpen={setOpenSnackbar}
                open={openSnackbar}
                severity={error ? "error" : "success"}
                message={msjConfirmacion}
            />
        </GridItem>

    )
}