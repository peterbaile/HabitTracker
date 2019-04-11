// Import framework
import ApolloClient from 'apollo-boost';

// Import Variables
import {
    updateLoginStatus
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
                console.log(users);
                if (users.length == 0) {
                    dispatch({
                        type: updateLoginStatus,
                        isAuthorized: false,
                        userId: null,
                    })
                } else {
                    dispatch({
                        type: updateLoginStatus,
                        isAuthorized: true,
                        userId: users[0].id
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
        client.mutate({ mutation: addUserMutation, variables: { email, password } }).then(
            result => {
                console.log(result);
                const user = result.data.addUser;
                if (!user) {
                    dispatch({
                        type: updateLoginStatus,
                        userId: null,
                    })
                } else {
                    dispatch({
                        type: updateLoginStatus,
                        userId: user.id,
                    })
                }
            }
        )
    }
}