
import { Checkbox, DialogTitle, FormControlLabel, FormHelperText, FormLabel, Grid, List, ListItem, ListItemIcon, ListItemText, makeStyles, MenuItem, Paper, Radio, RadioGroup, TextField } from '@material-ui/core'
import React, { useEffect, useState, useContext } from 'react';
import { useForm } from 'hooks/useForm';
import Button from "components/CustomButtons/Button.js";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { useDispatch, useSelector } from 'react-redux';
import { stylesArchivo } from 'css/stylesArchivo';
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { TiposApoyosContext } from 'contexts/catalogos/tiposApoyosContext';
import { EdadesBeneficiariosContext } from 'contexts/catalogos/edadesBeneficiariosContext';
import { TiposBeneficiariosContext } from 'contexts/catalogos/tiposBeneficiariosContext';
import { PeriodicidadApoyosContext } from 'contexts/catalogos/periodicidadApoyosContext';
import { DocumentosContext } from 'contexts/catalogos/documentosContext';
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import moment from 'moment';
import 'moment/locale/es';
import { ApoyoContext } from 'contexts/catalogos/ApoyoContext';
import { ProgramasContext } from 'contexts/catalogos/Programas/programasContext';
const useStyles = makeStyles(stylesArchivo);



// const initTipoApoyo = {


// }

function not(a, b) {
    return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
    return a.filter((value) => b.indexOf(value) !== -1);
}

