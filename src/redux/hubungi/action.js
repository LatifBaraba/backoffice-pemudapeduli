import { GET_HUBUNGI,
    GET_HUBUNGI_SUCCESS,
    GET_HUBUNGI_FAILURE,
    ADD_HUBUNGI,
    ADD_HUBUNGI_SUCCESS,
    ADD_HUBUNGI_FAILURE,
    EDIT_HUBUNGI,
    EDIT_HUBUNGI_SUCCESS,
    EDIT_HUBUNGI_FAILURE,
    DELETE_HUBUNGI_SUCCESS,
    DELETE_HUBUNGI_FAILURE
        } from '../actionTypes';

import axios from 'axios';
import { fetchToken, fetchRefreshToken } from "../token/action";
import history from "../../history";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const URL = `${process.env.REACT_APP_BASE_URL}/hubungi-kami/list`;
const EditURL = `${process.env.REACT_APP_BASE_URL}/hubungi-kami/`;
const AddURL = `${process.env.REACT_APP_BASE_URL}/hubungi-kami/create`;

export function fetchHubungi(token) {
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
            dispatch(getHubungiSuccess(res.data.data));
        })
        .catch(err => {
            if(err.response.status == 401){
                toast.error("Harap Login Terlebih Dahulu")
                dispatch(fetchRefreshToken(token))
                localStorage.removeItem("token");
                history.push('/login')
            }
            dispatch(getHubungiFailure(err));
        });
    };
};

export function fetchAddHubungi(token, title, link, newIcon) {
    return (dispatch) => {
        dispatch(addHubungi())
        axios(AddURL, {
            method: 'POST',
            data: {
                title: title,
                link: link,
                icon: newIcon
            },
            headers: {
                "pp-token": `${token}`,
                "Content-type": "application/json"
            }
        })
        .then(res => {
            setTimeout(() => {
                toast.success("Add Success !");
                dispatch(addHubungiSuccess(res));
                history.push("/hubungi");
            }, 2000);
        })
        .catch(err => {
            if(err.response.status == 401){
                toast.error("Harap Login Terlebih Dahulu")
                dispatch(fetchRefreshToken(token))
                localStorage.removeItem("token");
                history.push('/login')
            }
            dispatch(addHubungiFailure(err));
        });
    };
};

export function fetchEditHubungi(token, id, title, link, newIcon) {
    return (dispatch) => {
        dispatch(editHubungi())
        axios(EditURL+`${id}`, {
            method: 'PUT',
            data: {
                title: title,
                link: link,
                icon: newIcon
            },
            headers: {
                "pp-token": `${token}`,
                "Content-type": "application/json"
            }
        })
        .then(res => { 
            setTimeout(() => {
                toast.success("Edit Success !");
                dispatch(editHubungiSuccess(res));
                history.push("/hubungi");
            }, 2000);
        })
        .catch(err => {
            if(err.response.status == 401){
                toast.error("Harap Login Terlebih Dahulu")
                dispatch(fetchRefreshToken(token))
                localStorage.removeItem("token");
                history.push('/login')
            }
            dispatch(editHubungiFailure(err));
        });
    };
};

export function fetchDeleteHubungi(token, id) {
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
                dispatch(deleteHubungiSuccess(res));
                history.push("/hubungi");
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
            dispatch(deleteHubungiFailure(err));
        });
    };
};

// Get Hubungi
const getHubungiSuccess = (payload) => ({
    type: GET_HUBUNGI_SUCCESS,
    payload
});

const getHubungiFailure = () => ({
    type: GET_HUBUNGI_FAILURE
});

// Edit Hubungi
const editHubungi = () => ({
    type: EDIT_HUBUNGI
});

const editHubungiSuccess = (payload) => ({
    type: EDIT_HUBUNGI_SUCCESS,
    payload
});

const editHubungiFailure = () => ({
    type: EDIT_HUBUNGI_FAILURE
});

// Add Hubungi
const addHubungi = () => ({
    type: ADD_HUBUNGI
});

const addHubungiSuccess = (payload) => ({
    type: ADD_HUBUNGI_SUCCESS,
    payload
});

const addHubungiFailure = () => ({
    type: ADD_HUBUNGI_FAILURE
});

// Delete Hubungi
const deleteHubungiSuccess = (payload) => ({
    type: DELETE_HUBUNGI_SUCCESS,
    payload
});

const deleteHubungiFailure = () => ({
    type: DELETE_HUBUNGI_FAILURE
});