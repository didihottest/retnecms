import * as type from './types';


const initialState ={
    recentArticles:[],
    error: false
}

export const widgetRecentReducer = (state = initialState, action) =>{
    switch (action.type) {
        case type.GET_WIDGET_RECENT_ARTICLES:
            return {
                ...state,
                recentArticles: action.payload
            }
        default:
            return state;
    }
}