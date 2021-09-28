import React, { useEffect, useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";

import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.js";
import customCheckboxRadioSwitch from "assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.js";
import axios from "axios";
import { TextField } from "@material-ui/core";

const styles = {
  infoText: {
    fontWeight: "300",
    margin: "10px 0 30px",
    textAlign: "center",
  },
  inputAdornmentIcon: {
    color: "#555",
  },
  choiche: {
    textAlign: "center",
    cursor: "pointer",
    marginTop: "20px",
  },
  ...customSelectStyle,
  ...customCheckboxRadioSwitch,
};

const useStyles = makeStyles(styles);

const Step2 = React.forwardRef((props, ref) => {
  console.log('aqui');
  console.log(props);
  console.log(props.allStates.about);
  const classes = useStyles();
  const [simpleSelect, setsimpleSelect] = React.useState("");
  const [design, setdesign] = React.useState(false);
  const [code, setcode] = React.useState(false);
  const [develop, setdevelop] = React.useState(false);
  const [nombre, setNombre] = useState("")
  const [curp, setCurp] = useState("");
  const [apellidoPaterno, setApellidoPaterno] = useState("");
  const [apellidoMaterno, setapellidoMaterno] = useState("");
  const [genero, setGenero] = useState("");
  const [fechaNacimientoAxu, setFechaNacimientoAxu] = useState("");
  const [edad, setEdad] = useState("");

  useEffect(() => {
   
    axios.get(`http://localhost:9080/v1/curp/consultaCurp/${props.allStates.about?.curp}`)
    .then(response => {
      console.log(response);
      setNombre(response.data.response[0].nombre);
      setCurp(response.data.response[0].curp);
      setApellidoPaterno(response.data.response[0].apellidoPaterno);
      setapellidoMaterno(response.data.response[0].apellidoMaterno);
      setGenero(response.data.response[0].sexo)
      setFechaNacimientoAxu(response.data.response[0].fechaNacimientoAxu);
      setEdad(response.data.response[0].edad);
    })
  }, [props.allStates.about])



  React.useImperativeHandle(ref, () => ({
    isValidated: () => {
      return isValidated();
    },
    sendState: () => {
      return sendState();
    },
    state: {
      simpleSelect,
      design,
      code,
      develop,
    },
  }));
  const sendState = () => {
    return {
      simpleSelect,
      design,
      code,
      develop,
    };
  };
  const isValidated = () => {
    return true;
  };
  return (
    <div>
      <h4 className={classes.infoText}>What are you doing? (checkboxes)</h4>
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={12} lg={10}>
          <GridContainer>
   
            <GridItem xs={12} sm={12}>
            <TextField
                  style={{marginBottom: '20px'}}
                  id="curp"
                  label="Curp"
                  variant="outlined"
                  name="curp"
                  fullWidth
                  value={curp}
                
            />
            </GridItem>
            <GridItem xs={12} sm={12}>
            <TextField
                  style={{marginBottom: '20px'}}
                  id="apellidoPaterno"
                  label="Apellido Paterno"
                  variant="outlined"
                  nombre="nombre"
                  fullWidth
                  value={apellidoPaterno}
                
            />
            </GridItem>
            <GridItem xs={12} sm={12}>
            <TextField
                  style={{marginBottom: '20px'}}
                  id="apellidoMaterno"
                  label="Apellido Materno"
                  variant="outlined"
                  nombre="apellidoMaterno"
                  fullWidth
                  value={apellidoMaterno}
                
            />
            </GridItem>
              <GridItem xs={12} sm={12}>
              <TextField
                    style={{marginBottom: '20px'}}
                    id="nombre"
                    label="Nombre"
                    variant="outlined"
                    nombre="nombre"
                    fullWidth
                    value={nombre}
                  
              />
              </GridItem>

              <GridItem xs={12} sm={6}>
                <TextField
                      style={{marginBottom: '20px'}}
                      id="genero"
                      label="Genero"
                      variant="outlined"
                      nombre="genero"
                      fullWidth
                      value={genero}
                    
                />
            </GridItem>

            <GridItem xs={12} sm={6}>
                <TextField
                      style={{marginBottom: '20px'}}
                      id="fechaNacimientoAxu"
                      label="Fecha Nacimiento"
                      variant="outlined"
                      nombre="fechaNacimientoAxu"
                      fullWidth
                      value={fechaNacimientoAxu}
                    
                />
            </GridItem>

            <GridItem xs={12} sm={6}>
                <TextField
                      style={{marginBottom: '20px'}}
                      id="edad"
                      label="Edad"
                      variant="outlined"
                      nombre="edad"
                      fullWidth
                      value={edad}
                    
                />
            </GridItem>
            
            
          </GridContainer>
        </GridItem>
      </GridContainer>


      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={12} lg={10}>
          <GridContainer>
   
            <GridItem xs={12} sm={4}>
            <TextField
                  style={{marginBottom: '20px'}}
                  id="curp"
                  label="Tipo de Identificación Oficial"
                  variant="outlined"
                  name="curp"
                  fullWidth
                  value={curp}
                
            />
            </GridItem>
            <GridItem xs={12} sm={4}>
            <TextField
                  style={{marginBottom: '20px'}}
                  id="apellidoPaterno"
                  label="Identificación Oficial"
                  variant="outlined"
                  nombre="nombre"
                  fullWidth
                  value={apellidoPaterno}
                
            />
            </GridItem>
            <GridItem xs={12} sm={4}>
            <TextField
                  style={{marginBottom: '20px'}}
                  id="apellidoMaterno"
                  label="Folio"
                  variant="outlined"
                  nombre="apellidoMaterno"
                  fullWidth
                  value={apellidoMaterno}
                
            />
            </GridItem>
            
          </GridContainer>
        </GridItem>
      </GridContainer>
    </div>
  );
});

Step2.displayName = "Step2";

export default Step2;
