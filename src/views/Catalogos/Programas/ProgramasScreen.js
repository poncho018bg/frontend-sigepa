import React, { useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import FormLabel from "@material-ui/core/FormLabel";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import Radio from "@material-ui/core/Radio";
import Checkbox from "@material-ui/core/Checkbox";

// @material-ui/icons
import MailOutline from "@material-ui/icons/MailOutline";
import Check from "@material-ui/icons/Check";
import Clear from "@material-ui/icons/Clear";
import Contacts from "@material-ui/icons/Contacts";
import FiberManualRecord from "@material-ui/icons/FiberManualRecord";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardText from "components/Card/CardText.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";

import styles from "assets/jss/material-dashboard-pro-react/views/regularFormsStyle";

const useStyles = makeStyles(styles);


import { useFormik } from 'formik'
import * as Yup from 'yup'

export const ProgramasScreen = () => {

    const [programaApoyo, setProgramaApoyo] = useState('');
    const [clavePrograma, setClavePrograma] = useState('');

    
    const handleSubmit=(e)=>{
        e.preventDefault();      
        
    
        console.log('sa');
        console.log(clavePrograma);
        console.log(programaApoyo);
    }

    return (
        <form
        onSubmit={handleSubmit}
    >
        <GridContainer>


      <GridItem xs={12} sm={12} md={12}>
        <Card>
          
          <CardBody>
        

            <GridContainer>
                <GridItem xs={12} sm={10}>
                    <CustomInput
                        labelText="Nombre del Programa de Apoyo"
                        id="programaApoyo"
                        name="programaApoyo"
                        error={!programaApoyo}
                        formControlProps={{
                        fullWidth: true,
                        }}
                        inputProps={{
                            type: "text",
                            autoComplete: "off",
                            onChange: (event) => {
                                setProgramaApoyo(event.target.value);
                            },
                            
                          }}
                    />
                </GridItem>
            </GridContainer>


            <GridContainer>
                <GridItem xs={12} sm={10}>
                <CustomInput
                labelText="Clave del programa"
                    id="clavePrograma"
                    error={!clavePrograma}
                    name="clavePrograma"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: "text",
                      autoComplete: "off",
                      onChange: (event) => {
                       setClavePrograma(event.target.value);
                      },
                      
                    }}
                  />
                </GridItem>
            </GridContainer>

            <GridContainer>
                <GridItem xs={12} sm={10}>
                    <Button variant="contained" color="primary" type='submit'>
                        Guardar
                    </Button>
                    </GridItem>
            </GridContainer>
            
          </CardBody>
        </Card>
      </GridItem>
      
    </GridContainer>
    </form>
    )
}

