const initialProfileState = {
};

// Reducer
export const userProfileReducer = (state = initialProfileState, action) => {
    switch (action.type) {
        case 'CREATE_USER_PROFILE':
            return {
                ...state,
                current: action.payload
            }
        case 'GET_USER_PROFILE':
            return {
                ...state,
                current: action.payload
            }
            default:
                return state;
    }
};