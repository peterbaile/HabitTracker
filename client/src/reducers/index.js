import {
    updateLoginStatus,
    updateSignUpStatus,
    getUserInfo,
    getHabitsInfo,
    updateHabitSelection
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
    userHabits: null,
    selectedHabit: null,
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
        case getHabitsInfo:
            return {
                ...state,
                userHabits: action.habitsInfo
            }
        case updateHabitSelection:
            return {
                ...state,
                selectedHabit: action.selectedHabit
            }
        default:
            return state;
    }
}

export default rootReducer;