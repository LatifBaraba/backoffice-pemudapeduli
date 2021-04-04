import {
    GET_USER,
    GET_USER_SUCCESS,
    GET_USER_FAILURE,
    EDIT_USER,
    EDIT_USER_SUCCESS,
    EDIT_USER_FAILURE,
    ADD_USER,
    ADD_USER_SUCCESS,
    ADD_USER_FAILURE,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAILURE,
    GET_ROLE,
    GET_ROLE_SUCCESS,
    GET_ROLE_FAILURE
    
} from '../actionTypes';

const initialState = {
    loading: false,
    user: [],
    role: [],
    error: null
};

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case GET_USER:
            return {
                ...state,
                loading: true
            };
        case GET_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                user: action.payload
            };
        case GET_USER_FAILURE:
            return {
                ...state,
                loading: false,
            };
        case GET_ROLE:
            return {
                ...state,
                loading: true
            };
        case GET_ROLE_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                role: action.payload
            };
        case GET_ROLE_FAILURE:
            return {
                ...state,
                loading: false,
            };
        case EDIT_USER:
            return {
                ...state,
                loading: true
            };
        case EDIT_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null
            };
        case EDIT_USER_FAILURE:
            return {
                ...state,
                loading: false,
            };
        case ADD_USER:
            return {
                ...state,
                loading: true
            };
        case ADD_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null
            };
        case ADD_USER_FAILURE:
            return {
                ...state,
                loading: false,
            };
        case DELETE_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null
            };
        case DELETE_USER_FAILURE:
            return {
                ...state,
                loading: false,
            };
        default:
            return state;
    }
}