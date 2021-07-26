import {
    GET_QRIS,
    GET_QRIS_SUCCESS,
    GET_QRIS_FAILURE,
    ADD_QRIS,
    ADD_QRIS_SUCCESS,
    ADD_QRIS_FAILURE,
    EDIT_QRIS,
    EDIT_QRIS_SUCCESS,
    EDIT_QRIS_FAILURE,
    DELETE_QRIS_SUCCESS,
    DELETE_QRIS_FAILURE
    
} from '../actionTypes';

const initialState = {
    loading: false,
    qris: [],
    error: null
};

export default function qrisReducer(state = initialState, action) {
    switch (action.type) {
        case GET_QRIS:
            return {
                ...state,
                loading: false
            };
        case GET_QRIS_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                qris: action.payload
            };
        case GET_QRIS_FAILURE:
            return {
                ...state,
                loading: false,
            };
        case EDIT_QRIS:
            return {
                ...state,
                loading: true
            };
        case EDIT_QRIS_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null
            };
        case EDIT_QRIS_FAILURE:
            return {
                ...state,
                loading: false,
            };
        case ADD_QRIS:
            return {
                ...state,
                loading: true
            };
        case ADD_QRIS_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null
            };
        case ADD_QRIS_FAILURE:
            return {
                ...state,
                loading: false,
            };
        case DELETE_QRIS_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null
            };
        case DELETE_QRIS_FAILURE:
            return {
                ...state,
                loading: false,
            };
        default:
            return state;
    }
}