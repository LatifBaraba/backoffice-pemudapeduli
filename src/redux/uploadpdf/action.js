import { 
    GET_UPLOADPDF,
    GET_UPLOADPDF_SUCCESS,
    GET_UPLOADPDF_FAILURE,
    ADD_UPLOADPDF,
    ADD_UPLOADPDF_SUCCESS,
    ADD_UPLOADPDF_FAILURE,
    EDIT_UPLOADPDF,
    EDIT_UPLOADPDF_SUCCESS,
    EDIT_UPLOADPDF_FAILURE,
    DELETE_UPLOADPDF_SUCCESS,
    DELETE_UPLOADPDF_FAILURE
        } from '../actionTypes';
import axios from 'axios';
import { fetchToken, fetchRefreshToken } from "../token/action";
import history from "../../history";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const URL = `${process.env.REACT_APP_BASE_URL}/program-kami/list`;
const EditURL = `${process.env.REACT_APP_BASE_URL}/program-kami/`;
const AddURL = `${process.env.REACT_APP_BASE_URL}/program-kami/create`;
// const URL_TAG = `${process.env.REACT_APP_BASE_URL}/berita/list-tag`;


export function fetchUploadPdf(token) {
    return (dispatch) => {
        axios(URL, {
            method: 'POST',
            data: {
                limit: "10",
                offset: "1",
                filters: [
                    {
                        field: "document",
                        keyword: ""
                    },
                    {
                        field: "is_deleted",
                        keyword: "false"
                    }
                ],
                order: "created_at",
                sort: "DESC",
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
            dispatch(getUploadpdfSuccess(res.data.data));
            console.log(res.data.data)
        })
        .catch(err => {
            if(err.response.status === 401){
                toast.error("Harap Login Terlebih Dahulu")
                dispatch(fetchRefreshToken(token))
                localStorage.removeItem("token");
                history.push('/login')
            }
            dispatch(getUploadpdfFailure(err));
        });
    };
};

export function fetchEditUploadPdf(token, id, title, link) {
    return (dispatch) => {
        dispatch(editUploadpdf())
        axios(EditURL+`${id}`, {
            method: 'PUT',
            data: {
                title: " ",
                sub_title: " ",
                tag: "",
                content: " ",
                description: "",
                achievements: [{
                    "label": "",
                    "value": ""
                }],
                document: [{
                    title: title,
                    link_url: link
                }],
                thumbnail_image_url: "",
                beneficaries_image_url: [
                    ""
                ]

            },
            headers: {
                "pp-token": `${token}`,
                "Content-type": "application/json"
            }
        })
        .then(res => { 
            setTimeout(() => {
                toast.success("Edit Success !");
                dispatch(editUploadpdfSuccess(res));
                history.push("/upload");
            }, 2000);
        })
        .catch(err => {
            if(err.response.status === 401){
                toast.error("Harap Login Terlebih Dahulu")
                dispatch(fetchRefreshToken(token))
                localStorage.removeItem("token");
                history.push('/login')
            }
            dispatch(editUploadpdfFailure(err));
        });
    };
};

export function fetchAddUploadPdf(token, title, link) {
    return (dispatch) => {
        dispatch(addUploadpdf())        
        axios(AddURL, {
            method: 'POST',
            data: {
                title: " ",
                sub_title: " ",
                tag: "",
                content: " ",
                description: "",
                achievements: [{
                    "label": "",
                    "value": ""
                }],
                document: [{
                    title: title,
                    link_url: link
                }],
                thumbnail_image_url: "",
                beneficaries_image_url: [
                    ""
                ]

            },
            headers: {
                "pp-token": `${token}`,
                "Content-type": "application/json"
            }
        })
        .then(res => {
            setTimeout(() => {
                toast.success("Add Success !");
                dispatch(addUploadpdfSuccess(res));
                history.push("/upload");
            }, 2000);
        })
        .catch(err => {
            if(err.response.status === 401){
                toast.error("Harap Login Terlebih Dahulu")
                dispatch(fetchRefreshToken(token))
                localStorage.removeItem("token");
                history.push('/login')
            } else if(err.response.status === 400){
                toast.error("Link Button Left / Link Button RIght tidak Sesuai Format URL, Kosongkan jika tidak perlu")
            }
            dispatch(addUploadpdfFailure(err));
        });
    };
};

export function fetchDeleteUploadPdf(token, id) {
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
                dispatch(deleteUploadpdfSuccess(res));
                history.push("/upload");
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
            dispatch(deleteUploadpdfFailure(err));
        });
    };
};


// Get Upload PDF
const getUploadpdfSuccess = (payload) => ({
    type: GET_UPLOADPDF_SUCCESS,
    payload
});

const getUploadpdfFailure = () => ({
    type: GET_UPLOADPDF_FAILURE
});

const getUploadpdf = () => ({
    type: GET_UPLOADPDF
});

// Edit Uploadpdf
const editUploadpdf = () => ({
    type: EDIT_UPLOADPDF
});

const editUploadpdfSuccess = (payload) => ({
    type: EDIT_UPLOADPDF_SUCCESS,
    payload
});

const editUploadpdfFailure = () => ({
    type: EDIT_UPLOADPDF_FAILURE
});

// Add Uploadpdf
const addUploadpdf = () => ({
    type: ADD_UPLOADPDF
});

const addUploadpdfSuccess = (payload) => ({
    type: ADD_UPLOADPDF_SUCCESS,
    payload
});

const addUploadpdfFailure = () => ({
    type: ADD_UPLOADPDF_FAILURE
});

// Delete Uploadpdf
const deleteUploadpdfSuccess = (payload) => ({
    type: DELETE_UPLOADPDF_SUCCESS,
    payload
});

const deleteUploadpdfFailure = () => ({
    type: DELETE_UPLOADPDF_FAILURE
});