import axios from 'axios';
import Cookies from 'universal-cookie';

const clientAPI = axios.create();
const cookies = new Cookies();

clientAPI.interceptors.request.use(function(config){
    config.headers.Authorization = cookies.get('token');
    return config;
});
export default clientAPI;