import {
    LOGIN,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGOUT,
    LOGOUT_SUCCESS,
    LOGOUT_FAILURE
} from '../actionTypes';

const initialState = {
    loading: false,
    data: [],
    error: null
};

export default function authReducer(state = initialState, action) {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                loading: true
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload
            };
        case LOGIN_FAILURE:
            return {
                ...state,
                loading: false,
            };
        case LOGOUT:
            return {
                ...state,
                loading: true
            };
        case LOGOUT_SUCCESS:
            return {
                ...state,
                loading: false
            };
        case LOGOUT_FAILURE:
            return {
                ...state,
                loading: false,
            };
        default:
            return state;
    }
}