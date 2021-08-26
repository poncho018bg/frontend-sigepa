import React, { useEffect, useState, useContext } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import { useForm } from 'hooks/useForm';
// core components
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import { Collapse, DialogActions, DialogContent, FormHelperText, List, ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText, ListSubheader, MenuItem, Table, TableBody, TableCell, TableHead, TablePagination, TableRow, TextField } from '@material-ui/core';
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
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';

import ExpandMore from '@material-ui/icons/ExpandMore';


import { obtenerRolesAction } from 'actions/rolesKeycloakAction';
import { ExpandLess, StarBorder } from '@material-ui/icons';
import { ModuloContext } from 'contexts/moduloContext';
import { SubModuloContext } from 'contexts/subModuloContext';
import { PerfilSubmoduloStartAddNew } from 'actions/perfilSubmoduloAction';
import UserService from 'servicios/UserService';
import { SubmodulosByPerfilContex } from 'contexts/submodulosByPerfilContex';



const useStyles = makeStyles(stylesArchivo);

const initPerfiles = {
    idPerfil: '',
    idModulo: []
}



export const RolesScreen = () => {

    const classes = useStyles();
    const dispatch = useDispatch();

    const [formValues, handleInputChange, setValues] = useForm(initPerfiles);
    const { getModulos, moduloList } = useContext(ModuloContext);
    const { getSubModulos, submoduloList } = useContext(SubModuloContext);
    const { getSubmodulosByperfil, submodulosPerfilList } = useContext(SubmodulosByPerfilContex);
    const { idPerfil, idModulo } = formValues;
    const [errors, setErrors] = useState({});
    const [checked, setChecked] = React.useState([-1]);
    const [checkedSub, setCheckedSub] = React.useState([0]);
    const [modulosChecked, setModulosChecked] = React.useState([]);
    const [subModulosChecked, setSubModulosChecked] = React.useState([]);

    useEffect(() => {

        const cargarRolesActivos = () => dispatch(obtenerRolesAction());
        cargarRolesActivos();
        getModulos();
        getSubModulos();
    }, []);


    const { roles } = useSelector(state => state.roles);
    const [open, setOpen] = React.useState(true);

    const handleClose = () => {
        props.setShowDialogForm(false);
        setErrors({});
    }

    const compareModSub = (mod, sub, indxS, indxM, labelId) => {

        if (mod.id === sub.crcModulosCollection) {
            return (
                <Collapse in={open} timeout="auto" unmountOnExit >
                    <List component="div" disablePadding style={{ left: `5em` }}   >
                        <ListItem button className={classes.nested} key={indxS} role={undefined} dense button onClick={handleToggleSub(indxS, sub)}>
                            <ListItemIcon>

                                <Checkbox
                                    edge="start"
                                    checked={checkedSub.indexOf(indxS) !== -1}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{ 'aria-labelledby': labelId }}
                                />
                            </ListItemIcon>

                            <ListItemText id={labelId} primary={` ${sub.dssubmodulo}`} />
                        </ListItem>
                    </List>
                </Collapse>
            )
        } else {
            return (<></>)
        }

    }


    const handleToggle = (value, id) => () => {
        const idMod = id.id
        var modules = [...modulosChecked]
        if (modules.find(element => element === idMod)) {
            modules = modules.filter(item => item !== idMod)
        } else {
            modules.push(idMod)
        }

        setModulosChecked(modules)

        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }
        //console.log('Modulos=>', checked, modulosChecked)
        setChecked(newChecked);

        //selecciona todos los submodulos couando este activo
        if (currentIndex === -1) {
            let lstSub = []
            var modules2 = [...checkedSub]
            var modulesCK2 = [...subModulosChecked]
            submoduloList.forEach((sb, i) => {
                if (sb.crcModulosCollection === id.id) {

                    modulesCK2.push(sb.id)
                    modules2.push(i)

                }
            })
            //agrega los index de los submodulos a activar
            setCheckedSub(modules2);
            //agrega los modulos a guardar
            setSubModulosChecked(modulesCK2)

        } else {
            //quitara los check activo de todos los submodulos
            let lstSub = []
            var modules2 = [...checkedSub]
            var modulesCK2 = [...subModulosChecked]
            submoduloList.forEach((sb, i) => {
                if (sb.crcModulosCollection === id.id) {

                    modules2 = modules2.filter(word => word !== i);
                    modulesCK2 = modulesCK2.filter(word => word !== sb.id);

                }
            })
            //agrega los index de los submodulos a activar
            setCheckedSub(modules2);
            //agrega los modulos a guardar
            setSubModulosChecked(modulesCK2)


        }
    };

    const handleToggleSub = (value, id) => () => {


        //obtiene el index -1 activo y 0 no activo
        const currentIndex = checkedSub.indexOf(value);
        const newChecked = [...checkedSub];
        console.log('currentIndex', currentIndex)
        //obtiene el id 
        const idMod = id.id
        var modules = [...subModulosChecked]

        if (currentIndex === -1) {
            modules.push(idMod)
        } else {
            modules.splice(modules.indexOf(idMod), modules.indexOf(idMod))
        }

        // console.log('find=>',modules.find(element => element === idMod)!== undefined)
        // if (modules.find(element => element === idMod)!== undefined) {
        //     modules = modules.filter(item => item !== idMod)
        // } else {
        //     modules.push(idMod)
        // }

        setSubModulosChecked(modules)
        console.log('subModulosChecked=>', subModulosChecked)
        //obtiene los index para poner check


        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }
        console.log('checkedSub=>', checkedSub)

        setCheckedSub(newChecked);
    };

    const isObjEmpty = (obj) => {
        return Object.keys(obj).length === 0 && obj.constructor === Object;
    }

    const handleSavePerfiles = () => {
        setErrors({});
        console.log('entro handleSavePerfiles =>')
        const errors = {};

        if (idPerfil === '') {
            errors.idPerfil = "El campo perfil es obligatorio";
        }

        if (!isObjEmpty(errors)) {
            setErrors(errors);
            return;
        }

        let submodulos = []
        subModulosChecked.forEach((it) => {
            submodulos.push(it)
        })

        var data = {
            'iPerfil': idPerfil,
            'idUsuario': UserService.getIdUSuario(),
            'submodulos': submodulos

        }
        console.log('Nuevo sent =>', data)
        dispatch(PerfilSubmoduloStartAddNew(data))
        props.setShowDialogForm(true)
    }




    useEffect(() => {
        setChecked([])
        setCheckedSub([])
        setModulosChecked([])
        setSubModulosChecked([])
        getSubmodulosByperfil(idPerfil)

    }, [idPerfil]);

    useEffect(() => {

        var subCk = []
        var modules = []
        submoduloList.forEach((sub, i) => {
            submodulosPerfilList.forEach(bsub => {
                if (bsub.submodulo_id === sub.id) {
                    subCk.push(i)
                    //agrega a la lista de seleccionados              
                    modules.push(sub.id)
                }
            })

        })
        console.log('b.->', modules)
        setSubModulosChecked(modules)
        console.log('c.->', subModulosChecked)
        setCheckedSub(subCk)


    }, [submodulosPerfilList]);



    return (
        <>

            <DialogContent>
                <TextField
                    variant="outlined"
                    label="Selecciona un perfil"
                    select
                    fullWidth
                    error={errors.idPerfil !== null && errors.idPerfil !== undefined}
                    name="idPerfil"
                    value={idPerfil}
                    onChange={handleInputChange}
                >
                    <MenuItem value="0">
                        <em>Ninguno</em>
                    </MenuItem>
                    {
                        roles.map(
                            item => (
                                <MenuItem
                                    key={item.id}
                                    value={item.id}>
                                    {item.name}
                                </MenuItem>
                            )
                        )
                    }
                </TextField>
                {errors.idPerfil && <FormHelperText error={errors.idPerfil}>{errors.idPerfil}</FormHelperText>}
            </DialogContent>

            <List
                component="nav"
                aria-labelledby="nested-list-subheader"
                subheader={
                    <ListSubheader component="div" id="nested-list-subheader">
                        Modulos
                    </ListSubheader>
                }
                className={classes.root}
            >
                {
                    moduloList.map((index, i) => {
                        const labelId = `checkbox-list-label-${i}`;
                        return (
                            <>

                                <ListItem key={i} role={undefined} dense button onClick={handleToggle(i, index)}>
                                    <ListItemIcon>
                                        <Checkbox
                                            edge="start"
                                            checked={checked.indexOf(i) !== -1}
                                            tabIndex={-1}
                                            disableRipple
                                            inputProps={{ 'aria-labelledby': labelId }}
                                        />
                                    </ListItemIcon>
                                    <ListItemText id={labelId} primary={` ${index.dsmodulo}`} />

                                </ListItem>
                                {submoduloList.map((indexs, j) => {
                                    const labelIdS = `checkbox-list-label-${j}`;
                                    return (
                                        //(mod, sub,indxS, indxM, labelId)
                                        compareModSub(index, indexs, j, i, labelIdS)
                                    )
                                }

                                )}
                            </>

                        )

                    })
                }



            </List>

            <Button type="submit" color="primary" onClick={handleSavePerfiles}>
                Guardar
            </Button>




        </>
    )
}