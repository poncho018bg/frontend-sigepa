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

export const SubCatalogsBaseScreen = () => {

    const classes = useStyles();
    const { t } = useTranslation();

    return (
        <>
            <div style={{ marginTop: 50 }}>
                <GridContainer>
                    <GridItem xs={12} sm={6} md={3}>
                        <Card>
                            <Link to="../admin/tiposApoyos">
                                <CardHeader color="warning" stats icon style={{ height: '9rem' }}>
                                    <p style={{ margin: '3em', textAlign: 'center' }} className={classes.cardCategory}>{t('btn.tipoapoyosubcat')}</p>
                                </CardHeader>
                            </Link>
                        </Card>
                    </GridItem>

                    <GridItem xs={12} sm={6} md={3}>
                        <Card>
                            <Link to="../admin/edadesBeneficiarios">
                                <CardHeader color="info" stats icon style={{ height: '9rem' }}>
                                    <p style={{ margin: '3em', textAlign: 'center' }} className={classes.cardCategory}>{t('btn.edades')}</p>
                                </CardHeader>
                            </Link>
                        </Card>
                    </GridItem>

                    <GridItem xs={12} sm={6} md={3}>
                        <Card>
                            <Link to="../admin/tiposBeneficiario">
                                <CardHeader color="info" stats icon style={{ height: '9rem' }}>
                                    <p style={{ margin: '3em', textAlign: 'center' }} className={classes.cardCategory}>{t('btn.beneficiarios')}</p>
                                </CardHeader>
                            </Link>
                        </Card>
                    </GridItem>


                    <GridItem xs={12} sm={6} md={3}>
                        <Card>
                            <Link to="../admin/periodicidadApoyos">
                                <CardHeader color="info" stats icon style={{ height: '9rem' }}>
                                    <p style={{ margin: '3em', textAlign: 'center' }} className={classes.cardCategory}>{t('btn.periodicidadentrega')}</p>
                                </CardHeader>
                            </Link>
                        </Card>
                    </GridItem>

                </GridContainer>
                <GridContainer>


                    <GridItem xs={12} sm={6} md={3}>
                        <Card>
                            <Link to="../admin/numeroApoyos">
                                <CardHeader color="info" stats icon style={{ height: '9rem' }}>
                                    <p style={{ margin: '3em', textAlign: 'center' }} className={classes.cardCategory}>{t('btn.numentregaapoyo')}</p>
                                </CardHeader>
                            </Link>
                        </Card>
                    </GridItem>

                    <GridItem xs={12} sm={6} md={3}>
                        <Card>
                            <Link to="../admin/clasificacionServicios">
                                <CardHeader color="info" stats icon style={{ height: '9rem' }}>
                                    <p style={{ margin: '3em', textAlign: 'center' }} className={classes.cardCategory}>{t('btn.tipservicios')}</p>
                                </CardHeader>
                            </Link>
                        </Card>
                    </GridItem>

                    <GridItem xs={12} sm={6} md={3}>
                        <Card>
                            <Link to="../admin/modulos">
                                <CardHeader color="info" stats icon style={{ height: '9rem' }}>
                                    <p style={{ margin: '3em', textAlign: 'center' }} className={classes.cardCategory}>{t('btn.modulosroles')}</p>
                                </CardHeader>
                            </Link>
                        </Card>
                    </GridItem>
                    <GridItem xs={12} sm={6} md={3}>
                        <Card>
                            <Link to="../admin/submodulos">
                                <CardHeader color="info" stats icon style={{ height: '9rem' }}>
                                    <p style={{ margin: '3em', textAlign: 'center' }} className={classes.cardCategory}>{t('btn.submodulosfunciones')}</p>
                                </CardHeader>
                            </Link>
                        </Card>
                    </GridItem>





                    <GridItem xs={12} sm={6} md={3}>
                        <Card>
                            <Link to="../admin/estadoCivil">
                                <CardHeader color="info" stats icon style={{ height: '9rem' }}>
                                    <p style={{ margin: '3em', textAlign: 'center' }} className={classes.cardCategory}>{t('btn.estadocivil')}</p>
                                </CardHeader>
                            </Link>
                        </Card>
                    </GridItem>

                    {/* <GridItem xs={12} sm={6} md={3}>
                        <Card>
                            <Link to="../admin/estatusRegistro">
                                <CardHeader color="info" stats icon style={{ height: '9rem' }}>
                                    <p style={{ margin: '3em', textAlign: 'center' }} className={classes.cardCategory}>{t('btn.estatusregistro')}</p>
                                </CardHeader>
                            </Link>
                        </Card>
                    </GridItem> */}

                    <GridItem xs={12} sm={6} md={3}>
                        <Card>
                            <Link to="../admin/genero">
                                <CardHeader color="info" stats icon style={{ height: '9rem' }}>
                                    <p style={{ margin: '3em', textAlign: 'center' }} className={classes.cardCategory}>{t('btn.genero')}</p>
                                </CardHeader>
                            </Link>
                        </Card>
                    </GridItem>

                    <GridItem xs={12} sm={6} md={3}>
                        <Card>
                            <Link to="../admin/gradoEstudio">
                                <CardHeader color="info" stats icon style={{ height: '9rem' }}>
                                    <p style={{ margin: '3em', textAlign: 'center' }} className={classes.cardCategory}>{t('btn.gradoestudios')}</p>
                                </CardHeader>
                            </Link>
                        </Card>
                    </GridItem>

                    <GridItem xs={12} sm={6} md={3}>
                        <Card>
                            <Link to="../admin/identificacione">
                                <CardHeader color="info" stats icon style={{ height: '9rem' }}>
                                    <p style={{ margin: '3em', textAlign: 'center' }} className={classes.cardCategory}>{t('btn.identificaciónoficial')}</p>
                                </CardHeader>
                            </Link>
                        </Card>
                    </GridItem>
{/*
                     <GridItem xs={12} sm={6} md={3}>
                        <Card>
                        <Link to="../admin/">
                                <CardHeader color="info" stats icon style={{ height: '9rem' }}>
                                    <p style={{ margin: '3em', textAlign: 'center' }} className={classes.cardCategory}>Género</p>
                                </CardHeader>
                                </Link>
                        </Card>
                    </GridItem>
                    <GridItem xs={12} sm={6} md={3}>
                        <Card>

                            <Link to="../admin/">
                                <CardHeader color="info" stats icon style={{ height: '9rem' }}>
                                    <p style={{ margin: '3em', textAlign: 'center' }} className={classes.cardCategory}>Estado Civil</p>
                                </CardHeader>
                                </Link>
                        </Card>
                    </GridItem>

                    <GridItem xs={12} sm={6} md={3}>
                        <Card>
                            <Link to="../admin/localidades">
                                <CardHeader color="warning" stats icon style={{ height: '9rem' }}>
                                    <p style={{ margin: '3em', textAlign: 'center' }} className={classes.cardCategory}>Grado de estudios</p>
                                </CardHeader>
                            </Link>
                        </Card>
                    </GridItem> 
                    
                    <GridItem xs={12} sm={6} md={3}>
                        <Card>
                            <Link to="../admin/regionmunicip">
                                <CardHeader color="warning" stats icon style={{ height: '9rem' }}>
                                    <p style={{ margin: '3em', textAlign: 'center' }} className={classes.cardCategory}>{t('btn.regiones')}</p>
                                </CardHeader>
                            </Link>
                        </Card>
                    </GridItem>

                    <GridItem xs={12} sm={6} md={3}>
                        <Card>
                            <Link to="../admin/municipios">
                                <CardHeader color="warning" stats icon style={{ height: '9rem' }}>
                                    <p style={{ margin: '3em', textAlign: 'center' }} className={classes.cardCategory}>{t('btn.municipios')}</p>
                                </CardHeader>
                            </Link>
                        </Card>
                    </GridItem>

                    <GridItem xs={12} sm={6} md={3}>
                        <Card>
                            <Link to="../admin/estados">
                                <CardHeader color="warning" stats icon style={{ height: '9rem' }}>
                                    <p style={{ margin: '3em', textAlign: 'center' }} className={classes.cardCategory}>{t('btn.estados')}</p>
                                </CardHeader>
                            </Link>
                        </Card>
                    </GridItem>
                    */}

                </GridContainer>
            </div>


        </>
    )
}