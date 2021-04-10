import { GET_PARTNER,
    GET_PARTNER_SUCCESS,
    GET_PARTNER_FAILURE,
    ADD_PARTNER,
    ADD_PARTNER_SUCCESS,
    ADD_PARTNER_FAILURE,
    EDIT_PARTNER,
    EDIT_PARTNER_SUCCESS,
    EDIT_PARTNER_FAILURE,
    DELETE_PARTNER_SUCCESS,
    DELETE_PARTNER_FAILURE
        } from '../actionTypes';
import axios from 'axios';
import { fetchToken, fetchRefreshToken } from "../token/action";
import history from "../../history";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const URL = `${process.env.REACT_APP_BASE_URL}/partner-kami/list`;
const EditURL = `${process.env.REACT_APP_BASE_URL}/partner-kami/`;
const AddURL = `${process.env.REACT_APP_BASE_URL}/partner-kami/create`;

export function fetchPartner(token) {
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
            dispatch(getPartnerSuccess(res.data.data));
            console.log(res.data.data, "aaaa")
        })
        .catch(err => {
            console.log(err)
            if(err.response.status === 401){
                toast.error("Unauthorized")
                dispatch(fetchRefreshToken(token))
                history.push('/login')
            }
            dispatch(getPartnerFailure(err));
        });
    };
};

export function fetchEditPartner(token, id, name, newThumb) {
    return (dispatch) => {
        dispatch(editPartner())
        axios(EditURL+`${id}`, {
            method: 'PUT',
            data: {
                name: name,
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
                dispatch(editPartnerSuccess(res));
                history.push("/partner");
            }, 2000);
        })
        .catch(err => {
            console.log(err)
            if(err.response.status === 401){
                toast.error("Unauthorized")
                dispatch(fetchRefreshToken(token))
                history.push('/login')
            }
            dispatch(editPartnerFailure(err));
        });
    };
};

export function fetchAddPartner(token, name, newThumb) {
    return (dispatch) => {
        dispatch(addPartner())
        axios(AddURL, {
            method: 'POST',
            data: {
                name: name,
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
                dispatch(addPartnerSuccess(res));
                history.push("/partner");
            }, 2000);
        })
        .catch(err => {
            console.log(err)
            if(err.response.status === 401){
                toast.error("Unauthorized")
                dispatch(fetchRefreshToken(token))
                history.push('/login')
            }
            dispatch(addPartnerFailure(err));
        });
    };
};

export function fetchDeletePartner(token, id) {
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
                dispatch(deletePartnerSuccess(res));
                history.push("/partner");
                window.location.reload();
            }, 2000);
        })
        .catch(err => {
            if(err.response.status === 401){
                toast.error("Unauthorized")
                dispatch(fetchRefreshToken(token))
                history.push('/login')
            }
            dispatch(deletePartnerFailure(err));
        });
    };
};

// Get Album
const getPartnerSuccess = (payload) => ({
    type: GET_PARTNER_SUCCESS,
    payload
});

const getPartnerFailure = () => ({
    type: GET_PARTNER_FAILURE
});

const getPartner = () => ({
    type: GET_PARTNER
});

// Edit PARTNER
const editPartner = () => ({
    type: EDIT_PARTNER
});

const editPartnerSuccess = (payload) => ({
    type: EDIT_PARTNER_SUCCESS,
    payload
});

const editPartnerFailure = () => ({
    type: EDIT_PARTNER_FAILURE
});

// Add PARTNER
const addPartner = () => ({
    type: ADD_PARTNER
});

const addPartnerSuccess = (payload) => ({
    type: ADD_PARTNER_SUCCESS,
    payload
});

const addPartnerFailure = () => ({
    type: ADD_PARTNER_FAILURE
});

// Delete PARTNER
const deletePartnerSuccess = (payload) => ({
    type: DELETE_PARTNER_SUCCESS,
    payload
});

const deletePartnerFailure = () => ({
    type: DELETE_PARTNER_FAILURE
});