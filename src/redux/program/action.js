import { GET_PROGRAM,
    GET_PROGRAM_SUCCESS,
    GET_PROGRAM_FAILURE,
    GET_DETAIL_PROGRAM,
    GET_DETAIL_PROGRAM_SUCCESS,
    GET_DETAIL_PROGRAM_FAILURE,
    GET_DETAIL_PROGRAM_CONTENT,
    ADD_PROGRAM,
    ADD_PROGRAM_SUCCESS,
    ADD_PROGRAM_FAILURE,
    EDIT_PROGRAM,
    EDIT_PROGRAM_SUCCESS,
    EDIT_PROGRAM_FAILURE,
    DELETE_PROGRAM_SUCCESS,
    DELETE_PROGRAM_FAILURE
        } from '../actionTypes';
import axios from 'axios';
import { fetchToken, fetchRefreshToken } from "../token/action";
import history from "../../history";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const URL = `${process.env.REACT_APP_BASE_URL}/program-kami/list`;
const EditURL = `${process.env.REACT_APP_BASE_URL}/program-kami/`;
const AddURL = `${process.env.REACT_APP_BASE_URL}/program-kami/create`;
const DetailUrl = `${process.env.REACT_APP_BASE_URL}/program-kami/`;

export function fetchProgram(token) {
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
            dispatch(getProgramSuccess(res.data.data));
        })
        .catch(err => {
            if(err.response.status === 401){
                toast.error("Unauthorized")
                dispatch(fetchRefreshToken(token))
                localStorage.removeItem("token");
                history.push('/login')
            }
            dispatch(getProgramFailure(err));
        });
    };
};

export function fetchDetailProgram(token, id) {
    return (dispatch) => {
        dispatch(getDetailProgram())
        axios(DetailUrl+`${id}`, {
            method: 'GET',
            headers: {
                "pp-token": `${token}`,
                "Content-type": "application/json"
            }
        })
        .then(res => { 
            dispatch(getDetailProgramSuccess(res.data.data));
            dispatch(getDetailProgramContent(res.data.data.detail));
        })
        .catch(err => {
            if(err.response.status === 401){
                toast.error("Unauthorized")
                dispatch(fetchRefreshToken(token))
                localStorage.removeItem("token");
                history.push('/login')
            }
        });
    };
};

export function fetchEditProgram(token, id, titles, sub, tag, content, newThumb, desc) {
    return (dispatch) => {
        dispatch(editProgram())
        axios(EditURL+`${id}`, {
            method: 'PUT',
            data: {
                title: titles,
                sub_title: sub,
                tag: tag,
                content: content,
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
                dispatch(editProgramSuccess(res));
                history.push("/program");
            }, 2000);
        })
        .catch(err => {
            if(err.response.status === 401){
                toast.error("Unauthorized")
                dispatch(fetchRefreshToken(token))
                localStorage.removeItem("token");
                history.push('/login')
            }
            dispatch(editProgramFailure(err));
        });
    };
};

export function fetchAddProgram(token, titles, sub, tag, content, newThumb, desc) {
    return (dispatch) => {
        dispatch(addProgram())
        axios(AddURL, {
            method: 'POST',
            data: {
                title: titles,
                sub_title: sub,
                tag: tag,
                content: content,
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
                dispatch(addProgramSuccess(res));
                history.push("/program");
            }, 2000);
        })
        .catch(err => {
            if(err.response.status === 401){
                toast.error("Unauthorized")
                dispatch(fetchRefreshToken(token))
                localStorage.removeItem("token");
                history.push('/login')
            }
            dispatch(addProgramFailure(err));
        });
    };
};

export function fetchDeleteProgram(token, id) {
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
                dispatch(deleteProgramSuccess(res));
                history.push("/program");
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
            dispatch(deleteProgramFailure(err));
        });
    };
};

// Get Program
const getProgramSuccess = (payload) => ({
    type: GET_PROGRAM_SUCCESS,
    payload
});

const getProgramFailure = () => ({
    type: GET_PROGRAM_FAILURE
});

const getProgram = () => ({
    type: GET_PROGRAM
});

// Get Program
const getDetailProgramSuccess = (payload) => ({
    type: GET_DETAIL_PROGRAM_SUCCESS,
    payload
});

const getDetailProgramFailure = () => ({
    type: GET_DETAIL_PROGRAM_FAILURE
});

const getDetailProgramContent = (payload) => ({
    type: GET_DETAIL_PROGRAM_CONTENT,
    payload
});

const getDetailProgram = () => ({
    type: GET_DETAIL_PROGRAM
});

// Edit Program
const editProgram = () => ({
    type: EDIT_PROGRAM
});

const editProgramSuccess = (payload) => ({
    type: EDIT_PROGRAM_SUCCESS,
    payload
});

const editProgramFailure = () => ({
    type: EDIT_PROGRAM_FAILURE
});

// Add Program
const addProgram = () => ({
    type: ADD_PROGRAM
});

const addProgramSuccess = (payload) => ({
    type: ADD_PROGRAM_SUCCESS,
    payload
});

const addProgramFailure = () => ({
    type: ADD_PROGRAM_FAILURE
});

// Delete Program
const deleteProgramSuccess = (payload) => ({
    type: DELETE_PROGRAM_SUCCESS,
    payload
});

const deleteProgramFailure = () => ({
    type: DELETE_PROGRAM_FAILURE
});