// import {takeLatest, put,all, call} from 'redux-saga/effects';
// import {fetchFashionArticlesSaga} from '../action/articlesFiltAction'
// import * as actionType from '../typeActions/type'
// import { handleGetFashion } from './handlers/handlerRequest';

// // // BEING A WATCHER
// // export function* fetchFashion (){
// //     yield takeLatest(actionType.GET_FASHION_ARTICLE,fashionArticlesSaga)
// // }

// // // BEING A WORKER
// // export function* fashionArticlesSaga({payload}){
// //     yield put(fetchFashionArticlesSaga(payload))
// // }

// // export function* saga(){
// //     yield all([call(fetchFashion)])
// // }

// export function* watcherFashionArticle(){
//     yield takeLatest(actionType.REQ_FASHION_ARTICLE, handleGetFashion)
// }


// // rootSAga 
// export default function* rootSaga(){
//     yield all([
//         watcherFashionArticle()
//     ])
// }