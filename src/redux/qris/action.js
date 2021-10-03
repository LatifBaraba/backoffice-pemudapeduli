import { 
    GET_QRIS,
    GET_QRIS_SUCCESS,
    GET_QRIS_FAILURE,
    ADD_QRIS,
    ADD_QRIS_SUCCESS,
    ADD_QRIS_FAILURE,
    EDIT_QRIS,
    EDIT_QRIS_SUCCESS,
    EDIT_QRIS_FAILURE,
    DELETE_QRIS_SUCCESS,
    DELETE_QRIS_FAILURE
        } from '../actionTypes';

import axios from 'axios';
import { fetchToken, fetchRefreshToken } from "../token/action";
import history from "../../history";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const URL = `${process.env.REACT_APP_BASE_URL}/qris/list`;
const EditURL = `${process.env.REACT_APP_BASE_URL}/qris/`;
const AddURL = `${process.env.REACT_APP_BASE_URL}/qris/create`;

export function fetchQris(token) {
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
            dispatch(getQrisSuccess(res.data.data));
        })
        .catch(err => {
            if(err.response.status == 401){
                toast.error("Unauthorized")
                dispatch(fetchRefreshToken(token))
                localStorage.removeItem("token");
                history.push('/login')
            }
            dispatch(getQrisFailure(err));
        });
    };
};

export function fetchAddQris(token, title, description, newIcon) {
    return (dispatch) => {        
        dispatch(addQris())
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
                dispatch(addQrisSuccess(res));
                history.push("/qris");
            }, 2000);
        })
        .catch(err => {
            if(err.response.status == 401){
                toast.error("Unauthorized")
                dispatch(fetchRefreshToken(token))
                localStorage.removeItem("token");
                history.push('/login')
            }
            dispatch(addQrisFailure(err));
        });
    };
};

export function fetchEditQris(token, id, title, description, newIcon) {
    return (dispatch) => {
        dispatch(editQris())
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
                dispatch(editQrisSuccess(res));
                history.push("/qris");
            }, 2000);
        })
        .catch(err => {
            if(err.response.status == 401){
                toast.error("Unauthorized")
                dispatch(fetchRefreshToken(token))
                localStorage.removeItem("token");
                history.push('/login')
            }
            dispatch(editQrisFailure(err));
        });
    };
};

export function fetchDeleteQris(token, id) {
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
                dispatch(deleteQrisSuccess(res));
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
            dispatch(deleteQrisFailure(err));
        });
    };
};

// Get Qris
const getQrisSuccess = (payload) => ({
    type: GET_QRIS_SUCCESS,
    payload
});

const getQrisFailure = () => ({
    type: GET_QRIS_FAILURE
});

// Edit Qris
const editQris = () => ({
    type: EDIT_QRIS
});

const editQrisSuccess = (payload) => ({
    type: EDIT_QRIS_SUCCESS,
    payload
});

const editQrisFailure = () => ({
    type: EDIT_QRIS_FAILURE
});

// Add Qris
const addQris = () => ({
    type: ADD_QRIS
});

const addQrisSuccess = (payload) => ({
    type: ADD_QRIS_SUCCESS,
    payload
});

const addQrisFailure = () => ({
    type: ADD_QRIS_FAILURE
});

// Delete Qris
const deleteQrisSuccess = (payload) => ({
    type: DELETE_QRIS_SUCCESS,
    payload
});

const deleteQrisFailure = () => ({
    type: DELETE_QRIS_FAILURE
});