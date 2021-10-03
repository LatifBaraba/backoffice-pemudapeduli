import { GET_MENU,
    GET_MENU_SUCCESS,
    GET_MENU_FAILURE,
    ADD_MENU,
    ADD_MENU_SUCCESS,
    ADD_MENU_FAILURE,
    EDIT_MENU,
    EDIT_MENU_SUCCESS,
    EDIT_MENU_FAILURE,
    DELETE_MENU_SUCCESS,
    DELETE_MENU_FAILURE
        } from '../actionTypes';

import axios from 'axios';
import { fetchToken, fetchRefreshToken } from "../token/action";
import history from "../../history";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const URL = `${process.env.REACT_APP_BASE_URL}/menu-extras/list`;
const EditURL = `${process.env.REACT_APP_BASE_URL}/menu-extras/`;
const AddURL = `${process.env.REACT_APP_BASE_URL}/menu-extras/create`;

export function fetchMenu(token) {
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
            dispatch(getMenuSuccess(res.data.data));
        })
        .catch(err => {
            if(err.response.status === 401){
                toast.error("Unauthorized")
                dispatch(fetchRefreshToken(token))
                localStorage.removeItem("token");
                history.push('/login')
            }
            dispatch(getMenuFailure(err));
        });
    };
};

export function fetchAddMenu(token, title, link) {
    return (dispatch) => {
        dispatch(addMenu())
        axios(AddURL, {
            method: 'POST',
            data: {
                title: title,
                link: link
            },
            headers: {
                "pp-token": `${token}`,
                "Content-type": "application/json"
            }
        })
        .then(res => {
            setTimeout(() => {
                toast.success("Add Success !");
                dispatch(addMenuSuccess(res));
                history.push("/menu");
            }, 2000);
        })
        .catch(err => {
            if(err.response.status === 401){
                toast.error("Unauthorized")
                dispatch(fetchRefreshToken(token))
                localStorage.removeItem("token");
                history.push('/login')
            }
            dispatch(addMenuFailure(err));
        });
    };
};

export function fetchEditMenu(token, id, title, link) {
    return (dispatch) => {
        dispatch(editMenu())
        axios(EditURL+`${id}`, {
            method: 'PUT',
            data: {
                title: title,
                link: link
            },
            headers: {
                "pp-token": `${token}`,
                "Content-type": "application/json"
            }
        })
        .then(res => { 
            setTimeout(() => {
                toast.success("Edit Success !");
                dispatch(editMenuSuccess(res));
                history.push("/menu");
            }, 2000);
        })
        .catch(err => {
            if(err.response.status === 401){
                toast.error("Unauthorized")
                dispatch(fetchRefreshToken(token))
                localStorage.removeItem("token");
                history.push('/login')
            }
            dispatch(editMenuFailure(err));
        });
    };
};

export function fetchDeleteMenu(token, id) {
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
                dispatch(deleteMenuSuccess(res));
                history.push("/menu");
                window.location.reload();
            }, 2000);
        })
        .catch(err => {
            if(err.response.status === 401){
                toast.error("Unauthorized")
                dispatch(fetchRefreshToken(token))
                localStorage.removeItem("token");
                history.push('/login')
            }
            dispatch(deleteMenuFailure(err));
        });
    };
};

// Get Menu
const getMenuSuccess = (payload) => ({
    type: GET_MENU_SUCCESS,
    payload
});

const getMenuFailure = () => ({
    type: GET_MENU_FAILURE
});

// Edit Menu
const editMenu = () => ({
    type: EDIT_MENU
});

const editMenuSuccess = (payload) => ({
    type: EDIT_MENU_SUCCESS,
    payload
});

const editMenuFailure = () => ({
    type: EDIT_MENU_FAILURE
});

// Add Menu
const addMenu = () => ({
    type: ADD_MENU
});

const addMenuSuccess = (payload) => ({
    type: ADD_MENU_SUCCESS,
    payload
});

const addMenuFailure = () => ({
    type: ADD_MENU_FAILURE
});

// Delete Menu
const deleteMenuSuccess = (payload) => ({
    type: DELETE_MENU_SUCCESS,
    payload
});

const deleteMenuFailure = () => ({
    type: DELETE_MENU_FAILURE
});