import {
    GET_TESTIMONI,
    GET_TESTIMONI_SUCCESS,
    GET_TESTIMONI_FAILURE,
    EDIT_TESTIMONI,
    EDIT_TESTIMONI_SUCCESS,
    EDIT_TESTIMONI_FAILURE,
    ADD_TESTIMONI,
    ADD_TESTIMONI_SUCCESS,
    ADD_TESTIMONI_FAILURE,
    DELETE_TESTIMONI_SUCCESS,
    DELETE_TESTIMONI_FAILURE
    
} from '../actionTypes';

const initialState = {
    loading: false,
    testimoni: [],
    error: null
};

export default function testimoniReducer(state = initialState, action) {
    switch (action.type) {
        case GET_TESTIMONI:
            return {
                ...state,
                loading: true
            };
        case GET_TESTIMONI_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                testimoni: action.payload
            };
        case GET_TESTIMONI_FAILURE:
            return {
                ...state,
                loading: false,
            };
        case EDIT_TESTIMONI:
            return {
                ...state,
                loading: true
            };
        case EDIT_TESTIMONI_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null
            };
        case EDIT_TESTIMONI_FAILURE:
            return {
                ...state,
                loading: false,
            };
        case ADD_TESTIMONI:
            return {
                ...state,
                loading: true
            };
        case ADD_TESTIMONI_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null
            };
        case ADD_TESTIMONI_FAILURE:
            return {
                ...state,
                loading: false,
            };
        case DELETE_TESTIMONI_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null
            };
        case DELETE_TESTIMONI_FAILURE:
            return {
                ...state,
                loading: false,
            };
        default:
            return state;
    }
}