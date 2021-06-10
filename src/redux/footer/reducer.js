import {
    GET_FOOTER,
    GET_FOOTER_SUCCESS,
    GET_FOOTER_FAILURE,
    EDIT_FOOTER,
    EDIT_FOOTER_SUCCESS,
    EDIT_FOOTER_FAILURE,
    ADD_FOOTER,
    ADD_FOOTER_SUCCESS,
    ADD_FOOTER_FAILURE,
    DELETE_FOOTER_SUCCESS,
    DELETE_FOOTER_FAILURE
} from '../actionTypes';

const initialState = {
    loading: false,
    footer: [],
    error: null
};

export default function footerReducer(state = initialState, action) {
    switch (action.type) {
        case GET_FOOTER:
            return {
                ...state,
                loading: true
            };
        case GET_FOOTER_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                footer: action.payload
            };
        case GET_FOOTER_FAILURE:
            return {
                ...state,
                loading: false,
            };
        case EDIT_FOOTER:
            return {
                ...state,
                loading: true
            };
        case EDIT_FOOTER_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null
            };
        case EDIT_FOOTER_FAILURE:
            return {
                ...state,
                loading: false,
            };
        case ADD_FOOTER:
            return {
                ...state,
                loading: true
            };
        case ADD_FOOTER_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null
            };
        case ADD_FOOTER_FAILURE:
            return {
                ...state,
                loading: false,
            };
        case DELETE_FOOTER_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null
            };
        case DELETE_FOOTER_FAILURE:
            return {
                ...state,
                loading: false,
            };
        default:
            return state;
    }
}