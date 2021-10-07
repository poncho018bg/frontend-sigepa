import React from 'react';
import { makeStyles } from "@material-ui/core/styles";

import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import { Link } from 'react-router-dom';

const useStyles = makeStyles(styles);

export const SubCatalogsBaseScreen = () => {

    const classes = useStyles();

    return (
        <>
            <div style={{ marginTop: 50 }}>
                <GridContainer>
                    <GridItem xs={12} sm={6} md={3}>
                        <Card>
                            <Link to="../admin/tiposApoyos">
                                <CardHeader color="warning" stats icon>
                                    <p style={{ margin: '3em', textAlign: 'center' }} className={classes.cardCategory}>Tipos de apoyo</p>
                                </CardHeader>
                            </Link>
                        </Card>
                    </GridItem>

                    <GridItem xs={12} sm={6} md={3}>
                        <Card>
                            <Link to="../admin/edadesBeneficiarios">
                                <CardHeader color="info" stats icon>
                                    <p style={{ margin: '3em', textAlign: 'center' }} className={classes.cardCategory}>Edades</p>
                                </CardHeader>
                            </Link>
                        </Card>
                    </GridItem>

                    <GridItem xs={12} sm={6} md={3}>
                        <Card>
                            <Link to="../admin/tiposBeneficiario">
                                <CardHeader color="info" stats icon>
                                    <p style={{ margin: '3em', textAlign: 'center' }} className={classes.cardCategory}>Beneficiarios</p>
                                </CardHeader>
                            </Link>
                        </Card>
                    </GridItem>


                    <GridItem xs={12} sm={6} md={3}>
                        <Card>
                            <Link to="../admin/periodicidadApoyos">
                                <CardHeader color="info" stats icon>
                                    <p style={{ margin: '3em', textAlign: 'center' }} className={classes.cardCategory}>Periodicidad de entrega</p>
                                </CardHeader>
                            </Link>
                        </Card>
                    </GridItem>

                </GridContainer>
                <GridContainer>


                    <GridItem xs={12} sm={6} md={3}>
                        <Card>
                            <Link to="../admin/numeroApoyos">
                                <CardHeader color="info" stats icon>
                                    <p style={{ margin: '3em', textAlign: 'center' }} className={classes.cardCategory}>Número de entregade Apoyo</p>
                                </CardHeader>
                            </Link>
                        </Card>
                    </GridItem>

                    <GridItem xs={12} sm={6} md={3}>
                        <Card>
                            <Link to="../admin/clasificacionServicios">
                                <CardHeader color="info" stats icon>
                                    <p style={{ margin: '3em', textAlign: 'center' }} className={classes.cardCategory}>Tipo de servicios</p>
                                </CardHeader>
                            </Link>
                        </Card>
                    </GridItem>

                    <GridItem xs={12} sm={6} md={3}>
                        <Card>
                            <Link to="../admin/modulos">
                                <CardHeader color="info" stats icon>
                                    <p style={{ margin: '3em', textAlign: 'center' }} className={classes.cardCategory}>Módulos (Roles)</p>
                                </CardHeader>
                            </Link>
                        </Card>
                    </GridItem>
                    <GridItem xs={12} sm={6} md={3}>
                        <Card>
                            <Link to="../admin/submodulos">
                                <CardHeader color="info" stats icon>
                                    <p style={{ margin: '3em', textAlign: 'center' }} className={classes.cardCategory}>Sub módulos (Funciones)</p>
                                </CardHeader>
                            </Link>
                        </Card>
                    </GridItem>

                    {/* <GridItem xs={12} sm={6} md={3}>
                        <Card>
                        <Link to="../admin/">
                                <CardHeader color="info" stats icon>
                                    <p style={{ margin: '3em', textAlign: 'center' }} className={classes.cardCategory}>Género</p>
                                </CardHeader>
                                </Link>
                        </Card>
                    </GridItem>
                    <GridItem xs={12} sm={6} md={3}>
                        <Card>

                            <Link to="../admin/">
                                <CardHeader color="info" stats icon>
                                    <p style={{ margin: '3em', textAlign: 'center' }} className={classes.cardCategory}>Estado Civil</p>
                                </CardHeader>
                                </Link>
                        </Card>
                    </GridItem>

                    <GridItem xs={12} sm={6} md={3}>
                        <Card>
                            <Link to="../admin/localidades">
                                <CardHeader color="warning" stats icon>
                                    <p style={{ margin: '3em', textAlign: 'center' }} className={classes.cardCategory}>Grado de estudios</p>
                                </CardHeader>
                            </Link>
                        </Card>
                    </GridItem> */}

                    <GridItem xs={12} sm={6} md={3}>
                        <Card>
                            <Link to="../admin/regionmunicip">
                                <CardHeader color="warning" stats icon>
                                    <p style={{ margin: '3em', textAlign: 'center' }} className={classes.cardCategory}>Regiones</p>
                                </CardHeader>
                            </Link>
                        </Card>
                    </GridItem>

                    <GridItem xs={12} sm={6} md={3}>
                        <Card>
                            <Link to="../admin/municipios">
                                <CardHeader color="warning" stats icon>
                                    <p style={{ margin: '3em', textAlign: 'center' }} className={classes.cardCategory}>Municipios</p>
                                </CardHeader>
                            </Link>
                        </Card>
                    </GridItem>

                    <GridItem xs={12} sm={6} md={3}>
                        <Card>
                            <Link to="../admin/estados">
                                <CardHeader color="warning" stats icon>
                                    <p style={{ margin: '3em', textAlign: 'center' }} className={classes.cardCategory}>Estados</p>
                                </CardHeader>
                            </Link>
                        </Card>
                    </GridItem>

                </GridContainer>
            </div>


        </>
    )
}