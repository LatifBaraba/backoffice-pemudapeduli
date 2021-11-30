import {
    GET_FLAG_SUCCESS,
    GET_FLAG_FAILURE,
    GET_TEAM,
    GET_TEAM_SUCCESS,
    GET_TEAM_FAILURE,
    EDIT_TEAM,
    EDIT_TEAM_SUCCESS,
    EDIT_TEAM_FAILURE,
    ADD_TEAM,
    ADD_TEAM_SUCCESS,
    ADD_TEAM_FAILURE,
    DELETE_TEAM_FAILURE,
    DELETE_TEAM_SUCCESS
} from '../actionTypes';
import axios from 'axios';
import { fetchToken, fetchRefreshToken } from "../token/action";
import history from "../../history";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const URL = `${process.env.REACT_APP_BASE_URL}/team/list`;
const EditURL = `${process.env.REACT_APP_BASE_URL}/team/`;
const AddURL = `${process.env.REACT_APP_BASE_URL}/team/create`;
const FLAG_URL = `${process.env.REACT_APP_BASE_URL}/team-flag/list`;


export function fetchFlag(token) {
    return (dispatch) => {
        axios(FLAG_URL, {
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
                dispatch(getFlagSuccess(res.data));
            })
            .catch(err => {
                if (err.response.status === 401) {
                    toast.error("Harap Login Terlebih Dahulu")
                    dispatch(fetchRefreshToken(token))
                    localStorage.removeItem("token");
                    history.push('/login')
                }
                dispatch(getFlagFailure(err));
            });
    };
};

export function fetchTeam(token) {
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
                dispatch(getTeamSuccess(res.data.data));
            })
            .catch(err => {
                if (err.response.status === 401) {
                    toast.error("Harap Login Terlebih Dahulu")
                    dispatch(fetchRefreshToken(token))
                    localStorage.removeItem("token");
                    history.push('/login')
                }
                dispatch(getTeamFailure(err));
            });
    };
};

export function fetchEditTeam(token, id, name, role, level, facebook, google, instagram, linkedin, newThumb) {
    return (dispatch) => {
        dispatch(editTeam())
        axios(EditURL + `${id}`, {
            method: 'PUT',
            data: {
                name: name,
                role: role,
                flag_id: parseInt(level) ,
                facebook_link: facebook,
                google_link: google,
                instagram_link: instagram,
                linkedin_link: linkedin,
                thumbnail_photo_url: newThumb,
            },
            headers: {
                "pp-token": `${token}`,
                "Content-type": "application/json"
            }
        })
            .then(res => {
                setTimeout(() => {
                    toast.success("Add Success !");
                    dispatch(editTeamSuccess(res));
                    history.push("/team");
                }, 2000);
            })
            .catch(err => {
                if (err.response.status === 401) {
                    toast.error("Harap Login Terlebih Dahulu")
                    dispatch(fetchRefreshToken(token))
                    localStorage.removeItem("token");
                    history.push('/login')
                }
                dispatch(editTeamFailure(err));
            });
    };
};

export function fetchAddTeam(token, name, role, level, facebook, google, instagram, linkedin, newThumb) {
    return (dispatch) => {
        dispatch(addTeam())
        axios(AddURL, {
            method: 'POST',
            data: {
                name: name,
                role: role,
                flag_id: parseInt(level),
                facebook_link: facebook,
                google_link: google,
                instagram_link: instagram,
                linkedin_link: linkedin,
                thumbnail_photo_url: newThumb,
            },
            headers: {
                "pp-token": `${token}`,
                "Content-type": "application/json"
            }
        })
            .then(res => {
                setTimeout(() => {
                    toast.success("Add Success !");
                    dispatch(addTeamSuccess(res));
                    history.push("/team");
                }, 2000);
            })
            .catch(err => {
                if (err.response.status === 401) {
                    toast.error("Harap Login Terlebih Dahulu")
                    dispatch(fetchRefreshToken(token))
                    localStorage.removeItem("token");
                    history.push('/login')
                }
                dispatch(addTeamFailure(err));
            });
    };
};

export function fetchDeleteTeam(token, id) {
    return (dispatch) => {
        axios(EditURL + `${id}`, {
            method: 'DELETE',
            headers: {
                "pp-token": `${token}`,
                "Content-type": "application/json"
            }
        })
            .then(res => {
                setTimeout(() => {
                    toast.success("Delete Success !")
                    dispatch(deleteTeamSuccess(res));
                    history.push("/team");
                    window.location.reload();
                }, 2000);
            })
            .catch(err => {
                if (err.response.status === 401) {
                    toast.error("Harap Login Terlebih Dahulu")
                    dispatch(fetchRefreshToken(token))
                    localStorage.removeItem("token");
                    history.push('/login')
                }
                dispatch(deleteTeamFailure(err));
            });
    };
};

// Get Flag id
const getFlagSuccess = (payload) => ({
    type: GET_FLAG_SUCCESS,
    payload
});

const getFlagFailure = () => ({
    type: GET_FLAG_FAILURE
});
// Get Team
const getTeamSuccess = (payload) => ({
    type: GET_TEAM_SUCCESS,
    payload
});

const getTeamFailure = () => ({
    type: GET_TEAM_FAILURE
});

const getTeam = () => ({
    type: GET_TEAM
});

// Edit Team
const editTeam = () => ({
    type: EDIT_TEAM
});

const editTeamSuccess = (payload) => ({
    type: EDIT_TEAM_SUCCESS,
    payload
});

const editTeamFailure = () => ({
    type: EDIT_TEAM_FAILURE
});

// Add Team
const addTeam = () => ({
    type: ADD_TEAM
});

const addTeamSuccess = (payload) => ({
    type: ADD_TEAM_SUCCESS,
    payload
});

const addTeamFailure = () => ({
    type: ADD_TEAM_FAILURE
});

// Delete Team
const deleteTeamSuccess = (payload) => ({
    type: DELETE_TEAM_SUCCESS,
    payload
});

const deleteTeamFailure = () => ({
    type: DELETE_TEAM_FAILURE
});