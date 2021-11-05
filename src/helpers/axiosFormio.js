import axios from "axios";

const baseUrlFormio = process.env.REACT_APP_API_FORMIO_URL;

async function axiosGetFormio(endpoint) {
    const url = `${baseUrlFormio}${endpoint}`;
    try {
        const promise = await axios({
            method: 'GET',
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

async function axiosPostFormio(endpoint, data, method) {
    const url = `${baseUrlFormio}${endpoint}`;

    try {
        const promise = await axios({
            method: method,
            url,
            data
        }).then(response => {
            return response.data
        });
        return promise;
    } catch (error) {
        console.error('There was an error!', error);
        return promise;
    }
}

async function axiosPutFormio(endpoint, data, method) {
    const url = `${baseUrlFormio}${endpoint}`;

    try {
        const promise = await axios({
            method: method,
            url,
            data
        }).then(response => {
            return response.data
        });
        return promise;
    } catch (error) {
        console.error('There was an error!', error);
        return promise;
    }
}


async function axiosDeleteFormio(endpoint) {
    const url = `${baseUrlFormio}${endpoint}`;
    try {
        const promise = await axios({
            method: 'DELETE',
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
export {
    axiosGetFormio,
    axiosPostFormio,
    axiosPutFormio,
    axiosDeleteFormio
}