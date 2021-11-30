import { GET_ACHIEVEMENT,
    GET_ACHIEVEMENT_SUCCESS,
    GET_ACHIEVEMENT_FAILURE,
    GET_DETAIL_ACHIEVEMENT,
    GET_DETAIL_ACHIEVEMENT_SUCCESS,
    GET_DETAIL_ACHIEVEMENT_FAILURE,
    ADD_ACHIEVEMENT,
    ADD_ACHIEVEMENT_SUCCESS,
    ADD_ACHIEVEMENT_FAILURE,
    EDIT_ACHIEVEMENT,
    EDIT_ACHIEVEMENT_SUCCESS,
    EDIT_ACHIEVEMENT_FAILURE,
    DELETE_ACHIEVEMENT_SUCCESS,
    DELETE_ACHIEVEMENT_FAILURE
        } from '../actionTypes';

import axios from 'axios';
import { fetchToken, fetchRefreshToken } from "../token/action";
import history from "../../history";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const URL = `${process.env.REACT_APP_BASE_URL}/achievement/list`;
const EditURL = `${process.env.REACT_APP_BASE_URL}/achievement/`;
const AddURL = `${process.env.REACT_APP_BASE_URL}/achievement/create`;
const DetailUrl = `${process.env.REACT_APP_BASE_URL}/achievement/`;

export function fetchAchievement(token) {
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
            dispatch(getAchievementSuccess(res.data.data));
        })
        .catch(err => {
            if(err.response.status === 401){
                toast.error("Harap Login Terlebih Dahulu")
                dispatch(fetchRefreshToken(token))
                localStorage.removeItem("token");
                history.push('/login')
            }
            dispatch(getAchievementFailure(err));
        });
    };
};

export function fetchDetailAchievement(token, id) {
    return (dispatch) => {
        dispatch(getDetailAchievement())
        axios(DetailUrl+`${id}`, {
            method: 'GET',
            headers: {
                "pp-token": `${token}`,
                "Content-type": "application/json"
            }
        })
        .then(res => { 
            dispatch(GetDetailAchievementSuccess(res.data.data));
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

export function fetchAddAchievement(token, name, total, desc) {
    return (dispatch) => {
        dispatch(addAchievement())
        axios(AddURL, {
            method: 'POST',
            data: {
                achievement_name: name,
                achievement_total: parseInt(total),
                description: desc
            },
            headers: {
                "pp-token": `${token}`,
                "Content-type": "application/json"
            }
        })
        .then(res => {
            setTimeout(() => {
                toast.success("Add Success !");
                dispatch(addAchievementSuccess(res));
                history.push("/achievement");
            }, 2000);
        })
        .catch(err => {
            if(err.response.status === 401){
                toast.error("Harap Login Terlebih Dahulu")
                dispatch(fetchRefreshToken(token))
                localStorage.removeItem("token");
                history.push('/login')
            }
            dispatch(addAchievementFailure(err));
        });
    };
};

export function fetchEditAchievement(token, id, name, total, desc) {
    return (dispatch) => {
        dispatch(editAchievement())
        axios(EditURL+`${id}`, {
            method: 'PUT',
            data: {
                achievement_name: name,
                achievement_total: parseInt(total),
                description: desc
            },
            headers: {
                "pp-token": `${token}`,
                "Content-type": "application/json"
            }
        })
        .then(res => { 
            setTimeout(() => {
                toast.success("Edit Success !");
                dispatch(editAchievementSuccess(res));
                history.push("/achievement");
            }, 2000);
        })
        .catch(err => {
            if(err.response.status === 401){
                toast.error("Harap Login Terlebih Dahulu")
                dispatch(fetchRefreshToken(token))
                localStorage.removeItem("token");
                history.push('/login')
            }
            dispatch(editAchievementFailure(err));
        });
    };
};

export function fetchDeleteAchievement(token, id) {
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
                dispatch(deleteAchievementSuccess(res));
                history.push("/achievement");
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
            dispatch(deleteAchievementFailure(err));
        });
    };
};

// Get Achievement
const getAchievementSuccess = (payload) => ({
    type: GET_ACHIEVEMENT_SUCCESS,
    payload
});

const getAchievementFailure = () => ({
    type: GET_ACHIEVEMENT_FAILURE
});

// Get Achievement
const GetDetailAchievementSuccess = (payload) => ({
    type: GET_DETAIL_ACHIEVEMENT_SUCCESS,
    payload
});

const getDetailAchievementFailure = () => ({
    type: GET_DETAIL_ACHIEVEMENT_FAILURE
});

const getDetailAchievement = () => ({
    type: GET_DETAIL_ACHIEVEMENT
});

// Edit Achievement
const editAchievement = () => ({
    type: EDIT_ACHIEVEMENT
});

const editAchievementSuccess = (payload) => ({
    type: EDIT_ACHIEVEMENT_SUCCESS,
    payload
});

const editAchievementFailure = () => ({
    type: EDIT_ACHIEVEMENT_FAILURE
});

// Add Achievement
const addAchievement = () => ({
    type: ADD_ACHIEVEMENT
});

const addAchievementSuccess = (payload) => ({
    type: ADD_ACHIEVEMENT_SUCCESS,
    payload
});

const addAchievementFailure = () => ({
    type: ADD_ACHIEVEMENT_FAILURE
});

// Delete Achievement
const deleteAchievementSuccess = (payload) => ({
    type: DELETE_ACHIEVEMENT_SUCCESS,
    payload
});

const deleteAchievementFailure = () => ({
    type: DELETE_ACHIEVEMENT_FAILURE
});