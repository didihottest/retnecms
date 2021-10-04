import axios from "axios";
import config from '../../../config';

const API_URL = config.WS_BASE_URL;

// action creators
export const createUserProfile = (data) => {
    // action
    return {
        type: 'CREATE_USER_PROFILE',
        payload: data
    }
};

export const getUserProfile = (data) => {
    // action
    return {
        type: 'GET_USER_PROFILE',
        payload: data
    }
}

// functions to call action creator (CAC)
export const create = (id, data) => async (dispatch) => {
    return axios.post(API_URL + '/user/profile/' + id, data)
        .then(response => {
            console.log(response)
            dispatch(createUserProfile());
        })
        .catch(error => {
            console.log(error)
        })
};