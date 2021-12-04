import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
import cx from "classnames";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Hidden from "@material-ui/core/Hidden";

// material-ui icons
import Menu from "@material-ui/icons/Menu";

// core components
import AdminNavbarLinks from "./AdminNavbarLinks";
import Button from "components/CustomButtons/Button.js";
import styles from "assets/jss/material-dashboard-pro-react/components/adminNavbarStyle.js";

const useStyles = makeStyles(styles);

export default function AdminNavbar(props) {
  const classes = useStyles();
  const { color, rtlActive, brandText } = props;
  const [logo, setLogo] = React.useState(
    require("assets/img/Edomex_logo_escudo.png").default
  );
  const [logosigepa, setLogosigepa] = React.useState(
    require("assets/img/Logo-SIGEPAv6.gif").default
  );
  const [logoEdomex, setLogoEdomex] = React.useState(
    require("assets/img/edomexLogo.png").default
  );
  const appBarClasses = cx({
    [" " + classes[color]]: color,
  });
  const sidebarMinimize =
    classes.sidebarMinimize +
    " " +
    cx({
      [classes.sidebarMinimizeRTL]: rtlActive,
    });
  return (
    <AppBar className={classes.appBar + appBarClasses}>
      <Toolbar className={classes.container}>
        <Hidden smDown implementation="css">
          
        </Hidden>
        <div className={classes.flex}>
          <center> <img src={logosigepa} alt="EDOMEX" width="100%" />
          </center>
        </div>
        <Hidden smDown implementation="css">
          
        </Hidden>
        {/*<Hidden smDown implementation="css">
          <AdminNavbarLinks rtlActive={rtlActive} />
        </Hidden>*/}

        <Hidden mdUp implementation="css">
          <Button
            className={classes.appResponsive}
            color="transparent"
            justIcon
            aria-label="open drawer"
            onClick={props.handleDrawerToggle}
          >
            <Menu />
          </Button>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
}

AdminNavbar.propTypes = {
  color: PropTypes.oneOf(["primary", "info", "success", "warning", "danger"]),
  rtlActive: PropTypes.bool,
  brandText: PropTypes.string,
  miniActive: PropTypes.bool,
  handleDrawerToggle: PropTypes.func,
  sidebarMinimize: PropTypes.func,
};
