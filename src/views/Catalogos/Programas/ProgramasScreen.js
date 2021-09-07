import React, { useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";

// @material-ui/icons
import PermIdentity from "@material-ui/icons/PermIdentity";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Clearfix from "components/Clearfix/Clearfix.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardAvatar from "components/Card/CardAvatar.js";
import Datetime from "react-datetime";
import styles from "assets/jss/material-dashboard-pro-react/views/userProfileStyles.js";

import avatar from "assets/img/faces/marc.jpg";
import { FormControl, FormHelperText, TextField } from "@material-ui/core";
import { useFormik } from 'formik';
import * as Yup from 'yup';

const useStyles = makeStyles(styles);
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

export const ProgramasScreen = () => {

    const [programaApoyo, setProgramaApoyo] = useState('');
    const [clavePrograma, setClavePrograma] = useState('');
    const classes = useStyles();
    
    const formik = useFormik({
      initialValues: {
          nombrePrograma: '',
          email:'',
          vigenciaDesde:''
      },
      validationSchema: Yup.object({
        nombrePrograma: Yup.string()
            .required('El nombre del programa  es obligatorio')

    }),
      onSubmit: async valores => {

          const { nombrePrograma,email,vigenciaDesde } = valores;

          console.log(nombrePrograma);
          console.log(email);
          console.log(vigenciaDesde);


        
      }
  })

    return (
      <form
            onSubmit={formik.handleSubmit}
        >
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
                  <GridItem xs={12} sm={12} md={6}>
                      <TextField
                        id="nombrePrograma"
                        error={formik.errors.nombrePrograma}
                        label="Nombre del Programa de apoyo"
                        name="nombrePrograma"
                        fullWidth
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.nombrePrograma}
                    />
                   
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                   <TextField
                        id="clavePograma"
                        label="Clave del Programa"
                        name="nombrePograma"
                        fullWidth
                    />
                  </GridItem>
                  
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                  <TextField
                        id="vigenciaDesde"
                       
                        name="vigenciaDesde"
                        type="date"
                        fullWidth
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.vigenciaDesde}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                  
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText="City"
                      id="city"
                      formControlProps={{
                        fullWidth: true,
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText="Country"
                      id="country"
                      formControlProps={{
                        fullWidth: true,
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText="Postal Code"
                      id="postal-code"
                      formControlProps={{
                        fullWidth: true,
                      }}
                    />
                  </GridItem>
                </GridContainer>
                
                <Button  className={classes.updateProfileButton}
                  type='submit'>
                  Registrar
                </Button>
                <Clearfix />
              </CardBody>
            </Card>
          </GridItem>
          
        </GridContainer>
      </form>
    );
}

