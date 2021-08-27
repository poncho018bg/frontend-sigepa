/*eslint-disable*/
import React, { useEffect, useState } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { NavLink,  useHistory } from "react-router-dom";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Icon from "@material-ui/core/Icon";
// core components
import AdminNavbarLinks from "components/Navbars/AdminNavbarLinks.js";
import RTLNavbarLinks from "components/Navbars/RTLNavbarLinks.js";

import styles from "assets/jss/material-dashboard-react/components/sidebarStyle.js";
import PersonIcon from '@material-ui/icons/Person';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import UserService from "../../servicios/UserService";
import Avatar from "@material-ui/core/Avatar";
import { useDispatch, useSelector } from 'react-redux'
import Button from "components/CustomButtons/Button.js";

import { DialogLogOut } from "views/Dialogs/DialogLogOut";
import { cerrarSesion } from "actions/SesionAction";

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import { red } from '@material-ui/core/colors';
import IconButton from '@material-ui/core/IconButton';
import { Typography } from "@material-ui/core";

const useStyles = makeStyles(styles);

const useStylesCard = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
  title: {
    color: '#fff !important',
    background: 'transparent',
    wordBreak: 'break-all',
    width: '3em !important',
  },
  subheader:{
    color: '#fff',
  },
  card:{
    color: '#fff !important',
    background: 'transparent'
  }

}));


const nombre = () => {
  return (<div>{UserService.getFirstName()} {UserService.getLastName()}</div>)
}
const roles = () => {
  return (
    UserService.getRoles().roles.map((rol) => {
      if (rol != 'offline_access') {
        if (rol != 'uma_authorization') {
          return (<p>{rol}</p>);
        }
      }
    })
  )

}

