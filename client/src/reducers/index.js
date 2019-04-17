import {
    updateLoginStatus,
    getUserInfo,
    getHabitsInfo,
    updateHabitSelection,
    updateSelectedDate,
    updateResponseMessage,
} from '../actions/action_types';

const defaultState = {
    // userId: "5cafc7f6615d1d268211fc34", //wrong
    userId: null,
    userInfo: null,
    userHabits: null,
    selectedHabit: null,
    selectedDate: new Date(),
    times: null,
    responseMessage: null,
}

const rootReducer = (state = defaultState, action) => {
    switch (action.type) {
        case updateResponseMessage:
            return {
                ...state,
                responseMessage: action.responseMessage
            }
        case updateLoginStatus:
            return {
                ...state,
                userId: action.userId,
            };
        case getUserInfo:
            return {
                ...state,
                userInfo: action.userInfo,
            }
        case getHabitsInfo:
            return {
                ...state,
                userHabits: action.habitsInfo,
                responseMessage: action.responseMessage,
            }
        case updateHabitSelection:
            return {
                ...state,
                selectedHabit: action.selectedHabit
            }
        case updateSelectedDate:
            return {
                ...state,
                selectedDate: action.selectedDate,
                times: action.times,
            }
        default:
            return state;
    }
}

export default rootReducer;