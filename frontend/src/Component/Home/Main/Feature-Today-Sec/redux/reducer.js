import * as type from './types';
import Data from '../../Block-Wrap-Sec2/Latest-Article/MasonryBox/data';

export const featureTodayReducer = (
    state = { mainFeature: Data, error: false },
    action) => {
    switch (action.type) {
        case type.GET_FEATURE_ARTICLE:
            return {
                ...state,
                mainFeature: action.payload
            }
        default:
            return state;
    }
}