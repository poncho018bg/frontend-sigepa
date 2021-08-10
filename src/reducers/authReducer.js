

import { types } from '../types/types';


const initialState = {
    keycloak: null, 
    authenticated: false
};


export const authReducer = ( state = initialState, action ) => {

    switch ( action.type ) {
        default:
            return state;
    }


}
