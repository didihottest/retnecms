import * as requestFromServer from './categoriesCrud';
import { categoriesSlice, callTypes } from './categoriesSlice';
// import { actions as auth } from '../../../Auth';
import { toast } from 'react-toastify'

const { actions } = categoriesSlice;

export const fetchCategories = (queryParams) => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findCategories(queryParams)
    .then(response => {
      const { data: { total_items, items } } = response.data;
      dispatch(actions.categoriesFetched({ total_items, items }));
    }).catch(error => {
      if (error.response.status === 401) {
        toast.error(error.response.data.message);
        // dispatch(auth.logout())
      }
      error.clientMessage = 'Can\'t find catecogries';
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchCategory = (id) => dispatch => {

  if (!id) {
    return dispatch(actions.categoryFetched({ categoriesForEdit: undefined }));
  }

  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .getCategoriesById(id)
    .then(response => {
      // alias data to categories;
      const { data: data } = response.data;
      dispatch(actions.categoryFetched({ categoryForEdit: data }));
    }).catch(error => {
      error.clientMessage = 'Can\'t find category';
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const updateCategory = (categoryId, category) => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateCategory(categoryId, category)
    .then(response => {
      dispatch(actions.categoriesReload);
      return response.data;
    })
    .catch(error => {
      if (error.response.status === 401) {
        toast.error(error.response.data.message);
        // dispatch(auth.logout())
      }
      error.clientMessage = 'Can\'t update category';
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
