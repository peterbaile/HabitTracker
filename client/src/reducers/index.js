import {
    updateAuthStatus
} from '../actions/action_types';

const defaultState = {
    isAuthorized: false,
}

const rootReducer = (state = defaultState, action) => {
    switch(action.type){
        case updateAuthStatus:
          return {
              ...state,
              isAuthorized: action.isAuthorized,
        };

        default:
        return state;
    }
}

export default rootReducer;