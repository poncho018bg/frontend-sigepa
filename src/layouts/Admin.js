import React from "react";
import cx from "classnames";
import { Switch, Route, Redirect } from "react-router-dom";
// creates a beautiful scrollbar
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Navbar from "components/Navbars/Navbar.js";
import Footer from "components/Footer/Footer.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import FixedPlugin from "components/FixedPlugin/FixedPlugin.js";

import routes from "routes.js";

import styles from "assets/jss/material-dashboard-pro-react/layouts/adminStyle.js";

import bgImage from "assets/img/sidebar-2.jpg";
import logo from "assets/img/reactlogo.png";

import Keycloak from 'keycloak-js';
import { useDispatch, useSelector } from 'react-redux'
import { getSubmodulosByPerfilId } from "actions/perfilSubmoduloAction";
import { obtenerRolesAction } from "actions/rolesKeycloakAction";
import AdminNavbar from "components/Navbars/AdminNavbar";
import { useHistory } from "react-router";

const keyCloakConfig = process.env.REACT_APP_KEYCLOAK_CONFIG;

let keyck;
let ps;
const useStyles = makeStyles(styles);

export default function Admin({ ...rest }) {
  const dispatch = useDispatch();
  const [keycloak, setKeycloak] = React.useState(null);
  const [authenticated, setAuthenticated] = React.useState(false);
  let history = useHistory();
  // styles
  const classes = useStyles();
  // ref to help us initialize PerfectScrollbar on windows devices
  const mainPanel = React.createRef();
  // states and functions
  const [image, setImage] = React.useState("");
  const [logo, setLogo] = React.useState(
    require("assets/img/m_logo.png").default
  );
  const [color, setColor] = React.useState("blue");
  const [bgColor, setBgColor] = React.useState("black");
  const [fixedClasses, setFixedClasses] = React.useState("dropdown show");
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [miniActive, setMiniActive] = React.useState(false);
  const rolesall = useSelector(state => state.roles);
  const { perfilSubmodulos } = useSelector(state => state.submodulosbyperfil);
  const [rolUser, setRolUser] = React.useState('');
  const [opcionesMenu, setOpcionesMenu] = React.useState('');
  const teststate = useSelector(state => state);

  //pantalla Mini
  const mainPanelClasses =
    classes.mainPanel +
    " " +
    cx({
      [classes.mainPanelSidebarMini]: miniActive,
      [classes.mainPanelWithPerfectScrollbar]:
        navigator.platform.indexOf("Win") > -1,
    });

  const handleImageClick = image => {
    setImage(image);
  };
  const handleColorClick = color => {
    setColor(color);
  };
  const handleBgColorClick = (bgColor) => {
    switch (bgColor) {
      case "white":
        setLogo(require("assets/img/m_logo.png").default);
        break;
      default:
        setLogo(require("assets/img/m_logo.png").default);
        break;
    }
    setBgColor(bgColor);
  };
  const handleFixedClick = () => {
    if (fixedClasses === "dropdown") {
      setFixedClasses("dropdown show");
    } else {
      setFixedClasses("dropdown");
    }
  };
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const getRoute = () => {
    return window.location.pathname !== "/admin/maps";
  };
  const getActiveRoute = (routes) => {
    let activeRoute = "Default Brand Text";
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].collapse) {
        let collapseActiveRoute = getActiveRoute(routes[i].views);
        if (collapseActiveRoute !== activeRoute) {
          return collapseActiveRoute;
        }
      } else {
        if (
          window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1
        ) {
          return routes[i].name;
        }
      }
    }
    return activeRoute;
  };

  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.collapse) {
        return getRoutes(prop.views);
      }
      if (prop.layout === "/admin") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };

  const sidebarMinimize = () => {
    setMiniActive(!miniActive);
  };
  const resizeFunction = () => {
    if (window.innerWidth >= 960) {
      setMobileOpen(false);
    }
  };






  React.useEffect(() => {
    //console.log('GROUPS=>',sessionStorage.getItem('groups'))
    var jsnarry = sessionStorage.getItem('groups')?.split(",")
    var uno = JSON.stringify(jsnarry)
    //console.log('GROUPS2=>',uno?.replace('/',''))
    let groupssesion = null
    if(uno != null){
      //console.log('GROUPS3=>',JSON.parse(uno))
      groupssesion = JSON.parse(uno)
    }
    
    if (groupssesion !== null && groupssesion !==  undefined && groupssesion[0] !== '') {
      let namegroup = groupssesion[0]?.replace('/','').replace('[','').replace('\"','').replace('\"','').replace(']','')
      console.log('namegroup=>',namegroup)
      const cargarPerfilesActivos = () => dispatch(getSubmodulosByPerfilId(namegroup, sessionStorage.getItem('idUSuario'), sessionStorage.getItem('token')));
      cargarPerfilesActivos();
    }
  }, [sessionStorage.getItem('groups')]);

  const kcc = useSelector(state => state.auth)

  React.useEffect(() => {
    setOpcionesMenu(perfilSubmodulos)
    console.log('Permisosccccc=>', perfilSubmodulos)
  }, [perfilSubmodulos]);

  React.useEffect(() => {

    const keycloak = Keycloak(keyCloakConfig);

    keycloak.init({ onLoad: 'login-required', checkLoginIframeInterval: 1, enableLogging: true }).then(authenticated => {
      if (keycloak.authenticated) {

        sessionStorage.setItem('token', keycloak.token);
        sessionStorage.setItem('idUSuario', keycloak.tokenParsed.sub);
        sessionStorage.setItem('username', keycloak.tokenParsed.preferred_username);
        sessionStorage.setItem('firstName', keycloak.tokenParsed.given_name);
        sessionStorage.setItem('lastName', keycloak.tokenParsed.family_name);
        sessionStorage.setItem('roles', JSON.stringify(keycloak.tokenParsed.realm_access));
        sessionStorage.setItem('groups', JSON.stringify(keycloak.tokenParsed.groups));
        console.log("keycloak ", keycloak.tokenParsed)
        console.log("token ", keycloak.token)

        setKeycloak(keycloak);
        setAuthenticated(authenticated);
        kcc.keycloak = keycloak;
        kcc.authenticated = authenticated;

        //obtiene los roles
        const cargarRolesActivos = () => dispatch(obtenerRolesAction(keycloak.token));
        cargarRolesActivos();

        setInterval(() => {
          keycloak.updateToken(30).then(function (refreshed) {
            console.log('refreshed=>',refreshed)
            if (refreshed) {
              console.log('refreshed keycloak=>',keycloak)
              sessionStorage.setItem('token', keycloak.token);
              sessionStorage.setItem('idUSuario', keycloak.tokenParsed.sub);
              sessionStorage.setItem('username', keycloak.tokenParsed.preferred_username);
              sessionStorage.setItem('firstName', keycloak.tokenParsed.given_name);
              sessionStorage.setItem('lastName', keycloak.tokenParsed.family_name);
              sessionStorage.setItem('roles', keycloak.tokenParsed.realm_access);
              sessionStorage.setItem('groups', keycloak.tokenParsed.groups);
              console.log("token ", keycloak.token)
              cargarRolesActivos();
              kcc.keycloak = keycloak;
              kcc.authenticated = authenticated;
            } else {
              console.log("Token todavia válido")
            }
          }).catch(function () {
            console.log(error);
            console.log("Error ky=>",error);
            keycloak.logout()
          })
        }, 15000);



      } else {
        keycloak.login();
      }
    })


  }, []); // passing an empty array as second argument triggers the callback in useEffect only after the initial render thus replicating `componentDidMount` lifecycle behaviour


  // initialize and destroy the PerfectScrollbar plugin
  React.useEffect(() => {
    if (kcc.keycloak) {
      if (authenticated) {
        if (navigator.platform.indexOf("Win") > -1) {
          ps = new PerfectScrollbar(mainPanel.current, {
            suppressScrollX: true,
            suppressScrollY: false
          });
          document.body.style.overflow = "hidden";
        }
        window.addEventListener("resize", resizeFunction);
        // Specify how to clean up after this effect:
        return function cleanup() {
          if (navigator.platform.indexOf("Win") > -1) {
            ps.destroy();
          }
          window.removeEventListener("resize", resizeFunction);
        };
      }
    }
  }, [mainPanel]);



  if (keycloak) {
    if (authenticated) {
      { console.log('teststate', teststate) }
      { console.log('perfilSubmodulos', perfilSubmodulos) }
      return (
        <div className={classes.wrapper}>
          <Sidebar
            routes={routes}
            logoText={"SIGEPA"}
            logo={logo}
            image={image}
            handleDrawerToggle={handleDrawerToggle}
            open={mobileOpen}
            color={color}
            bgColor={bgColor}
            miniActive={miniActive}
            pantallasview={perfilSubmodulos}
            {...rest}
          />
          <div className={mainPanelClasses} ref={mainPanel}>
            <AdminNavbar
              sidebarMinimize={sidebarMinimize.bind(this)}
              miniActive={miniActive}
              brandText={getActiveRoute(routes)}
              handleDrawerToggle={handleDrawerToggle}
              {...rest}
            />
            {/* On the /maps route we want the map to be on full screen - this is not possible if the content and conatiner classes are present because they have some paddings which would make the map smaller */}
            {getRoute() ? (
              <div className={classes.content}>
                <div className={classes.container}>
                  <Switch>
                    {getRoutes(routes)}
                    <Redirect from="/admin" to="/admin/dashboard" />
                  </Switch>
                </div>
              </div>
            ) : (
              <div className={classes.map}>
                <Switch>
                  {getRoutes(routes)}
                  <Redirect from="/admin" to="/admin/dashboard" />
                </Switch>
              </div>
            )}
            {getRoute() ? <Footer /> : null}
          </div>
        </div>
      );
    }
  }
  return (
    <div>Initializing Keycloak...</div>
  );
}
