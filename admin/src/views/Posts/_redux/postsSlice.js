import { createSlice } from '@reduxjs/toolkit';

const initialPostsState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  postForEdit: undefined,
  lastError: null,
};

export const callTypes = {
  list: 'list',
  action: 'action',
};

export const postsSlice = createSlice({
  name: 'posts',
  initialState: initialPostsState,
  reducers: {
    catchError: (state, action) => {
      state.error = action.payload.error.clientMessage;
      if (action.payload.callType === callTypes.list) {
        state.listLoading = false;
      } else {
        state.actionsLoading = false;
      }
    },
    startCall: (state, action) => {
      state.error = null;
      if (action.payload.callType === callTypes.list) {
        state.listLoading = true;
      } else {
        state.actionsLoading = true;
      }
    },

    // getPostById
    postFetched: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.postForEdit = action.payload.postForEdit;
      state.listLoading = false
    },
    // findPostss
    postsFetched: (state, action) => {
      const { total_items, items } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = items;
      state.totalCount = total_items;
    },
    // Set to default state actionLoading & error
    postsReload: (state, action) => {
      state.actionsLoading = false;
      state.listLoading = false;
      state.error = null;
    },

  },
});

