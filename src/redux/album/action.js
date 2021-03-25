import { GET_ALBUM, 
        GET_ALBUM_SUCCESS, 
        GET_ALBUM_FAILURE,
        EDIT_ALBUM,
        EDIT_ALBUM_SUCCESS, 
        EDIT_ALBUM_FAILURE,
        ADD_ALBUM,
        ADD_ALBUM_SUCCESS,
        ADD_ALBUM_FAILURE,
        DELETE_ALBUM_FAILURE,
        DELETE_ALBUM_SUCCESS
        } from '../actionTypes';
import axios from 'axios';
import { fetchToken, fetchRefreshToken } from "../token/action";
import history from "../../history";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const URL = `${process.env.REACT_APP_BASE_URL}/album/list`;
const EditURL = `${process.env.REACT_APP_BASE_URL}/album/`;
const AddURL = `${process.env.REACT_APP_BASE_URL}/album/create`;

export function fetchAlbum(token) {
    return (dispatch) => {
        axios(URL, {
            method: 'POST',
            data: {
                limit: "10",
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
            dispatch(getAlbumSuccess(res.data.data));
            console.log(res.data.data)
        })
        .catch(err => {
            console.log(err)
            if(err.response.status == 401){
                dispatch(fetchToken())
            }
            dispatch(getAlbumFailure(err));
        });
    };
};

export function fetchEditAlbum(token, id, titles, sub, tag, thumb) {
    return (dispatch) => {
        axios(EditURL+`${id}`, {
            method: 'PUT',
            data: {
                title: titles,
                sub_title: sub,
                tag: tag,
                thumbnail_image_url: ""
            },
            headers: {
                "pp-token": `${token}`,
                "Content-type": "application/json"
            }
        })
        .then(res => {
            dispatch(editAlbumSuccess(res));
            console.log(res)
        })
        .catch(err => {
            console.log(err)
            dispatch(editAlbumFailure(err));
        });
    };
};

export function fetchAddAlbum(token, titles, sub, tag, thumb) {
    
    return (dispatch) => {
        axios(AddURL, {
            method: 'POST',
            data: {
                title: titles,
                sub_title: sub,
                tag: tag,
                thumbnail_image_url: ""
            },
            headers: {
                "pp-token": `${token}`,
                "Content-type": "application/json"
            }
        })
        .then(res => {
            history.push("/album");
            toast.success("Add Success !");
            dispatch(addAlbumSuccess(res));
            console.log(res)
        })
        .catch(err => {
            console.log(err)
            if(err.response.status == 401){
                dispatch(fetchRefreshToken(token))
            }
            dispatch(addAlbumFailure(err));
        });
    };
};

export function fetchDeleteAlbum(token, id) {
    return (dispatch) => {
        axios(EditURL+`${id}`, {
            method: 'DELETE',
            headers: {
                "pp-token": `${token}`,
                "Content-type": "application/json"
            }
        })
        .then(res => {
            toast.success("Delete Success !")
            history.push("/album");
            dispatch(deleteAlbumSuccess(res));
            console.log(res)
        })
        .catch(err => {
            if(err.response.status == 401){
                history.push('/album')
                dispatch(fetchRefreshToken(token))
            }
            dispatch(deleteAlbumFailure(err));
        });
    };
};

// Get Album
const getAlbumSuccess = (payload) => ({
    type: GET_ALBUM_SUCCESS,
    payload
});

const getAlbumFailure = () => ({
    type: GET_ALBUM_FAILURE
});

const getAlbum = () => ({
    type: GET_ALBUM
});

// Edit Album
const editAlbumSuccess = (payload) => ({
    type: EDIT_ALBUM_SUCCESS,
    payload
});

const editAlbumFailure = () => ({
    type: EDIT_ALBUM_FAILURE
});

// Add Album
const addAlbumSuccess = (payload) => ({
    type: ADD_ALBUM_SUCCESS,
    payload
});

const addAlbumFailure = () => ({
    type: ADD_ALBUM_FAILURE
});

// Delete Album
const deleteAlbumSuccess = (payload) => ({
    type: DELETE_ALBUM_SUCCESS,
    payload
});

const deleteAlbumFailure = () => ({
    type: DELETE_ALBUM_FAILURE
});