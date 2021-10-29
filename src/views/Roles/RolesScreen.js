import React, { useEffect, useState, useContext } from 'react';
import Checkbox from '@material-ui/core/Checkbox';

// core components
import { Collapse, DialogContent, FormHelperText, List, ListItem, ListItemIcon, ListItemText, ListSubheader, MenuItem, TextField } from '@material-ui/core';
import Button from "components/CustomButtons/Button.js";
import { useDispatch, useSelector } from 'react-redux';
import 'moment/locale/es';
import { makeStyles } from "@material-ui/core/styles";
import { stylesArchivo } from 'css/stylesArchivo';
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";

import { obtenerRolesAction } from 'actions/rolesKeycloakAction';
import { ModuloContext } from 'contexts/moduloContext';
import { SubModuloContext } from 'contexts/subModuloContext';
import { PerfilSubmoduloStartAddNew } from 'actions/perfilSubmoduloAction';

import { SubmodulosByPerfilContex } from 'contexts/submodulosByPerfilContex';
import { useHistory } from "react-router";
import { Mensaje } from "components/Personalizados/Mensaje";
import { Loading } from "components/Personalizados/Loading";
import { ModalConfirmacion } from 'commons/ModalConfirmacion';
import { ModalContextConfirmacion } from 'contexts/modalContextConfirmacion';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles(stylesArchivo);

const initPerfiles = {
    idPerfil: '',
    idModulo: []
}



export const RolesScreen = () => {
    const { t } = useTranslation();
    const classes = useStyles();
    const dispatch = useDispatch();


    const { getModulos, moduloList } = useContext(ModuloContext);
    const { getSubModulos, submoduloList } = useContext(SubModuloContext);
    const { getSubmodulosByperfil, submodulosPerfilList } = useContext(SubmodulosByPerfilContex);
    const [errors, setErrors] = useState({});
    const [checked, setChecked] = React.useState([-1]);
    const [checkedSub, setCheckedSub] = React.useState([0]);
    const [modulosChecked, setModulosChecked] = React.useState([]);
    const [subModulosChecked, setSubModulosChecked] = React.useState([]);
    const [idPerfilSelected, setIdPerfilSelected] = React.useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [msjConfirmacion, setMsjConfirmacion] = useState('');
    let history = useHistory();

    useEffect(() => {

        const cargarRolesActivos = () => dispatch(obtenerRolesAction());
        cargarRolesActivos();
        getModulos();
        getSubModulos();
    }, []);


    const { roles } = useSelector(state => state.roles);
    const [open] = React.useState(true);

    //dialog confirmacion
    const [valores, setValores] = useState();
    const { setShowModalConfirmacion } = useContext(ModalContextConfirmacion);
    /**
     * abre el dialogo de confirmación
     * @param {valores} e 
     */
    const confirmacionDialog = (e) => {
        console.log("Aqui hace el llamado al dialog", e);
        setShowModalConfirmacion(true);
        setValores(e)
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
            var modules3 = [...checkedSub]
            var modulesCK3 = [...subModulosChecked]
            submoduloList.forEach((sb, i) => {
                if (sb.crcModulosCollection === id.id) {

                    modules3 = modules3.filter(word => word !== i);
                    modulesCK3 = modulesCK3.filter(word => word !== sb.id);

                }
            })
            //agrega los index de los submodulos a activar
            setCheckedSub(modules3);
            //agrega los modulos a guardar
            setSubModulosChecked(modulesCK3)


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
        const errores = {};
        console.log('entro handleSavePerfiles =>');
        /**
         * Aqui estaba la constante de errors
         */

        if (idPerfilSelected === '') {
            errores.idPerfil = "El campo perfil es obligatorio";
        }

        if (!isObjEmpty(errores)) {
            setErrors(errores);
            return;
        }

        let submodulos = []
        subModulosChecked.forEach((it) => {
            submodulos.push(it)
        })

        var data = {
            'iPerfil': idPerfilSelected,
            'idUsuario': sessionStorage.getItem('idUSuario'),
            'submodulos': submodulos

        }
        console.log('Nuevo sent =>', data)
        confirmacionDialog(data);

    }

    const handleRegistrar = () => {


        PerfilSubmoduloStartAddNew(valores).then(response => {
            setOpenSnackbar(true);

            setMsjConfirmacion(`${t('msg.registroguardadoexitosamente')}`);

            const timer = setTimeout(() => {
                setLoading(false);
                setError(false);
                history.push("/admin/")

            }, 1000);
            return () => clearTimeout(timer);
        })

        setShowModalConfirmacion(false);

    }





    useEffect(() => {
        setChecked([])
        setCheckedSub([])
        setModulosChecked([])
        setSubModulosChecked([])
        getSubmodulosByperfil(idPerfilSelected)

    }, [idPerfilSelected]);

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
            {/*
            <Button type="submit" color="primary" onClick={handleSavePerfiles} style={{ right: '0px', position: 'absolute' }}>
                {t('btn.guardar')}
            </Button>
        */}

            <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                    <Card>
                        <CardHeader color="primary"> Administración de perfiles </CardHeader>

                        <CardBody>
                            <GridContainer>
                                <GridItem xs={12} sm={12} md={12} style={{textAlign:'right'}}>
                                <Button type="submit" color="primary" onClick={handleSavePerfiles} >
                                            {t('btn.guardar')}
                                        </Button>
                                   
                                </GridItem>
                                <GridItem xs={12} sm={12} md={12}>
                                    <DialogContent>
                                        <TextField
                                            variant="outlined"
                                            label="Selecciona un perfil"
                                            select
                                            fullWidth
                                            error={errors.idPerfil}
                                            name="idPerfilSelected"
                                            value={idPerfilSelected}
                                            onChange={(e) => setIdPerfilSelected(e.target.value)}
                                        >
                                            <MenuItem value="0">
                                                <em>{t('cmb.ninguno')}</em>
                                            </MenuItem>
                                            {console.log('ROLES=>', roles)}
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

                                        {errors.idPerfil && <FormHelperText error={errors.idPerfil !== null && errors.idPerfil !== undefined}>{errors.idPerfil}</FormHelperText>}
                                    </DialogContent>
                                </GridItem>

                                <GridItem xs={12} sm={12} md={12}>

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

                                </GridItem>

                                <GridItem xs={12} sm={12} md={12}>
                                    <Button type="submit" color="primary" onClick={handleSavePerfiles}>
                                        {t('btn.guardar')}
                                    </Button>
                                </GridItem>


                                <GridItem xs={12} sm={12} md={12}>

                                    <Mensaje
                                        setOpen={setOpenSnackbar}
                                        open={openSnackbar}
                                        severity={error ? "error" : "success"}
                                        message={msjConfirmacion}
                                    />

                                    <Loading
                                        loading={loading}
                                    />

                                    <ModalConfirmacion
                                        handleRegistrar={handleRegistrar} evento="Registrar"
                                    />
                                </GridItem>
                            </GridContainer>
                        </CardBody>
                    </Card>
                </GridItem>
            </GridContainer>










        </>
    )
}
