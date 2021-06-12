import {
    GET_KONTAK,
    GET_KONTAK_SUCCESS,
    GET_KONTAK_FAILURE,
    EDIT_KONTAK,
    EDIT_KONTAK_SUCCESS,
    EDIT_KONTAK_FAILURE,
    ADD_KONTAK,
    ADD_KONTAK_SUCCESS,
    ADD_KONTAK_FAILURE,
    DELETE_KONTAK_SUCCESS,
    DELETE_KONTAK_FAILURE
} from '../actionTypes';

const initialState = {
    loading: false,
    kontak: [],
    error: null
};

export default function kontakReducer(state = initialState, action) {
    switch (action.type) {
        case GET_KONTAK:
            return {
                ...state,
                loading: true
            };
        case GET_KONTAK_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                kontak: action.payload
            };
        case GET_KONTAK_FAILURE:
            return {
                ...state,
                loading: false,
            };
        case EDIT_KONTAK:
            return {
                ...state,
                loading: true
            };
        case EDIT_KONTAK_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null
            };
        case EDIT_KONTAK_FAILURE:
            return {
                ...state,
                loading: false,
            };
        case ADD_KONTAK:
            return {
                ...state,
                loading: true
            };
        case ADD_KONTAK_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null
            };
        case ADD_KONTAK_FAILURE:
            return {
                ...state,
                loading: false,
            };
        case DELETE_KONTAK_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null
            };
        case DELETE_KONTAK_FAILURE:
            return {
                ...state,
                loading: false,
            };
        default:
            return state;
    }
}