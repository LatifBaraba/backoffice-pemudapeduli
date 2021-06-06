import {
    GET_ACHIEVEMENT,
    GET_ACHIEVEMENT_SUCCESS,
    GET_ACHIEVEMENT_FAILURE,
    GET_DETAIL_ACHIEVEMENT,
    GET_DETAIL_ACHIEVEMENT_SUCCESS,
    GET_DETAIL_ACHIEVEMENT_FAILURE,
    EDIT_ACHIEVEMENT,
    EDIT_ACHIEVEMENT_SUCCESS,
    EDIT_ACHIEVEMENT_FAILURE,
    ADD_ACHIEVEMENT,
    ADD_ACHIEVEMENT_SUCCESS,
    ADD_ACHIEVEMENT_FAILURE,
    DELETE_ACHIEVEMENT_SUCCESS,
    DELETE_ACHIEVEMENT_FAILURE
    
} from '../actionTypes';

const initialState = {
    loading: false,
    achievement: [],
    error: null
};

export default function achievementReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ACHIEVEMENT:
            return {
                ...state,
                loading: false
            };
        case GET_ACHIEVEMENT_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                achievement: action.payload
            };
        case GET_ACHIEVEMENT_FAILURE:
            return {
                ...state,
                loading: false,
            };
        case GET_DETAIL_ACHIEVEMENT:
            return {
                ...state,
                loading: false
            };
        case GET_DETAIL_ACHIEVEMENT_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                achievement: action.payload
            };
        case GET_DETAIL_ACHIEVEMENT_FAILURE:
            return {
                ...state,
                loading: false,
            };
        case EDIT_ACHIEVEMENT:
            return {
                ...state,
                loading: true
            };
        case EDIT_ACHIEVEMENT_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null
            };
        case EDIT_ACHIEVEMENT_FAILURE:
            return {
                ...state,
                loading: false,
            };
        case ADD_ACHIEVEMENT:
            return {
                ...state,
                loading: true
            };
        case ADD_ACHIEVEMENT_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null
            };
        case ADD_ACHIEVEMENT_FAILURE:
            return {
                ...state,
                loading: false,
            };
        case DELETE_ACHIEVEMENT_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null
            };
        case DELETE_ACHIEVEMENT_FAILURE:
            return {
                ...state,
                loading: false,
            };
        default:
            return state;
    }
}