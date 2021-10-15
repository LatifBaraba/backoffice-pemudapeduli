import { GET_PROGRAM,
    GET_PROGRAM_SUCCESS,
    GET_PROGRAM_FAILURE,
    GET_PROGRAM_INCIDENTAL_SUCCESS,
    GET_PROGRAM_INCIDENTAL_FAILURE,
    GET_DETAIL_PROGRAM,
    GET_DETAIL_PROGRAM_SUCCESS,
    GET_DETAIL_PROGRAM_FAILURE,
    GET_DETAIL_PROGRAM_CONTENT,
    ADD_PROGRAM,
    ADD_PROGRAM_SUCCESS,
    ADD_PROGRAM_FAILURE,
    ADD_PROGRAM_INCIDENTAL_SUCCESS,
    ADD_PROGRAM_INCIDENTAL_FAILURE,
    EDIT_PROGRAM,
    EDIT_PROGRAM_INCIDENTIAL_SUCCESS,
    EDIT_PROGRAM_INCIDENTIAL_FAILURE,
    EDIT_PROGRAM_SUCCESS,
    EDIT_PROGRAM_FAILURE,
    DELETE_PROGRAM_SUCCESS,
    DELETE_PROGRAM_FAILURE,
    DELETE_PROGRAM_INCIDENTAL_SUCCESS,
    DELETE_PROGRAM_INCIDENTAL_FAILURE
        } from '../actionTypes';
import axios from 'axios';
import { fetchToken, fetchRefreshToken } from "../token/action";
import history from "../../history";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const URL = `${process.env.REACT_APP_BASE_URL}/program-kami/list`;
const URL_INCD = `${process.env.REACT_APP_BASE_URL}/program-incidental/list`;
const EditURL = `${process.env.REACT_APP_BASE_URL}/program-kami/`;
const EditURL_INCD = `${process.env.REACT_APP_BASE_URL}/program-incidental/`;
const AddURL = `${process.env.REACT_APP_BASE_URL}/program-kami/create`;
const AddURL_INCD = `${process.env.REACT_APP_BASE_URL}/program-incidental/create`;
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
export function fetchProgramIncidental(token) {
    return (dispatch) => {
        axios(URL_INCD, {
            method: 'POST',
            data: {
                limit: "100",
                offset: "0",
                filters: [
                    {
                        field: "id",
                        keyword: ""
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
                dispatch(getProgramIncidentalSuccess(res.data.data));
                console.log(res.data.data)
            })
            .catch(err => {
                console.log(err)
                if (err.response.status === 401) {
                    toast.error("Unauthorized")
                    dispatch(fetchRefreshToken(token))
                    localStorage.removeItem("token");
                    history.push('/login')
                }
                dispatch(getProgramIncidentalFailure(err));
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

export function fetchEditProgram(token, id, titles, sub, tag, content, newThumb, desc, achievment) {
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
                achievments: achievment,
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
                history.push("/program-utama");
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
export function fetchEditIncidential(token, id, titles, sub, tag, content, newThumb, desc) {
    return (dispatch) => {
        dispatch(editProgram())
        axios(EditURL_INCD + `${id}`, {
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
                    dispatch(editProgramIncidentialSuccess(res));
                    history.push("/program-incidental");
                }, 2000);
            })
            .catch(err => {
                console.log(err)
                if (err.response.status === 401) {
                    toast.error("Unauthorized")
                    dispatch(fetchRefreshToken(token))
                    localStorage.removeItem("token");
                    history.push('/login')
                }
                dispatch(editProgramIncidentialFailure(err));
            });
    };
};
export function fetchAddProgram(token, titles, sub, tag, content, newThumb, desc, achievment) {
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
                achievments: achievment,
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
                history.push("/program-utama");
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
export function fetchAddIncidental(token, titles, sub, tag, content, newThumb, desc) {
    return (dispatch) => {
        dispatch(addProgram())
        axios(AddURL_INCD, {
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
                    dispatch(addProgramIncidentalSuccess(res));
                    history.push("/program-incidental");
                }, 2000);
            })
            .catch(err => {
                console.log(err)
                if (err.response.status === 401) {
                    toast.error("Unauthorized")
                    dispatch(fetchRefreshToken(token))
                    localStorage.removeItem("token");
                    history.push('/login')
                }
                dispatch(addProgramIncidentalFailure(err));
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
                history.push("/program-utama");
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
export function fetchDeleteIncidental(token, id) {
    return (dispatch) => {
        axios(EditURL_INCD + `${id}`, {
            method: 'DELETE',
            headers: {
                "pp-token": `${token}`,
                "Content-type": "application/json"
            }
        })
            .then(res => {
                setTimeout(() => {
                    toast.success("Delete Success !")
                    dispatch(deleteProgramIncidentalSuccess(res));
                    history.push("/program-incidental");
                    window.location.reload();
                }, 2000);
            })
            .catch(err => {
                if (err.response.status === 401) {
                    toast.error("Unauthorized")
                    dispatch(fetchRefreshToken(token))
                    localStorage.removeItem("token");
                    history.push('/login')
                }
                dispatch(deleteProgramIncidentalFailure(err));
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
// Get Incidental

const getProgramIncidentalSuccess = (payload) => ({
    type: GET_PROGRAM_INCIDENTAL_SUCCESS,
    payload
});

const getProgramIncidentalFailure = () => ({
    type: GET_PROGRAM_INCIDENTAL_FAILURE
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

//  Edit Incidental
const editProgramIncidentialSuccess = (payload) => ({
    type: EDIT_PROGRAM_INCIDENTIAL_SUCCESS,
    payload
});

const editProgramIncidentialFailure = () => ({
    type: EDIT_PROGRAM_INCIDENTIAL_FAILURE
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

// Add Incidental
const addProgramIncidentalSuccess = (payload) => ({
    type: ADD_PROGRAM_INCIDENTAL_SUCCESS,
    payload
});

const addProgramIncidentalFailure = () => ({
    type: ADD_PROGRAM_INCIDENTAL_FAILURE
});

// Delete Program
const deleteProgramSuccess = (payload) => ({
    type: DELETE_PROGRAM_SUCCESS,
    payload
});

const deleteProgramFailure = () => ({
    type: DELETE_PROGRAM_FAILURE
});
const deleteProgramIncidentalSuccess = (payload) => ({
    type: DELETE_PROGRAM_INCIDENTAL_SUCCESS,
    payload
});

const deleteProgramIncidentalFailure = () => ({
    type: DELETE_PROGRAM_INCIDENTAL_FAILURE
});