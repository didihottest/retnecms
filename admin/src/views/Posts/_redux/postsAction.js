import * as requestFromServer from './postsCrud';
import { postsSlice, callTypes } from './postsSlice';
// import { actions as auth } from '../../../Auth';
import { toast } from 'react-toastify'

const { actions } = postsSlice;

export const fetchPosts = (queryParams) => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findPosts(queryParams)
    .then(response => {
      const { data: { total_items, items } } = response.data;
      dispatch(actions.postsFetched({ total_items, items }));
    }).catch(error => {
      if (error.response.status === 401) {
        toast.error(error.response.data.message);
        // dispatch(auth.logout())
      }
      error.clientMessage = 'Can\'t find catecogries';
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchPost = (id) => dispatch => {

  if (!id) {
    return dispatch(actions.postFetched({ postsForEdit: undefined }));
  }

  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .getPostsById(id)
    .then(response => {
      // alias data to posts;
      const { data: data } = response.data;
      dispatch(actions.postFetched({ postForEdit: data }));
    }).catch(error => {
      error.clientMessage = 'Can\'t find post';
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const updatePost = (postId, post) => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updatePost(postId, post)
    .then(response => {
      dispatch(actions.postsReload);
      return response.data;
    })
    .catch(error => {
      if (error.response.status === 401) {
        toast.error(error.response.data.message);
        // dispatch(auth.logout())
      }
      error.clientMessage = 'Can\'t update post';
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
