import React, { useState } from "react";
import Email from "@material-ui/icons/Email";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import CustomInput from "components/CustomInput/CustomInput.js";
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
  inputAdornment: {
    position: "relative",
  },
};

const useStyles = makeStyles(styles);

const Step1 = React.forwardRef((props, ref) => {
  const classes = useStyles();

  const [email, setemail] = React.useState("");
  const [emailState, setemailState] = React.useState("");

  const [curp, setCurp] = useState('');

  React.useImperativeHandle(ref, () => ({
    isValidated: () => {
      return isValidated();
    },
    sendState: () => {
      return sendState();
    },
    state: {
      email,
      emailState,
      curp
    },
  }));
  const sendState = () => {
    return {

      email,
      emailState,
      curp
    };
  };
  // function that returns true if value is email, false otherwise
  const verifyEmail = (value) => {
    var emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (emailRex.test(value)) {
      return true;
    }
    return false;
  };
 
  const isValidated = () => {
    if (
      emailState === "success"
    ) {
      return true;
    } else {
      if (emailState !== "success") {
        setemailState("error");
      }
    }
    return false;
  };
  return (
    <GridContainer justify="center">
      <GridItem xs={12} sm={12}>
        <h4 className={classes.infoText}>
          Let{"'"}s start with the basic information (with validation)
        </h4>
      </GridItem>
      <GridItem xs={12} sm={12} md={12} lg={10}>
        <CustomInput
          success={emailState === "success"}
          error={emailState === "error"}
          labelText={
            <span>
              Email <small>(required)</small>
            </span>
          }
          id="email"
          formControlProps={{
            fullWidth: true,
          }}
          inputProps={{
            onChange: (event) => {
              if (!verifyEmail(event.target.value)) {
                setemailState("error");
              } else {
                setemailState("success");
              }
              setemail(event.target.value);
            },
            endAdornment: (
              <InputAdornment position="end" className={classes.inputAdornment}>
                <Email className={classes.inputAdornmentIcon} />
              </InputAdornment>
            ),
          }}
        />
      </GridItem>
      <GridItem xs={12} sm={12} md={12} lg={10}>
          <TextField
                  style={{marginBottom: '20px'}}
                  id="curp"
                  label="Curp"
                  variant="outlined"
                  name="curp"
                  fullWidth
                  onChange={event => {
                    const { value } = event.target;
                    setCurp(value);
                  }}      
            />

      </GridItem>
    </GridContainer>
  );
});

Step1.displayName = "Step1";

export default Step1;
