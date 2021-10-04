// import {call,put} from 'redux-saga/effects';

// // ACTION
// import { fetchFashionArticlesSaga } from '../../action/articlesFiltAction';

// // REQUEST FROM API
// import {reqGetFashion,requestGetArticle} from '../request/apiRequest';

// export function* handleGetFashion(action){
//     try {
//         const response = yield call(reqGetFashion);
//         const {data} = response.data.data.items;
//         yield put(fetchFashionArticlesSaga(data))
//     } catch (error) {
//         console.error(error)
//     }
// }
