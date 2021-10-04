import * as type from './types';
import data from './dataDummy'
const initialState = {
    travelArticles:[],
    error: false
}

const navTravelReducer = (state = initialState, action) =>{
    switch (action.type) {
        case type.GET_NAV_TRAVEL_ARTICLES:
            return{
                ...state,
                travelArticles: action.payload
            }

        default:
            return state;
    }
}

export default navTravelReducer