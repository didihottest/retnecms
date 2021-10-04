import * as type from './types';
import axios from "axios";


export const getWidgetRecentArticles = (articles)=>{
 return {
     type: type.GET_WIDGET_RECENT_ARTICLES,
     payload: articles
 }
}

export const sentWidgetRecentArticles = ()=> async (dispatch)=>{
    try {
        let params = {
        pageSize: 6,
        pageNumber: 1,
        filter: {
          article_title: null,
          username: null,
          category_name: "",
          status: null,
        },
      };
      return await axios
        .post("https://api.retnecms.com/news-article/find", params)
        .then((response) => {
          const { items } = response.data.data;
          dispatch(getWidgetRecentArticles(items));
        });
        
    } catch (error) {
        console.error()
    }
}