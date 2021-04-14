import {
    GET_BENEFICARIES,
    GET_BENEFICARIES_SUCCESS,
    GET_BENEFICARIES_FAILURE,
    EDIT_BENEFICARIES,
    EDIT_BENEFICARIES_SUCCESS,
    EDIT_BENEFICARIES_FAILURE,
    ADD_BENEFICARIES,
    ADD_BENEFICARIES_SUCCESS,
    ADD_BENEFICARIES_FAILURE,
    DELETE_BENEFICARIES_SUCCESS,
    DELETE_BENEFICARIES_FAILURE
    
} from '../actionTypes';

const initialState = {
    loading: false,
    beneficaries: [],
    error: null
};

export default function beneficariesReducer(state = initialState, action) {
    switch (action.type) {
        case GET_BENEFICARIES:
            return {
                ...state,
                loading: true
            };
        case GET_BENEFICARIES_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                beneficaries: action.payload
            };
        case GET_BENEFICARIES_FAILURE:
            return {
                ...state,
                loading: false,
            };
        case EDIT_BENEFICARIES:
            return {
                ...state,
                loading: true
            };
        case EDIT_BENEFICARIES_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null
            };
        case EDIT_BENEFICARIES_FAILURE:
            return {
                ...state,
                loading: false,
            };
        case ADD_BENEFICARIES:
            return {
                ...state,
                loading: true
            };
        case ADD_BENEFICARIES_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null
            };
        case ADD_BENEFICARIES_FAILURE:
            return {
                ...state,
                loading: false,
            };
        case DELETE_BENEFICARIES_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null
            };
        case DELETE_BENEFICARIES_FAILURE:
            return {
                ...state,
                loading: false,
            };
        default:
            return state;
    }
}