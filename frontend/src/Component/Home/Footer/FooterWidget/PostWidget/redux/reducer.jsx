import * as type from './types'

const initialState = {
    randomPost :[],
    error: false
}

export const randomPostReducer = (state= initialState, action)=>{
    switch (action.type) {
        case type.GET_RANDOM_POST:
            return {
                ...state,
                randomPost: action.payload
            }
        default:
            return state;
    }
}
