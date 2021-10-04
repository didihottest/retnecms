import axios from "axios"

export const getArticlePage = (data)=>{
  return{
    type: 'GET_ARTICLE_PAGE',
    payload: data
  }
}

export const getNextArticlePage = (data)=>{
  return{
    type: 'GET_NEXT_ARTICLE_PAGE',
    payload: data
  }
}

export const sentArticlePage = (route)=> async(dispatch)=>{
  try{
    const {data} = await axios.get(`https://api.retnecms.com/news-article/${route}`)
    console.log(route)
    dispatch(getArticlePage(data))
  }catch(err){
    console.log(err)
  }
}

export const sentNextArticlePage = (nextRoute)=> async(dispatch)=>{
  try{
    const {data} = await axios.get(`https://api.retnecms.com/news-article/${nextRoute}`)
    console.log(data);
    dispatch(getNextArticlePage(data))
  }catch(err){
    console.log(err)
  }
}