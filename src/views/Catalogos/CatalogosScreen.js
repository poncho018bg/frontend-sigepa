import React, { useContext, useEffect, useState } from 'react';
import { makeStyles } from "@material-ui/core/styles";

import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import FilterListIcon from '@material-ui/icons/FilterList';
import FormatIndentDecreaseIcon from '@material-ui/icons/FormatIndentDecrease';

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

const useStyles = makeStyles(styles);

export const CatalogosScreen = () => {


    const classes = useStyles();


    useEffect(() => {

    }, []);


    return (
        <>
            <div style={{ marginTop: 50 }}>
                <GridContainer>
                    <GridItem xs={12} sm={6} md={3}>
                        <Card>
                            <a href="../admin/programas">
                                <CardHeader color="warning" stats icon>
                                    <p style={{ margin: '3em', textAlign: 'center' }} className={classes.cardCategory}>Programas</p>
                                </CardHeader>
                            </a>
                        </Card>
                    </GridItem>

                    <GridItem xs={12} sm={6} md={3}>
                        <Card>
                            <a href="../admin/bitacoraActividades">
                                <CardHeader color="info" stats icon>
                                    <p style={{ margin: '3em', textAlign: 'center' }} className={classes.cardCategory}>Movimientos por usuario</p>
                                </CardHeader>
                            </a>
                        </Card>
                    </GridItem>

                    <GridItem xs={12} sm={6} md={3}>
                        <Card>
                            <a href="../admin/tiposApoyos">
                                <CardHeader color="info" stats icon>
                                    <p style={{ margin: '3em', textAlign: 'center' }} className={classes.cardCategory}>Tipo de apoyo</p>
                                </CardHeader>
                            </a>
                        </Card>
                    </GridItem>


                    <GridItem xs={12} sm={6} md={3}>
                        <Card>
                            <a href="../admin/continuidadActividades">
                                <CardHeader color="info" stats icon>
                                    <p style={{ margin: '3em', textAlign: 'center' }} className={classes.cardCategory}>Actividades por realizar para continuar con el beneficio</p>
                                </CardHeader>
                            </a>
                        </Card>
                    </GridItem>

                </GridContainer>
                <GridContainer>


                    <GridItem xs={12} sm={6} md={3}>
                        <Card>
                            <CardHeader color="info" stats icon>
                                <p style={{ margin: '3em', textAlign: 'center' }} className={classes.cardCategory}>Usuarios/Roles</p>
                            </CardHeader>
                        </Card>
                    </GridItem>

                    <GridItem xs={12} sm={6} md={3}>
                        <Card>
                            <CardHeader color="info" stats icon>
                                <p style={{ margin: '3em', textAlign: 'center' }} className={classes.cardCategory}>Padrón de beneficiarios</p>
                            </CardHeader>
                        </Card>
                    </GridItem>

                    <GridItem xs={12} sm={6} md={3}>
                        <Card>
                            <a href="../admin/motivosRechazos">
                                <CardHeader color="info" stats icon>
                                    <p style={{ margin: '3em', textAlign: 'center' }} className={classes.cardCategory}>Causas de baja</p>
                                </CardHeader>
                            </a>
                        </Card>
                    </GridItem>
                    <GridItem xs={12} sm={6} md={3}>
                        <Card>
                            <CardHeader color="info" stats icon>
                                <p style={{ margin: '3em', textAlign: 'center' }} className={classes.cardCategory}>Firmas de autorización de solicitudes</p>
                            </CardHeader>
                        </Card>
                    </GridItem>

                    <GridItem xs={12} sm={6} md={3}>
                        <Card>
                            <a href="../admin/apoyoservicio">
                                <CardHeader color="info" stats icon>
                                    <p style={{ margin: '3em', textAlign: 'center' }} className={classes.cardCategory}>Apoyo en servicios</p>
                                </CardHeader>
                            </a>
                        </Card>
                    </GridItem>
                    <GridItem xs={12} sm={6} md={3}>
                        <Card>
                            <CardHeader color="info" stats icon>
                                <p style={{ margin: '3em', textAlign: 'center' }} className={classes.cardCategory}>Cursos de capacitación (Tipo de apoyo en servicio)</p>
                            </CardHeader>
                        </Card>
                    </GridItem>





                </GridContainer>
            </div>


        </>
    )
}