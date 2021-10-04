import axios from "axios";
import * as type from "./types";

// ACTIONS
export const getFlickrPhotos = (articles) => {
  return {
    type: type.GET_FLICKR_PHOTOS,
    payload: articles,
  };
};

// GET API AND DISPATCH TO ACTIONS:
export const sentFlickrPhotos = () => async (dispatch) => {
  try {
    let params = {
      pageSize: 6,
      pageNumber: 3,
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
        dispatch(getFlickrPhotos(items));
      });
  } catch (error) {
    console.error(error);
  }
};
