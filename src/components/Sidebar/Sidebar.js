/*eslint-disable*/
import React, { useState } from "react";
import PropTypes from "prop-types";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";
import { NavLink, useLocation } from "react-router-dom";
import cx from "classnames";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Hidden from "@material-ui/core/Hidden";
import Collapse from "@material-ui/core/Collapse";
import Icon from "@material-ui/core/Icon";
import PersonIcon from "@material-ui/icons/Person";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import { red } from "@material-ui/core/colors";
import IconButton from "@material-ui/core/IconButton";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { Typography, Avatar } from "@material-ui/core";

// core components
import { DialogLogOut } from "views/Dialogs/DialogLogOut";
import { useDispatch, useSelector } from "react-redux";
import sidebarStyle from "assets/jss/material-dashboard-react/components/sidebarStyle.js";
import { useHistory } from "react-router";

const useStyles = makeStyles(sidebarStyle);

const useStylesCard = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
  title: {
    color: "#fff !important",
    background: "transparent",
    wordBreak: "break-all",
    width: "3em !important",
  },
  subheader: {
    color: "#fff",
  },
  card: {
    color: "#fff !important",
    background: "transparent",
  },
}));

var ps;

// We've created this component so we can have a ref to the wrapper of the links that appears in our sidebar.
// This was necessary so that we could initialize PerfectScrollbar on the links.
// There might be something with the Hidden component from material-ui, and we didn't have access to
// the links, and couldn't initialize the plugin.
function SidebarWrapper({ className, user, headerLinks, links }) {
  const sidebarWrapper = React.useRef();

  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(sidebarWrapper.current, {
        suppressScrollX: true,
        suppressScrollY: false,
      });
    }
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
      }
    };
  });
  return (
    <div className={className} ref={sidebarWrapper}>
      {user}
      {headerLinks}
      {links}
    </div>
  );
}

const nombre = () => {
  return (
    <div>
      {sessionStorage.getItem("firstName")} {sessionStorage.getItem("lastName")}
    </div>
  );
};

