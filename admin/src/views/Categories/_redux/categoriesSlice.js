import { createSlice } from '@reduxjs/toolkit';

const initialCategoriesState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  categoryForEdit: undefined,
  lastError: null,
};

export const callTypes = {
  list: 'list',
  action: 'action',
};

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState: initialCategoriesState,
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

    // getCategoryById
    categoryFetched: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.categoryForEdit = action.payload.categoryForEdit;
      state.listLoading = false
    },
    // findCategoriess
    categoriesFetched: (state, action) => {
      const { total_items, items } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = items;
      state.totalCount = total_items;
    },
    // Set to default state actionLoading & error
    categoriesReload: (state, action) => {
      state.actionsLoading = false;
      state.listLoading = false;
      state.error = null;
    },

  },
});

