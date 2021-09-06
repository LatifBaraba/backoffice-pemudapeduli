import {
    GET_PENGGALANG,
    GET_PENGGALANG_SUCCESS,
    GET_PENGGALANG_FAILURE,
    ADD_PENGGALANG,
    ADD_PENGGALANG_SUCCESS,
    ADD_PENGGALANG_FAILURE,
    EDIT_PENGGALANG,
    EDIT_PENGGALANG_SUCCESS,
    EDIT_PENGGALANG_FAILURE,
    DELETE_PENGGALANG_SUCCESS,
    DELETE_PENGGALANG_FAILURE,
    VERIFIED_PENGGALANG,
    VERIFIED_PENGGALANG_SUCCESS,
    VERIFIED_PENGGALANG_FAILURE
    
} from '../actionTypes';

const initialState = {
    loading: false,
    penggalang: [],    
    error: null
};

export default function penggalangReducer(state = initialState, action) {
    switch (action.type) {
        case GET_PENGGALANG:
            return {
                ...state,
                loading: false
            };
        case GET_PENGGALANG_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                penggalang: action.payload
            };
        case GET_PENGGALANG_FAILURE:
            return {
                ...state,
                loading: false,
            };
        case EDIT_PENGGALANG:
            return {
                ...state,
                loading: true
            };
        case EDIT_PENGGALANG_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null
            };
        case EDIT_PENGGALANG_FAILURE:
            return {
                ...state,
                loading: false,
            };
            case VERIFIED_PENGGALANG:
                return {
                    ...state,
                    loading: true
                };
            case VERIFIED_PENGGALANG_SUCCESS:
                return {
                    ...state,
                    loading: false,
                    error: null
                };
            case VERIFIED_PENGGALANG_FAILURE:
                return {
                    ...state,
                    loading: false,
                };
        case ADD_PENGGALANG:
            return {
                ...state,
                loading: true
            };
        case ADD_PENGGALANG_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null
            };
        case ADD_PENGGALANG_FAILURE:
            return {
                ...state,
                loading: false,
            };
        case DELETE_PENGGALANG_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null
            };
        case DELETE_PENGGALANG_FAILURE:
            return {
                ...state,
                loading: false,
            };
        default:
            return state;
    }
}