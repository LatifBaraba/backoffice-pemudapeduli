import {
    GET_DONASI_RUTIN,
    GET_DONASI_RUTIN_SUCCESS,
    GET_DONASI_RUTIN_FAILURE,
    EDIT_DONASI_RUTIN,
    EDIT_DONASI_RUTIN_SUCCESS,
    EDIT_DONASI_RUTIN_FAILURE,
    ADD_DONASI_RUTIN,
    ADD_DONASI_RUTIN_SUCCESS,
    ADD_DONASI_RUTIN_FAILURE,
    DELETE_DONASI_RUTIN_SUCCESS,
    DELETE_DONASI_RUTIN_FAILURE
    
} from '../actionTypes';

const initialState = {
    loading: false,
    donasiRutin: [],
    error: null
};

export default function donasiRutinReducer(state = initialState, action) {
    switch (action.type) {
        case GET_DONASI_RUTIN:
            return {
                ...state,
                loading: true
            };
        case GET_DONASI_RUTIN_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                donasiRutin: action.payload
            };
        case GET_DONASI_RUTIN_FAILURE:
            return {
                ...state,
                loading: false,
            };
        case EDIT_DONASI_RUTIN:
            return {
                ...state,
                loading: true
            };
        case EDIT_DONASI_RUTIN_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null
            };
        case EDIT_DONASI_RUTIN_FAILURE:
            return {
                ...state,
                loading: false,
            };
        case ADD_DONASI_RUTIN:
            return {
                ...state,
                loading: true
            };
        case ADD_DONASI_RUTIN_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null
            };
        case ADD_DONASI_RUTIN_FAILURE:
            return {
                ...state,
                loading: false,
            };
        case DELETE_DONASI_RUTIN_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null
            };
        case DELETE_DONASI_RUTIN_FAILURE:
            return {
                ...state,
                loading: false,
            };
        default:
            return state;
    }
}