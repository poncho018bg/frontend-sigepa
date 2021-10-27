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
                        <Card  >
                            <Link to="../admin/programas">
                                <CardHeader color="warning" stats icon style={{ height: '9rem' }}>
                                    <p style={{ margin: '3em', textAlign: 'center' }} className={classes.cardCategory}>{t('btn.programas')}</p>
                                </CardHeader>
                            </Link>

                        </Card>
                    </GridItem>

                    <GridItem xs={12} sm={6} md={3}>
                        <Card>
                            <Link to="../admin/documentoRequisito">
                                <CardHeader color="info" stats icon style={{ height: '9rem' }}>
                                    <p style={{ margin: '3em', textAlign: 'center' }} className={classes.cardCategory}>{t('btn.documentos')}</p>
                                </CardHeader>
                            </Link>

                        </Card>
                    </GridItem>

                    <GridItem xs={12} sm={6} md={3}>
                        <Card>
                            <Link to="../admin/catapoyoservicio">
                                <CardHeader color="info" stats icon style={{ height: '9rem' }}>
                                    <p style={{ margin: '3em', textAlign: 'center' }} className={classes.cardCategory}>{t('btn.tipoapoyo')}</p>
                                </CardHeader>
                            </Link>

                        </Card>
                    </GridItem>


                    <GridItem xs={12} sm={6} md={3}>
                        <Card>
                            <Link to="../admin/continuidadActividades">
                                <CardHeader color="info" stats icon style={{ height: '9rem' }}>
                                    <p style={{ margin: '3em', textAlign: 'center' }} className={classes.cardCategory}>{t('btn.actividadescontinuar')}</p>
                                </CardHeader>
                            </Link>

                        </Card>
                    </GridItem>

                </GridContainer>
                <GridContainer>




                    <GridItem xs={12} sm={6} md={3}>
                        <Card>
                            <Link to="../admin/padronBeneficiarios">
                                <CardHeader color="info" stats icon style={{ height: '9rem' }}>
                                    <p style={{ margin: '3em', textAlign: 'center' }} className={classes.cardCategory}> {t('btn.padronbeneficiaros')}</p>
                                </CardHeader>
                            </Link>
                        </Card>
                    </GridItem>

                    <GridItem xs={12} sm={6} md={3}>
                        <Card>
                            <Link to="../admin/motivosRechazos">
                                <CardHeader color="info" stats icon style={{ height: '9rem' }}>
                                    <p style={{ margin: '3em', textAlign: 'center' }} className={classes.cardCategory}>{t('btn.causasbaja')}</p>
                                </CardHeader>
                            </Link>

                        </Card>
                    </GridItem>
                    <GridItem xs={12} sm={6} md={3}>
                        <Card>
                            <Link to="../admin/firmas">
                                <CardHeader color="info" stats icon style={{ height: '9rem' }}>
                                    <p style={{ margin: '3em', textAlign: 'center' }} className={classes.cardCategory}>{t('btn.firmasautorizacion')}</p>
                                </CardHeader>
                            </Link>
                        </Card>
                    </GridItem>

                    <GridItem xs={12} sm={6} md={3}>
                        <Card>
                            <Link to="../admin/apoyoservicio">
                                <CardHeader color="info" stats icon style={{ height: '9rem' }}>
                                    <p style={{ margin: '3em', textAlign: 'center' }} className={classes.cardCategory}>{t('btn.apoyoservicios')}</p>
                                </CardHeader>
                            </Link>

                        </Card>
                    </GridItem>
                    <GridItem xs={12} sm={6} md={3}>
                        <Card>
                            <Link to="../admin/cursosCapacitaciones">
                                <CardHeader color="info" stats icon style={{ height: '9rem' }}>
                                    <p style={{ margin: '3em', textAlign: 'center' }} className={classes.cardCategory}>{t('btn.cursoscapacitacion')}</p>
                                </CardHeader>
                            </Link>

                        </Card>
                    </GridItem>

                   {/*  <GridItem xs={12} sm={6} md={3}>
                        <Card>
                            <Link to="../admin/localidades">
                                <CardHeader color="warning" stats icon style={{ height: '9rem' }}>
                                    <p style={{ margin: '3em', textAlign: 'center' }} className={classes.cardCategory}>{t('btn.localidades')}</p>
                                </CardHeader>
                            </Link>
                        </Card>
                    </GridItem> */}



                </GridContainer>
            </div>


        </>
    )
}