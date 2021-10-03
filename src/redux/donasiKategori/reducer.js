import {
    GET_DONASI_KATEGORI,
    GET_DONASI_KATEGORI_SUCCESS,
    GET_DONASI_KATEGORI_FAILURE,
    EDIT_DONASI_KATEGORI,
    EDIT_DONASI_KATEGORI_SUCCESS,
    EDIT_DONASI_KATEGORI_FAILURE,
    ADD_DONASI_KATEGORI,
    ADD_DONASI_KATEGORI_SUCCESS,
    ADD_DONASI_KATEGORI_FAILURE,
    DELETE_DONASI_KATEGORI_SUCCESS,
    DELETE_DONASI_KATEGORI_FAILURE,
    GET_DONASI_PAKET_LIST_SUCCESS,
    GET_DONASI_PAKET_LIST_FAILURE
    
} from '../actionTypes';

const initialState = {
    loading: false,
    donasiKategori: [],
    paketListRutin: [],
    error: null
};

export default function donasiKategoriReducer(state = initialState, action) {
    switch (action.type) {
        case GET_DONASI_KATEGORI:
            return {
                ...state,
                loading: true
            };
        case GET_DONASI_KATEGORI_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                donasiKategori: action.payload
            };
        case GET_DONASI_KATEGORI_FAILURE:
            return {
                ...state,
                loading: false,
            };
        case EDIT_DONASI_KATEGORI:
            return {
                ...state,
                loading: true
            };
        case EDIT_DONASI_KATEGORI_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null
            };
        case EDIT_DONASI_KATEGORI_FAILURE:
            return {
                ...state,
                loading: false,
            };
        case ADD_DONASI_KATEGORI:
            return {
                ...state,
                loading: true
            };
        case ADD_DONASI_KATEGORI_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null
            };
        case ADD_DONASI_KATEGORI_FAILURE:
            return {
                ...state,
                loading: false,
            };
        case DELETE_DONASI_KATEGORI_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null
            };
        case DELETE_DONASI_KATEGORI_FAILURE:
            return {
                ...state,
                loading: false,
            };
            case GET_DONASI_PAKET_LIST_SUCCESS:
                return {
                    ...state,
                    loading: false,
                    error: null,
                    paketListRutin: action.payload
                };
            case GET_DONASI_PAKET_LIST_FAILURE:
                return {
                    ...state,
                    loading: false,
                };
        default:
            return state;
    }
}