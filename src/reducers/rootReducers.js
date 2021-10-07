import { combineReducers } from 'redux';
import { authReducer } from './authReducer';
import { bandejaReducer } from './bandejaReducer';
import { TipoApoyoReducer } from './Catalogos/TipoApoyoReducer';
import { perfilSubmodulosReducer } from './PerfilSubmodulos';
import { rolReducer } from './RolesKeycloakReducer';

import { tipoBandejaReducer } from './tipobandejaReducer';



export const rootReducer = combineReducers({
    tipoBandeja: tipoBandejaReducer,
  
    bandeja: bandejaReducer,
    auth: authReducer,
    roles:rolReducer,
    submodulosbyperfil:perfilSubmodulosReducer,
    tipoApoyo:TipoApoyoReducer
   
})

