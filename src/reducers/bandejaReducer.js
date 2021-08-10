

import { types } from '../types/types';


const initialState = {
    bandeja: [],
    activeBandeja: null
};


export const bandejaReducer = ( state = initialState, action ) => {

    switch ( action.type ) {

        case types.bandejaLoaded:
            return {
                  ...state,
                  bandeja: [ ...action.payload ]
              }

        default:
            return state;
    }


}
