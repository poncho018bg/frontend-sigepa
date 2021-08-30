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
import DashboardPublic from "views/Public/PublicDashboard.js";
import { ModuloScreen } from "views/Modulos/ModuloScreen";
import { RolesScreen } from "views/Roles/RolesScreen";

// core components/views for RTL layout
import RTLPage from "views/RTLPage/RTLPage.js";
import { SubModuloScreen } from "views/SubModulos/SubModuloScreen";
import { TipoApoyoScreen } from "views/Catalogos/TipoApoyo/TipoApoyoScreen"
import { TipoBeneficiarioScreen } from "views/Catalogos/TiposBeneficiarios/TipoBeneficiarioScreen";

import { ComiteSecretariasScreen } from "views/Catalogos/ComiteSecretarias/ComiteSecretariasScreen";
import { EdadesBeneficiariosScreen } from "views/Catalogos/EdadesBeneficiarios/EdadesBeneficiariosScreen";
import { MotivoRechazosScreen } from "views/Catalogos/MotivoRechazos/MotivoRechazosScreen";
import { NumeroApoyosScreen } from "views/Catalogos/NumeroApoyos/numeroApoyosScreen";
import { PeriodicidadApoyosScreen } from "views/Catalogos/PeriodicidadApoyos/PeriodicidadApoyosScreen";



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
    path: "/dashboardPublic",
    name: "Dashboard Publico",
    icon: Dashboard,
    component: DashboardPublic,
    layout: "/admin"
  },
  {
    path: "/modulos",
    name: "Modulos",
    rtlName: "لوحة القيادة",
    icon: Dashboard,
    component: ModuloScreen,
    layout: "/admin"
  },
  {
    path: "/submodulos",
    name: "Submódulos",
    rtlName: "لوحة القيادة",
    icon: Dashboard,
    component: SubModuloScreen,
    layout: "/admin"
  },
  {
    path: "/roles",
    name: "Roles",
    rtlName: "لوحة القيادة",
    icon: Dashboard,
    component: RolesScreen,
    layout: "/admin"
  },
  {
    path: "/tiposApoyos",
    name: "Tipos de Apoyo",
    icon: Dashboard,
    component: TipoApoyoScreen,
    layout: "/admin"
  },
  {
    path: "/tiposBeneficiario",
    name: "Tipos de Beneficiarios",
    icon: Dashboard,
    component: TipoBeneficiarioScreen,
    layout: "/admin"
  },
  {
    path: "/comitessecretarias",
    name: "Comites Secretarías",
    icon: Dashboard,
    component: ComiteSecretariasScreen,
    layout: "/admin"
  },
  {
    path: "/edadesBeneficiarios",
    name: "Edades Beneficiarios",
    icon: Dashboard,
    component: EdadesBeneficiariosScreen,
    layout: "/admin"
  },
  {
    path: "/motivosRechazos",
    name: "Motivos Rechazos",
    icon: Dashboard,
    component: MotivoRechazosScreen,
    layout: "/admin"
  },
  {
    path: "/numeroApoyos",
    name: "Número de Apoyos",
    icon: Dashboard,
    component: NumeroApoyosScreen,
    layout: "/admin"
  },
  {
    path: "/periodicidadApoyos",
    name: "Periodicidad Apoyos",
    icon: Dashboard,
    component: PeriodicidadApoyosScreen,
    layout: "/admin"
  },
];

export default dashboardRoutes;
