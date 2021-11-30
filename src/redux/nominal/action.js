import { 
    GET_NOMINAL,
    GET_NOMINAL_SUCCESS,
    GET_NOMINAL_FAILURE,
    ADD_NOMINAL,
    ADD_NOMINAL_SUCCESS,
    ADD_NOMINAL_FAILURE,
    DELETE_NOMINAL_SUCCESS,
    DELETE_NOMINAL_FAILURE
        } from '../actionTypes';

import axios from 'axios';
import { fetchToken, fetchRefreshToken } from "../token/action";
import history from "../../history";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const URL = `${process.env.REACT_APP_BASE_URL}/qris/list`;
const EditURL = `${process.env.REACT_APP_BASE_URL}/qris/`;
const AddURL = `${process.env.REACT_APP_BASE_URL}/qris/create`;

export function fetchNominal(token) {
    return (dispatch) => {
        // console.log('masuk redux')
        axios(URL, {
            method: 'POST',
            data: {
                limit: "100",
                offset: "0",
                filters: [
                    {
                        field: "status",
                        keyword: "created"
                    }
                ],
                order: "created_at",
                sort: "ASC",
                created_at_from: "",
                created_at_to: ""
                // publish_at_from: "",
                // publish_at_to: ""
            },
            headers: {
                "pp-token": `${token}`,
                "Content-type": "application/json"
            }
        })
        .then(res => {
            dispatch(getNominalSuccess(res.data.data));
        })
        .catch(err => {
            if(err.response.status == 401){
                toast.error("Harap Login Terlebih Dahulu")
                dispatch(fetchRefreshToken(token))
                localStorage.removeItem("token");
                history.push('/login')
            }
            dispatch(getNominalFailure(err));
        });
    };
};

export function fetchAddNominal(token, title, description, newIcon) {
    return (dispatch) => {        
        dispatch(addNominal())
        axios(AddURL, {
            method: 'POST',
            data: {
                title: title,
                description: description,
                thumbnail_image_url: newIcon
            },
            headers: {
                "pp-token": `${token}`,
                "Content-type": "application/json"
            }
        })
        .then(res => {
            setTimeout(() => {
                toast.success("Add Success !");
                dispatch(addNominalSuccess(res));
                history.push("/qris");
            }, 2000);
        })
        .catch(err => {
            if(err.response.status == 401){
                toast.error("Harap Login Terlebih Dahulu")
                dispatch(fetchRefreshToken(token))
                localStorage.removeItem("token");
                history.push('/login')
            }
            dispatch(addNominalFailure(err));
        });
    };
};

// export function fetchEditNominal(token, id, title, description, newIcon) {
//     return (dispatch) => {
//         dispatch(editNominal())
//         axios(EditURL+`${id}`, {
//             method: 'PUT',
//             data: {
//                 title: title,
//                 description: description,
//                 thumbnail_image_url: newIcon
//             },
//             headers: {
//                 "pp-token": `${token}`,
//                 "Content-type": "application/json"
//             }
//         })
//         .then(res => { 
//             setTimeout(() => {
//                 toast.success("Edit Success !");
//                 dispatch(editNominalSuccess(res));
//                 history.push("/qris");
//             }, 2000);
//         })
//         .catch(err => {
//             console.log(err)
//             if(err.response.status == 401){
//                 toast.error("Harap Login Terlebih Dahulu")
//                 dispatch(fetchRefreshToken(token))
//                 localStorage.removeItem("token");
//                 history.push('/login')
//             }
//             dispatch(editNominalFailure(err));
//         });
//     };
// };

export function fetchDeleteNominal(token, id) {
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
                dispatch(deleteNominalSuccess(res));
                history.push("/qris");
                window.location.reload();
            }, 2000);
        })
        .catch(err => {
            if(err.response.status == 401){
                toast.error("Harap Login Terlebih Dahulu")
                dispatch(fetchRefreshToken(token))
                localStorage.removeItem("token");
                history.push('/login')
            }
            dispatch(deleteNominalFailure(err));
        });
    };
};

// Get Nominal
const getNominalSuccess = (payload) => ({
    type: GET_NOMINAL_SUCCESS,
    payload
});

const getNominalFailure = () => ({
    type: GET_NOMINAL_FAILURE
});

// Add Nominal
const addNominal = () => ({
    type: ADD_NOMINAL
});

const addNominalSuccess = (payload) => ({
    type: ADD_NOMINAL_SUCCESS,
    payload
});

const addNominalFailure = () => ({
    type: ADD_NOMINAL_FAILURE
});

// Delete Nominal
const deleteNominalSuccess = (payload) => ({
    type: DELETE_NOMINAL_SUCCESS,
    payload
});

const deleteNominalFailure = () => ({
    type: DELETE_NOMINAL_FAILURE
});