function Sidebar(props) {
  const kcc = useSelector((state) => state.auth);
  let query = useLocation();
  let history = useHistory();
  const classes = useStyles();
  const [miniActive, setMiniActive] = React.useState(true);
  const classesCard = useStylesCard();
  const [openProfile, setOpenProfile] = React.useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const dispatch = useDispatch();
  const rolesall = useSelector((state) => state.roles);
  const perfilSubmodulos = useSelector((state) => state.perfilSubmodulos);

  // to check for active links and opened collapses
  let location = useLocation();
  // this is for the user collapse
  const [openAvatar, setOpenAvatar] = React.useState(false);
  // this is for the rest of the collapses
  const [state, setState] = React.useState({});
  React.useEffect(() => {
    setState(getCollapseStates(props.routes));
  }, []);
  const mainPanel = React.useRef();
  // this creates the intial state of this component based on the collapse routes
  // that it gets through routes
  const getCollapseStates = (routes) => {
    let initialState = {};
    routes.map((prop) => {
      if (prop.collapse) {
        initialState = {
          [prop.state]: getCollapseInitialState(prop.views),
          ...getCollapseStates(prop.views),
          ...initialState,
        };
      }
      return null;
    });
    return initialState;
  };
  // this verifies if any of the collapses should be default opened on a rerender of this component
  // for example, on the refresh of the page,
  // while on the src/views/forms/RegularForms.jsx - route /admin/regular-forms
  const getCollapseInitialState = (routes) => {
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].collapse && getCollapseInitialState(routes[i].views)) {
        return true;
      } else if (location.pathname === routes[i].layout + routes[i].path) {
        return true;
      }
    }
    return false;
  };
  // verifies if routeName is the one active (in browser input)
  const activeRoute = (routeName) => {
    return location.pathname === routeName ? "active" : "";
  };

  const validateprofilesModulos = (modulename, lstRoutes) => {
    if (lstRoutes?.filter((md) => md.dsModulo === modulename).length !== 0) {
      return true;
    }
  };

  const validateprofiles = (routeNam, lstRoutes) => {
    if (lstRoutes.filter((md) => md.dsSubmodulo === routeNam).length !== 0) {
      return true;
    }
  };
  // this function creates the links and collapses that appear in the sidebar (left menu)
  const createLinks = (routes) => {
    const { color, rtlActive } = props;
    return routes.map((prop, key) => {
      if (prop.redirect) {
        return null;
      }
      if (prop.collapse) {
        var st = {};
        st[prop["state"]] = !state[prop.state];
        const navLinkClasses =
          classes.itemLink +
          " " +
          cx({
            [" " + classes.collapseActive]: getCollapseInitialState(prop.views),
          });
        const itemText =
          classes.itemText +
          " " +
          cx({
            [classes.itemTextMini]: props.miniActive && miniActive,
            [classes.itemTextMiniRTL]:
              rtlActive && props.miniActive && miniActive,
            [classes.itemTextRTL]: rtlActive,
          });
        const collapseItemText =
          classes.collapseItemText +
          " " +
          cx({
            [classes.collapseItemTextMini]: props.miniActive && miniActive,
            [classes.collapseItemTextMiniRTL]:
              rtlActive && props.miniActive && miniActive,
            [classes.collapseItemTextRTL]: rtlActive,
          });
        const itemIcon =
          classes.itemIcon +
          " " +
          cx({
            [classes.itemIconRTL]: rtlActive,
          });
        const caret =
          classes.caret +
          " " +
          cx({
            [classes.caretRTL]: rtlActive,
          });
        const collapseItemMini =
          classes.collapseItemMini +
          " " +
          cx({
            [classes.collapseItemMiniRTL]: rtlActive,
          });
        return (
          <>
            {validateprofilesModulos(prop.name, props.pantallasview) ? (
              <ListItem
                key={key}
                className={cx(
                  { [classes.item]: prop.icon !== undefined },
                  { [classes.collapseItem]: prop.icon === undefined }
                )}
              >
                <NavLink
                  to={"#"}
                  className={navLinkClasses}
                  onClick={(e) => {
                    e.preventDefault();
                    setState(st);
                  }}
                >
                  {prop.icon !== undefined ? (
                    typeof prop.icon === "string" ? (
                      <Icon className={itemIcon}>{prop.icon}</Icon>
                    ) : (
                      <prop.icon className={itemIcon} />
                    )
                  ) : (
                    <span
                      className={collapseItemMini}
                      style={{ fontSize: `1px` }}
                    >
                      {rtlActive ? prop.rtlMini : prop.mini}
                    </span>
                  )}
                  <ListItemText
                    primary={rtlActive ? prop.rtlName : prop.name}
                    secondary={
                      <b
                        className={
                          caret +
                          " " +
                          (state[prop.state] ? classes.caretActive : "")
                        }
                      />
                    }
                    disableTypography={true}
                    className={cx(
                      { [itemText]: prop.icon !== undefined },
                      { [collapseItemText]: prop.icon === undefined }
                    )}
                  />
                </NavLink>

                <Collapse in={state[prop.state]} unmountOnExit>
                  <List className={classes.list + " " + classes.collapseList}>
                    {createLinks(prop.views)}
                  </List>
                </Collapse>
              </ListItem>
            ) : null}
          </>
        );
      }
      const innerNavLinkClasses =
        classes.collapseItemLink +
        " " +
        cx({
          [" " + classes[color]]: activeRoute(prop.layout + prop.path),
        });
      const collapseItemMini =
        classes.collapseItemMini +
        " " +
        cx({
          [classes.collapseItemMiniRTL]: rtlActive,
        });
      const navLinkClasses =
        classes.itemLink +
        " " +
        cx({
          [" " + classes[color]]: activeRoute(prop.layout + prop.path),
        });
      const itemText =
        classes.itemText +
        " " +
        cx({
          [classes.itemTextMini]: props.miniActive && miniActive,
          [classes.itemTextMiniRTL]:
            rtlActive && props.miniActive && miniActive,
          [classes.itemTextRTL]: rtlActive,
        });
      const collapseItemText =
        classes.collapseItemText +
        " " +
        cx({
          [classes.collapseItemTextMini]: props.miniActive && miniActive,
          [classes.collapseItemTextMiniRTL]:
            rtlActive && props.miniActive && miniActive,
          [classes.collapseItemTextRTL]: rtlActive,
        });
      const itemIcon =
        classes.itemIcon +
        " " +
        cx({
          [classes.itemIconRTL]: rtlActive,
        });
      return (
        <>
          {validateprofiles(prop.name, props.pantallasview) ? (
            <ListItem
              key={key}
              className={cx(
                { [classes.item]: prop.icon !== undefined },
                { [classes.collapseItem]: prop.icon === undefined }
              )}
            >
              <NavLink
                to={prop.layout + prop.path}
                className={cx(
                  { [navLinkClasses]: prop.icon !== undefined },
                  { [innerNavLinkClasses]: prop.icon === undefined }
                )}
              >
                {prop.icon !== undefined ? (
                  typeof prop.icon === "string" ? (
                    <Icon className={itemIcon}>{prop.icon}</Icon>
                  ) : (
                    <prop.icon className={itemIcon} />
                  )
                ) : (
                  <span className={collapseItemMini}></span>
                )}
                <ListItemText
                  primary={rtlActive ? prop.rtlName : prop.name}
                  disableTypography={true}
                  className={cx(
                    { [itemText]: prop.icon !== undefined },
                    { [collapseItemText]: prop.icon === undefined }
                  )}
                />
              </NavLink>
            </ListItem>
          ) : null}
        </>
      );
    });
  };
  const { logo, image, logoText, routes, bgColor, rtlActive } = props;
  const itemText =
    classes.itemText +
    " " +
    cx({
      [classes.itemTextMini]: props.miniActive && miniActive,
      [classes.itemTextMiniRTL]: rtlActive && props.miniActive && miniActive,
      [classes.itemTextRTL]: rtlActive,
    });
  const collapseItemText =
    classes.collapseItemText +
    " " +
    cx({
      [classes.collapseItemTextMini]: props.miniActive && miniActive,
      [classes.collapseItemTextMiniRTL]:
        rtlActive && props.miniActive && miniActive,
      [classes.collapseItemTextRTL]: rtlActive,
    });
  const userWrapperClass =
    classes.user +
    " " +
    cx({
      [classes.whiteAfter]: bgColor === "white",
    });
  const caret =
    classes.caret +
    " " +
    cx({
      [classes.caretRTL]: rtlActive,
    });
  const collapseItemMini =
    classes.collapseItemMini +
    " " +
    cx({
      [classes.collapseItemMiniRTL]: rtlActive,
    });
  const photo =
    classes.photo +
    " " +
    cx({
      [classes.photoRTL]: rtlActive,
    });
  var user = (
    <div className={userWrapperClass}>
      <List className={classes.list}>
        <ListItem className={classes.item + " " + classes.userItem}>
          <Collapse in={openAvatar} unmountOnExit>
            <List className={classes.list + " " + classes.collapseList}>
              <ListItem className={classes.collapseItem}>
                <NavLink
                  to="#"
                  className={classes.itemLink + " " + classes.userCollapseLinks}
                >
                  <span className={collapseItemMini}>
                    {rtlActive ? "????" : "MP"}
                  </span>
                  <ListItemText
                    primary={rtlActive ? "????????" : "My Profile"}
                    disableTypography={true}
                    className={collapseItemText}
                  />
                </NavLink>
              </ListItem>
              <ListItem className={classes.collapseItem}>
                <NavLink
                  to="#"
                  className={classes.itemLink + " " + classes.userCollapseLinks}
                >
                  <span className={collapseItemMini}>
                    {rtlActive ? "??????" : "EP"}
                  </span>
                  <ListItemText
                    primary={rtlActive ? "?????????? ?????????? ????????????" : "Edit Profile"}
                    disableTypography={true}
                    className={collapseItemText}
                  />
                </NavLink>
              </ListItem>
              <ListItem className={classes.collapseItem}>
                <NavLink
                  to="#"
                  className={classes.itemLink + " " + classes.userCollapseLinks}
                >
                  <span className={collapseItemMini}>
                    {rtlActive ? "??" : "S"}
                  </span>
                  <ListItemText
                    primary={rtlActive ? "??????????????" : "Settings"}
                    disableTypography={true}
                    className={collapseItemText}
                  />
                </NavLink>
              </ListItem>
            </List>
          </Collapse>
        </ListItem>
      </List>

      {sessionStorage.getItem("token") !== null ? (
        <div
          style={{
            position: `fixed`,
            bottom: `0px`,
            width: `15em`,
            wordBreak: `break-word`,
          }}
        >
          <Card className={classesCard.card}>
            <CardHeader
              className={classesCard.card}
              avatar={
                <Avatar aria-label="recipe" style={{ color: `#fff` }}>
                  <PersonIcon style={{ color: `#fff` }}></PersonIcon>
                </Avatar>
              }
              action={
                <IconButton
                  aria-label="settings"
                  style={{ color: `#fff` }}
                  onClick={logout}
                >
                  <ExitToAppIcon />
                </IconButton>
              }
              title={
                <Typography className={classes.title}>{nombre()}</Typography>
              }
              subheader={
                <Typography className={classes.title}>{roles()}</Typography>
              }
            />
          </Card>
        </div>
      ) : null}

      <DialogLogOut
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        handleDeshabilitar={handleDeshabilitar}
      />
    </div>
  );
  var links = <List className={classes.list}>{createLinks(routes)}</List>;

  const logoNormal =
    classes.logoNormal +
    " " +
    cx({
      [classes.logoNormalSidebarMini]: props.miniActive && miniActive,
      [classes.logoNormalSidebarMiniRTL]:
        rtlActive && props.miniActive && miniActive,
      [classes.logoNormalRTL]: rtlActive,
    });
  const logoMini =
    classes.logoMini +
    " " +
    cx({
      [classes.logoMiniRTL]: rtlActive,
    });
  const logoClasses =
    classes.logo +
    " " +
    cx({
      [classes.whiteAfter]: bgColor === "white",
    });
  var brand = (
    <div className={logoClasses}>
      <a href="/frontend-sigepa/" target="_blank" className={logoMini}>
        <img src={logo} alt="logo" className={classes.img} />
      </a>
      <a
        style={{ paddingLeft: "25%" }}
        href="/frontend-sigepa/"
        target="_blank"
        className={logoNormal}
      >
        {logoText}
      </a>
    </div>
  );
  const drawerPaper =
    classes.drawerPaper +
    " " +
    cx({
      [classes.drawerPaperMini]: props.miniActive && miniActive,
      [classes.drawerPaperRTL]: rtlActive,
    });
  const sidebarWrapper =
    classes.sidebarWrapper +
    " " +
    cx({
      [classes.drawerPaperMini]: props.miniActive && miniActive,
      [classes.sidebarWrapperWithPerfectScrollbar]:
        navigator.platform.indexOf("Win") > -1,
    });
  return (
    <div ref={mainPanel}>
      <Hidden smDown implementation="css">
        <Drawer
          variant="temporary"
          anchor={rtlActive ? "left" : "right"}
          open={props.open}
          classes={{
            paper: drawerPaper + " " + classes[bgColor + "Background"],
          }}
          onClose={props.handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          {brand}
          <SidebarWrapper
            className={sidebarWrapper}
            user={user}
            links={links}
          />
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
          onMouseOver={() => setMiniActive(false)}
          onMouseOut={() => setMiniActive(true)}
          anchor={rtlActive ? "right" : "left"}
          variant="permanent"
          open
          classes={{
            paper: drawerPaper + " " + classes[bgColor + "Background"],
          }}
        >
          {brand}
          <SidebarWrapper
            className={sidebarWrapper}
            user={user}
            links={links}
          />
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

  function logout() {
    setOpenProfile(null);
    setOpenDialog(true);
  }
  function handleDeshabilitar() {
    history.replace("/admin/dashboard");
    kcc.keycloak.logout();
    setOpenProfile(null);
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("idUSuario");
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("firstName");
    sessionStorage.removeItem("lastName");
    sessionStorage.removeItem("roles");
    sessionStorage.removeItem("groups");
  }

  function roles() {
    let rolessesion = "";
    if (IsJsonString(sessionStorage.getItem("groups"))) {
      rolessesion = JSON.parse(sessionStorage.getItem("groups"));
    } else {
      rolessesion = JSON.stringify(sessionStorage.getItem("groups"));
    }
    console.log("rolessesion=>>>>", rolessesion);
    if (Array.isArray(rolessesion)) {
      console.log('ES ARRAY')
      return rolessesion?.map((rol) => {
        return <>{rol.replace("/", "")}</>;
      });
    } else {     
      console.log('NO ES ARRAY') 
        return <>{rolessesion.replace("/", "")}</>;     
    }
  }
}

function IsJsonString(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}

Sidebar.defaultProps = {
  bgColor: "blue",
};

Sidebar.propTypes = {
  bgColor: PropTypes.oneOf(["white", "black", "blue"]),
  rtlActive: PropTypes.bool,
  color: PropTypes.oneOf([
    "white",
    "red",
    "orange",
    "green",
    "blue",
    "purple",
    "rose",
  ]),
  logo: PropTypes.string,
  logoText: PropTypes.string,
  image: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object),
  miniActive: PropTypes.bool,
  open: PropTypes.bool,
  handleDrawerToggle: PropTypes.func,
};

SidebarWrapper.propTypes = {
  className: PropTypes.string,
  user: PropTypes.object,
  headerLinks: PropTypes.object,
  links: PropTypes.object,
};

export default Sidebar;
