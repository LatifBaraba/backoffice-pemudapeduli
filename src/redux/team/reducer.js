import {
    GET_FLAG_SUCCESS,
    GET_FLAG_FAILURE,
    GET_TEAM,
    GET_TEAM_SUCCESS,
    GET_TEAM_FAILURE,
    EDIT_TEAM,
    EDIT_TEAM_SUCCESS,
    EDIT_TEAM_FAILURE,
    ADD_TEAM,
    ADD_TEAM_SUCCESS,
    ADD_TEAM_FAILURE,
    DELETE_TEAM_SUCCESS,
    DELETE_TEAM_FAILURE
    
} from '../actionTypes';

const initialState = {
    loading: false,
    team: [],
    flag: [],
    error: null
};

export default function teamReducer(state = initialState, action) {
    switch (action.type) {
        case GET_FLAG_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                flag: action.payload
            };
        case GET_FLAG_FAILURE:
            return {
                ...state,
                loading: false,
            };
        case GET_TEAM:
            return {
                ...state,
                loading: true
            };
        case GET_TEAM_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                team: action.payload
            };
        case GET_TEAM_FAILURE:
            return {
                ...state,
                loading: false,
            };
        case EDIT_TEAM:
            return {
                ...state,
                loading: true
            };
        case EDIT_TEAM_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null
            };
        case EDIT_TEAM_FAILURE:
            return {
                ...state,
                loading: false,
            };
        case ADD_TEAM:
            return {
                ...state,
                loading: true
            };
        case ADD_TEAM_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null
            };
        case ADD_TEAM_FAILURE:
            return {
                ...state,
                loading: false,
            };
        case DELETE_TEAM_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null
            };
        case DELETE_TEAM_FAILURE:
            return {
                ...state,
                loading: false,
            };
        default:
            return state;
    }
}