import axios from 'axios';
import config from '../../../config';

const API_URL = config.WS_BASE_URL;

// action creators
export const getWhois = (data) => {
    // actions
    return {
        type: 'GET_WHOIS',
        payload: data
    }
};

// functions to call action creator
const readWhois = () => async dispatch => {
    return axios.get(API_URL + '/login/whois')
        .then((response) => {
            const { data } = response.data;
            dispatch(getWhois(data))
        })
        .catch(error => console.log(error));
};

export default readWhois;