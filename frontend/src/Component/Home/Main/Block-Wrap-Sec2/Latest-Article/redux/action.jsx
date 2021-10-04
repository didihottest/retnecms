import * as type from "./types";
import axios from "axios";

export const getLatestArticles = (data) => {
  return {
    type: type.GET_LATEST_ARTICLES,
    payload: data,
  };
};

// DISPATCH TO ACTION
// export const sentLatestArticles = () => async (dispatch) => {
//   try {
//     let params = {
//       pageSize: '',
//       pageNumber: 1,
//       filter: {
//         article_title: null,
//         username: null,
//         category_name: "",
//         status: null,
//       },
//     };
//     return await axios
//       .post("https://api.retnecms.com/news-article/find", params)
//       .then((response) => {
//         const { items } = response.data.data;
//         dispatch(getLatestArticles(items));
//       });
//   } catch (error) {
//     console.error(error);
//   }
// };

export const sentLatestArticles = () => async (dispatch) => {
  try {
    return await axios
      .get("https://api.retnecms.com/news-article/")
      .then((response) => {
        const { rows } = response.data.data;
        dispatch(getLatestArticles(rows));
      });
  } catch (error) {
    console.error(error);
  }
};

