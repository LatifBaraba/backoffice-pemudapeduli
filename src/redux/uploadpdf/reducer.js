import {
    GET_UPLOADPDF,
    GET_UPLOADPDF_SUCCESS,
    GET_UPLOADPDF_FAILURE,
    EDIT_UPLOADPDF,
    EDIT_UPLOADPDF_SUCCESS,
    EDIT_UPLOADPDF_FAILURE,
    ADD_UPLOADPDF,
    ADD_UPLOADPDF_SUCCESS,
    ADD_UPLOADPDF_FAILURE,
    DELETE_UPLOADPDF_SUCCESS,
    DELETE_UPLOADPDF_FAILURE
    
} from '../actionTypes';

const initialState = {
    loading: false,
    uploadpdf: [],
    error: null
};

export default function uploadReducer(state = initialState, action) {
    switch (action.type) {
        case GET_UPLOADPDF:
            return {
                ...state,
                loading: true
            };     
        case GET_UPLOADPDF_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                uploadpdf: action.payload
            };
        case GET_UPLOADPDF_FAILURE:
            return {
                ...state,
                loading: false,
            };
        case EDIT_UPLOADPDF:
            return {
                ...state,
                loading: true
            };
        case EDIT_UPLOADPDF_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null
            };
        case EDIT_UPLOADPDF_FAILURE:
            return {
                ...state,
                loading: false,
            };
        case ADD_UPLOADPDF:
            return {
                ...state,
                loading: true
            };
        case ADD_UPLOADPDF_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null
            };
        case ADD_UPLOADPDF_FAILURE:
            return {
                ...state,
                loading: false,
            };
        case DELETE_UPLOADPDF_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null
            };
        case DELETE_UPLOADPDF_FAILURE:
            return {
                ...state,
                loading: false,
            };
        default:
            return state;
    }
}