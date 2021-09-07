
import { Checkbox, DialogTitle, FormControlLabel, FormHelperText, FormLabel, Grid, List, ListItem, ListItemIcon, ListItemText, makeStyles, MenuItem, Paper, Radio, RadioGroup, TextField } from '@material-ui/core'
import React, { useEffect, useState, useContext } from 'react';
import { useForm } from 'hooks/useForm';
import Button from "components/CustomButtons/Button.js";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { useDispatch, useSelector } from 'react-redux';
import { stylesArchivo } from 'css/stylesArchivo';
import { boolean } from 'yup/lib/locale';
import { TiposApoyosContext } from 'contexts/catalogos/tiposApoyosContext';
import { EdadesBeneficiariosContext } from 'contexts/catalogos/edadesBeneficiariosContext';
import { TiposBeneficiariosContext } from 'contexts/catalogos/tiposBeneficiariosContext';
import { PeriodicidadApoyosContext } from 'contexts/catalogos/periodicidadApoyosContext';
import { DocumentosContext } from 'contexts/catalogos/documentosContext';
import moment from 'moment';
import 'moment/locale/es';
const useStyles = makeStyles(stylesArchivo);



const initTipoApoyo = {
    nombreTipoApoyo: '',
    nombrePrograma: '',
    clavePrograma: '',
    descTipoApoyo: '',
    estatus: '',
    visita: '',
    idTipoApoyo: '',
    vigenciaDesde: moment(new Date()).format("yyyy-MM-dd"),
    vigenciaHasta: moment(new Date()).format("yyyy-MM-dd"),
    idRangoEdad: '',
    idTipoBeneficiario: '',
    cantidadPesos: '',
    desApoyoEspecie: '',
    idPeriodicidad: '',
    observaciones: null,
    formaEntrega: '',
    documentacion:[],
    
}

function not(a, b) {
    return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
    return a.filter((value) => b.indexOf(value) !== -1);
}

