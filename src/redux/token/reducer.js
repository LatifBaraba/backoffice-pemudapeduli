import {
    GET_TOKEN,
    GET_TOKEN_SUCCESS,
    GET_TOKEN_FAILURE
} from '../actionTypes';

const initialState = {
    loading: false,
    token: [],
    error: null
};

export default function tokenReducer(state = initialState, action) {
    switch (action.type) {
        case GET_TOKEN:
            return {
                ...state,
                loading: true
            };
        case GET_TOKEN_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                token: action.payload
            };
        case GET_TOKEN_FAILURE:
            return {
                ...state,
                loading: false,
            };
        default:
            return state;
    }
}