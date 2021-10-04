import * as type from './types';
import axios from 'axios';

export const  getFeatureArticles = (data)=>{
    return {
        type: type.GET_FEATURE_ARTICLE,
        payload: data
    }
}


// DISPATCH DATA KE ACTION:
export const sentFeatureArticles = ()=> async(dispatch)=>{
    try{
        let params= {
            pageSize:6,
            pageNumber:1,
    filter:{
        article_title:null,
        username:null,
        category_name: '',
        status: null
    }}
       return axios.post('https://api.retnecms.com/news-article', params)
        .then(response =>{
            const {items} = response.data.data
                // console.log('items =>', items)
                dispatch(getFeatureArticles(items))

        })
        }
    catch(error){
        console.error(error)
        }
    }