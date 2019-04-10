import {
    updateAuthStatus
} from './action_types';


export const login = () => {
    return (dispatch) => {
        dispatch({
            type: updateAuthStatus,
            isAuthorized: true
        })
    }
}

export const logout = () => {
    return (dispatch) => {
        dispatch({
            type: updateAuthStatus,
            isAuthorized: false
        })
    }
}