// Import framework
import ApolloClient from 'apollo-boost';

// Import Variables
import {
    updateLoginStatus,
    updateSignUpStatus,
    getUserInfo
} from './action_types';

import {
    getUserQuery,
    addUserMutation
} from '../queries/index';

const client = new ApolloClient({
    uri: 'http://localhost:3001/graphql'
})

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