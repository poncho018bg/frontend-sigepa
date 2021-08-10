

import { types } from '../types/types';


const initialState = {
    tipoBandeja: [],
    activeTipoBandeja: null
};


export const tipoBandejaReducer = ( state = initialState, action ) => {

    switch ( action.type ) {
        
        case types.tipoBandejaSetActive:
            return {
                ...state,
                activeTipoBandeja: action.payload
            }
        
        case types.tipoBandejaAddNew:
            return {
                ...state,
                tipoBandeja: [
                    ...state.tipoBandeja,
                    action.payload
                ]
            }

        case types.tipoBandejaUpdated:
            return {
                ...state,
                tipoBandeja: state.tipoBandeja.map(
                    e => ( e.id === action.payload.id ) ? action.payload : e
                )
            }
        
        case types.tipoBandejaLoaded:
            console.log('hola q pedo');
            return {
                  ...state,
                  tipoBandeja: [ ...action.payload ]
              }

        default:
            return state;
    }


}
