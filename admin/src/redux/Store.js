import RootReducer from './RootReducer.js';
import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from 'redux-saga'

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: RootReducer,
  sagaMiddleware
});

export default store;