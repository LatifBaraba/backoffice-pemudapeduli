import {
    GET_DONASI,
    GET_DONASI_SUCCESS,
    GET_DONASI_FAILURE,
    EDIT_DONASI,
    EDIT_DONASI_SUCCESS,
    EDIT_DONASI_FAILURE,
    ADD_DONASI,
    ADD_DONASI_SUCCESS,
    ADD_DONASI_FAILURE,
    DELETE_DONASI_SUCCESS,
    DELETE_DONASI_FAILURE
    
} from '../actionTypes';

const initialState = {
    loading: false,
    donasi: [],
    error: null
};

export default function donasiReducer(state = initialState, action) {
    switch (action.type) {
        case GET_DONASI:
            return {
                ...state,
                loading: true
            };
        case GET_DONASI_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                donasi: action.payload
            };
        case GET_DONASI_FAILURE:
            return {
                ...state,
                loading: false,
            };
        case EDIT_DONASI:
            return {
                ...state,
                loading: true
            };
        case EDIT_DONASI_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null
            };
        case EDIT_DONASI_FAILURE:
            return {
                ...state,
                loading: false,
            };
        case ADD_DONASI:
            return {
                ...state,
                loading: true
            };
        case ADD_DONASI_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null
            };
        case ADD_DONASI_FAILURE:
            return {
                ...state,
                loading: false,
            };
        case DELETE_DONASI_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null
            };
        case DELETE_DONASI_FAILURE:
            return {
                ...state,
                loading: false,
            };
        default:
            return state;
    }
}