// Import framework
import ApolloClient from 'apollo-boost';

// Import Variables
import {
    updateLoginStatus,
    getUserInfo,
    getHabitsInfo,
    updateHabitSelection,
    updateSelectedDate,
    updateResponseMessage,
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

export const updateResponseMessageAction = (message) => {
    return (dispatch) => {
        dispatch({
            type: updateResponseMessage,
            responseMessage: message,
        })
    }
}

export const loginAction = (email, password) => {
    return (dispatch) => {
        dispatch({
            type: updateResponseMessage,
            responseMessage: null,
        })

        client.query({ query: getUserQuery, variables: { email, password } }).then(
            result => {
                const users = result.data.users;
                if (users.length === 0) {
                    dispatch({
                        type: updateLoginStatus,
                        isAuthorized: false,
                        userId: null,
                    });
                    dispatch({
                        type: updateResponseMessage,
                        responseMessage: "Error: Invalid Credentials",
                    })
                } else {
                    dispatch({
                        type: updateLoginStatus,
                        isAuthorized: true,
                        userId: users[0].id,
                    });
                    dispatch({
                        type: updateResponseMessage,
                        responseMessage: null,
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
        });
        dispatch({
            type: updateResponseMessage,
            responseMessage: null,
        })
    }
}

export const signUpAction = (email, password, username) => {
    return (dispatch) => {
        dispatch({
            type: updateResponseMessage,
            responseMessage: null,
        });

        if (!email || !password || !username || email.trim().length === 0 || password.trim().length === 0 || username.trim().length === 0) {
            dispatch({
                type: updateResponseMessage,
                responseMessage: "Error: One of the input fields is empty",
            })
            return;
        }

        client.mutate({ mutation: addUserMutation, variables: { email, password, username } }).then(
            result => {
                const user = result.data.addUser;
                if (user){
                    dispatch({
                        type: updateResponseMessage,
                        responseMessage: "Successful Signup",
                    });
                }
            }
        ).catch(err => {
            dispatch({
                type: updateResponseMessage,
                responseMessage: err.graphQLErrors[0].message,
            });
        })
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
        if (updateSet.name === '') {
            dispatch({
                type: updateResponseMessage,
                responseMessage: "Error: Habit Name cannot be empty",
            });
            return;
        }
        client.mutate({ mutation: addHabitMutation, variables: updateSet }).then(
            result => {
                const habits = result.data.addHabit.habits;
                dispatch({
                    type: getHabitsInfo,
                    habitsInfo: habits,
                })
            }
        ).catch(err => {
            dispatch({
                type: updateResponseMessage,
                responseMessage: err.graphQLErrors[0].message,
            });
        })
    }
}

export const updateHabitAction = (userId, updateSet) => {
    return (dispatch) => {
        dispatch({
            type: updateResponseMessage,
            responseMessage: null,
        });
        updateSet.userId = userId;
        client.mutate({ mutation: updateHabitMutation, variables: updateSet }).then(
            result => {
                const habits = result.data.updateHabit.habits;
                dispatch({
                    type: getHabitsInfo,
                    habitsInfo: habits,
                });
                dispatch({
                    type: updateResponseMessage,
                    responseMessage: "Successful Updates",
                });
            }
        ).catch(err => {
            dispatch({
                type: getHabitsInfo,
                habitsInfo: null,
            });
            dispatch({
                type: updateResponseMessage,
                responseMessage: "Error: Error occurs",
            });
        })
    }
}

export const removeHabitAction = (userId, name) => {
    return (dispatch) => {
        dispatch({
            type: updateResponseMessage,
            responseMessage: null,
        });
        client.mutate({ mutation: removeHabitMutation, variables: { userId, name } }).then(
            result => {
                const habits = result.data.removeHabit.habits;
                dispatch({
                    type: getHabitsInfo,
                    habitsInfo: habits,
                });
                dispatch({
                    type: updateResponseMessage,
                    responseMessage: "Success: Successful Deletion",
                });
                dispatch({
                    type: updateHabitSelection,
                    selectedHabit: null,
                })
            }
        )
    }
}