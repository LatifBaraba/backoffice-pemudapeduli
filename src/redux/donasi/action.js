import { GET_DONASI,
    GET_DONASI_SUCCESS,
    GET_DONASI_FAILURE,
    ADD_DONASI,
    ADD_DONASI_SUCCESS,
    ADD_DONASI_FAILURE,
    EDIT_DONASI,
    EDIT_DONASI_SUCCESS,
    EDIT_DONASI_FAILURE,
    DELETE_DONASI_SUCCESS,
    DELETE_DONASI_FAILURE
        } from '../actionTypes';
import axios from 'axios';
import { fetchToken, fetchRefreshToken } from "../token/action";
import history from "../../history";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const URL = `${process.env.REACT_APP_BASE_URL}/program-donasi/list`;
const EditURL = `${process.env.REACT_APP_BASE_URL}/program-donasi/`;
const AddURL = `${process.env.REACT_APP_BASE_URL}/program-donasi/create`;

export function fetchDonasi(token) {
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
            dispatch(getDonasiSuccess(res.data.data));
            console.log(res.data.data)
        })
        .catch(err => {
            console.log(err)
            if(err.response.status === 401){
                toast.error("Unauthorized")
                dispatch(fetchRefreshToken(token))
                localStorage.removeItem("token");
                history.push('/login')
            }
            dispatch(getDonasiFailure(err));
        });
    };
};

export function fetchEditDonasi(token, id, titles, sub, tag, startDate, endDate, target, newThumb, desc, newContent) {
    return (dispatch) => {
        dispatch(editDonasi())
        axios(EditURL+`${id}`, {
            method: 'PUT',
            data: {
                title: titles,
                sub_title: sub,
                tag: tag,
                // donasi_type: donasiType,
                valid_from: startDate,
                valid_to: endDate,
                target: parseInt(target),
                description: desc,
                thumbnail_image_url: newThumb,
                content: newContent
            },
            headers: {
                "pp-token": `${token}`,
                "Content-type": "application/json"
            }
        })
        .then(res => { 
            setTimeout(() => {
                toast.success("Edit Success !");
                dispatch(editDonasiSuccess(res));
                history.push("/donasi-onetime");
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
            dispatch(editDonasiFailure(err));
        });
    };
};

export function fetchAddDonasi(token, titles, sub, tag, startDate, endDate, target, newThumb, desc, content) {
    return (dispatch) => {
        dispatch(addDonasi())
        axios(AddURL, {
            method: 'POST',
            data: {
                title: titles,
                sub_title: sub,
                tag: tag,
                // donasi_type: donasiType,
                valid_from: startDate,
                valid_to: endDate,
                target: parseInt(target),
                description: desc,
                thumbnail_image_url: newThumb,
                content: content
            },
            headers: {
                "pp-token": `${token}`,
                "Content-type": "application/json"
            }
        })
        .then(res => {
            setTimeout(() => {
                toast.success("Add Success !");
                dispatch(addDonasiSuccess(res));
                history.push("/donasi-onetime");
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
            dispatch(addDonasiFailure(err));
        });
    };
};

export function fetchDeleteDonasi(token, id) {
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
                dispatch(deleteDonasiSuccess(res));
                history.push("/donasi-onetime");
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
            dispatch(deleteDonasiFailure(err));
        });
    };
};

// Get Donasi
const getDonasiSuccess = (payload) => ({
    type: GET_DONASI_SUCCESS,
    payload
});

const getDonasiFailure = () => ({
    type: GET_DONASI_FAILURE
});

const getDonasi = () => ({
    type: GET_DONASI
});

// Edit Donasi
const editDonasi = () => ({
    type: EDIT_DONASI
});

const editDonasiSuccess = (payload) => ({
    type: EDIT_DONASI_SUCCESS,
    payload
});

const editDonasiFailure = () => ({
    type: EDIT_DONASI_FAILURE
});

// Add Donasi
const addDonasi = () => ({
    type: ADD_DONASI
});

const addDonasiSuccess = (payload) => ({
    type: ADD_DONASI_SUCCESS,
    payload
});

const addDonasiFailure = () => ({
    type: ADD_DONASI_FAILURE
});

// Delete Donasi
const deleteDonasiSuccess = (payload) => ({
    type: DELETE_DONASI_SUCCESS,
    payload
});

const deleteDonasiFailure = () => ({
    type: DELETE_DONASI_FAILURE
});