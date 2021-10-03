import {
    GET_REMINDER,
    GET_REMINDER_SUCCESS,
    GET_REMINDER_FAILURE,   
    DELETE_REMINDER,
    DELETE_REMINDER_SUCCESS,
    DELETE_REMINDER_FAILURE
    
} from '../actionTypes';

const initialState = {
    loading: false,
    reminder: [],
    error: null
};

export default function reminderReducer(state = initialState, action) {
    switch (action.type) {
        case GET_REMINDER:
            return {
                ...state,
                loading: false
            };
        case GET_REMINDER_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                reminder: action.payload
            };
        case GET_REMINDER_FAILURE:
            return {
                ...state,
                loading: false,
            };
        case DELETE_REMINDER:
            return {
                ...state,
                loading: false
            };
        case DELETE_REMINDER_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                reminder: action.payload
            };
        case DELETE_REMINDER_FAILURE:
            return {
                ...state,
                loading: false,
            };
        
        default:
            return state;
    }
}