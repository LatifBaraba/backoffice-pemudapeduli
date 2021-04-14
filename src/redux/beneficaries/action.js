import { GET_BENEFICARIES,
    GET_BENEFICARIES_SUCCESS,
    GET_BENEFICARIES_FAILURE,
    ADD_BENEFICARIES,
    ADD_BENEFICARIES_SUCCESS,
    ADD_BENEFICARIES_FAILURE,
    EDIT_BENEFICARIES,
    EDIT_BENEFICARIES_SUCCESS,
    EDIT_BENEFICARIES_FAILURE,
    DELETE_BENEFICARIES_SUCCESS,
    DELETE_BENEFICARIES_FAILURE
        } from '../actionTypes';
import axios from 'axios';
import { fetchRefreshToken } from "../token/action";
import history from "../../history";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const URL = `${process.env.REACT_APP_BASE_URL}/beneficaries/list`;
const EditURL = `${process.env.REACT_APP_BASE_URL}/beneficaries/`;
const AddURL = `${process.env.REACT_APP_BASE_URL}/beneficaries/create`;

export function fetchBeneficaries(token) {
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
            dispatch(getBeneficariesSuccess(res.data.data));
            console.log(res.data.data)
        })
        .catch(err => {
            if(err.response.status === 401){
                toast.error("Unauthorized")
                dispatch(fetchRefreshToken(token))
                localStorage.removeItem("token");
                history.push('/login')
            }
            dispatch(getBeneficariesFailure(err));
        });
    };
};

export function fetchEditBeneficaries(token, id, titles, sub, titContent, newThumb, desc) {
    return (dispatch) => {
        dispatch(editBeneficaries())
        axios(EditURL+`${id}`, {
            method: 'PUT',
            data: {
                title: titles,
                sub_title: sub,
                title_content: titContent,
                deeplink_right:"",
                deeplink_left:"",
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
                dispatch(editBeneficariesSuccess(res));
                history.push("/beneficaries");
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
            dispatch(editBeneficariesFailure(err));
        });
    };
};

export function fetchAddBeneficaries(token, titles, sub, titContent, newThumb, desc) {
    return (dispatch) => {
        dispatch(addBeneficaries())
        axios(AddURL, {
            method: 'POST',
            data: {
                title: titles,
                sub_title: sub,
                title_content: titContent,
                deeplink_right:"",
                deeplink_left:"",
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
                dispatch(addBeneficariesSuccess(res));
                history.push("/beneficaries");
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
            dispatch(addBeneficariesFailure(err));
        });
    };
};

export function fetchDeleteBeneficaries(token, id) {
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
                dispatch(deleteBeneficariesSuccess(res));
                history.push("/beneficaries");
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
            dispatch(deleteBeneficariesFailure(err));
        });
    };
};

// Get Beneficaries
const getBeneficariesSuccess = (payload) => ({
    type: GET_BENEFICARIES_SUCCESS,
    payload
});

const getBeneficariesFailure = () => ({
    type: GET_BENEFICARIES_FAILURE
});

const getBeneficaries = () => ({
    type: GET_BENEFICARIES
});

// Edit Beneficaries
const editBeneficaries = () => ({
    type: EDIT_BENEFICARIES
});

const editBeneficariesSuccess = (payload) => ({
    type: EDIT_BENEFICARIES_SUCCESS,
    payload
});

const editBeneficariesFailure = () => ({
    type: EDIT_BENEFICARIES_FAILURE
});

// Add Beneficaries
const addBeneficaries = () => ({
    type: ADD_BENEFICARIES
});

const addBeneficariesSuccess = (payload) => ({
    type: ADD_BENEFICARIES_SUCCESS,
    payload
});

const addBeneficariesFailure = () => ({
    type: ADD_BENEFICARIES_FAILURE
});

// Delete Beneficaries
const deleteBeneficariesSuccess = (payload) => ({
    type: DELETE_BENEFICARIES_SUCCESS,
    payload
});

const deleteBeneficariesFailure = () => ({
    type: DELETE_BENEFICARIES_FAILURE
});