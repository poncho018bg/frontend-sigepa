import axios from "axios";
import UserService from "servicios/UserService";


const baseUrl = process.env.REACT_APP_API_KEYCLOAK_URL;



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