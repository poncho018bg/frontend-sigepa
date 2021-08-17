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
// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";

// core components/views for Admin layout
import DashboardPage from "views/Dashboard/Dashboard.js";

// core components/views for RTL layout
import RTLPage from "views/RTLPage/RTLPage.js";



const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin"
  },
  {
    path: "/grafica",
    name: "Grafica",
    rtlName: "لوحة القيادة",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin"
  },
  {
    path: "/grid",
    name: "GRid",
    rtlName: "لوحة القيادة",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin"
  },
];

export default dashboardRoutes;
