import {
    GET_TENTANG,
    GET_TENTANG_SUCCESS,
    GET_TENTANG_FAILURE,
    EDIT_TENTANG,
    EDIT_TENTANG_SUCCESS,
    EDIT_TENTANG_FAILURE,
    ADD_TENTANG,
    ADD_TENTANG_SUCCESS,
    ADD_TENTANG_FAILURE,
    DELETE_TENTANG_SUCCESS,
    DELETE_TENTANG_FAILURE
    
} from '../actionTypes';

const initialState = {
    loading: false,
    tentang: [],
    error: null
};

export default function tentangReducer(state = initialState, action) {
    switch (action.type) {
        case GET_TENTANG:
            return {
                ...state,
                loading: true
            };
        case GET_TENTANG_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                tentang: action.payload
            };
        case GET_TENTANG_FAILURE:
            return {
                ...state,
                loading: false,
            };
        case EDIT_TENTANG:
            return {
                ...state,
                loading: true
            };
        case EDIT_TENTANG_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null
            };
        case EDIT_TENTANG_FAILURE:
            return {
                ...state,
                loading: false,
            };
        case ADD_TENTANG:
            return {
                ...state,
                loading: true
            };
        case ADD_TENTANG_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null
            };
        case ADD_TENTANG_FAILURE:
            return {
                ...state,
                loading: false,
            };
        case DELETE_TENTANG_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null
            };
        case DELETE_TENTANG_FAILURE:
            return {
                ...state,
                loading: false,
            };
        default:
            return state;
    }
}