const initialProfileState = {
    currentUser: {}
};

export const whoisReducer = (state = initialProfileState, action) => {
    switch (action.type) {
        case 'GET_WHOIS':
            return {
                ...state,
                currentUser: action.payload
            }
        default:
            return state;
    }
};