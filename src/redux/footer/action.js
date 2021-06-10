import { GET_FOOTER,
    GET_FOOTER_SUCCESS,
    GET_FOOTER_FAILURE,
    ADD_FOOTER,
    ADD_FOOTER_SUCCESS,
    ADD_FOOTER_FAILURE,
    EDIT_FOOTER,
    EDIT_FOOTER_SUCCESS,
    EDIT_FOOTER_FAILURE,
    DELETE_FOOTER_SUCCESS,
    DELETE_FOOTER_FAILURE
        } from '../actionTypes';
import axios from 'axios';
import { fetchToken, fetchRefreshToken } from "../token/action";
import history from "../../history";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const URL = `${process.env.REACT_APP_BASE_URL}/kontak-kami/list`;
const EditURL = `${process.env.REACT_APP_BASE_URL}/kontak-kami/`;
const AddURL = `${process.env.REACT_APP_BASE_URL}/kontak-kami/create`;

export function fetchFooter(token) {
    return (dispatch) => {
        axios(URL, {
            method: 'POST',
            data: {
                limit: "1",
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
            dispatch(getFooterSuccess(res.data.data));
            console.log(res.data.data)
        })
        .catch(err => {
            if(err.response.status === 401){
                toast.error("Unauthorized")
                dispatch(fetchRefreshToken(token))
                localStorage.removeItem("token");
                history.push('/login')
            }
            dispatch(getFooterFailure(err));
        });
    };
};

export function fetchEditFooter(token, id, titles, sub, titContent, titleLeft, titleRight, deepLeft, deepRight, newThumb, desc) {
    return (dispatch) => {
        dispatch(editFooter())
        axios(EditURL+`${id}`, {
            method: 'PUT',
            data: {
                title: titles,
                sub_title: sub,
                title_content: titContent,
                title_button_right: titleRight == "" ? null : titleRight,
                deeplink_right: deepRight,
                title_button_left: titleLeft == "" ? null : titleRight,
                deeplink_left: deepLeft,
                description: desc,
                thumbnail_image_url: newThumb
            },
            headers: {
                "pp-token": `${token}`,
                "Content-type": "application/json"
            }
        })
        .then(res => { 
            setTimeout(() => {
                toast.success("Edit Success !");
                dispatch(editFooterSuccess(res));
                history.push("/footer");
            }, 2000);
        })
        .catch(err => {
            console.log(err)
            if(err.response.status === 401){
                toast.error("Unauthorized")
                dispatch(fetchRefreshToken(token))
                localStorage.removeItem("token");
                history.push('/login')
            }
            dispatch(editFooterFailure(err));
        });
    };
};

export function fetchAddFooter(token, titles, sub, titContent, titleLeft, titleRight, deepLeft, deepRight, newThumb, desc) {
    return (dispatch) => {
        dispatch(addFooter())
        axios(AddURL, {
            method: 'POST',
            data: {
                title: titles,
                sub_title: sub,
                title_content: titContent,
                title_button_right: titleRight == "" ? null : titleRight,
                deeplink_right: deepRight,
                title_button_left: titleLeft == "" ? null : titleRight,
                description: desc,
                thumbnail_image_url: newThumb
            },
            headers: {
                "pp-token": `${token}`,
                "Content-type": "application/json"
            }
        })
        .then(res => {
            setTimeout(() => {
                toast.success("Add Success !");
                dispatch(addFooterSuccess(res));
                history.push("/footer");
            }, 2000);
        })
        .catch(err => {
            console.log(err)
            if(err.response.status === 401){
                toast.error("Unauthorized")
                dispatch(fetchRefreshToken(token))
                localStorage.removeItem("token");
                history.push('/login')
            }
            dispatch(addFooterFailure(err));
        });
    };
};

export function fetchDeleteFooter(token, id) {
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
                dispatch(deleteFooterSuccess(res));
                history.push("/footer");
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
            dispatch(deleteFooterFailure(err));
        });
    };
};

// Get Footer
const getFooterSuccess = (payload) => ({
    type: GET_FOOTER_SUCCESS,
    payload
});

const getFooterFailure = () => ({
    type: GET_FOOTER_FAILURE
});

const getFooter = () => ({
    type: GET_FOOTER
});

// Edit Footer
const editFooter = () => ({
    type: EDIT_FOOTER
});

const editFooterSuccess = (payload) => ({
    type: EDIT_FOOTER_SUCCESS,
    payload
});

const editFooterFailure = () => ({
    type: EDIT_FOOTER_FAILURE
});

// Add Footer
const addFooter = () => ({
    type: ADD_FOOTER
});

const addFooterSuccess = (payload) => ({
    type: ADD_FOOTER_SUCCESS,
    payload
});

const addFooterFailure = () => ({
    type: ADD_FOOTER_FAILURE
});

// Delete Footer
const deleteFooterSuccess = (payload) => ({
    type: DELETE_FOOTER_SUCCESS,
    payload
});

const deleteFooterFailure = () => ({
    type: DELETE_FOOTER_FAILURE
});