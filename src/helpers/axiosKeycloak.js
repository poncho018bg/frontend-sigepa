import axios from "axios";



const baseUrl = process.env.REACT_APP_API_KEYCLOAK_URL;
const UserService = sessionStorage.getItem('token')


async function axiosGet(endpoint) {
    const url = `${ baseUrl }${ endpoint }`;

   try{
           const promise = await axios({
               method:'GET',
               url,
               headers: {
                   Authorization: 'Bearer ' + UserService,
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
    axiosGet
}