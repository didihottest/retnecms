import React, { createContext, useCallback, useContext, useState } from 'react';
import { isEqual, isFunction } from 'lodash';

const PostsUIContext = createContext();

export function usePostsUIContext() {
  return useContext(PostsUIContext);
}

export const PostsUIConsumer = PostsUIContext.Consumer;

let params = {
  pageNumber: 1,
  pageSize: 10,
  filter: {
    article_title: '',
    username: '',
    category_name: '',
    status: '',
    startDate: '',
    endDate: '',
  }
}

export function PostsUIProvider({ children }) {
  const [queryParams, setQueryParamsBase] = useState(params);
  const setQueryParams = useCallback((nextQueryParams) => {
    setQueryParamsBase((prevQueryParams) => {
      if (isFunction(nextQueryParams)) {
        nextQueryParams = nextQueryParams(prevQueryParams);
      }

      if (isEqual(prevQueryParams, nextQueryParams)) {
        return prevQueryParams;
      }

      return nextQueryParams;
    });
  }, []);

  const initialFilter = {
    pageNumber: 1,
    pageSize: 10,
    filter: {
      post_name: ''
    }
  }
  const value = {
    queryParams,
    setQueryParams,
    initialFilter
  };

  return (
    <PostsUIContext.Provider value={value}>
      {children}
    </PostsUIContext.Provider>
  );
}
