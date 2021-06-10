import {
    GET_MENU,
    GET_MENU_SUCCESS,
    GET_MENU_FAILURE,
    GET_DETAIL_MENU,
    GET_DETAIL_MENU_SUCCESS,
    GET_DETAIL_MENU_FAILURE,
    EDIT_MENU,
    EDIT_MENU_SUCCESS,
    EDIT_MENU_FAILURE,
    ADD_MENU,
    ADD_MENU_SUCCESS,
    ADD_MENU_FAILURE,
    DELETE_MENU_SUCCESS,
    DELETE_MENU_FAILURE
    
} from '../actionTypes';

const initialState = {
    loading: false,
    menu: [],
    error: null
};

export default function menuReducer(state = initialState, action) {
    switch (action.type) {
        case GET_MENU:
            return {
                ...state,
                loading: false
            };
        case GET_MENU_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                menu: action.payload
            };
        case GET_MENU_FAILURE:
            return {
                ...state,
                loading: false,
            };
        case EDIT_MENU:
            return {
                ...state,
                loading: true
            };
        case EDIT_MENU_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null
            };
        case EDIT_MENU_FAILURE:
            return {
                ...state,
                loading: false,
            };
        case ADD_MENU:
            return {
                ...state,
                loading: true
            };
        case ADD_MENU_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null
            };
        case ADD_MENU_FAILURE:
            return {
                ...state,
                loading: false,
            };
        case DELETE_MENU_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null
            };
        case DELETE_MENU_FAILURE:
            return {
                ...state,
                loading: false,
            };
        default:
            return state;
    }
}