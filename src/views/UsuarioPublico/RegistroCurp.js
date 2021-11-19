import React, { useState, useEffect } from "react";
import Email from "@material-ui/icons/Email";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import { TextField } from "@material-ui/core";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import { Link } from "react-router-dom";

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

export const RegistroCurp = ({ setActivar, setCurp, curp,nombrePrograma }) => {
    const classes = useStyles();

    const [email, setemail] = React.useState("");
    const [emailState, setemailState] = React.useState("");

    const Next = () => {
        console.log("entro al next");
        setActivar(true);
    }
    useEffect(() => {
        Next();
    }, [email]);
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
        <GridItem xs={12} sm={12} md={12}>
            <Card>
                <CardHeader color="primary">
                    <h4 className={classes.cardTitleWhite}>CURP</h4>
                </CardHeader>
                <CardBody>
                    <GridContainer justify="center">
                        <GridItem xs={12} sm={12}>
                            <h4 className={classes.infoText}>
                                {nombrePrograma}
                            </h4>
                        </GridItem>

                        <GridItem xs={12} sm={12} md={12} lg={10}>
                            <TextField
                                style={{ marginBottom: '20px' }}
                                id="curp"
                                label="CURP"
                                variant="outlined"
                                name="curp"
                                fullWidth
                                value={curp}
                                onClick={event => {
                                    let testCurp = /^[a-zA-Z0-9_.-\sñÑ]*$/;
                                    if (testCurp.test(event.target.value)) {
                                        const { value } = event.target;
                                        setCurp(value);
                                    }
                                }}
                                onChange={event => {
                                    let testCurp = /^[a-zA-Z0-9_.-\sñÑ]*$/;
                                    if (testCurp.test(event.target.value)) {
                                        const { value } = event.target;
                                        setCurp(value);
                                    }
                                }}
                                inputProps={{ maxlength: 18, pattern: '/^[a-zA-Z0-9_.-\sñÑ]*$/' }}
                            />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={12} lg={10}>
                            <a href="https://www.gob.mx/curp/">¿No conoces tu CURP?</a>
                        </GridItem>
                    </GridContainer>
                </CardBody>
            </Card>
        </GridItem>
    );
}