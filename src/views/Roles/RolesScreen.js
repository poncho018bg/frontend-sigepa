import React, { useEffect, useState, useContext } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import { useForm } from 'hooks/useForm';
// core components
import { Collapse, DialogContent, FormHelperText, List, ListItem, ListItemIcon, ListItemText, ListSubheader, MenuItem, TextField } from '@material-ui/core';
import Button from "components/CustomButtons/Button.js";
import { useDispatch, useSelector } from 'react-redux';
import 'moment/locale/es';
import { makeStyles } from "@material-ui/core/styles";
import { stylesArchivo } from 'css/stylesArchivo';


import { obtenerRolesAction } from 'actions/rolesKeycloakAction';
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

    const [formValues, handleInputChange] = useForm(initPerfiles);
    const { getModulos, moduloList } = useContext(ModuloContext);
    const { getSubModulos, submoduloList } = useContext(SubModuloContext);
    const { getSubmodulosByperfil, submodulosPerfilList } = useContext(SubmodulosByPerfilContex);
    const { idPerfil } = formValues;
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
    const [open] = React.useState(true);


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
       
        setChecked(newChecked);

        //selecciona todos los submodulos couando este activo
        if (currentIndex === -1) {
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
        console.log('entro handleSavePerfiles =>');
        /**
         * Aqui estaba la constante de errors
         */

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