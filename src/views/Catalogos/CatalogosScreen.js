import React from 'react';
import { makeStyles } from "@material-ui/core/styles";

import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles(styles);

export const CatalogosScreen = () => {


    const classes = useStyles();
    const { t } = useTranslation();


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
                            <a href="../admin/documentoRequisito">
                                <CardHeader color="info" stats icon>
                                    <p style={{ margin: '3em', textAlign: 'center' }} className={classes.cardCategory}>Documentos</p>
                                </CardHeader>
                            </a>
                        </Card>
                    </GridItem>

                    <GridItem xs={12} sm={6} md={3}>
                        <Card>
                            <a href="../admin/catapoyoservicio">
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
                            <Link to="../admin/padronBeneficiarios">
                                <CardHeader color="info" stats icon>
                                    <p style={{ margin: '3em', textAlign: 'center' }} className={classes.cardCategory}>Padrón de beneficiarios</p>
                                </CardHeader>
                            </Link>
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
                            <Link to="../admin/firmas">
                                <CardHeader color="info" stats icon>
                                    <p style={{ margin: '3em', textAlign: 'center' }} className={classes.cardCategory}>Firmas de autorización de solicitudes</p>
                                </CardHeader>
                            </Link>
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
                            <a href="../admin/cursosCapacitaciones">
                                <CardHeader color="info" stats icon>
                                    <p style={{ margin: '3em', textAlign: 'center' }} className={classes.cardCategory}>Cursos de capacitación (Tipo de apoyo en servicio)</p>
                                </CardHeader>
                            </a>
                        </Card>
                    </GridItem>

                    <GridItem xs={12} sm={6} md={3}>
                        <Card>
                            <Link to="../admin/localidades">
                                <CardHeader color="warning" stats icon>
                                    <p style={{ margin: '3em', textAlign: 'center' }} className={classes.cardCategory}>Localidades</p>
                                </CardHeader>
                            </Link>
                        </Card>
                    </GridItem>



                </GridContainer>
            </div>


        </>
    )
}