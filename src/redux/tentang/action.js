import { GET_TENTANG,
    GET_TENTANG_SUCCESS,
    GET_TENTANG_FAILURE,
    ADD_TENTANG,
    ADD_TENTANG_SUCCESS,
    ADD_TENTANG_FAILURE,
    EDIT_TENTANG,
    EDIT_TENTANG_SUCCESS,
    EDIT_TENTANG_FAILURE,
    DELETE_TENTANG_SUCCESS,
    DELETE_TENTANG_FAILURE
        } from '../actionTypes';
import axios from 'axios';
import { fetchToken, fetchRefreshToken } from "../token/action";
import history from "../../history";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const URL = `${process.env.REACT_APP_BASE_URL}/tentang-kami/list`;
const EditURL = `${process.env.REACT_APP_BASE_URL}/tentang-kami/`;
const AddURL = `${process.env.REACT_APP_BASE_URL}/tentang-kami/create`;

export function fetchTentang(token) {
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
            dispatch(getTentangSuccess(res.data.data));
            console.log(res.data.data)
        })
        .catch(err => {
            console.log(err)
            if(err.response.status === 401){
                toast.danger("Unauthorized")
                dispatch(fetchRefreshToken(token))
                history.push('/login')
            }
            dispatch(getTentangFailure(err));
        });
    };
};

export function fetchEditTentang(token, id, newThumb, desc) {
    return (dispatch) => {
        axios(EditURL+`${id}`, {
            method: 'PUT',
            data: {
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
                dispatch(editTentangSuccess(res));
                history.push("/tentang-kami");
            }, 2000);
        })
        .catch(err => {
            console.log(err)
            if(err.response.status === 401){
                toast.danger("Unauthorized")
                dispatch(fetchRefreshToken(token))
                history.push('/login')
            }
            dispatch(editTentangFailure(err));
        });
    };
};

export function fetchAddTentang(token, newThumb, desc) {
    return (dispatch) => {
        axios(AddURL, {
            method: 'POST',
            data: {
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
                dispatch(addTentangSuccess(res));
                history.push("/tentang-kami");
            }, 2000);
        })
        .catch(err => {
            console.log(err)
            if(err.response.status === 401){
                toast.danger("Unauthorized")
                dispatch(fetchRefreshToken(token))
                history.push('/login')
            }
            dispatch(addTentangFailure(err));
        });
    };
};

export function fetchDeleteTentang(token, id) {
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
                dispatch(deleteTentangSuccess(res));
                history.push("/tentang-kami");
                window.location.reload();
            }, 2000);
        })
        .catch(err => {
            if(err.status == 401){
                toast.danger(err.message)
                dispatch(fetchRefreshToken(token))
                history.push('/login')
            }
            dispatch(deleteTentangFailure(err));
        });
    };
};

// Get Tentang
const getTentangSuccess = (payload) => ({
    type: GET_TENTANG_SUCCESS,
    payload
});

const getTentangFailure = () => ({
    type: GET_TENTANG_FAILURE
});

const getTentang = () => ({
    type: GET_TENTANG
});

// Edit Tentang
const editTentangSuccess = (payload) => ({
    type: EDIT_TENTANG_SUCCESS,
    payload
});

const editTentangFailure = () => ({
    type: EDIT_TENTANG_FAILURE
});

// Add Tentang
const addTentangSuccess = (payload) => ({
    type: ADD_TENTANG_SUCCESS,
    payload
});

const addTentangFailure = () => ({
    type: ADD_TENTANG_FAILURE
});

// Delete Tentang
const deleteTentangSuccess = (payload) => ({
    type: DELETE_TENTANG_SUCCESS,
    payload
});

const deleteTentangFailure = () => ({
    type: DELETE_TENTANG_FAILURE
});