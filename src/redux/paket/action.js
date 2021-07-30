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

const URL = `${process.env.REACT_APP_BASE_URL}/program-donasi-rutin/list`;
const EditURL = `${process.env.REACT_APP_BASE_URL}/program-donasi-rutin/`;
const AddURL = `${process.env.REACT_APP_BASE_URL}/program-donasi-rutin/create`;

export function fetchPaket(token) {
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

export function fetchAddPaket(token, titles, sub, tag, donasiType, benefit, newThumb, desc, content, id_pp_cp_master_qris, qris_image_url) {
    return (dispatch) => {
        dispatch(addPaket())
        axios(AddURL, {
            method: 'POST',
            data: {
                title: titles,
                sub_title: sub,
                id_kategori: donasiType,
                tag : tag,
                content: content,
                benefit: benefit,
                thumbnail_image_url: newThumb,
                description: desc,
                id_pp_cp_master_qris: id_pp_cp_master_qris,
                qris_image_url:qris_image_url
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
                history.push("/paket");
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

export function fetchEditPaket(id, token, titles, sub, tag, donasiType, benefit, newThumb, desc, newContent, show, id_pp_cp_master_qris, qris_image_url) {
    console.log(show, 'showwww')
    return (dispatch) => {
        dispatch(editPaket())
        axios(EditURL+`${id}`, {
            method: 'PUT',
            data: {
                title: titles,
                sub_title: sub,
                id_kategori: donasiType,
                tag : tag,
                content: newContent,
                benefit: benefit,
                thumbnail_image_url: newThumb,
                description: desc,
                is_show: show === "true" ? true : false,
                id_pp_cp_master_qris: id_pp_cp_master_qris,
                qris_image_url:qris_image_url
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
                history.push("/paket");
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
                history.push("/paket");
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