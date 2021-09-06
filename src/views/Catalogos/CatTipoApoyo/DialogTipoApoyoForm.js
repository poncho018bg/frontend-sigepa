
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
const useStyles = makeStyles(stylesArchivo);



const initTipoApoyo = {
    nombreTipoApoyo: '',
    nombrePrograma: '',
    clavePrograma: '',
    descTipoApoyo: '',
    estatusActivo: boolean,
    estatusInactivo: boolean,
    idTipoApoyo: '',
    vigenciaDesde: '',
    vigenciaHasta: '',
    idRangoEdad: '',
    idTipoBeneficiario: '',
    cantidadPesos: '',
    desApoyoEspecia: '',
    idPeriodicidad: ''
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
        estatusActivo,
        estatusInactivo,
        idTipoApoyo,
        vigenciaDesde,
        vigenciaHasta,
        idRangoEdad,
        idTipoBeneficiario,
        cantidadPesos,
        desApoyoEspecia,
        idPeriodicidad
    } = formValues;
    const [errors, setErrors] = useState({});
    const { getTiposApoyos, tiposApoyosList } = useContext(TiposApoyosContext);
    const { getEdadesBeneficiarios, edadesBeneficiariosList } = useContext(EdadesBeneficiariosContext);
    const { getTipoBeneficiarios, tiposBeneficiariosList } = useContext(TiposBeneficiariosContext);
    const { getPeriodicidadApoyos, periodicidadApoyosList } = useContext(PeriodicidadApoyosContext);

    const [checked, setChecked] = React.useState([]);
    const [left, setLeft] = React.useState([0, 1, 2, 3]);
    const [right, setRight] = React.useState([4, 5, 6, 7]);

    const leftChecked = intersection(checked, left);
    const rightChecked = intersection(checked, right);


    useEffect(() => {
        getTiposApoyos();
        getEdadesBeneficiarios();
        getTipoBeneficiarios();
        getPeriodicidadApoyos();

    }, []);


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

    const handleAllRight = () => {
        setRight(right.concat(left));
        setLeft([]);
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

    const handleAllLeft = () => {
        setLeft(left.concat(right));
        setRight([]);
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
                            <ListItemText id={labelId} primary={`List item ${value + 1}`} />
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
                <DialogTitle id="form-dialog-title">{(true) ? 'Editar Tipo de Apoyo' : 'Alta Tipo de Apoyo'} </DialogTitle>

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
                    />
                    {errors.descTipoApoyo && <FormHelperText error={errors.descTipoApoyo !== null && errors.descTipoApoyo !== undefined}>{errors.descTipoApoyo}</FormHelperText>}

                </DialogContent>

                <DialogContent>
                    <FormLabel component="legend">Estatus </FormLabel>
                    <RadioGroup row aria-label="position" name="position" defaultValue="top">
                        <FormControlLabel value={estatusActivo} control={<Radio color="primary" />} label="Activo" />
                        <FormControlLabel value={estatusInactivo} control={<Radio color="primary" />} label="Inactivo" />
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
                    <TextField
                        id="vigenciaDesde"
                        label="Vigencia del tipo apoyo desde"
                        type="date"
                        defaultValue="2017-05-24"
                        className={classes.textField}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        value={vigenciaDesde}
                    />
                </DialogContent>
                <DialogContent>
                    <TextField
                        id="vigenciaHasta"
                        label="Vigencia del tipo apoyo hasta"
                        type="date"
                        defaultValue="2017-05-24"
                        className={classes.textField}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        value={vigenciaHasta}
                    />
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
                        id="desApoyoEspecia"
                        label=" Descripción del apoyo en especie"
                        variant="outlined"
                        name="desApoyoEspecia"
                        error={errors.desApoyoEspecia !== null && errors.desApoyoEspecia !== undefined}
                        value={desApoyoEspecia}
                        onChange={handleInputChange}
                        fullWidth
                    />
                    {errors.desApoyoEspecia && <FormHelperText error={errors.desApoyoEspecia !== null && errors.desApoyoEspecia !== undefined}>{errors.desApoyoEspecia}</FormHelperText>}

                </DialogContent>

                <DialogContent>
                    <FormLabel component="legend">Requiere Visita Obligatoria</FormLabel>
                    <RadioGroup row aria-label="position" name="position" defaultValue="top">
                        <FormControlLabel value={estatusActivo} control={<Radio color="primary" />} label="Activo" />
                        <FormControlLabel value={estatusInactivo} control={<Radio color="primary" />} label="Inactivo" />
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
                    >
                        <Grid item>{customList(left)}</Grid>
                        <Grid item>
                            <Grid container direction="column" alignItems="center">
                                <Button
                                    variant="outlined"
                                    size="small"
                                    className={classes.button}
                                    onClick={handleAllRight}
                                    disabled={left.length === 0}
                                    aria-label="move all right"
                                >
                                    ≫
                                </Button>
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
                                <Button
                                    variant="outlined"
                                    size="small"
                                    className={classes.button}
                                    onClick={handleAllLeft}
                                    disabled={right.length === 0}
                                    aria-label="move all left"
                                >
                                    ≪
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

                    <RadioGroup row aria-label="position" name="position" defaultValue="top">
                        <FormControlLabel value={estatusActivo} control={<Radio color="primary" />} label="Forma de entrega de apoyo por exhibición" />
                    </RadioGroup>
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

            </form>
        </Dialog>
    )

}