import { 
    GET_BERITA,
    GET_BERITA_SUCCESS,
    GET_BERITA_FAILURE,
    GET_DETAIL_BERITA,
    GET_DETAIL_BERITA_SUCCESS,
    GET_DETAIL_BERITA_FAILURE,
    ADD_BERITA,
    ADD_BERITA_SUCCESS,
    ADD_BERITA_FAILURE,
    EDIT_BERITA,
    EDIT_BERITA_SUCCESS,
    EDIT_BERITA_FAILURE,
    DELETE_BERITA_SUCCESS,
    DELETE_BERITA_FAILURE
        } from '../actionTypes';
import axios from 'axios';
import { fetchToken, fetchRefreshToken } from "../token/action";
import history from "../../history";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const URL = `${process.env.REACT_APP_BASE_URL}/berita/list`;
const EditURL = `${process.env.REACT_APP_BASE_URL}/berita/`;
const AddURL = `${process.env.REACT_APP_BASE_URL}/berita/create`;
const DetailUrl = `${process.env.REACT_APP_BASE_URL}/berita/`;

export function fetchBerita(token) {
    return (dispatch) => {
        axios(URL, {
            method: 'POST',
            data: {
                limit: "200",
                offset: "1",
                filters: [
                    {
                        field: "is_headline",
                        keyword: "true"
                    },
                    {
                        field: "is_deleted",
                        keyword: "false"
                    },
                ],
                order: "created_at",
                sort: "desc",
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
            console.log(res)
            dispatch(getBeritaSuccess(res.data.data));
        })
        .catch(err => {
            if(err.response.status === 401){
                toast.error("Harap Login Terlebih Dahulu")
                dispatch(fetchRefreshToken(token))
                localStorage.removeItem("token");
                history.push('/login')
            }
            dispatch(getBeritaFailure(err));
        });
    };
};

export function fetchDetailBerita(token, id) {
    return (dispatch) => {
        dispatch(getDetailBerita())
        axios(DetailUrl+`${id}`, {
            method: 'GET',
            headers: {
                "pp-token": `${token}`,
                "Content-type": "application/json"
            }
        })
        .then(res => { 
            dispatch(getDetailBeritaSuccess(res.data.data));
        })
        .catch(err => {
            if(err.response.status === 401){
                toast.error("Harap Login Terlebih Dahulu")
                dispatch(fetchRefreshToken(token))
                localStorage.removeItem("token");
                history.push('/login')
            }
        });
    };
};

export function fetchEditBerita(token, id, titles, sub, tag, is_headline, newContent, newThumb, desc) {
    return (dispatch) => {
        dispatch(editBerita())
        axios(EditURL+`${id}`, {
            method: 'PUT',
            data: {
                title: titles,
                sub_title: sub,
                tag: tag,
                is_headline: is_headline === "true" ? true : false,
                content: newContent,
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
                dispatch(editBeritaSuccess(res));
                history.push("/berita");
            }, 2000);
        })
        .catch(err => {
            if(err.response.status === 401){
                toast.error("Harap Login Terlebih Dahulu")
                dispatch(fetchRefreshToken(token))
                localStorage.removeItem("token");
                history.push('/login')
            } else if(err.response.status === 422){ 
                toast.error("Headline yang ditampilkan maksimal 3")
            }
            dispatch(editBeritaFailure(err));
        });
    };
};

export function fetchAddBerita(token, titles, sub, tag, is_headline, content, newThumb, desc) {
    return (dispatch) => {
        // console.log(titles)
        // console.log(sub)
        // console.log(tag)
        // console.log(is_headline)
        // console.log(typeof is_headline)
        // console.log(content)
        // console.log(newThumb)
        // console.log(desc)
        // dispatch(addBerita())
        axios(AddURL, {
            method: 'POST',
            data: {
                title: titles,
                sub_title: sub,
                tag: tag,
                is_headline: is_headline === "true" ? true : false,
                description: desc,
                content: content,
                thumbnail_image_url: newThumb
            },
            headers: {
                "pp-token": `${token}`,
                "Content-type": "application/json"
            }
        })
        .then(res => {
            setTimeout(() => {
                history.push("/berita");
                toast.success("Add Success !");
                dispatch(addBeritaSuccess(res));
            }, 2000);
        })
        .catch(err => {
            if(err.response.status === 401){
                toast.error("Harap Login Terlebih Dahulu")
                dispatch(fetchRefreshToken(token))
                localStorage.removeItem("token");
                history.push('/login')
            } else if(err.response.status === 422){ 
                toast.error("Headline yang ditampilkan maksimal 3")
            }
            dispatch(addBeritaFailure(err));
        });
    };
};

export function fetchDeleteBerita(token, id) {
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
                dispatch(deleteBeritaSuccess(res));
                history.push("/berita");
                window.location.reload();
            }, 2000);
        })
        .catch(err => {
            if(err.response.status === 401){
                toast.error("Harap Login Terlebih Dahulu")
                dispatch(fetchRefreshToken(token))
                localStorage.removeItem("token");
                history.push('/login')
            }
            dispatch(deleteBeritaFailure(err));
        });
    };
};

// Get Berita
const getBeritaSuccess = (payload) => ({
    type: GET_BERITA_SUCCESS,
    payload
});

const getBeritaFailure = () => ({
    type: GET_BERITA_FAILURE
});

const getBerita = () => ({
    type: GET_BERITA
});

// Edit Berita
const editBerita = () => ({
    type: EDIT_BERITA
});

const editBeritaSuccess = (payload) => ({
    type: EDIT_BERITA_SUCCESS,
    payload
});

const editBeritaFailure = () => ({
    type: EDIT_BERITA_FAILURE
});

// Get Berita
const getDetailBeritaSuccess = (payload) => ({
    type: GET_DETAIL_BERITA_SUCCESS,
    payload
});

const getDetailBeritaFailure = () => ({
    type: GET_DETAIL_BERITA_FAILURE
});

const getDetailBerita = () => ({
    type: GET_DETAIL_BERITA
});

// Add Berita
const addBerita = () => ({
    type: ADD_BERITA
});

const addBeritaSuccess = (payload) => ({
    type: ADD_BERITA_SUCCESS,
    payload
});

const addBeritaFailure = () => ({
    type: ADD_BERITA_FAILURE
});

// Delete Berita
const deleteBeritaSuccess = (payload) => ({
    type: DELETE_BERITA_SUCCESS,
    payload
});

const deleteBeritaFailure = () => ({
    type: DELETE_BERITA_FAILURE
});