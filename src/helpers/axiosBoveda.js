import axios from "axios";

const baseUrl = process.env.REACT_APP_API_BOVEDA;


async function axiosLoginBoveda() {
    const url = `${baseUrl}login`;
    try {
        const data = new FormData()
        data.append("username", "SIGEPA")
        data.append("password", "S1G3P4%23")
        const promise = await axios({
            timeout: 5000,
            method: 'POST',
            url,
            data
        }).then(response => {
            return response.data
        })
        return promise
    } catch (error) {
        if (error.response) {
            console.log("Error response ------------->")
        } else if (error.request) {
            console.log("Error request ------------->")
        } else {
            console.log("Error otro ------------->")
        }
        console.log("Descripción del error ------------->:", error)
    }
}

async function axiosPostFile(data, token) {
    const url = `${baseUrl}addFile`;
    try {
        const promise = await axios({
            method: 'POST',
            url,
            data,
            headers: {
                Authorization: token,
                Accept: "application/json",
                "Content-Type": "multipart/form-data",
            }
        }).then(response => {
            console.log("SUCCESS!!", response);
            return response;
        });
        return promise;
    } catch (error) {
        console.error('There was an error!', error);
        return Promise.reject(error);
    }
}

export {
    axiosLoginBoveda,
    axiosPostFile
}
