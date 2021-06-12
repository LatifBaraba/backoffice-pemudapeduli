import {
    GET_HUBUNGI,
    GET_HUBUNGI_SUCCESS,
    GET_HUBUNGI_FAILURE,
    EDIT_HUBUNGI,
    EDIT_HUBUNGI_SUCCESS,
    EDIT_HUBUNGI_FAILURE,
    ADD_HUBUNGI,
    ADD_HUBUNGI_SUCCESS,
    ADD_HUBUNGI_FAILURE,
    DELETE_HUBUNGI_SUCCESS,
    DELETE_HUBUNGI_FAILURE
    
} from '../actionTypes';

const initialState = {
    loading: false,
    hubungi: [],
    error: null
};

export default function hubungiReducer(state = initialState, action) {
    switch (action.type) {
        case GET_HUBUNGI:
            return {
                ...state,
                loading: false
            };
        case GET_HUBUNGI_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                hubungi: action.payload
            };
        case GET_HUBUNGI_FAILURE:
            return {
                ...state,
                loading: false,
            };
        case EDIT_HUBUNGI:
            return {
                ...state,
                loading: true
            };
        case EDIT_HUBUNGI_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null
            };
        case EDIT_HUBUNGI_FAILURE:
            return {
                ...state,
                loading: false,
            };
        case ADD_HUBUNGI:
            return {
                ...state,
                loading: true
            };
        case ADD_HUBUNGI_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null
            };
        case ADD_HUBUNGI_FAILURE:
            return {
                ...state,
                loading: false,
            };
        case DELETE_HUBUNGI_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null
            };
        case DELETE_HUBUNGI_FAILURE:
            return {
                ...state,
                loading: false,
            };
        default:
            return state;
    }
}