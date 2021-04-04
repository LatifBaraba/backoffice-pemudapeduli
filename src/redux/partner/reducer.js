import {
    GET_PARTNER,
    GET_PARTNER_SUCCESS,
    GET_PARTNER_FAILURE,
    EDIT_PARTNER,
    EDIT_PARTNER_SUCCESS,
    EDIT_PARTNER_FAILURE,
    ADD_PARTNER,
    ADD_PARTNER_SUCCESS,
    ADD_PARTNER_FAILURE,
    DELETE_PARTNER_SUCCESS,
    DELETE_PARTNER_FAILURE
    
} from '../actionTypes';

const initialState = {
    loading: false,
    partner: [],
    error: null
};

export default function partnerReducer(state = initialState, action) {
    switch (action.type) {
        case GET_PARTNER:
            return {
                ...state,
                loading: true
            };
        case GET_PARTNER_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                partner: action.payload
            };
        case GET_PARTNER_FAILURE:
            return {
                ...state,
                loading: false,
            };
        case EDIT_PARTNER:
            return {
                ...state,
                loading: true
            };
        case EDIT_PARTNER_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null
            };
        case EDIT_PARTNER_FAILURE:
            return {
                ...state,
                loading: false,
            };
        case ADD_PARTNER:
            return {
                ...state,
                loading: true
            };
        case ADD_PARTNER_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null
            };
        case ADD_PARTNER_FAILURE:
            return {
                ...state,
                loading: false,
            };
        case DELETE_PARTNER_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null
            };
        case DELETE_PARTNER_FAILURE:
            return {
                ...state,
                loading: false,
            };
        default:
            return state;
    }
}