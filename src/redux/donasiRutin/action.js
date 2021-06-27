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

const URL = `${process.env.REACT_APP_BASE_URL}/kategori/program-donasi-rutin/list`;
const EditURL = `${process.env.REACT_APP_BASE_URL}/kategori/program-donasi-rutin/`;
const AddURL = `${process.env.REACT_APP_BASE_URL}/kategori/program-donasi-rutin/create`;

export function fetchDonasiRutin(token) {
    return (dispatch) => {
        axios(URL, {
            method: 'POST',
            data: {
                limit: "100",
                offset: "0",
                filters: [
                ],
                order: "id",
                sort: "ASC",
                // created_at_from: "",
                // created_at_to: "",
                // publish_at_from: "",
                // publish_at_to: ""
            },
            headers: {
                "pp-token": `${token}`,
                "Content-type": "application/json"
            }
        })
        .then(res => {
            dispatch(getDonasiRutinSuccess(res.data.data));
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
            dispatch(getDonasiRutinFailure(err));
        });
    };
};

export function fetchEditDonasiRutin(token, id, kategori) {
    return (dispatch) => {
        dispatch(editDonasiRutin())
        axios(EditURL+`${id}`, {
            method: 'PUT',
            data: {
                kategori_name: kategori,
            },
            headers: {
                "pp-token": `${token}`,
                "Content-type": "application/json"
            }
        })
        .then(res => { 
            setTimeout(() => {
                toast.success("Edit Success !");
                dispatch(editDonasiRutinSuccess(res));
                history.push("/donasi-rutin");
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
            dispatch(editDonasiRutinFailure(err));
        });
    };
};

export function fetchAddDonasiRutin(token, kategori) {
    return (dispatch) => {
        dispatch(addDonasiRutin())
        axios(AddURL, {
            method: 'POST',
            data: {
                kategori_name: kategori,
            },
            headers: {
                "pp-token": `${token}`,
                "Content-type": "application/json"
            }
        })
        .then(res => {
            setTimeout(() => {
                toast.success("Add Success !");
                dispatch(addDonasiRutinSuccess(res));
                history.push("/donasi-rutin");
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
            dispatch(addDonasiRutinFailure(err));
        });
    };
};

export function fetchDeleteDonasiRutin(token, id) {
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
                dispatch(deleteDonasiRutinSuccess(res));
                history.push("/donasi-rutin");
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
            dispatch(deleteDonasiRutinFailure(err));
        });
    };
};

// Get DonasiRutin
const getDonasiRutinSuccess = (payload) => ({
    type: GET_DONASI_RUTIN_SUCCESS,
    payload
});

const getDonasiRutinFailure = () => ({
    type: GET_DONASI_RUTIN_FAILURE
});

const getDonasiRutin = () => ({
    type: GET_DONASI_RUTIN
});

// Edit DonasiRutin
const editDonasiRutin = () => ({
    type: EDIT_DONASI_RUTIN
});

const editDonasiRutinSuccess = (payload) => ({
    type: EDIT_DONASI_RUTIN_SUCCESS,
    payload
});

const editDonasiRutinFailure = () => ({
    type: EDIT_DONASI_RUTIN_FAILURE
});

// Add DonasiRutin
const addDonasiRutin = () => ({
    type: ADD_DONASI_RUTIN
});

const addDonasiRutinSuccess = (payload) => ({
    type: ADD_DONASI_RUTIN_SUCCESS,
    payload
});

const addDonasiRutinFailure = () => ({
    type: ADD_DONASI_RUTIN_FAILURE
});

// Delete DonasiRutin
const deleteDonasiRutinSuccess = (payload) => ({
    type: DELETE_DONASI_RUTIN_SUCCESS,
    payload
});

const deleteDonasiRutinFailure = () => ({
    type: DELETE_DONASI_RUTIN_FAILURE
});