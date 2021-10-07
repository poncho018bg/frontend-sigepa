import axios from "axios";
import UserService from "servicios/UserService";

const baseUrl = process.env.REACT_APP_API_PUBLICO_URL;

const baseUrlExpediente = process.env.REACT_APP_API_EXPEDIENTE_URL;

 async function axiosGet(endpoint) {
     const url = `${ baseUrl }${ endpoint }`;


    try{
            const promise = await axios({
                method:'GET',
                url,
                headers: {
                    Authorization: 'Bearer ' + UserService.getToken(),
                }
            }).then(response => {
            return response.data
            });
            return promise;
        } catch (error) {
        console.error('There was an error!', error);
        return Promise.reject(error)
    }
}


 async function axiosPost(endpoint,data, method ) {
    const url = `${ baseUrl }${ endpoint }`;

    try{
            const promise = await axios({
                method:'POST',
                url,
                data,
               
                headers: {
                    Authorization: 'Bearer ' + UserService.getToken(),
                    'Content-Type': 'application/json'
                }
            }).then(response => {
            return response.data
            });
            return promise;
        } catch (error) {
        console.error('There was an error!', error);
        return promise;
        }
}

async function axiosGetSinToken(endpoint) {
    const url = `${ endpoint }`;
    try{
            const promise = await axios({
                method:'GET',
                url
            }).then(response => {
            return response.data
            });
            return promise;
        } catch (error) {
        console.error('There was an error!', error);
        return Promise.reject(error)
    }
}


async function axiosGetExpediente(endpoint) {
    const url = `${ baseUrlExpediente }${ endpoint }`;
    try{
            const promise = await axios({
                method:'GET',
                url,
                headers: {
                    Authorization: 'Bearer ' + UserService.getToken(),
                }
            }).then(response => {
            return response.data
            });
            return promise;
        } catch (error) {
        console.error('There was an error!', error);
        return Promise.reject(error)
    }
}


async function axiosExpedienteToken(endpoint, method) {
    console.log(method);
    const url = `${ baseUrlExpediente }${ endpoint }`;
    console.log(url);
    try{
            const promise = await axios({
                method,
                url,
                headers: {
                    Authorization: 'Bearer ' + UserService.getToken(),
                }
            }).then(response => {
            return response.data
            });
            return promise;
        } catch (error) {
        console.error('There was an error!', error);
        return Promise.reject(error)
    }
}

async function axiosPostExpediente(endpoint,data, method ) {
    const url = `${ baseUrlExpediente }${ endpoint }`;
    try{
            const promise = await axios({
                method,
                data,
                url,
                headers: {
                    Authorization: 'Bearer ' + UserService.getToken(),
                }
            }).then(response => {
            return response.data
            });
            return promise;
        } catch (error) {
        console.error('There was an error!', error);
        return Promise.reject(error)
    }
}

async function axiosGetTipo(endpoint) {
    const url = `${ baseUrlExpediente }${ endpoint }`;
    try{
            const promise = await axios({
                method:'GET',
                url,
                headers: {
                    Authorization: 'Bearer ' + UserService.getToken(),
                }
            }).then(response => {
            return response.data
            });
            return promise;
        } catch (error) {
        console.error('There was an error!', error);
        return Promise.reject(error)
    }
}


 async function axiosPostTipo(endpoint,data, method ) {
    const url = `${ baseUrlExpediente }${ endpoint }`;
    try{
            const promise = await axios({
                method,
                url,
                data,
               
                headers: {
                    Authorization: 'Bearer ' + UserService.getToken(),
                    'Content-Type': 'application/json'
                }
            }).then(response => {
            return response.data
            });
            return promise;
        } catch (error) {
        console.error('There was an error!', error);
        return Promise.reject(error);
        }
}


async function axiosDeleteTipo(endpoint) {
    const url = `${ baseUrl }${ endpoint }`;
    try{
            const promise = await axios({
                method:'DELETE',
                url,
                headers: {
                    Authorization: 'Bearer ' + UserService.getToken(),
                }
            }).then(response => {
            return response.data
            });
            return promise;
        } catch (error) {
        console.error('There was an error!', error);
        return Promise.reject(error)
    }
}


async function axiosPostHetoas(endpoint,data, method ) {
    const url = endpoint;
    try{
            const promise = await axios({
                method,
                url,
                data,
               
                headers: {
                    Authorization: 'Bearer ' + UserService.getToken(),
                    'Content-Type': 'application/json'
                }
            }).then(response => {
            return response.data
            });
            return promise;
        } catch (error) {
        console.error('There was an error!', error);
        return Promise.reject(error);
        }
}

async function axiosGetHetoas(endpoint) {
    const url = endpoint;
    try{
            const promise = await axios({
                method:'GET',
                url,
                headers: {
                    Authorization: 'Bearer ' + UserService.getToken(),
                }
            }).then(response => {
            return response.data
            });
            return promise;
        } catch (error) {
        console.error('There was an error!', error);
        return Promise.reject(error)
    }
}

export {
    axiosGet,
    axiosPost,
    axiosGetSinToken,
    axiosGetExpediente,
    axiosPostExpediente,
    axiosGetTipo,
    axiosPostTipo,
    axiosDeleteTipo,
    axiosExpedienteToken,
    axiosPostHetoas,
    axiosGetHetoas
}