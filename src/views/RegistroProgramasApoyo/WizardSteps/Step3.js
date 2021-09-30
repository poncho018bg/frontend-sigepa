import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";

// core components
import CustomInput from "components/CustomInput/CustomInput.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";

import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.js";
import { TextField } from "@material-ui/core";

const styles = {
  infoText: {
    fontWeight: "300",
    margin: "10px 0 30px",
    textAlign: "center",
  },
  ...customSelectStyle,
};

const useStyles = makeStyles(styles);

const Step3 = React.forwardRef((props, ref) => {
  const classes = useStyles();
  const [simpleSelect, setsimpleSelect] = React.useState("");
  React.useImperativeHandle(ref, () => ({
    isValidated: () => {
      return isValidated();
    },
    sendState: () => {
      return sendState();
    },
    state: {
      simpleSelect,
    },
  }));
  const sendState = () => {
    return {
      simpleSelect,
    };
  };
  const isValidated = () => {
    return true;
  };
  return (
    <GridContainer justify="center">
      <GridItem xs={12} sm={12}>
        <h4 className={classes.infoText}>Are you living in a nice area?</h4>
      </GridItem>
      <GridItem xs={12} sm={7}>
        <TextField
                style={{marginBottom: '20px'}}
                id="calle"
                label="Calle"
                variant="outlined"
                name="calle"
                fullWidth
          />
      </GridItem>
      <GridItem xs={12} sm={3}>
        <TextField
                  style={{marginBottom: '20px'}}
                  id="numeroExterior"
                  label="Número Exterior"
                  variant="outlined"
                  name="numeroExterior"
                  fullWidth
            />
      </GridItem>
      <GridItem xs={12} sm={3}>
        <TextField
                  style={{marginBottom: '20px'}}
                  id="numeroInterior"
                  label="Número Interior"
                  variant="outlined"
                  name="numeroInterior"
                  fullWidth
            />
      </GridItem>
      <GridItem xs={12} sm={7}>
        <TextField
                  style={{marginBottom: '20px'}}
                  id="colonia"
                  label="Colonia"
                  variant="outlined"
                  name="colonia"
                  fullWidth
            />
      </GridItem>


      <GridItem xs={12} sm={5}>
        <TextField
                style={{marginBottom: '20px'}}
                id="entreCalle"
                label="Entre Calle"
                variant="outlined"
                name="entreCalle"
                fullWidth
          />
      </GridItem>
      <GridItem xs={12} sm={5}>
        <TextField
                  style={{marginBottom: '20px'}}
                  id="yCalle"
                  label="Y calle"
                  variant="outlined"
                  name="yCalle"
                  fullWidth
            />
      </GridItem>
      <GridItem xs={12} sm={3}>
        <TextField
                  style={{marginBottom: '20px'}}
                  id="entidadFederativa"
                  label="Entidad Federativa"
                  variant="outlined"
                  name="entidadFederativa"
                  fullWidth
            />
      </GridItem>
      <GridItem xs={12} sm={7}>
        <TextField
                  style={{marginBottom: '20px'}}
                  id="codigoPostal"
                  label="Código Postal"
                  variant="outlined"
                  name="codigoPostal"
                  fullWidth
            />
      </GridItem>

      <GridItem xs={12} sm={7}>
        <TextField
                style={{marginBottom: '20px'}}
                id="municipio"
                label="Municipio"
                variant="outlined"
                name="municipio"
                fullWidth
          />
      </GridItem>
      <GridItem xs={12} sm={3}>
        <TextField
                  style={{marginBottom: '20px'}}
                  id="ctLocalidad"
                  label="CT Localidad"
                  variant="outlined"
                  name="ctLocalidad"
                  fullWidth
            />
      </GridItem>


      <GridItem xs={12} sm={3}>
        <TextField
                  style={{marginBottom: '20px'}}
                  id="nombreMunicipio"
                  label="Nombre del Municipio"
                  variant="outlined"
                  name="nombreMunicipio"
                  fullWidth
            />
      </GridItem>
      <GridItem xs={12} sm={7}>
        <TextField
                  style={{marginBottom: '20px'}}
                  id="nombreLocalidad"
                  label="Nombre Localidad"
                  variant="outlined"
                  name="nombreLocalidad"
                  fullWidth
            />
      </GridItem>


      <GridItem xs={12} sm={10}>
        <TextField
                style={{marginBottom: '20px'}}
                id="otraReferencia"
                label="Otra referencia"
                variant="outlined"
                name="otraReferencia"
                fullWidth
          />
      </GridItem>
     
      
    </GridContainer>
  );
});

Step3.displayName = "Step3";

export default Step3;
