import {
    GET_TRANSACTION,
    GET_TRANSACTION_SUCCESS,
    GET_TRANSACTION_FAILURE,   
    DELETE_TRANSACTION,
    DELETE_TRANSACTION_SUCCESS,
    DELETE_TRANSACTION_FAILURE
    
} from '../actionTypes';

const initialState = {
    loading: false,
    transaction: [],
    error: null
};

export default function transactionReducer(state = initialState, action) {
    switch (action.type) {
        case GET_TRANSACTION:
            return {
                ...state,
                loading: false
            };
        case GET_TRANSACTION_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                transaction: action.payload
            };
        case GET_TRANSACTION_FAILURE:
            return {
                ...state,
                loading: false,
            };
        case DELETE_TRANSACTION:
            return {
                ...state,
                loading: false
            };
        case DELETE_TRANSACTION_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                transaction: action.payload
            };
        case DELETE_TRANSACTION_FAILURE:
            return {
                ...state,
                loading: false,
            };
        
        default:
            return state;
    }
}