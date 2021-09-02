import {
    GET_NOMINAL,
    GET_NOMINAL_SUCCESS,
    GET_NOMINAL_FAILURE,
    ADD_NOMINAL,
    ADD_NOMINAL_SUCCESS,
    ADD_NOMINAL_FAILURE,
    DELETE_NOMINAL_SUCCESS,
    DELETE_NOMINAL_FAILURE
    
} from '../actionTypes';

const initialState = {
    loading: false,
    nominal: [],
    error: null
};

export default function nominalReducer(state = initialState, action) {
    switch (action.type) {
        case GET_NOMINAL:
            return {
                ...state,
                loading: false
            };
        case GET_NOMINAL_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                nominal: action.payload
            };
        case GET_NOMINAL_FAILURE:
            return {
                ...state,
                loading: false,
            };
        case ADD_NOMINAL:
            return {
                ...state,
                loading: true
            };
        case ADD_NOMINAL_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null
            };
        case ADD_NOMINAL_FAILURE:
            return {
                ...state,
                loading: false,
            };
        case DELETE_NOMINAL_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null
            };
        case DELETE_NOMINAL_FAILURE:
            return {
                ...state,
                loading: false,
            };
        default:
            return state;
    }
}