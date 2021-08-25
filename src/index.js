/*!
=========================================================
* Template Fabrica de Software 3 - v1.0
=========================================================

* Template Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2021 Fabrica de Software 3 (https://www.casystem.com)
* Template para diversos proyectos
* Elaborado  por C&A Systems.
* Se prohibe la reproducción total y/o parcial.
* Coded by Fabrica de Software 3
=========================================================
*/

import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";

// core components
//import Admin from "layouts/Admin.js";
import RTL from "layouts/RTL.js";
import { Provider } from 'react-redux';
import "assets/css/material-dashboard-react.css?v=1.9.0";
import { store } from "store/store";


import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { esES } from '@material-ui/core/locale';
import { PersonContextProvider } from "contexts/personContext";
import { ModalContextProvider } from "contexts/modalContex";
import { ModalContextDeleteProvider } from "contexts/modalContexDelete";

import HttpService from "./servicios/HttpService";
import UserService from "./servicios/UserService";
import Admin from "./views/Admin";
import { ModuloContextProvider } from "contexts/moduloContext";
import { ModalContextUpdateProvider } from "contexts/modalContexUpdate";
import { SubModuloContextProvider } from "contexts/subModuloContext";
import { ModuloSubContextProvider } from "contexts/moduloSubContext";
import RenderGroup from "components/RenderGroup"

//const hist = createBrowserHistory();

const hist = createBrowserHistory({ basename: process.env.PUBLIC_URL });

const theme = createMuiTheme({
}, esES);

const renderApp = () => ReactDOM.render(
  <ThemeProvider theme={theme}>
    {console.log("grupos {}", UserService.getGroups())}
    <Router history={hist}>
      <Provider store={store}>
        <ModalContextProvider>
          <ModalContextDeleteProvider>
            <ModalContextUpdateProvider>
              <PersonContextProvider>
                <ModuloContextProvider>
                  <SubModuloContextProvider>
                    <ModuloSubContextProvider>
                      <SubmodulosByPerfilContexProvider>
                      <Switch>
                        <Route path="/admin" component={Admin} />
                        {/*<Route path="/rtl" component={RTL} />*/}
                        {RenderGroup("/administrador") === true ?
                          <Redirect from="/" to="/admin/dashboard"/> :
                          <Redirect from="/" to="/admin/dashboardPublic"/>
                        }
                      </Switch>
                      </SubmodulosByPerfilContexProvider>
                    </ModuloSubContextProvider>
                  </SubModuloContextProvider>
                </ModuloContextProvider>
              </PersonContextProvider>
            </ModalContextUpdateProvider>
          </ModalContextDeleteProvider>
        </ModalContextProvider>
      </Provider>
    </Router></ThemeProvider>,
  document.getElementById("root")
);

HttpService.configure();
UserService.initKeycloak(renderApp);


/*
const hist = createBrowserHistory();

const theme = createMuiTheme({
}, esES);
*/
/*
ReactDOM.render(
  <ThemeProvider theme={theme}>
  <Router history={hist}>
     <Provider store={store}>
       <ModalContextProvider>
         <ModalContextDeleteProvider>
          <PersonContextProvider>
              <Switch>
                <Route path="/admin" component={Admin} />
                <Route path="/rtl" component={RTL} />
                <Redirect from="/" to="/admin/dashboard" />
              </Switch>
            </PersonContextProvider>
            </ModalContextDeleteProvider>
        </ModalContextProvider>
    </Provider>
  </Router></ThemeProvider>,
  document.getElementById("root")
);
*/
