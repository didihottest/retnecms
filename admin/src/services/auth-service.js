import axios from 'axios';
import config from '../config';

const API_URL = config.WS_BASE_URL;

const login = (email, password) => {
    return axios.post(API_URL + '/login/authorization', { email, password })
        .then((response) => {
            if (response.data.accessToken) {
                response.data.accessToken = 'Bearer ' + response.data.accessToken;
                localStorage.setItem('user', JSON.stringify(response.data));
            }
            return response.data;
        });
};

const logout = async () => {
    localStorage.removeItem('user');
    axios.defaults.headers.common['Authorization'] = null;
};

const authservice = {
    login,
    logout
};

export default authservice;