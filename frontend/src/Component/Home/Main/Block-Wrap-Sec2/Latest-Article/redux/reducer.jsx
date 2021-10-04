import * as type from './types'

const initialState = {
    latestArticles: [],
    error: 'error'
}

const latestArticleReducer = (state=initialState, action) =>{
    switch (action.type) {
        case type.GET_LATEST_ARTICLES:
            return {
                ...state,
                latestArticles: action.payload
            }
    
        default:
            return state;
    }
}

export default latestArticleReducer;