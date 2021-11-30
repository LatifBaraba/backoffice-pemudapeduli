import { GET_KONTAK,
    GET_KONTAK_SUCCESS,
    GET_KONTAK_FAILURE,
    ADD_KONTAK,
    ADD_KONTAK_SUCCESS,
    ADD_KONTAK_FAILURE,
    EDIT_KONTAK,
    EDIT_KONTAK_SUCCESS,
    EDIT_KONTAK_FAILURE,
    DELETE_KONTAK_SUCCESS,
    DELETE_KONTAK_FAILURE
        } from '../actionTypes';
import axios from 'axios';
import { fetchToken, fetchRefreshToken } from "../token/action";
import history from "../../history";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const URL = `${process.env.REACT_APP_BASE_URL}/kontak-kami/list`;
const EditURL = `${process.env.REACT_APP_BASE_URL}/kontak-kami/`;
const AddURL = `${process.env.REACT_APP_BASE_URL}/kontak-kami/create`;

export function fetchKontak(token) {
    return (dispatch) => {
        axios(URL, {
            method: 'POST',
            data: {
                limit: "100",
                offset: "0",
                filters: [
                    {
                        field: "is_deleted",
                        keyword: "false"
                    }
                ],
                order: "created_at",
                sort: "ASC",
                created_at_from: "",
                created_at_to: "",
                publish_at_from: "",
                publish_at_to: ""
            },
            headers: {
                "pp-token": `${token}`,
                "Content-type": "application/json"
            }
        })
        .then(res => {
            dispatch(getKontakSuccess(res.data.data));
        })
        .catch(err => {
            if(err.response.status == 401){
                toast.error("Harap Login Terlebih Dahulu")
                dispatch(fetchRefreshToken(token))
                localStorage.removeItem("token");
                history.push('/login')
            }
            dispatch(getKontakFailure(err));
        });
    };
};

export function fetchEditKontak(token, id, sk, address) {
    return (dispatch) => {
        dispatch(editKontak())
        axios(EditURL+`${id}`, {
            method: 'PUT',
            data: {
                sk_legalitas: sk,
                address: address
            },
            headers: {
                "pp-token": `${token}`,
                "Content-type": "application/json"
            }
        })
        .then(res => { 
            setTimeout(() => {
                toast.success("Edit Success !");
                dispatch(editKontakSuccess(res));
                history.push("/kontak");
            }, 2000);
        })
        .catch(err => {
            if(err.response.status == 401){
                toast.error("Harap Login Terlebih Dahulu")
                dispatch(fetchRefreshToken(token))
                localStorage.removeItem("token");
                history.push('/login')
            }
            dispatch(editKontakFailure(err));
        });
    };
};

export function fetchAddKontak(token, sk, address) {
    return (dispatch) => {
        dispatch(addKontak())
        axios(AddURL, {
            method: 'POST',
            data: {
                sk_legalitas: sk,
                address: address
            },
            headers: {
                "pp-token": `${token}`,
                "Content-type": "application/json"
            }
        })
        .then(res => {
            setTimeout(() => {
                toast.success("Add Success !");
                dispatch(addKontakSuccess(res));
                history.push("/kontak");
            }, 2000);
        })
        .catch(err => {
            if(err.response.status === 401){
                toast.error("Harap Login Terlebih Dahulu")
                dispatch(fetchRefreshToken(token))
                localStorage.removeItem("token");
                history.push('/login')
            }
            dispatch(addKontakFailure(err));
        });
    };
};

export function fetchDeleteKontak(token, id) {
    return (dispatch) => {
        axios(EditURL+`${id}`, {
            method: 'DELETE',
            headers: {
                "pp-token": `${token}`,
                "Content-type": "application/json"
            }
        })
        .then(res => {
            setTimeout(() => {
                toast.success("Delete Success !")
                dispatch(deleteKontakSuccess(res));
                history.push("/kontak");
                window.location.reload();
            }, 2000);
        })
        .catch(err => {
            if(err.response.status == 401){
                toast.error("Harap Login Terlebih Dahulu")
                dispatch(fetchRefreshToken(token))
                localStorage.removeItem("token");
                history.push('/login')
            }
            dispatch(deleteKontakFailure(err));
        });
    };
};

// Get Kontak
const getKontakSuccess = (payload) => ({
    type: GET_KONTAK_SUCCESS,
    payload
});

const getKontakFailure = () => ({
    type: GET_KONTAK_FAILURE
});

const getKontak = () => ({
    type: GET_KONTAK
});

// Edit Kontak
const editKontak = () => ({
    type: EDIT_KONTAK
});

const editKontakSuccess = (payload) => ({
    type: EDIT_KONTAK_SUCCESS,
    payload
});

const editKontakFailure = () => ({
    type: EDIT_KONTAK_FAILURE
});

// Add Kontak
const addKontak = () => ({
    type: ADD_KONTAK
});

const addKontakSuccess = (payload) => ({
    type: ADD_KONTAK_SUCCESS,
    payload
});

const addKontakFailure = () => ({
    type: ADD_KONTAK_FAILURE
});

// Delete Kontak
const deleteKontakSuccess = (payload) => ({
    type: DELETE_KONTAK_SUCCESS,
    payload
});

const deleteKontakFailure = () => ({
    type: DELETE_KONTAK_FAILURE
});