export const DialogTipoApoyoForm = (props) => {

    const dispatch = useDispatch();
    const classes = useStyles();
    // const [formValues, handleInputChange, reset, setValues] = useForm(initTipoApoyo);
    // const {
    //     dsapoyo,
    //     nombrePrograma,
    //     clavePrograma,
    //     dsdescripcion,
    //     estatus,
    //     visita,
    //     idTipoApoyo,
    //     fcvigenciainicio,
    //     fcvigenciafin,
    //     idRangoEdadBeneficiario,
    //     idBeneficiario,
    //     cantidadPesos,
    //     descApoyoEspecie,
    //     idPeriodicidad,
    //     observaciones,
    //     formaEntrega
    // } = formValues;
    // const [errors, setErrors] = useState({});
    const { tipoApoyoEditar } = useSelector(state => state.tipoApoyo);
    const { getTiposApoyos, tiposApoyosList } = useContext(TiposApoyosContext);
    const { getEdadesBeneficiarios, edadesBeneficiariosList } = useContext(EdadesBeneficiariosContext);
    const { getTipoBeneficiarios, tiposBeneficiariosList } = useContext(TiposBeneficiariosContext);
    const { getPeriodicidadApoyos, periodicidadApoyosList } = useContext(PeriodicidadApoyosContext);
    const { getDocumentos, documentosList } = useContext(DocumentosContext);
    const { registrarApoyo } = useContext(ApoyoContext);
    const { programasList, get } = useContext(ProgramasContext);

    const [checked, setChecked] = React.useState([]);
    const [left, setLeft] = React.useState([]);
    const [right, setRight] = React.useState([]);

    const leftChecked = intersection(checked, left);
    const rightChecked = intersection(checked, right);
    const [estatusf, setEstatusf] = React.useState('Activo');
    const [visitaf, setVisitaf] = React.useState('SI');
    const [state, setState] = React.useState({
        checkedA: false
    });
    const [valueStatus, setValueStatus] = React.useState('true');

    const handleChangeStatus = (event) => {
        setValueStatus(event.target.value);
    };


    useEffect(() => {
        getTiposApoyos();
        getEdadesBeneficiarios();
        getTipoBeneficiarios();
        getPeriodicidadApoyos();
        getDocumentos();
        get();
        setLeft(documentosList)
    }, []);

    useEffect(() => {
        setLeft(documentosList)
    }, [documentosList]);


    const handleClose = () => {
        props.setShowDialogForm(false);
        formik.resetForm()
    }

    // const isObjEmpty = (obj) => {
    //     return Object.keys(obj).length === 0 && obj.constructor === Object;
    // }


    // const handleAgregar = (e) => {
    //     e.preventDefault();

    //     const errors = {};
    //     if (dsidioma === '') {
    //         errors.idioma = "El nombre del idioma es requerido";
    //     }


    //     if (!isObjEmpty(errors)) {
    //         setErrors(errors);
    //         return;
    //     }


    //     props.setShowDialogForm(false);

    // }

    const formik = useFormik({
        initialValues: {
            dsapoyo: '',
            idPrograma: '',
            dsdescripcion: '',
            estatus: '',
            visita: '',
            idTipoApoyo: '',
            fcvigenciainicio: moment(new Date()).format("yyyy-MM-dd"),
            fcvigenciafin: moment(new Date()).format("yyyy-MM-dd"),
            fcregistrowebinicio: moment(new Date()).format("yyyy-MM-dd"),
            fcregistrowebfin: moment(new Date()).format("yyyy-MM-dd"),
            fcregistropresencialinicio: moment(new Date()).format("yyyy-MM-dd"),
            fcregistropresencialfin: moment(new Date()).format("yyyy-MM-dd"),
            idRangoEdadBeneficiario: '',
            idBeneficiario: '',
            cantidadPesos: '',
            enServicio: '',
            descApoyoEspecie: '',
            idPeriodicidad: '',
            observaciones: null,
            formaEntrega: false,
            numEntregas: '',
            documentosRequisitos: [],
            idActividadContinuidadApoyo: '',
            cobertura: '',
            coberturaMunicipal: [],
            idEstado: ''
        },
        validationSchema: Yup.object({
            dsapoyo: Yup.string()
                .required('El nombre del apoyo es obligatorio'),
            idPrograma: Yup.string()
                .required('El programa es obligatorio'),
            dsdescripcion: Yup.string()
                .required('La descripción obligatorio'),
            estatus: Yup.string()
                .required('El estatus es obligatorio'),
            visita: Yup.string()
                .required('la visita es obligatorio'),
            idTipoApoyo: Yup.string()
                .required('El tipo apoyo  es obligatorio'),
            fcvigenciainicio: Yup.string()
                .required('La vigencia desde obligatorio'),
            fcvigenciafin: Yup.string()
                .required('La vigencia hasta es obligatorio'),
            fcregistrowebinicio: Yup.string()
                .required('La vigencia desde obligatorio'),
            fcregistrowebfin: Yup.string()
                .required('La vigencia hasta es obligatorio'),
            fcregistropresencialinicio: Yup.string()
                .required('La vigencia desde obligatorio'),
            fcregistropresencialfin: Yup.string()
                .required('La vigencia hasta es obligatorio'),
            idRangoEdadBeneficiario: Yup.string()
                .required('El rango de edad es obligatorio'),
            idBeneficiario: Yup.string()
                .required('El tipo de beneficiario es obligatorio'),
            cantidadPesos: Yup.string()
                .required('La cantidad es obligatorio'),
            enServicio: Yup.string()
                .required('EL servicio es obligatorio'),
            descApoyoEspecie: Yup.string()
                .required('El apoyo en especie es obligatorio'),
            idPeriodicidad: Yup.string()
                .required('La periodicidad es obligatorio'),
            formaEntrega: Yup.string()
                .required('La forma de entrega es obligatorio'),
            numEntregas: Yup.string()
                .required('El número de entrega es obligatorio'),
            documentosRequisitos: Yup.string()
                .required('La documentación es obligatorio'),
            idActividadContinuidadApoyo: Yup.string()
                .required('La actividad es obligatorio'),
            cobertura: Yup.string()
                .required('La cobertura es obligatorio'),
            coberturaMunicipal: Yup.string()
                .required('La cobertura es obligatorio'),
        }),
        onSubmit: async valores => {
            console.log('VALORES=>', valores)
            const {
                dsapoyo,
                idPrograma,
                dsdescripcion,
                estatus,
                visita,
                idTipoApoyo,
                fcvigenciainicio,
                fcvigenciafin,
                fcregistrowebinicio,
                fcregistrowebfin,
                fcregistropresencialinicio,
                fcregistropresencialfin,
                idRangoEdadBeneficiario,
                idBeneficiario,
                cantidadPesos,
                enServicio,
                descApoyoEspecie,
                idPeriodicidad,
                observaciones,
                formaEntrega,
                numEntregas,
                documentosRequisitos,
                idActividadContinuidadApoyo,
                cobertura,
                coberturaMunicipal,
                idEstado



            } = valores

            let nuevoApoyo = {
                dsapoyo: dsapoyo,
                idPrograma: idPrograma,
                dsdescripcion: dsdescripcion,
                estatus: estatus,
                visita: visita,
                idTipoApoyo: idTipoApoyo,
                fcvigenciainicio: fcvigenciainicio,
                fcvigenciafin: fcvigenciafin,
                fcregistrowebinicio: fcregistrowebinicio,
                fcregistrowebfin: fcregistrowebfin,
                fcregistropresencialinicio: fcregistropresencialinicio,
                fcregistropresencialfin: fcregistropresencialfin,
                idRangoEdadBeneficiario: idRangoEdadBeneficiario,
                idBeneficiario: idBeneficiario,
                cantidadPesos: cantidadPesos,
                enServicio: enServicio,
                descApoyoEspecie: descApoyoEspecie,
                idPeriodicidad: idPeriodicidad,
                observaciones: observaciones,
                formaEntrega: formaEntrega,
                numEntregas: numEntregas,
                documentosRequisitos: documentosRequisitos,
                idActividadContinuidadApoyo: idActividadContinuidadApoyo,
                cobertura: cobertura,
                coberturaMunicipal: coberturaMunicipal,
                idEstado: 'a3de85a7-6c23-46a4-847b-d79b3a90963d'

            }




            registrarApoyo(nuevoApoyo);
            setShowModal(false);

        }
    })


    const handleChangeForma = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };



    const handleCheckedRight = () => {
        setRight(right.concat(leftChecked));
        setLeft(not(left, leftChecked));
        setChecked(not(checked, leftChecked));
    };

    const handleCheckedLeft = () => {
        setLeft(left.concat(rightChecked));
        setRight(not(right, rightChecked));
        setChecked(not(checked, rightChecked));
    };


    const customList = (items) => (
        <Paper className={classes.paper}>
            <List dense component="div" role="list">
                {items.map((value) => {
                    const labelId = `transfer-list-item-${value}-label`;

                    return (
                        <ListItem key={value} role="listitem" button onClick={handleToggle(value)}>
                            <ListItemIcon>
                                <Checkbox
                                    checked={checked.indexOf(value) !== -1}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{ 'aria-labelledby': labelId }}
                                />
                            </ListItemIcon>
                            <ListItemText id={labelId} primary={`${value.dsdocumento}`} />
                        </ListItem>
                    );
                })}
                <ListItem />
            </List>
        </Paper>
    );



    return (
        <Dialog
            classes={{ paper: classes.paper }}
            fullWidth='lg'
            maxWidth='lg'
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={props.showDialogForm}
        > <form onSubmit={formik.handleSubmit}>
                <DialogTitle id="form-dialog-title">{(tipoApoyoEditar) ? 'Editar Tipo de Apoyo' : 'Alta Tipo de Apoyo'} </DialogTitle>

                <DialogContent>

                    <TextField
                        id="dsapoyo"
                        label="Nombre del Tipo de Apoyo"
                        variant="outlined"
                        name="dsapoyo"
                        value={formik.values.dsapoyo}
                        onChange={formik.handleChange}
                        fullWidth
                        inputProps={{ maxLength: 500 }} />

                    {formik.touched.dsapoyo && formik.errors.dsapoyo ? (
                        <FormHelperText error={formik.errors.dsapoyo}>{formik.errors.dsapoyo}</FormHelperText>
                    ) : null}
                </DialogContent>

                <DialogContent>
                    <TextField
                        variant="outlined"
                        label="Selecciona un programa"
                        select
                        fullWidth
                        name="idPrograma"
                        value={formik.values.idPrograma}
                        onChange={formik.handleChange}                      
                    >
                        <MenuItem value="0">
                            <em>Ninguno</em>
                        </MenuItem>
                        {
                            programasList.map(
                                item => (
                                    <MenuItem
                                        key={item.id}
                                        value={item.id}>
                                        {item.dsclaveprograma} - {item.dsprograma}
                                    </MenuItem>
                                )
                            )
                        }

                    </TextField>
                    {formik.touched.idPrograma && formik.errors.idPrograma ? (
                        <FormHelperText error={formik.errors.idPrograma}>{formik.errors.idPrograma}</FormHelperText>
                    ) : null}
                </DialogContent>

                <DialogContent>

                    <TextField
                        id="nombrePrograma"
                        label="Programa en el que se otorga"
                        variant="outlined"
                        name="nombrePrograma"
                        value={formik.values.nombrePrograma}
                        onChange={formik.handleChange}
                        fullWidth
                        inputProps={{ maxLength: 500 }}
                    />

                    {formik.touched.nombrePrograma && formik.errors.nombrePrograma ? (
                        <FormHelperText error={formik.errors.nombrePrograma}>{formik.errors.nombrePrograma}</FormHelperText>
                    ) : null}
                </DialogContent>

                <DialogContent>

                    <TextField
                        id="clavePrograma"
                        label="Clave del Programa"
                        variant="outlined"
                        name="clavePrograma"
                        value={formik.values.clavePrograma}
                        onChange={formik.handleChange}
                        fullWidth
                        inputProps={{ maxLength: 100 }}
                    />

                    {formik.touched.clavePrograma && formik.errors.clavePrograma ? (
                        <FormHelperText error={formik.errors.clavePrograma}>{formik.errors.clavePrograma}</FormHelperText>
                    ) : null}
                </DialogContent>

                <DialogContent>

                    <TextField
                        id="dsdescripcion"
                        label="Descripción del Tipo de Apoyo"
                        variant="outlined"
                        name="dsdescripcion"
                        value={formik.values.dsdescripcion}
                        onChange={formik.handleChange}
                        fullWidth
                        inputProps={{ maxLength: 300 }}
                    />

                    {formik.touched.dsdescripcion && formik.errors.dsdescripcion ? (
                        <FormHelperText error={formik.errors.dsdescripcion}>{formik.errors.dsdescripcion}</FormHelperText>
                    ) : null}
                </DialogContent>

                <DialogContent>
                    <FormLabel component="legend">Estatus </FormLabel>
                    <RadioGroup row aria-label="position" defaultValue="top" value={formik.values.valueStatus} onChange={formik.handleChange} >
                        <FormControlLabel name="estatus" value="true" control={<Radio color="primary" />} label="Activo" />
                        <FormControlLabel name="estatus" value="false" control={<Radio color="primary" />} label="Inactivo" />
                    </RadioGroup>
                </DialogContent>

                <DialogContent>
                    <TextField
                        variant="outlined"
                        label="Selecciona un tipo de apoyo"
                        select
                        fullWidth
                        name="idTipoApoyo"
                        value={formik.values.idTipoApoyo}
                        onChange={formik.handleChange}
                    >
                        <MenuItem value="0">
                            <em>Ninguno</em>
                        </MenuItem>
                        {
                            tiposApoyosList.map(
                                item => (
                                    <MenuItem
                                        key={item.id}
                                        value={item.id}>
                                        {item.dstipoapoyo}
                                    </MenuItem>
                                )
                            )
                        }

                    </TextField>

                    {formik.touched.idTipoApoyo && formik.errors.idTipoApoyo ? (
                        <FormHelperText error={formik.errors.idTipoApoyo}>{formik.errors.idTipoApoyo}</FormHelperText>
                    ) : null}
                </DialogContent>
                {/* FECHA VIGENCIA */}
                <DialogContent>
                    <div><FormLabel component="legend">Vigencia del tipo apoyo </FormLabel></div>
                    <GridContainer>
                        <GridItem xs={12} sm={12} md={6}>
                            <TextField
                                id="fcvigenciainicio"
                                label="Desde"
                                type="date"
                                fullWidth
                                className={classes.textField}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                value={formik.values.fcvigenciainicio}
                                name="fcvigenciainicio"
                                onChange={formik.handleChange}
                            />
                        </GridItem>

                        <GridItem xs={12} sm={12} md={6}>
                            <TextField
                                id="fcvigenciafin"
                                label="Hasta"
                                type="date"
                                fullWidth
                                className={classes.textField}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                value={formik.values.fcvigenciafin}
                                name="fcvigenciafin"
                                onChange={formik.handleChange}
                            />
                        </GridItem>
                    </GridContainer>


                </DialogContent>
                {/* FECHA VIGENCIA WEB */}
                <DialogContent>
                    <div><FormLabel component="legend">Periodo de registro WEB </FormLabel></div>

                    <GridContainer>
                        <GridItem xs={12} sm={12} md={6}>
                            <TextField
                                id="fcregistrowebinicio"
                                label="Desde"
                                type="date"
                                fullWidth
                                className={classes.textField}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                value={formik.values.fcregistrowebinicio}
                                name="fcregistrowebinicio"
                                onChange={formik.handleChange}
                            />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={6}>
                            <TextField
                                id="fcregistrowebfin"
                                label="Hasta"
                                type="date"
                                fullWidth
                                className={classes.textField}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                value={formik.values.fcregistrowebfin}
                                name="fcregistrowebfin"
                                onChange={formik.handleChange}
                            />
                        </GridItem>
                    </GridContainer>

                </DialogContent>


                {/* FECHA VIGENCIA PRESENCIAL */}
                <DialogContent>
                    <div><FormLabel component="legend">Periodo de registro Presencial </FormLabel></div>

                    <GridContainer>
                        <GridItem xs={12} sm={12} md={6}>
                            <TextField
                                id="fcregistropresencialinicio"
                                label="Desde"
                                type="date"
                                fullWidth
                                className={classes.textField}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                value={formik.values.fcregistropresencialinicio}
                                name="fcregistropresencialinicio"
                                onChange={formik.handleChange}
                            />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={6}>
                            <TextField
                                id="fcregistropresencialfin"
                                label="Hasta"
                                type="date"
                                fullWidth
                                className={classes.textField}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                value={formik.values.fcregistropresencialfin}
                                name="fcregistropresencialfin"
                                onChange={formik.handleChange}
                            />
                        </GridItem>
                    </GridContainer>


                </DialogContent>


                <DialogContent>
                    <TextField
                        variant="outlined"
                        label="Selecciona un rango de edad"
                        select
                        fullWidth
                        name="idRangoEdadBeneficiario"
                        value={formik.values.idRangoEdadBeneficiario}
                        onChange={formik.handleChange}
                    >
                        <MenuItem value="0">
                            <em>Ninguno</em>
                        </MenuItem>
                        {
                            edadesBeneficiariosList.map(
                                item => (
                                    <MenuItem
                                        key={item.id}
                                        value={item.id}>
                                        {item.dsedadbeneficiario}
                                    </MenuItem>
                                )
                            )
                        }

                    </TextField>
                    {formik.touched.idRangoEdadBeneficiario && formik.errors.idRangoEdadBeneficiario ? (
                        <FormHelperText error={formik.errors.idRangoEdadBeneficiario}>{formik.errors.idRangoEdadBeneficiario}</FormHelperText>
                    ) : null}
                </DialogContent>

                <DialogContent>
                    <TextField
                        variant="outlined"
                        label="Selecciona un tipo de beneficiario"
                        select
                        fullWidth
                        name="idBeneficiario"
                        value={formik.values.idBeneficiario}
                        onChange={formik.handleChange}
                    >
                        <MenuItem value="0">
                            <em>Ninguno</em>
                        </MenuItem>
                        {
                            tiposBeneficiariosList.map(
                                item => (
                                    <MenuItem
                                        key={item.id}
                                        value={item.id}>
                                        {item.dstipobeneficiario}
                                    </MenuItem>
                                )
                            )
                        }

                    </TextField>
                    {formik.touched.idBeneficiario && formik.errors.idBeneficiario ? (
                        <FormHelperText error={formik.errors.idBeneficiario}>{formik.errors.idBeneficiario}</FormHelperText>
                    ) : null}
                </DialogContent>

                <DialogContent>

                    <TextField
                        id="cantidadPesos"
                        label="Cantidad en pesos"
                        variant="outlined"
                        name="cantidadPesos"
                        value={formik.values.cantidadPesos}
                        onChange={formik.handleChange}
                        fullWidth
                    />

                    {formik.touched.cantidadPesos && formik.errors.cantidadPesos ? (
                        <FormHelperText error={formik.errors.cantidadPesos}>{formik.errors.cantidadPesos}</FormHelperText>
                    ) : null}

                </DialogContent>
                <DialogContent>

                    <TextField
                        id="descApoyoEspecie"
                        label=" Descripción del apoyo en especie"
                        variant="outlined"
                        name="descApoyoEspecie"
                        value={formik.values.descApoyoEspecie}
                        onChange={formik.handleChange}
                        fullWidth
                        inputProps={{ maxLength: 100 }}
                    />

                    {formik.touched.descApoyoEspecie && formik.errors.descApoyoEspecie ? (
                        <FormHelperText error={formik.errors.descApoyoEspecie}>{formik.errors.descApoyoEspecie}</FormHelperText>
                    ) : null}
                </DialogContent>

                <DialogContent>
                    <FormLabel component="legend">Requiere Visita Obligatoria</FormLabel>
                    <RadioGroup row aria-label="position" defaultValue="top" value={formik.values.visita} onChange={formik.handleChange} >
                        <FormControlLabel name="visita" value="true" control={<Radio color="primary" />} label="SÍ" />
                        <FormControlLabel name="visita" value="false" control={<Radio color="primary" />} label="NO" />
                    </RadioGroup>
                </DialogContent>


                <DialogContent>
                    <FormLabel component="legend">Documentación y formatos requeridos para el tipo de apoyo</FormLabel>
                    <Grid
                        container
                        spacing={2}
                        justifyContent="center"
                        alignItems="center"
                        className={classes.root}
                        fullWidth
                    >
                        <Grid item>{customList(left)}</Grid>
                        <Grid item>
                            <Grid container direction="column" alignItems="center">

                                <Button
                                    variant="outlined"
                                    size="small"
                                    className={classes.button}
                                    onClick={handleCheckedRight}
                                    disabled={leftChecked.length === 0}
                                    aria-label="move selected right"
                                >
                                    &gt;
                                </Button>
                                <Button
                                    variant="outlined"
                                    size="small"
                                    className={classes.button}
                                    onClick={handleCheckedLeft}
                                    disabled={rightChecked.length === 0}
                                    aria-label="move selected left"
                                >
                                    &lt;
                                </Button>

                            </Grid>
                        </Grid>
                        <Grid item>{customList(right)}</Grid>
                    </Grid>
                </DialogContent>

                <DialogContent>
                    <TextField
                        variant="outlined"
                        label="Entregar el apoyo"
                        select
                        fullWidth
                        name="idPeriodicidad"
                        value={formik.values.idPeriodicidad}
                        onChange={formik.handleChange}
                    >
                        <MenuItem value="0">
                            <em>Ninguno</em>
                        </MenuItem>
                        {
                            periodicidadApoyosList.map(
                                item => (
                                    <MenuItem
                                        key={item.id}
                                        value={item.id}>
                                        {item.dsperiodicidad}
                                    </MenuItem>
                                )
                            )
                        }

                    </TextField>
                    {formik.touched.idPeriodicidad && formik.errors.idPeriodicidad ? (
                        <FormHelperText error={formik.errors.idPeriodicidad}>{formik.errors.idPeriodicidad}</FormHelperText>
                    ) : null}
                </DialogContent>

                <DialogContent>

                    <FormControlLabel
                        control={<Checkbox value={true} onChange={formik.handleChange} name="formaEntrega" />}
                        label="Forma de entrega de apoyo por exhibición"
                    />
                </DialogContent>

                <DialogContent>

                    <TextField
                        variant="outlined"
                        label="Entregar el apoyo"
                        select
                        fullWidth
                        name="idPeriodicidad"
                        value={formik.values.idPeriodicidad}
                        onChange={formik.handleChange}
                    >
                        <MenuItem value="0">
                            <em>Ninguno</em>
                        </MenuItem>
                        {
                            periodicidadApoyosList.map(
                                item => (
                                    <MenuItem
                                        key={item.id}
                                        value={item.id}>
                                        {item.dsperiodicidad}
                                    </MenuItem>
                                )
                            )
                        }

                    </TextField>

                    {formik.touched.idPeriodicidad && formik.errors.idPeriodicidad ? (
                        <FormHelperText error={formik.errors.idPeriodicidad}>{formik.errors.idPeriodicidad}</FormHelperText>
                    ) : null}
                </DialogContent>

                <DialogContent>


                    <TextField
                        id="outlined-multiline-static"
                        label="Observaciones"
                        multiline
                        rows={4}
                        variant="outlined"
                        name="observaciones"
                        value={formik.values.observaciones}
                        fullWidth
                        inputProps={{ maxLength: 500 }}
                    />

                </DialogContent>

                <DialogContent >
                    <Grid container justify="flex-end">
                        <Button variant="contained" color="primary" type='submit'>
                            Enviar
                        </Button>
                    </Grid>
                </DialogContent>

            </form>
        </Dialog>
    )

}