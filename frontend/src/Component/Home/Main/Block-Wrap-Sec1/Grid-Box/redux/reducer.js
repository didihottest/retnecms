import * as type from './types'

const initialState = {
    fashionArticle:[],
    foodArticle:[],
    childFashionArticle:[],
    childFoodArticle:[],
    error:false
}

export const articlesFiltReducer = (state= initialState, action)=>{
    switch (action.type) {
        case type.GET_FASHION_ARTICLE:
            // const {data} = action
            return {
                ...state,
                fashionArticle: action.payload
            }
        case type.GET_FOOD_ARTICLE:
            return{
                ...state,
                foodArticle: action.payload
            }
            case type.GET_CHILD_FASHION_ARTICLE:
            // const {data} = action
            return {
                ...state,
                childFashionArticle: action.payload
            }
        case type.GET_CHILD_FOOD_ARTICLE:
            return{
                ...state,
                childFoodArticle: action.payload
            }
        default:
            return state;
    }
}