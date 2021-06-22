import {
    GET_BERITA,
    GET_BERITA_SUCCESS,
    GET_BERITA_FAILURE,
    GET_DETAIL_BERITA,
    GET_DETAIL_BERITA_SUCCESS,
    GET_DETAIL_BERITA_FAILURE,
    EDIT_BERITA,
    EDIT_BERITA_SUCCESS,
    EDIT_BERITA_FAILURE,
    ADD_BERITA,
    ADD_BERITA_SUCCESS,
    ADD_BERITA_FAILURE,
    DELETE_BERITA_SUCCESS,
    DELETE_BERITA_FAILURE
    
} from '../actionTypes';

const initialState = {
    loading: false,
    berita: [],
    error: null
};

export default function beritaReducer(state = initialState, action) {
    switch (action.type) {
        case GET_BERITA:
            return {
                ...state,
                loading: true
            };
        case GET_BERITA_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                berita: action.payload
            };
        case GET_BERITA_FAILURE:
            return {
                ...state,
                loading: false,
            };
        case GET_DETAIL_BERITA:
            return {
                ...state,
                loading: true
            };
        case GET_DETAIL_BERITA_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                berita: action.payload
            };
        case GET_DETAIL_BERITA_FAILURE:
            return {
                ...state,
                loading: false,
            };
        case EDIT_BERITA:
            return {
                ...state,
                loading: true
            };
        case EDIT_BERITA_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null
            };
        case EDIT_BERITA_FAILURE:
            return {
                ...state,
                loading: false,
            };
        case ADD_BERITA:
            return {
                ...state,
                loading: true
            };
        case ADD_BERITA_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null
            };
        case ADD_BERITA_FAILURE:
            return {
                ...state,
                loading: false,
            };
        case DELETE_BERITA_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null
            };
        case DELETE_BERITA_FAILURE:
            return {
                ...state,
                loading: false,
            };
        default:
            return state;
    }
}