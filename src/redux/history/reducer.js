import {
    GET_HISTORY,
    GET_HISTORY_SUCCESS,
    GET_HISTORY_FAILURE    
    
} from '../actionTypes';

const initialState = {
    loading: false,
    history: [],
    error: null
};

export default function historyReducer(state = initialState, action) {
    switch (action.type) {
        case GET_HISTORY:
            return {
                ...state,
                loading: false
            };
        case GET_HISTORY_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                history: action.payload
            };
        case GET_HISTORY_FAILURE:
            return {
                ...state,
                loading: false,
            };
        // case EDIT_QRIS:
        //     return {
        //         ...state,
        //         loading: true
        //     };
        // case EDIT_QRIS_SUCCESS:
        //     return {
        //         ...state,
        //         loading: false,
        //         error: null
        //     };
        // case EDIT_QRIS_FAILURE:
        //     return {
        //         ...state,
        //         loading: false,
        //     };
        // case ADD_QRIS:
        //     return {
        //         ...state,
        //         loading: true
        //     };
        // case ADD_QRIS_SUCCESS:
        //     return {
        //         ...state,
        //         loading: false,
        //         error: null
        //     };
        // case ADD_QRIS_FAILURE:
        //     return {
        //         ...state,
        //         loading: false,
        //     };
        // case DELETE_QRIS_SUCCESS:
        //     return {
        //         ...state,
        //         loading: false,
        //         error: null
        //     };
        // case DELETE_QRIS_FAILURE:
        //     return {
        //         ...state,
        //         loading: false,
        //     };
        default:
            return state;
    }
}