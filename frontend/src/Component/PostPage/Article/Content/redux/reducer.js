const initialState = {
  articlePage : {
    data: {
        article_content: 'TITLE',
        user:{
          username: 'USERNAME'
        },
        category:{
          category_name: 'CATEGORY'
        }
      }
    },
  error: 'error'
}


export const articlePageReducer = (state = initialState, action)=>{
  switch(action.type){
    case 'GET_ARTICLE_PAGE':
      return{
        ...state,
        articlePage: action.payload
      }
    case 'GET_NEXT_ARTICLE_PAGE':
      return{
        ...state,
        articlePage: action.payload
      }  
    default:
      return state
  }
}