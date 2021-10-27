import {
    GET_KABAR_TERBARU_OT,
    GET_KABAR_TERBARU_OT_SUCCESS,
    GET_KABAR_TERBARU_OT_FAILURE,
    ADD_KABAR_TERBARU_OT,
    ADD_KABAR_TERBARU_OT_SUCCESS,
    ADD_KABAR_TERBARU_OT_FAILURE,
    EDIT_KABAR_TERBARU_OT,
    EDIT_KABAR_TERBARU_OT_SUCCESS,
    EDIT_KABAR_TERBARU_OT_FAILURE,
    DELETE_KABAR_TERBARU_OT,
    DELETE_KABAR_TERBARU_OT_SUCCESS,
    DELETE_KABAR_TERBARU_OT_FAILURE,
    GET_KABAR_TERBARU_RUTIN,
    GET_KABAR_TERBARU_RUTIN_SUCCESS,
    GET_KABAR_TERBARU_RUTIN_FAILURE,
    ADD_KABAR_TERBARU_RUTIN,
    ADD_KABAR_TERBARU_RUTIN_SUCCESS,
    ADD_KABAR_TERBARU_RUTIN_FAILURE,
    EDIT_KABAR_TERBARU_RUTIN,
    EDIT_KABAR_TERBARU_RUTIN_SUCCESS,
    EDIT_KABAR_TERBARU_RUTIN_FAILURE,
    DELETE_KABAR_TERBARU_RUTIN,
    DELETE_KABAR_TERBARU_RUTIN_SUCCESS,
    DELETE_KABAR_TERBARU_RUTIN_FAILURE
    
} from '../actionTypes';

const initialState = {
    loading: false,
    kabarterbaruot: [],    
    kabarterbarurutin: [],    
    error: null
};

export default function kabarterbaruReducer(state = initialState, action) {
    switch (action.type) {
        case GET_KABAR_TERBARU_OT:
            return {
                ...state,
                loading: false
            };
        case GET_KABAR_TERBARU_OT_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                kabarterbaruot: action.payload
            };
        case GET_KABAR_TERBARU_OT_FAILURE:
            return {
                ...state,
                loading: false,
            };
        case EDIT_KABAR_TERBARU_OT:
            return {
                ...state,
                loading: true
            };
        case EDIT_KABAR_TERBARU_OT_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null
            };
        case EDIT_KABAR_TERBARU_OT_FAILURE:
            return {
                ...state,
                loading: false,
            };           
        case ADD_KABAR_TERBARU_OT:
            return {
                ...state,
                loading: true
            };
        case ADD_KABAR_TERBARU_OT_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null
            };
        case ADD_KABAR_TERBARU_OT_FAILURE:
            return {
                ...state,
                loading: false,
            };
        case DELETE_KABAR_TERBARU_OT_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null
            };
        case DELETE_KABAR_TERBARU_OT_FAILURE:
            return {
                ...state,
                loading: false,
            };

            case GET_KABAR_TERBARU_RUTIN:
                return {
                    ...state,
                    loading: false
                };
            case GET_KABAR_TERBARU_RUTIN_SUCCESS:
                return {
                    ...state,
                    loading: false,
                    error: null,
                    kabarterbarurutin: action.payload
                };
            case GET_KABAR_TERBARU_RUTIN_FAILURE:
                return {
                    ...state,
                    loading: false,
                };
        default:
            return state;
    }
}