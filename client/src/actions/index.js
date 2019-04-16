// Import framework
import ApolloClient from 'apollo-boost';

// Import Variables
import {
    updateLoginStatus,
    updateSignUpStatus,
    getUserInfo,
    getHabitsInfo,
    updateHabitSelection,
    updateSelectedDate,
} from './action_types';

import {
    getUserQuery,
    addUserMutation,
    updateUserMutation,
    getHabitsQuery,
    addHabitMutation,
    updateHabitMutation,
    removeHabitMutation,
} from '../queries/index';

const client = new ApolloClient({
    uri: 'http://localhost:3001/graphql'
})


export const updateSelectedDateAction = (currentDate, times) => {
    return (dispatch) => {
        dispatch({
            type: updateSelectedDate,
            selectedDate: currentDate,
            times: times,
        })
    }
}

export const loginAction = (email, password) => {
    return (dispatch) => {
        client.query({ query: getUserQuery, variables: { email, password } }).then(
            result => {
                const users = result.data.users;
                if (users.length === 0) {
                    dispatch({
                        type: updateLoginStatus,
                        isAuthorized: false,
                        userId: null,
                        message: "Error: Invalid Credentials"
                    })
                } else {
                    dispatch({
                        type: updateLoginStatus,
                        isAuthorized: true,
                        userId: users[0].id,
                        message: null,
                    })
                }
            }
        )
    }
}

export const logoutAction = () => {
    return (dispatch) => {
        dispatch({
            type: updateLoginStatus,
            isAuthorized: false,
            userId: null,
        })
    }
}

export const signUpAction = (email, password) => {
    return (dispatch) => {
        if (!email || !password) {
            dispatch({
                type: updateSignUpStatus,
                signUpStatus: true,
                signUpMessage: "Please input an email/ password",
            })
            return;
        }

        client.mutate({ mutation: addUserMutation, variables: { email, password } }).then(
            result => {
                const user = result.data.addUser;
                if (!user) {
                    dispatch({
                        type: updateSignUpStatus,
                        signUpStatus: true,
                        signUpMessage: "Error Occurs",
                    })
                } else {
                    dispatch({
                        type: updateSignUpStatus,
                        signUpStatus: true,
                        signUpMessage: "Successful Signup",
                    })
                }
            }
        )
    }
}

export const getUserInfoAction = (userId) => {
    return (dispatch) => {
        client.query({ query: getUserQuery, variables: { userId } }).then(
            result => {
                const users = result.data.users;
                dispatch({
                    type: getUserInfo,
                    userInfo: users[0]
                })

            }
        )
    }
}

export const updateUserInfoAction = (userId, updateSet) => {
    return (dispatch) => {
        updateSet.userId = userId;
        client.mutate({ mutation: updateUserMutation, variables: updateSet }).then(
            result => {
                const users = result.data.users;
                dispatch({
                    type: getUserInfo,
                    userInfo: users[0]
                })
            }
        )
    }
}

export const updateHabitSelectionAction = (habitName) => {
    return (dispatch) => {
        dispatch({
            type: updateHabitSelection,
            selectedHabit: habitName
        })
    }
}

export const getHabitsAction = (userId) => {
    return (dispatch) => {
        client.query({ query: getHabitsQuery, variables: { userId } }).then(
            result => {
                if (!result.data.habits) {
                    dispatch({
                        type: getHabitsInfo,
                        habitsInfo: []
                    })
                } else {
                    const habits = result.data.habits.habits;
                    dispatch({
                        type: getHabitsInfo,
                        habitsInfo: habits
                    })
                }
            }
        )
    }
}

export const addHabitAction = (userId, updateSet) => {
    return (dispatch) => {
        updateSet.userId = userId;
        client.mutate({ mutation: addHabitMutation, variables: updateSet }).then(
            result => {
                const habits = result.data.addHabit.habits;
                dispatch({
                    type: getHabitsInfo,
                    habitsInfo: habits,
                })
            }
        )
    }
}

export const updateHabitAction = (userId, updateSet) => {
    return (dispatch) => {
        dispatch({
            type: getHabitsInfo,
            habitsInfo: null,
            message: null,
        })
        updateSet.userId = userId;
        client.mutate({mutation: updateHabitMutation, variables: updateSet}).then(
            result => {
                const habits = result.data.updateHabit.habits;
                dispatch({
                    type: getHabitsInfo,
                    habitsInfo: habits,
                    message: "Success: Successful Updates"
                })
            }
        ).catch(err => {
            dispatch({
                type: getHabitsInfo,
                habitsInfo: null,
                message: "Error: Error occurs"
            })
        })
    }
}

export const removeHabitAction = (userId, name) => {
    return (dispatch) => {
        client.mutate({mutation: removeHabitMutation, variables:{userId, name}}).then(
            result => {
                const habits = result.data;
                console.log(habits);
            }
        )
    }
}