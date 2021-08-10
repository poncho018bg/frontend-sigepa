
import { axiosPost } from "helpers/axios";
import { axiosGet } from "helpers/axios";
import { types } from "../types/types";


export const bandejaStartAddNew = (bandeja) => {
    return async( dispatch ) => {
        try {
            axiosPost(`tipoBandejas`,bandeja, 'POST' ).then(data => {
                dispatch(bandejaAddNew(data));
             });

        } catch (error) {
            console.log(error);
        }
    }
}



const bandejaAddNew = (bandeja) => ({
    type: types.tipoBandejaAddNew,
    payload: bandeja
});


export const bandejaStartUpdate = (bandeja) => {
    return async( dispatch ) => {
        try {
            axiosPost(`tipoBandejas/${ bandeja.id }`,bandeja, 'PUT' ).then(data => {
                dispatch(bandejaUpdated(bandeja));
             });

        } catch (error) {
            console.log(error);
        }
    }
}



const bandejaUpdated = (bandeja) => ({
    type: types.tipoBandejaUpdated,
    payload: bandeja
});


export const tipoBandejaStartLoading = () => {
    return async(dispatch) => {

        try {
            axiosGet(`tipoBandejas` ).then(data => {
                 dispatch( tipoBandejaLoaded( data ) );
            });
            
        } catch (error) {
            console.log(error)
        }

    }
}

const tipoBandejaLoaded = (tipobandeja) => ({
    type: types.tipoBandejaLoaded,
    payload: tipobandeja
})

export const bandejaSetActive = (tipobandeja) => ({
    type: types.tipoBandejaSetActive,
    payload: tipobandeja,
});