export const DialogTipoApoyoForm = (props) => {

    const dispatch = useDispatch();
    const classes = useStyles();
    const [formValues, handleInputChange, reset, setValues] = useForm(initTipoApoyo);
    const {
        nombreTipoApoyo,
        nombrePrograma,
        clavePrograma,
        descTipoApoyo,
        estatus,
        visita,
        idTipoApoyo,
        vigenciaDesde,
        vigenciaHasta,
        idRangoEdad,
        idTipoBeneficiario,
        cantidadPesos,
        desApoyoEspecie,
        idPeriodicidad,
        observaciones,
        formaEntrega
    } = formValues;
    const [errors, setErrors] = useState({});
    const { tipoApoyoEditar } = useSelector(state => state.tipoApoyo);
    const { getTiposApoyos, tiposApoyosList } = useContext(TiposApoyosContext);
    const { getEdadesBeneficiarios, edadesBeneficiariosList } = useContext(EdadesBeneficiariosContext);
    const { getTipoBeneficiarios, tiposBeneficiariosList } = useContext(TiposBeneficiariosContext);
    const { getPeriodicidadApoyos, periodicidadApoyosList } = useContext(PeriodicidadApoyosContext);
    const { getDocumentos, documentosList } = useContext(DocumentosContext);

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


    useEffect(() => {
        getTiposApoyos();
        getEdadesBeneficiarios();
        getTipoBeneficiarios();
        getPeriodicidadApoyos();
        getDocumentos();
        setLeft(documentosList)
    }, []);

    useEffect(() => {
        setLeft(documentosList)
    }, [documentosList]);


    const handleClose = () => {
        props.setShowDialogForm(false);
        setErrors({});
    }

    const handleAgregar = (e) => {
        e.preventDefault();



        if (!isObjEmpty(errors)) {
            setErrors(errors);
            return;
        }


        props.setShowDialogForm(false);

    }
    const handleChange = (event) => {
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
        > <form onSubmit={handleAgregar}>
                <DialogTitle id="form-dialog-title">{(tipoApoyoEditar) ? 'Editar Tipo de Apoyo' : 'Alta Tipo de Apoyo'} </DialogTitle>

                <DialogContent>

                    <TextField
                        id="nombreTipoApoyo"
                        label="Nombre del Tipo de Apoyo"
                        variant="outlined"
                        name="nombreTipoApoyo"
                        error={errors.nombreTipoApoyo !== null && errors.nombreTipoApoyo !== undefined}
                        value={nombreTipoApoyo}
                        onChange={handleInputChange}
                        fullWidth
                        inputProps={{ maxLength: 500 }}
                    />
                    {errors.nombreTipoApoyo && <FormHelperText error={errors.nombreTipoApoyo !== null && errors.nombreTipoApoyo !== undefined}>{errors.nombreTipoApoyo}</FormHelperText>}

                </DialogContent>

                <DialogContent>

                    <TextField
                        id="nombrePrograma"
                        label="Programa en el que se otorga"
                        variant="outlined"
                        name="nombrePrograma"
                        error={errors.nombrePrograma !== null && errors.nombrePrograma !== undefined}
                        value={nombrePrograma}
                        onChange={handleInputChange}
                        fullWidth
                        inputProps={{ maxLength: 500 }}
                    />
                    {errors.nombrePrograma && <FormHelperText error={errors.nombrePrograma !== null && errors.nombrePrograma !== undefined}>{errors.nombrePrograma}</FormHelperText>}

                </DialogContent>

                <DialogContent>

                    <TextField
                        id="clavePrograma"
                        label="Clave del Programa"
                        variant="outlined"
                        name="clavePrograma"
                        error={errors.clavePrograma !== null && errors.clavePrograma !== undefined}
                        value={clavePrograma}
                        onChange={handleInputChange}
                        fullWidth
                        inputProps={{ maxLength: 100 }}
                    />
                    {errors.clavePrograma && <FormHelperText error={errors.clavePrograma !== null && errors.clavePrograma !== undefined}>{errors.clavePrograma}</FormHelperText>}

                </DialogContent>

                <DialogContent>

                    <TextField
                        id="descTipoApoyo"
                        label="Descripción del Tipo de Apoyo"
                        variant="outlined"
                        name="descTipoApoyo"
                        error={errors.descTipoApoyo !== null && errors.descTipoApoyo !== undefined}
                        value={descTipoApoyo}
                        onChange={handleInputChange}
                        fullWidth
                        inputProps={{ maxLength: 300 }}
                    />
                    {errors.descTipoApoyo && <FormHelperText error={errors.descTipoApoyo !== null && errors.descTipoApoyo !== undefined}>{errors.descTipoApoyo}</FormHelperText>}

                </DialogContent>

                <DialogContent>
                    <FormLabel component="legend">Estatus </FormLabel>
                    <RadioGroup row aria-label="position" name="estatus" defaultValue="top" value={estatus} onChange={handleInputChange} >
                        <FormControlLabel value="true" control={<Radio color="primary" />} label="Activo" />
                        <FormControlLabel value="false" control={<Radio color="primary" />} label="Inactivo" />
                    </RadioGroup>
                </DialogContent>

                <DialogContent>
                    <TextField
                        variant="outlined"
                        label="Selecciona un tipo de apoyo"
                        select
                        fullWidth
                        error={errors.idTipoApoyo}
                        name="idTipoApoyo"
                        value={idTipoApoyo}
                        onChange={handleInputChange}
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
                    {errors.idTipoApoyo && <FormHelperText error={errors.idTipoApoyo}>{errors.idTipoApoyo}</FormHelperText>}
                </DialogContent>

                <DialogContent>
                    <div><FormLabel component="legend">Vigencia del tipo apoyo </FormLabel></div>
                    <div>
                        <TextField
                            id="vigenciaDesde"
                            label="Desde"
                            type="date"

                            className={classes.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            value={vigenciaDesde}
                            name="vigenciaDesde"
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <TextField
                            id="vigenciaHasta"
                            label="Hasta"
                            type="date"

                            className={classes.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            value={vigenciaHasta}
                            name="vigenciaHasta"
                            onChange={handleInputChange}
                        />
                    </div>




                </DialogContent>


                <DialogContent>
                    <TextField
                        variant="outlined"
                        label="Selecciona un rango de edad"
                        select
                        fullWidth
                        error={errors.idRangoEdad}
                        name="idRangoEdad"
                        value={idRangoEdad}
                        onChange={handleInputChange}
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
                    {errors.idRangoEdad && <FormHelperText error={errors.idRangoEdad}>{errors.idRangoEdad}</FormHelperText>}
                </DialogContent>

                <DialogContent>
                    <TextField
                        variant="outlined"
                        label="Selecciona un tipo de beneficiario"
                        select
                        fullWidth
                        error={errors.idTipoBeneficiario}
                        name="idTipoBeneficiario"
                        value={idTipoBeneficiario}
                        onChange={handleInputChange}
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
                    {errors.idTipoBeneficiario && <FormHelperText error={errors.idTipoBeneficiario}>{errors.idTipoBeneficiario}</FormHelperText>}
                </DialogContent>

                <DialogContent>

                    <TextField
                        id="cantidadPesos"
                        label="Cantidad en pesos"
                        variant="outlined"
                        name="cantidadPesos"
                        error={errors.cantidadPesos !== null && errors.cantidadPesos !== undefined}
                        value={cantidadPesos}
                        onChange={handleInputChange}
                        fullWidth
                    />
                    {errors.cantidadPesos && <FormHelperText error={errors.cantidadPesos !== null && errors.cantidadPesos !== undefined}>{errors.cantidadPesos}</FormHelperText>}

                </DialogContent>
                <DialogContent>

                    <TextField
                        id="desApoyoEspecie"
                        label=" Descripción del apoyo en especie"
                        variant="outlined"
                        name="desApoyoEspecie"
                        error={errors.desApoyoEspecie !== null && errors.desApoyoEspecie !== undefined}
                        value={desApoyoEspecie}
                        onChange={handleInputChange}
                        fullWidth
                        inputProps={{ maxLength: 100 }}
                    />
                    {errors.desApoyoEspecie && <FormHelperText error={errors.desApoyoEspecie !== null && errors.desApoyoEspecie !== undefined}>{errors.desApoyoEspecie}</FormHelperText>}

                </DialogContent>

                <DialogContent>
                    <FormLabel component="legend">Requiere Visita Obligatoria</FormLabel>
                    <RadioGroup row aria-label="position" name="visita" defaultValue="top" value={visita} onChange={handleInputChange} >
                        <FormControlLabel value="true" control={<Radio color="primary" />} label="Activo" />
                        <FormControlLabel value="false" control={<Radio color="primary" />} label="Inactivo" />
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
                        error={errors.idPeriodicidad}
                        name="idPeriodicidad"
                        value={idPeriodicidad}
                        onChange={handleInputChange}
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
                    {errors.idPeriodicidad && <FormHelperText error={errors.idPeriodicidad}>{errors.idPeriodicidad}</FormHelperText>}
                </DialogContent>

                <DialogContent>

                    <FormControlLabel
                        control={<Checkbox checked={state.checkedA} onChange={handleChange} name="checkedA" />}
                        label="Forma de entrega de apoyo por exhibición"
                    />
                </DialogContent>

                <DialogContent>

                    <TextField
                        variant="outlined"
                        label="Entregar el apoyo"
                        select
                        fullWidth
                        error={errors.idPeriodicidad}
                        name="idPeriodicidad"
                        value={idPeriodicidad}
                        onChange={handleInputChange}
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
                    {errors.idPeriodicidad && <FormHelperText error={errors.idPeriodicidad}>{errors.idPeriodicidad}</FormHelperText>}

                </DialogContent>

                <DialogContent>


                    <TextField
                        id="outlined-multiline-static"
                        label="Observaciones"
                        multiline
                        rows={4}

                        variant="outlined"
                        name="observaciones"
                        value={observaciones}
                        fullWidth
                        inputProps={{ maxLength: 500 }}
                    />

                </DialogContent>

            </form>
        </Dialog>
    )

}