import axios from 'axios';
import * as type from './types';

export const fetchFoodArticles = (articles)=>{
    return {
        type: type.GET_FOOD_ARTICLE,
        payload: articles
    }
}

export const fetchFashionArticles = (data)=>{
    return {
        type: type.GET_FASHION_ARTICLE,
        payload: data
    }
}

export const fetchChildFoodArticles = (articles)=>{
    return {
        type: type.GET_CHILD_FOOD_ARTICLE,
        payload: articles
    }
}

export const fetchChildFashionArticles = (data)=>{
    return {
        type: type.GET_CHILD_FASHION_ARTICLE,
        payload: data
    }
}


// GET API AND SEND DATA API TO ACTION PAYLOAD
export const sentFashionFilter =()=> async(dispatch)=>{
    try {
        let params = {pageSize: 1,
            pageNumber:1,
            filter: {
                article_title:null,
                username:null,
                category_name:'Fashion',
                status: null
            }}
        return axios.post('https://api.retnecms.com/news-article/find', params)
        .then(response =>{
            // const {data: {total_items, items} } = response.data
            // dispatch(fetchFashionArticles({total_items,items}))
            const {items} = response.data.data
            dispatch(fetchFashionArticles(items))
        })
    } catch (error) {
        console.error(error)
    }
}

export const sentFoodFilter =()=> async(dispatch)=>{
    try {
        let params = {pageSize: 1,
            pageNumber:1,
            filter: {
                article_title:null,
                username:null,
                category_name:'Food & Health',
                status: null
            }}
        return axios.post('https://api.retnecms.com/news-article/find', params)
        .then(response =>{
            // const {data: {total_items, items} } = response.data
            // dispatch(fetchFashionArticles({total_items,items}))
            const {items} = response.data.data
            dispatch(fetchFoodArticles(items))
        })
    } catch (error) {
        console.error(error)
    }
}

export const sentChildFashionFilter =()=> async(dispatch)=>{
    try {
        let params = {pageSize: 2,
            pageNumber:2,
            filter: {
                article_title:null,
                username:null,
                category_name:'Fashion',
                status: null
            }}
        return axios.post('https://api.retnecms.com/news-article/find', params)
        .then(response =>{
            // const {data: {total_items, items} } = response.data
            // dispatch(fetchFashionArticles({total_items,items}))
            const {items} = response.data.data
            dispatch(fetchChildFashionArticles(items))
        })
    } catch (error) {
        console.error(error)
    }
}

export const sentChildFoodFilter =()=> async(dispatch)=>{
    try {
        let params = {pageSize: 2,
            pageNumber:2,
            filter: {
                article_title:null,
                username:null,
                category_name:'Food & Health',
                status: null
            }}
        return axios.post('https://api.retnecms.com/news-article/find', params)
        .then(response =>{
            // const {data: {total_items, items} } = response.data
            // dispatch(fetchFashionArticles({total_items,items}))
            const {items} = response.data.data
            dispatch(fetchChildFoodArticles(items))
        })
    } catch (error) {
        console.error(error)
    }
}