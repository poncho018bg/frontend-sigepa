import React from "react";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons
import Icon from "@material-ui/core/Icon";
import Home from "@material-ui/icons/Home";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";

import styles from "assets/jss/material-dashboard-pro-react/views/pricingPageStyle.js";

const useStyles = makeStyles(styles);

export default function Dashboard() {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={6}>
          <h1 className={classes.title}>SIGEPA</h1>
          <h3 className={classes.description}>
            Bienvenido al sistema
          </h3>
        </GridItem>
      </GridContainer>
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={12}>
          <Card pricing plain>
            <CardBody pricing plain>
              <div className={classes.icon}>
                <Home className={classes.iconRose} />
              </div>
              <h5 className={classes.description}>
                Aqui podras realizar todos los tramites que requieras
              </h5>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
