import { axiosPostFormio } from "helpers/axiosFormio";
import { axiosGetFormio } from "helpers/axiosFormio";
import { axiosDeleteFormio } from "helpers/axiosFormio";
import { typesFormioComplemento } from "types/types";

//aqui consultamos todos los formularios existentes en el form.io 
export const formioComplementoLoading = () => {

    return async (dispatch) => {
        console.log('Entro a formioComplemento: -----------ZZZzzzzzz')

        try {
            await axiosGetFormio(`form?type=form`).then(data => {
                console.log("data{}zzzzzzzzzzzzzzzzzzzz", data);
                dispatch(formioComplementosLoaded(data))
            });
            return true;

        } catch (error) {
            console.log("NO entro a axios Get:");
            console.log(error)
            return false;
        }
    }
}

const formioComplementosLoaded = (formioComplemento) => ({
    type: typesFormioComplemento.FORMIO_COMPLEMENTO_LOADED,
    payload: formioComplemento
})


//Aqui consultamos toda la informacion correspondiente a un formulario (registros)
export const formioComplementoLoadingRegistro = (registro) => {

    return async (dispatch) => {
        console.log('Entro a formioComplemento registro:', registro)

        try {
            await axiosGetFormio(`/formioComplemento-registro/${registro}`).then(data => {
                console.log("data{}", data);
                dispatch(formioComplementoLoadedregistro(data._embedded.lista))
            });
            return true;

        } catch (error) {
            console.log("NO entro a axios Get:");
            console.log(error)
            return false;
        }
    }
}

const formioComplementoLoadedregistro = (formioComplemento) => ({
    type: typesFormioComplemento.FORMIO_COMPLEMENTO_LOADED_REGISTRO,
    payload: formioComplemento
})

export const formioComplementoAddNew = (tformioComplemento) => {
    return async (dispatch) => {
        console.log("tformioComplemento", tformioComplemento)
        try {
            await axiosPostFormio(`/formioComplemento`, tformioComplemento, 'POST').then(data => {
                dispatch(formioComplementosAddNew(data));
            });
            return true;

        } catch (error) {
            console.log(error);
            return false;
        }
    }
}

const formioComplementosAddNew = (formioComplemento) => ({
    type: typesFormioComplemento.formioComplementoAddNew,
    payload: formioComplemento
});


export const formioComplementoUpdate = (formioComplemento, id) => {
    return async (dispatch) => {
        try {
            await axiosPostFormio(`/formioComplemento/${id}`, formioComplemento, 'PUT').then(data => {

                dispatch(formioComplementosUpdate(data));
            });
            return true;

        } catch (error) {
            console.log(error);
            return false;
        }
    }
}

const formioComplementosUpdate = (formioComplemento) => ({
    type: typesFormioComplemento.formioComplementoUpdated,
    payload: formioComplemento
});



export const formioComplementoDelete = (formioComplemento) => {
    return async (dispatch) => {
        try {
            await axiosDeleteFormio(`/formioComplemento/${formioComplemento.id}`).then(data => {
                dispatch(formioComplementoUpdate(data));

            });
            return true;

        } catch (error) {
            console.log(error);
            return false;
        }
    }
}


export const formioComplementoSetActive = (formioComplemento) => ({
    type: typesFormioComplemento.FORMIO_COMPLEMENTO_SETACTIVE,
    payload: formioComplemento,
});
