import axios from "axios";

const baseUrl = process.env.REACT_APP_API_URL;

const baseUrlExpediente = process.env.REACT_APP_API_EXPEDIENTE_URL;

 async function axiosGet(endpoint) {
     const url = `${ baseUrl }${ endpoint }`;

   //const url = 'http://localhost:9051/people';
    try{
            const promise = await axios({
                method:'GET',
                url,
                headers: {
                    Authorization: 'Bearer ' + sessionStorage.getItem('token'),
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
    //const url = 'http://localhost:9051/people';
    try{
            const promise = await axios({
                method:'POST',
                url,
                data,
               
                headers: {
                    Authorization: 'Bearer ' + sessionStorage.getItem('token'),
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
                    Authorization: 'Bearer ' + sessionStorage.getItem('token'),
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
                    Authorization: 'Bearer ' + sessionStorage.getItem('token'),
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
                    Authorization: 'Bearer ' + sessionStorage.getItem('token'),
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
                    Authorization: 'Bearer ' + sessionStorage.getItem('token'),
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
                    Authorization: 'Bearer ' + sessionStorage.getItem('token'),
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
    const url = `${ baseUrlExpediente }${ endpoint }`;
    try{
            const promise = await axios({
                method:'DELETE',
                url,
                headers: {
                    Authorization: 'Bearer ' + sessionStorage.getItem('token'),
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
    axiosExpedienteToken
}