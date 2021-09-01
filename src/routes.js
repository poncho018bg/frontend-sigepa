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
import Image from "@material-ui/icons/Image";
import FolderIcon from '@material-ui/icons/Folder';
import MoveToInboxIcon from '@material-ui/icons/MoveToInbox';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import DescriptionIcon from '@material-ui/icons/Description';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import TimelineIcon from '@material-ui/icons/Timeline';
import MarkunreadMailboxIcon from '@material-ui/icons/MarkunreadMailbox';

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
//import { NumeroApoyosScreen } from "views/Catalogos/NumeroApoyos/numeroApoyosScreen";
import { PeriodicidadApoyosScreen } from "views/Catalogos/PeriodicidadApoyos/PeriodicidadApoyosScreen";
import { NumeroApoyosScreen } from "views/Catalogos/NumeroApoyos/NumeroApoyosScreen";
import { CursosCapacitacionesScreen } from "views/Catalogos/CursosCapacitaciones/CursosCapacitacionesScreen";
import { CatalogosScreen } from "views/Catalogos/CatalogosScreen";



const dashboardRoutes = [

  {
    collapse: true,
    name: "Administración General",
    rtlName: "ag",
    icon: FolderIcon,
    state: "pageCollapse",
    views: [
      {
        path: "/catalogos",
        name: "Catalogos",
        rtlName: "cat",
        mini: "M",
        rtlMini: "m",
        component: CatalogosScreen,
        layout: "/admin"
      },
    ]
  },
  {
    collapse: true,
    name: "Bandeja General de Solicitudes ",
    rtlName: "bgs",
    icon: MoveToInboxIcon,
    state: "pageCollapse",
    views: [
      {
      }
    ]
  }
  , {
    collapse: true,
    name: "Entrega de Apoyos",
    rtlName: "صفحات",
    icon: LocalShippingIcon,
    state: "pageCollapse",
    views: [
      {
      }
    ]
  },
  {
    collapse: true,
    name: "Módulos de dispersión",
    rtlName: "صفحات",
    icon: CreditCardIcon,
    state: "pageCollapse",
    views: [
      {
      }
    ]
  },
  {
    collapse: true,
    name: "Bitácora",
    rtlName: "صفحات",
    icon: DescriptionIcon,
    state: "pageCollapse",
    views: [
      {
      }
    ]
  },
  {
    collapse: true,
    name: "Dashboard",
    rtlName: "صفحات",
    icon: EqualizerIcon,
    state: "pageCollapse",
    views: [
      {
      }
    ]
  },
  {
    collapse: true,
    name: "Reportes",
    rtlName: "صفحات",
    icon: TimelineIcon,
    state: "pageCollapse",
    views: [
      {
      }
    ]
  },
  {
    collapse: true,
    name: "Buzón de Notificaciones",
    rtlName: "صفحات",
    icon: MarkunreadMailboxIcon,
    state: "pageCollapse",
    views: [
      {
      }
    ]
  },

  //CATALOGOS
  {
    collapse: true,
    name: "Catalogos",
    rtlName: "صفحات",
    icon: Image,
    state: "pageCollapse",
    views: [
      {
        path: "/modulos",
        name: "Modulos",
        rtlName: "modulos",
        mini: "M",
        rtlMini: "m",
        component: ModuloScreen,
        layout: "/admin"
      },
      {
        path: "/submodulos",
        name: "Submódulos",
        rtlName: "submodulos",
        mini: "SB",
        rtlMini: "sb",
        component: SubModuloScreen,
        layout: "/admin"
      },
      {
        path: "/roles",
        name: "Roles",
        rtlName: "roles",
        mini: "R",
        rtlMini: "r",
        component: RolesScreen,
        layout: "/admin"
      },
      {
        path: "/tiposApoyos",
        name: "Tipos de Apoyo",
        rtlName: "tipoapoyo",
        mini: "TA",
        rtlMini: "ta",
        component: TipoApoyoScreen,
        layout: "/admin"
      },
      {
        path: "/tiposBeneficiario",
        name: "Tipos de Beneficiarios",
        rtlName: "tipobeneficiario",
        mini: "TB",
        rtlMini: "tb",
        component: TipoBeneficiarioScreen,
        layout: "/admin"
      },
      {
        path: "/comitessecretarias",
        name: "Comites Secretarías",
        rtlName: "comitesecretarias",
        mini: "CS",
        rtlMini: "cs",
        component: ComiteSecretariasScreen,
        layout: "/admin"
      },
      {
        path: "/edadesBeneficiarios",
        name: "Edades Beneficiarios",
        rtlName: "edadesbeneficiarios",
        mini: "EB",
        rtlMini: "eb",
        component: EdadesBeneficiariosScreen,
        layout: "/admin"
      },
      {
        path: "/motivosRechazos",
        name: "Motivos Rechazos",
        rtlName: "motivosrechazos",
        mini: "MR",
        rtlMini: "mr",
        component: MotivoRechazosScreen,
        layout: "/admin"
      },
      {
        path: "/numeroApoyos",
        name: "Número de Apoyos",
        rtlName: "numapoyos",
        mini: "NA",
        rtlMini: "na",
        component: NumeroApoyosScreen,
        layout: "/admin"
      },
      {
        path: "/periodicidadApoyos",
        name: "Periodicidad Apoyos",
        rtlName: "periodicidadapoyos",
        mini: "PA",
        rtlMini: "pa",
        component: PeriodicidadApoyosScreen,
        layout: "/admin"
      },

      {
        path: "/cursosCapacitaciones",
        name: "Cursos Capacitaciones",
        rtlName: "cursoscapacitaciones",
        mini: "PA",
        rtlMini: "pa",
        component: CursosCapacitacionesScreen,
        layout: "/admin"
      },
    ]
  }
];

export default dashboardRoutes;
