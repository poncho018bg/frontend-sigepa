import { combineReducers } from 'redux';
import { authReducer } from './authReducer';
import { bandejaReducer } from './bandejaReducer';

import { tipoBandejaReducer } from './tipobandejaReducer';



export const rootReducer = combineReducers({
    tipoBandeja: tipoBandejaReducer,
  
    bandeja: bandejaReducer,
    auth: authReducer,
   
})

