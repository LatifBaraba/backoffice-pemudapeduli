import { GET_DONASI_RUTIN,
    GET_DONASI_RUTIN_SUCCESS,
    GET_DONASI_RUTIN_FAILURE,
    ADD_DONASI_RUTIN,
    ADD_DONASI_RUTIN_SUCCESS,
    ADD_DONASI_RUTIN_FAILURE,
    EDIT_DONASI_RUTIN,
    EDIT_DONASI_RUTIN_SUCCESS,
    EDIT_DONASI_RUTIN_FAILURE,
    DELETE_DONASI_RUTIN_SUCCESS,
    DELETE_DONASI_RUTIN_FAILURE
        } from '../actionTypes';
import axios from 'axios';
import { fetchToken, fetchRefreshToken } from "../token/action";
import history from "../../history";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const URL = `${process.env.REACT_APP_BASE_URL}/program-donasi/list`;
const EditURL = `${process.env.REACT_APP_BASE_URL}/program-donasi/`;
const AddURL = `${process.env.REACT_APP_BASE_URL}/program-donasi/create`;

export function fetchPaket(token, kat) {
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
                    },
                    {
                        field: "id",
                        keyword: `${kat}`
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
            dispatch(getPaketSuccess(res.data.data));
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
            dispatch(getPaketFailure(err));
        });
    };
};

export function fetchEditPaket(token, id, titles, sub, tag, startDate, endDate, target, newThumb, desc, newContent) {
    return (dispatch) => {
        dispatch(editPaket())
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
                dispatch(editPaketSuccess(res));
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
            dispatch(editPaketFailure(err));
        });
    };
};

export function fetchAddPaket(token, titles, sub, tag, startDate, endDate, target, newThumb, desc, content) {
    return (dispatch) => {
        dispatch(addPaket())
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
                dispatch(addPaketSuccess(res));
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
            dispatch(addPaketFailure(err));
        });
    };
};

export function fetchDeletePaket(token, id) {
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
                dispatch(deletePaketSuccess(res));
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
            dispatch(deletePaketFailure(err));
        });
    };
};

// Get Paket
const getPaketSuccess = (payload) => ({
    type: GET_DONASI_RUTIN_SUCCESS,
    payload
});

const getPaketFailure = () => ({
    type: GET_DONASI_RUTIN_FAILURE
});

const getPaket = () => ({
    type: GET_DONASI_RUTIN
});

// Edit Paket
const editPaket = () => ({
    type: EDIT_DONASI_RUTIN
});

const editPaketSuccess = (payload) => ({
    type: EDIT_DONASI_RUTIN_SUCCESS,
    payload
});

const editPaketFailure = () => ({
    type: EDIT_DONASI_RUTIN_FAILURE
});

// Add Paket
const addPaket = () => ({
    type: ADD_DONASI_RUTIN
});

const addPaketSuccess = (payload) => ({
    type: ADD_DONASI_RUTIN_SUCCESS,
    payload
});

const addPaketFailure = () => ({
    type: ADD_DONASI_RUTIN_FAILURE
});

// Delete Paket
const deletePaketSuccess = (payload) => ({
    type: DELETE_DONASI_RUTIN_SUCCESS,
    payload
});

const deletePaketFailure = () => ({
    type: DELETE_DONASI_RUTIN_FAILURE
});