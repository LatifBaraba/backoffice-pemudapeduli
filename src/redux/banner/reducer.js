import {
    GET_BANNER,
    GET_BANNER_SUCCESS,
    GET_BANNER_FAILURE,
    EDIT_BANNER,
    EDIT_BANNER_SUCCESS,
    EDIT_BANNER_FAILURE,
    ADD_BANNER,
    ADD_BANNER_SUCCESS,
    ADD_BANNER_FAILURE,
    DELETE_BANNER_SUCCESS,
    DELETE_BANNER_FAILURE
    
} from '../actionTypes';

const initialState = {
    loading: false,
    banner: [],
    error: null
};

export default function bannerReducer(state = initialState, action) {
    switch (action.type) {
        case GET_BANNER:
            return {
                ...state,
                loading: true
            };
        case GET_BANNER_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                banner: action.payload
            };
        case GET_BANNER_FAILURE:
            return {
                ...state,
                loading: false,
            };
        case EDIT_BANNER:
            return {
                ...state,
                loading: true
            };
        case EDIT_BANNER_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null
            };
        case EDIT_BANNER_FAILURE:
            return {
                ...state,
                loading: false,
            };
        case ADD_BANNER:
            return {
                ...state,
                loading: true
            };
        case ADD_BANNER_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null
            };
        case ADD_BANNER_FAILURE:
            return {
                ...state,
                loading: false,
            };
        case DELETE_BANNER_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null
            };
        case DELETE_BANNER_FAILURE:
            return {
                ...state,
                loading: false,
            };
        default:
            return state;
    }
}