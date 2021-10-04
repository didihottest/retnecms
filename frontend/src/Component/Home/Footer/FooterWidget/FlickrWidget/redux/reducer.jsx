import * as type from './types';

const intialState = {
    flickrPhotosData: [],
    error: false
}

export const flickrPhotosReducer= (state = intialState, action)=>{
    switch (action.type) {
        case type.GET_FLICKR_PHOTOS:
            
            return {
                ...state,
                flickrPhotosData: action.payload
            }
        default:
            return state
    }
}