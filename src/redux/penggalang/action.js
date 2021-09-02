import { 
    GET_PENGGALANG,
    GET_PENGGALANG_SUCCESS,
    GET_PENGGALANG_FAILURE,
    ADD_PENGGALANG,
    ADD_PENGGALANG_SUCCESS,
    ADD_PENGGALANG_FAILURE,
    EDIT_PENGGALANG,
    EDIT_PENGGALANG_SUCCESS,
    EDIT_PENGGALANG_FAILURE,
    DELETE_PENGGALANG_SUCCESS,
    DELETE_PENGGALANG_FAILURE
        } from '../actionTypes';

import axios from 'axios';
import { fetchToken, fetchRefreshToken } from "../token/action";
import history from "../../history";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const URL = `${process.env.REACT_APP_BASE_URL}/qris/list`;
const EditURL = `${process.env.REACT_APP_BASE_URL}/qris/`;
const AddURL = `${process.env.REACT_APP_BASE_URL}/qris/create`;

export function fetchPenggalang(token) {
    return (dispatch) => {
        // console.log('masuk redux')
        axios(URL, {
            method: 'POST',
            data: {
                limit: "100",
                offset: "0",
                filters: [
                    {
                        field: "status",
                        keyword: "created"
                    }
                ],
                order: "created_at",
                sort: "ASC",
                created_at_from: "",
                created_at_to: ""
                // publish_at_from: "",
                // publish_at_to: ""
            },
            headers: {
                "pp-token": `${token}`,
                "Content-type": "application/json"
            }
        })
        .then(res => {
            dispatch(getPenggalangSuccess(res.data.data));
            console.log(res.data.data)
        })
        .catch(err => {
            if(err.response.status == 401){
                toast.error("Unauthorized")
                dispatch(fetchRefreshToken(token))
                localStorage.removeItem("token");
                history.push('/login')
            }
            dispatch(getPenggalangFailure(err));
        });
    };
};

export function fetchAddPenggalang(token, title, description, newIcon) {
    return (dispatch) => {        
        dispatch(addPenggalang())
        axios(AddURL, {
            method: 'POST',
            data: {
                title: title,
                description: description,
                thumbnail_image_url: newIcon
            },
            headers: {
                "pp-token": `${token}`,
                "Content-type": "application/json"
            }
        })
        .then(res => {
            setTimeout(() => {
                toast.success("Add Success !");
                dispatch(addPenggalangSuccess(res));
                history.push("/qris");
            }, 2000);
        })
        .catch(err => {
            console.log(err)
            if(err.response.status == 401){
                toast.error("Unauthorized")
                dispatch(fetchRefreshToken(token))
                localStorage.removeItem("token");
                history.push('/login')
            }
            dispatch(addPenggalangFailure(err));
        });
    };
};

export function fetchEditPenggalang(token, id, title, description, newIcon) {
    return (dispatch) => {
        dispatch(editPenggalang())
        axios(EditURL+`${id}`, {
            method: 'PUT',
            data: {
                title: title,
                description: description,
                thumbnail_image_url: newIcon
            },
            headers: {
                "pp-token": `${token}`,
                "Content-type": "application/json"
            }
        })
        .then(res => { 
            setTimeout(() => {
                toast.success("Edit Success !");
                dispatch(editPenggalangSuccess(res));
                history.push("/qris");
            }, 2000);
        })
        .catch(err => {
            console.log(err)
            if(err.response.status == 401){
                toast.error("Unauthorized")
                dispatch(fetchRefreshToken(token))
                localStorage.removeItem("token");
                history.push('/login')
            }
            dispatch(editPenggalangFailure(err));
        });
    };
};

export function fetchDeletePenggalang(token, id) {
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
                dispatch(deletePenggalangSuccess(res));
                history.push("/qris");
                window.location.reload();
            }, 2000);
        })
        .catch(err => {
            if(err.response.status == 401){
                toast.error("Unauthorized")
                dispatch(fetchRefreshToken(token))
                localStorage.removeItem("token");
                history.push('/login')
            }
            dispatch(deletePenggalangFailure(err));
        });
    };
};

// Get Penggalang
const getPenggalangSuccess = (payload) => ({
    type: GET_PENGGALANG_SUCCESS,
    payload
});

const getPenggalangFailure = () => ({
    type: GET_PENGGALANG_FAILURE
});

// Edit Penggalang
const editPenggalang = () => ({
    type: EDIT_PENGGALANG
});

const editPenggalangSuccess = (payload) => ({
    type: EDIT_PENGGALANG_SUCCESS,
    payload
});

const editPenggalangFailure = () => ({
    type: EDIT_PENGGALANG_FAILURE
});

// Add Penggalang
const addPenggalang = () => ({
    type: ADD_PENGGALANG
});

const addPenggalangSuccess = (payload) => ({
    type: ADD_PENGGALANG_SUCCESS,
    payload
});

const addPenggalangFailure = () => ({
    type: ADD_PENGGALANG_FAILURE
});

// Delete Penggalang
const deletePenggalangSuccess = (payload) => ({
    type: DELETE_PENGGALANG_SUCCESS,
    payload
});

const deletePenggalangFailure = () => ({
    type: DELETE_PENGGALANG_FAILURE
});