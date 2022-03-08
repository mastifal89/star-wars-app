import { types } from '../types/types';

export const authReducer = (state= {}, action) => {
    switch (action.type) {
        case types.login:
            return {
                ...action.payload,
                logged: true
            }
        case types.logout:
            return {
                ...state,
                logged: false
            }
        case types.failedLogin:
            return {
                ...state,
                failedLoginAttemps: state.failedLoginAttemps + 1,
                logged: false,
            }
        case types.resetTries:
            return {
                ...state,
                failedLoginAttemps: 0,
                logged: false,
            }
        default:
            return state;
    }
}