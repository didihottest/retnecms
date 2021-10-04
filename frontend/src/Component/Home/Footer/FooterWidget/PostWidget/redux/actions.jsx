import * as type from "./types";
import axios from "axios";

// SET ACTION
export const getRandomArticles = (articles) => {
  return {
    type: type.GET_RANDOM_POST,
    payload: articles,
  };
};

// FOR DISPATCH API TO ACTION
export const sentRandomArticles = () => async (dispatch) => {
  try {
    let params = {
      pageSize: 3,
      pageNumber: 4,
      filter: {
        article_title: null,
        username: null,
        category_name: "",
        status: null,
      },
    };
    return axios
      .post("https://api.retnecms.com/news-article/find", params)
      .then((response) => {
        const { items } = response.data.data;
        dispatch(getRandomArticles(items));
      });
  } catch (error) {
    console.error(error);
  }
};
