import {
    GET_PROGRAM,
    GET_PROGRAM_SUCCESS,
    GET_PROGRAM_FAILURE,
    GET_DETAIL_PROGRAM,
    GET_DETAIL_PROGRAM_SUCCESS,
    GET_DETAIL_PROGRAM_FAILURE,
    GET_DETAIL_PROGRAM_CONTENT,
    EDIT_PROGRAM,
    EDIT_PROGRAM_SUCCESS,
    EDIT_PROGRAM_FAILURE,
    ADD_PROGRAM,
    ADD_PROGRAM_SUCCESS,
    ADD_PROGRAM_FAILURE,
    DELETE_PROGRAM_SUCCESS,
    DELETE_PROGRAM_FAILURE
    
} from '../actionTypes';

const initialState = {
    loading: false,
    program: [],
    content: [],
    error: null
};

export default function programReducer(state = initialState, action) {
    switch (action.type) {
        case GET_PROGRAM:
            return {
                ...state,
                loading: false
            };
        case GET_PROGRAM_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                program: action.payload
            };
        case GET_PROGRAM_FAILURE:
            return {
                ...state,
                loading: false,
            };
        case GET_DETAIL_PROGRAM:
            return {
                ...state,
                loading: false
            };
        case GET_DETAIL_PROGRAM_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                program: action.payload
            };
        case GET_DETAIL_PROGRAM_CONTENT:
            return {
                ...state,
                loading: false,
                error: null,
                content: action.payload
            };
        case GET_DETAIL_PROGRAM_FAILURE:
            return {
                ...state,
                loading: false,
            };
        case EDIT_PROGRAM:
            return {
                ...state,
                loading: true
            };
        case EDIT_PROGRAM_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null
            };
        case EDIT_PROGRAM_FAILURE:
            return {
                ...state,
                loading: false,
            };
        case ADD_PROGRAM:
            return {
                ...state,
                loading: true
            };
        case ADD_PROGRAM_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null
            };
        case ADD_PROGRAM_FAILURE:
            return {
                ...state,
                loading: false,
            };
        case DELETE_PROGRAM_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null
            };
        case DELETE_PROGRAM_FAILURE:
            return {
                ...state,
                loading: false,
            };
        default:
            return state;
    }
}