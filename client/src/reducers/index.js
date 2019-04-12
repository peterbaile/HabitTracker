import {
    updateLoginStatus,
    updateSignUpStatus,
    getUserInfo,
} from '../actions/action_types';

const defaultState = {
    isAuthorized: true, //wrong
    // isAuthorized: false,
    userId: "5cafc7f6615d1d268211fc34", //wrong
    // userId: null,
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