export default function Sidebar(props) {
  const classes = useStyles();
  const classesCard = useStylesCard();
  const history = useHistory();
  const [openProfile, setOpenProfile] = React.useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const dispatch = useDispatch();
  // verifies if routeName is the one active (in browser input)
  function activeRoute(routeName) {
    return window.location.href.indexOf(routeName) > -1 ? true : false;
  }
  const { color, logo, image, logoText, routes } = props;
  var links = (
    <>

      <List className={classes.list}>
        {routes.map((prop, key) => {
          var activePro = " ";
          var listItemClasses;
          if (prop.path === "/upgrade-to-pro") {
            activePro = classes.activePro + " ";
            listItemClasses = classNames({
              [" " + classes[color]]: true
            });
          } else {
            listItemClasses = classNames({
              [" " + classes[color]]: activeRoute(prop.layout + prop.path)
            });
          }
          const whiteFontClasses = classNames({
            [" " + classes.whiteFont]: activeRoute(prop.layout + prop.path)
          });
          return (


            <NavLink
              to={prop.layout + prop.path}
              className={activePro + classes.item}
              activeClassName="active"
              key={key}
            >

              <ListItem button className={classes.itemLink + listItemClasses}>
                {typeof prop.icon === "string" ? (
                  <Icon
                    className={classNames(classes.itemIcon, whiteFontClasses, {
                      [classes.itemIconRTL]: props.rtlActive
                    })}
                  >
                    {prop.icon}
                  </Icon>
                ) : (
                  <prop.icon
                    className={classNames(classes.itemIcon, whiteFontClasses, {
                      [classes.itemIconRTL]: props.rtlActive
                    })}
                  />
                )}
                <ListItemText
                  primary={props.rtlActive ? prop.rtlName : prop.name}
                  className={classNames(classes.itemText, whiteFontClasses, {
                    [classes.itemTextRTL]: props.rtlActive
                  })}
                  disableTypography={true}
                />
              </ListItem>
            </NavLink>
          );
        })}
      </List>
      <div style={{ position: `fixed`, bottom: `0px`, width: `15em`, wordBreak:`break-word`}}>
        <Card className={classesCard.card}>
          <CardHeader
           className={classesCard.card}
            avatar={
              <Avatar aria-label="recipe" style={{ color: `#fff` }}>
                <PersonIcon style={{ color: `#fff` }}></PersonIcon>
              </Avatar>
            }
            action={
              <IconButton aria-label="settings" style={{ color: `#fff` }}
                onClick={logout}
              >
                <ExitToAppIcon />
              </IconButton>
            }
            title= {<Typography className={classes.title}>{nombre()}</Typography>}
            subheader=  {<Typography className={classes.title}>{roles().slice(0,1)}</Typography>}
          />
          
        </Card>
      </div>
      {/*
      <div style={{ position: `fixed`, bottom: `0px` }}>
        <Avatar></Avatar>
        <span style={{ color: `#fff` }}>{UserService.getFirstName()} {UserService.getLastName()}</span>
        <Button
          style={{ background: `transparent` }}
          variant="contained"
          color="primary"
          className={classes.button}
          endIcon={<ExitToAppIcon />}
          onClick={logout}
        >
          Salir
        </Button>
      </div>
      <div style={{ position: `fixed`, bottom: `0px` }}>
        <span style={{ color: `#fff` }}>
          {UserService.getRoles().roles.map((rol) => {
            if (rol != 'offline_access') {
              if (rol != 'uma_authorization') {
                return <p>{rol}</p>
              }
            }
          })}
        </span>
      </div>
        */}

      <DialogLogOut
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        handleDeshabilitar={handleDeshabilitar}
      />


    </>
  );
  function logout() {
    //kcc.keycloak.logout();
    setOpenProfile(null);
    //sessionStorage.removeItem("token");
    setOpenDialog(true);
    //UserService.doLogout();
  }
  function handleDeshabilitar() {
    

    dispatch(cerrarSesion());
    UserService.doLogout();
    history.push('/')

    
    setOpenDialog(false);
  }
  var brand = (
    <div className={classes.logo}>
      <a
        href="https://www.creative-tim.com?ref=mdr-sidebar"
        className={classNames(classes.logoLink, {
          [classes.logoLinkRTL]: props.rtlActive
        })}
        target="_blank"
      >
        <div className={classes.logoImage}>
          <img src={logo} alt="logo" className={classes.img} />
        </div>
        {logoText}
      </a>
    </div>
  );
  return (
    <div>
      <Hidden mdUp implementation="css">
        <Drawer
          variant="temporary"
          anchor={props.rtlActive ? "left" : "right"}
          open={props.open}
          classes={{
            paper: classNames(classes.drawerPaper, {
              [classes.drawerPaperRTL]: props.rtlActive
            })
          }}
          onClose={props.handleDrawerToggle}
          ModalProps={{
            keepMounted: true // Better open performance on mobile.
          }}
        >
          {brand}
          <div className={classes.sidebarWrapper}>
            {props.rtlActive ? <RTLNavbarLinks /> : <AdminNavbarLinks />}
            {links}
          </div>
          {image !== undefined ? (
            <div
              className={classes.background}
              style={{ backgroundImage: "url(" + image + ")" }}
            />
          ) : null}
        </Drawer>
      </Hidden>
      <Hidden smDown implementation="css">
        <Drawer
          anchor={props.rtlActive ? "right" : "left"}
          variant="permanent"
          open
          classes={{
            paper: classNames(classes.drawerPaper, {
              [classes.drawerPaperRTL]: props.rtlActive
            })
          }}
        >
          {brand}
          <div className={classes.sidebarWrapper}>{links}</div>
          {image !== undefined ? (
            <div
              className={classes.background}
              style={{ backgroundImage: "url(" + image + ")" }}
            />
          ) : null}
        </Drawer>
      </Hidden>
    </div>
  );
}

Sidebar.propTypes = {
  rtlActive: PropTypes.bool,
  handleDrawerToggle: PropTypes.func,
  bgColor: PropTypes.oneOf(["purple", "blue", "green", "orange", "red"]),
  logo: PropTypes.string,
  image: PropTypes.string,
  logoText: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object),
  open: PropTypes.bool
};
