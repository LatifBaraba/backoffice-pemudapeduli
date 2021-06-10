import { GET_TESTIMONI, 
        GET_TESTIMONI_SUCCESS, 
        GET_TESTIMONI_FAILURE,
        EDIT_TESTIMONI,
        EDIT_TESTIMONI_SUCCESS, 
        EDIT_TESTIMONI_FAILURE,
        ADD_TESTIMONI,
        ADD_TESTIMONI_SUCCESS,
        ADD_TESTIMONI_FAILURE,
        DELETE_TESTIMONI_FAILURE,
        DELETE_TESTIMONI_SUCCESS
        } from '../actionTypes';
import axios from 'axios';
import { fetchToken, fetchRefreshToken } from "../token/action";
import history from "../../history";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const URL = `${process.env.REACT_APP_BASE_URL}/testimoni/list`;
const EditURL = `${process.env.REACT_APP_BASE_URL}/testimoni/`;
const AddURL = `${process.env.REACT_APP_BASE_URL}/testimoni/create`;

export function fetchTestimoni(token) {
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
            dispatch(getTestimoniSuccess(res.data.data));
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
            dispatch(getTestimoniFailure(err));
        });
    };
};

export function fetchEditTestimoni(token, id, name, role, messages) {
    return (dispatch) => {
        dispatch(editTestimoni())
        axios(EditURL+`${id}`, {
            method: 'PUT',
            data: {
                name: name,
                role: role,
                message: messages
            },
            headers: {
                "pp-token": `${token}`,
                "Content-type": "application/json"
            }
        })
        .then(res => {
            setTimeout(() => {
                toast.success("Add Success !");
                dispatch(editTestimoniSuccess(res));
                history.push("/testimoni");
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
            dispatch(editTestimoniFailure(err));
        });
    };
};

export function fetchAddTestimoni(token, name, role, messages) {
    return (dispatch) => {
        dispatch(addTestimoni())
        axios(AddURL, {
            method: 'POST',
            data: {
                name: name,
                role: role,
                message: messages
            },
            headers: {
                "pp-token": `${token}`,
                "Content-type": "application/json"
            }
        })
        .then(res => {
            setTimeout(() => {
                toast.success("Add Success !");
                dispatch(addTestimoniSuccess(res));
                history.push("/testimoni");
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
            dispatch(addTestimoniFailure(err));
        });
    };
};

export function fetchDeleteTestimoni(token, id) {
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
                dispatch(deleteTestimoniSuccess(res));
                history.push("/testimoni");
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
            dispatch(deleteTestimoniFailure(err));
        });
    };
};

// Get Testimoni
const getTestimoniSuccess = (payload) => ({
    type: GET_TESTIMONI_SUCCESS,
    payload
});

const getTestimoniFailure = () => ({
    type: GET_TESTIMONI_FAILURE
});

const getTestimoni = () => ({
    type: GET_TESTIMONI
});

// Edit Testimoni
const editTestimoni = () => ({
    type: EDIT_TESTIMONI,
});

const editTestimoniSuccess = (payload) => ({
    type: EDIT_TESTIMONI_SUCCESS,
    payload
});

const editTestimoniFailure = () => ({
    type: EDIT_TESTIMONI_FAILURE
});

// Add Testimoni
const addTestimoni = () => ({
    type: ADD_TESTIMONI
});

const addTestimoniSuccess = (payload) => ({
    type: ADD_TESTIMONI_SUCCESS,
    payload
});

const addTestimoniFailure = () => ({
    type: ADD_TESTIMONI_FAILURE
});

// Delete Testimoni
const deleteTestimoniSuccess = (payload) => ({
    type: DELETE_TESTIMONI_SUCCESS,
    payload
});

const deleteTestimoniFailure = () => ({
    type: DELETE_TESTIMONI_FAILURE
});