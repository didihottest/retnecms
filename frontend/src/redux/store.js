import {createStore, applyMiddleware} from 'redux';
import createSagaMiddleWare from 'redux-saga';
import logger from 'redux-logger';
import {composeWithDevTools} from 'redux-devtools-extension';
import rootReducer from './rootReducers'
import rootSaga from './saga/appSaga'
import thunk from 'redux-thunk'


const sagaMiddleWare = createSagaMiddleWare();
const middleWares = [logger,sagaMiddleWare,thunk];

// export const store = createStore(rootReducer,composeWithDevTools(applyMiddleware(...middleWares)));

export const store = createStore(rootReducer,composeWithDevTools(applyMiddleware(thunk, logger)))

// sagaMiddleWare.run(rootSaga);
