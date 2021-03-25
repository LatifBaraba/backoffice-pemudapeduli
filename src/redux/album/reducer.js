import {
    GET_ALBUM,
    GET_ALBUM_SUCCESS,
    GET_ALBUM_FAILURE,
    EDIT_ALBUM,
    EDIT_ALBUM_SUCCESS,
    EDIT_ALBUM_FAILURE,
    ADD_ALBUM,
    ADD_ALBUM_SUCCESS,
    ADD_ALBUM_FAILURE
    
} from '../actionTypes';

const initialState = {
    loading: false,
    album: [],
    error: null
};

export default function albumReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALBUM:
            return {
                ...state,
                loading: true
            };
        case GET_ALBUM_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                album: action.payload
            };
        case GET_ALBUM_FAILURE:
            return {
                ...state,
                loading: false,
            };
        case EDIT_ALBUM:
            return {
                ...state,
                loading: true
            };
        case EDIT_ALBUM_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null
            };
        case EDIT_ALBUM_FAILURE:
            return {
                ...state,
                loading: false,
            };
        case ADD_ALBUM:
            return {
                ...state,
                loading: true
            };
        case ADD_ALBUM_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null
            };
        case ADD_ALBUM_FAILURE:
            return {
                ...state,
                loading: false,
            };
        default:
            return state;
    }
}