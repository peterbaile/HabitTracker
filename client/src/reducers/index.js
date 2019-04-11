import {
    updateLoginStatus,
    updateSignUpStatus,
    getUserInfo,
} from '../actions/action_types';

const defaultState = {
    isAuthorized: false,
    userId: null,
    loginMessage: null,
    signUpStatus: false,
    signUpMessage: null,
    userInfo: null,
}

const rootReducer = (state = defaultState, action) => {
    switch (action.type) {
        case updateLoginStatus:
            return {
                ...state,
                isAuthorized: action.isAuthorized,
                userId: action.userId,
                loginMessage: action.message,
            };
        case updateSignUpStatus:
            return {
                ...state,
                signUpStatus: action.signUpStatus,
                signUpMessage: action.signUpMessage
            }
        case getUserInfo:
            return {
                ...state,
                userInfo: action.userInfo,
            }
        default:
            return state;
    }
}

export default rootReducer;