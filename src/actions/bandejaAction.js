import { axiosGet } from "helpers/axios";
import { types } from "types/types";

export const bandejaStartLoading = () => {
    return async(dispatch) => {

        try {
            axiosGet(`bandejas` ).then(data => {
                 dispatch( bandejaLoaded( data ) );
            });
            
        } catch (error) {
            console.log(error)
        }

    }
}

const bandejaLoaded = (tipobandeja) => ({
    type: types.bandejaLoaded,
    payload: tipobandeja
})