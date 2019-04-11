import {
    updateLoginStatus
} from '../actions/action_types';

const defaultState = {
    isAuthorized: false,
    userId: null,
}

const rootReducer = (state = defaultState, action) => {
    switch (action.type) {
        case updateLoginStatus:
            return {
                ...state,
                isAuthorized: action.isAuthorized,
                userId: action.userId
            };

        default:
            return state;
    }
}

export default rootReducer;