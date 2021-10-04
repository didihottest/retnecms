import {combineReducers} from 'redux';
import navTravelReducer from '../Component/Header/NavbarList/NavTravel/redux/reducer';
import { flickrPhotosReducer } from '../Component/Home/Footer/FooterWidget/FlickrWidget/redux/reducer';
import { randomPostReducer } from '../Component/Home/Footer/FooterWidget/PostWidget/redux/reducer';
import {articlesFiltReducer} from '../Component/Home/Main/Block-Wrap-Sec1/Grid-Box/redux/reducer';
import latestArticleReducer from '../Component/Home/Main/Block-Wrap-Sec2/Latest-Article/redux/reducer';
import { widgetRecentReducer } from '../Component/Home/Main/Block-Wrap-Sec2/SideBar/WidgetPopular/redux/reducer';
import {featureTodayReducer} from '../Component/Home/Main/Feature-Today-Sec/redux/reducer'
import { articlePageReducer } from '../Component/PostPage/Article/Content/redux/reducer';

const rootReducer = combineReducers({
    articlesFilter: articlesFiltReducer,
    featureToday: featureTodayReducer,
    articlePage: articlePageReducer,
    navTravelArticles: navTravelReducer,
    latestArticles: latestArticleReducer,
    widgetRecent: widgetRecentReducer,
    randomPostFooter: randomPostReducer,
    flickrPhotos: flickrPhotosReducer
});

export default rootReducer;
