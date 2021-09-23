import React, { useContext, useEffect, useState } from 'react';
import { Button, FormHelperText, makeStyles, TextField } from '@material-ui/core'
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';
import Card from 'components/Card/Card';
import CardHeader from 'components/Card/CardHeader';
import CardIcon from 'components/Card/CardIcon';
import PermIdentity from '@material-ui/icons/PermIdentity';
import styles from "assets/jss/material-dashboard-pro-react/views/userProfileStyles.js";
import CardBody from 'components/Card/CardBody';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Clearfix from 'components/Clearfix/Clearfix';
const useStyles = makeStyles(styles);
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router";
import { ProgramasContext } from 'contexts/catalogos/Programas/programasContext';
import DateFnsUtils from '@date-io/date-fns';
import deLocale from "date-fns/locale/es";
import { Mensaje } from 'components/Personalizados/Mensaje';
export const ProgramasEdit = () => {


  const { actualizar, programa, getByID } = useContext(ProgramasContext);
  const classes = useStyles();
  let query = useLocation();
  let history = useHistory();

  const [error, setError] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [msjConfirmacion, setMsjConfirmacion] = useState('');

  useEffect(() => {
    if (query.state?.mobNo) {
      getByID(query.state.mobNo);
    }

  }, [location]);

  let data = programa;
  console.log(data);
  // Schema de validación
  const schemaValidacion = Yup.object({
    dsprograma: Yup.string().nullable()
      .required('El nombre del programa  es obligatorio'),
    dsclaveprograma: Yup.string().nullable()
      .required('La clave del programa es obligatoria'),
    /*  vigenciaDesde: Yup.string()
          .required('La vigencia desde es obligatorio'),
      vigenciaHasta: Yup.string()
          .required('La vigencia hasta es obligatorio'),
      periodoRegistroWebDesde: Yup.string()
          .required('El periodo del registro web desde es obligatorio'),
      periodoRegistroWebHasta: Yup.string()
        .required('El periodo del registro web hasta es obligatorio'),
      periodoRegistroPresencialDesde: Yup.string()
        .required('El periodo del registro presencial desde es obligatorio'),
      periodoRegistroPresencialHasta: Yup.string()
        .required('El periodo del registro presencial hasta es obligatorio'),*/
    dsdescripcion: Yup.string().nullable()
      .required('La descripcion del pograma de apoyo  es obligatorio'),
    dscriterioelegibilidad: Yup.string().nullable()
      .required('Los criterios de elegibilidad son obligatorios'),
    dscontinuidad: Yup.string().nullable()
      .required('Las actividades por realizar son obligatorios')

  });

  const actualizarInfo = async valores => {
    actualizar(valores);
    setOpenSnackbar(true);
    setError(false);
    setMsjConfirmacion(`El programa fue actualizado correctamente `);


    const timer = setTimeout(() => {
      history.push("/admin/programas")
    }, 1000);
    return () => clearTimeout(timer);
  }


  return (

    <Formik
      enableReinitialize
      initialValues={data}
      validationSchema={schemaValidacion}
      onSubmit={(valores) => {

        actualizarInfo(valores)

      }}
    >

      {props => {
        return (


          <form
            className="bg-white shadow-md px-8 pt-6 pb-8 mb-4"
            onSubmit={props.handleSubmit}>
            <GridContainer>
              <GridItem xs={12} sm={12} md={12}>
                <Card>
                  <CardHeader color="rose" icon>
                    <CardIcon color="rose">
                      <PermIdentity />
                    </CardIcon>
                    <h4 className={classes.cardIconTitle}>
                      Programas
                    </h4>
                  </CardHeader>
                  <CardBody>
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={12}>
                        <TextField
                          style={{ marginBottom: '20px' }}
                          id="dsprograma"
                          error={props.errors.dsprograma}
                          label="Nombre del Programa de apoyo"
                          variant="outlined"
                          name="dsprograma"
                          fullWidth
                          onChange={props.handleChange}
                          onBlur={props.handleBlur}
                          value={props.values?.dsprograma}
                          InputLabelProps={{ shrink: true }}
                        />
                        {props.touched.dsprograma && props.errors.dsprograma ? (
                          <FormHelperText style={{ marginBottom: '20px' }} error={props.errors.dsprograma}>
                            {props.errors.dsprograma}
                          </FormHelperText>
                        ) : null}
                      </GridItem>
                      <GridItem xs={12} sm={12} md={12}>
                        <TextField
                          id="dsclaveprograma"
                          label="Clave del Programa"
                          name="dsclaveprograma"
                          variant="outlined"
                          style={{ marginBottom: '20px' }}
                          fullWidth
                          onChange={props.handleChange}
                          onBlur={props.handleBlur}
                          value={props.values?.dsclaveprograma}
                          InputLabelProps={{ shrink: true }}
                        />
                        {props.touched.dsclaveprograma && props.errors.dsclaveprograma ? (
                          <FormHelperText style={{ marginBottom: '20px' }} error={props.errors.dsclaveprograma}>
                            {props.errors.dsclaveprograma}
                          </FormHelperText>
                        ) : null}
                      </GridItem>

                    </GridContainer>


                    <GridContainer>
                      <GridItem xs={12} sm={12} md={6}>
                        <MuiPickersUtilsProvider locale={deLocale} utils={DateFnsUtils}>
                          <KeyboardDatePicker
                            id="fcvigenciainicio"
                            name="fcvigenciainicio"
                            fullWidth
                            label="Vigencia del Programa Inicio"
                            inputVariant="outlined"
                            format="MM/dd/yyyy"
                            style={{ marginBottom: '20px' }}
                            clearable
                            value={props.values?.fcvigenciainicio}
                            onChange={value => props.setFieldValue("fcvigenciainicio", value)}
                            KeyboardButtonProps={{
                              "aria-label": "change date"
                            }}
                          />
                        </MuiPickersUtilsProvider>
                      </GridItem>

                      <GridItem xs={12} sm={12} md={6}>

                        <MuiPickersUtilsProvider locale={deLocale} utils={DateFnsUtils}>
                          <KeyboardDatePicker
                            id="fcvigenciafin"
                            name="fcvigenciafin"
                            fullWidth
                            style={{ marginBottom: '20px' }}
                            label="Vigencia del Programa Hasta"
                            inputVariant="outlined"
                            format="MM/dd/yyyy"
                            clearable
                            value={props.values?.fcvigenciafin}
                            onChange={value => props.setFieldValue("fcvigenciafin", value)}
                            KeyboardButtonProps={{
                              "aria-label": "change date"
                            }}
                          />
                        </MuiPickersUtilsProvider>
                      </GridItem>
                      <GridItem xs={12} sm={12} md={6}>

                        <MuiPickersUtilsProvider locale={deLocale} utils={DateFnsUtils}>
                          <KeyboardDatePicker
                            id="fcregistrowebinicio"
                            name="fcregistrowebinicio"
                            fullWidth
                            style={{ marginBottom: '20px' }}
                            label="Periodo Registro Web Desde"
                            inputVariant="outlined"
                            format="MM/dd/yyyy"
                            clearable
                            value={props.values?.fcregistrowebinicio}
                            onChange={value => props.setFieldValue("periodoRegistroWebDesde", value)}
                            KeyboardButtonProps={{
                              "aria-label": "change date"
                            }}
                          />
                        </MuiPickersUtilsProvider>
                      </GridItem>

                      <GridItem xs={12} sm={12} md={6}>

                        <MuiPickersUtilsProvider locale={deLocale} utils={DateFnsUtils}>
                          <KeyboardDatePicker
                            id="fcregistrowebfin"
                            name="fcregistrowebfin"
                            fullWidth
                            label="Periodo Registro web Hasta"
                            inputVariant="outlined"
                            format="MM/dd/yyyy"
                            style={{ marginBottom: '20px' }}
                            clearable
                            value={props.values?.fcregistrowebfin}
                            onChange={value => props.setFieldValue("fcregistrowebfin", value)}
                            KeyboardButtonProps={{
                              "aria-label": "change date"
                            }}
                          />
                        </MuiPickersUtilsProvider>

                      </GridItem>

                      <GridItem xs={12} sm={12} md={6}>


                        <MuiPickersUtilsProvider locale={deLocale} utils={DateFnsUtils}>
                          <KeyboardDatePicker
                            id="fcregistropresencialinicio"
                            name="fcregistropresencialinicio"
                            fullWidth
                            label="Periodo Registro Presencial Desde"
                            inputVariant="outlined"
                            format="MM/dd/yyyy"
                            style={{ marginBottom: '20px' }}
                            clearable
                            value={props.values?.fcregistropresencialinicio}
                            onChange={value => props.setFieldValue("fcregistropresencialinicio", value)}
                            KeyboardButtonProps={{
                              "aria-label": "change date"
                            }}
                          />
                        </MuiPickersUtilsProvider>
                      </GridItem>

                      <GridItem xs={12} sm={12} md={6}>

                        <MuiPickersUtilsProvider locale={deLocale} utils={DateFnsUtils}>
                          <KeyboardDatePicker
                            id="fcregistropresencialfin"
                            name="fcregistropresencialfin"
                            fullWidth
                            label="Periodo Registro Presencial Hasta"
                            inputVariant="outlined"
                            format="MM/dd/yyyy"
                            style={{ marginBottom: '20px' }}
                            clearable
                            value={props.values?.fcregistropresencialfin}
                            onChange={value => props.setFieldValue("fcregistropresencialfin", value)}
                            KeyboardButtonProps={{
                              "aria-label": "change date"
                            }}
                          />
                        </MuiPickersUtilsProvider>
                      </GridItem>

                      <GridItem xs={12} sm={12} md={12}>
                        <TextField
                          id="dsdescripcion"
                          name="dsdescripcion"
                          label="Descripción del Programa de Apoyo"
                          style={{ marginBottom: '20px' }}
                          fullWidth
                          multiline
                          rows={4}
                          variant="outlined"
                          onChange={props.handleChange}
                          onBlur={props.handleBlur}
                          value={props.values?.dsdescripcion}
                          InputLabelProps={{ shrink: true }}
                        />
                        {props.touched.dsdescripcion && props.errors.dsdescripcion ? (
                          <FormHelperText style={{ marginBottom: '20px' }} error={props.errors.dsdescripcion}>
                            {props.errors.dsdescripcion}
                          </FormHelperText>
                        ) : null}
                      </GridItem>
                    </GridContainer>
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={12}>
                        <TextField
                          id="dscriterioelegibilidad"
                          name="dscriterioelegibilidad"
                          label="Criterios de Elegibilidad del Programa (opcional)"
                          style={{ marginBottom: '20px' }}
                          fullWidth
                          multiline
                          rows={4}
                          variant="outlined"
                          onChange={props.handleChange}
                          onBlur={props.handleBlur}
                          value={props.values?.dscriterioelegibilidad}
                          InputLabelProps={{ shrink: true }}
                        />
                        {props.touched.dscriterioelegibilidad && props.errors.dscriterioelegibilidad ? (
                          <FormHelperText style={{ marginBottom: '20px' }} error={props.errors.dscriterioelegibilidad}>
                            {props.errors.dscriterioelegibilidad}
                          </FormHelperText>
                        ) : null}
                      </GridItem>
                      <GridItem xs={12} sm={12} md={12}>
                        <TextField
                          id="dscontinuidad"
                          name="dscontinuidad"
                          label="Actividades por realizar para continuar con el programa (opcional)"
                          style={{ marginBottom: '20px' }}
                          fullWidth
                          multiline
                          rows={4}
                          variant="outlined"
                          onChange={props.handleChange}
                          onBlur={props.handleBlur}
                          value={props.values?.dscontinuidad}
                          InputLabelProps={{ shrink: true }}
                        />
                        {props.touched.dscontinuidad && props.errors.dscontinuidad ? (
                          <FormHelperText style={{ marginBottom: '20px' }} error={props.errors.dscontinuidad}>
                            {props.errors.dscontinuidad}
                          </FormHelperText>
                        ) : null}
                      </GridItem>
                      <GridItem xs={12} sm={12} md={12}>
                        <TextField
                          id="dsobservaciones"
                          name="dsobservaciones"
                          label="Observaciones (opcional)"
                          style={{ marginBottom: '20px' }}
                          fullWidth
                          multiline
                          rows={4}
                          variant="outlined"
                          onChange={props.handleChange}
                          onBlur={props.handleBlur}
                          value={props.values?.dsobservaciones}
                          InputLabelProps={{ shrink: true }}
                        />
                      </GridItem>
                    </GridContainer>

                    <Button className={classes.updateProfileButton}
                      type='submit'>
                      Editar
                    </Button>
                    <Clearfix />
                  </CardBody>
                </Card>
              </GridItem>

            </GridContainer>
            <Mensaje
              setOpen={setOpenSnackbar}
              open={openSnackbar}
              severity={error ? "error" : "success"}
              message={msjConfirmacion}
            />
          </form>

        )
      }}
    </Formik>

  )

}
