import { 
    GET_TAG_SUCCESS,
    GET_TAG_FAILURE,
    GET_BANNER,
    GET_BANNER_SUCCESS,
    GET_BANNER_FAILURE,
    ADD_BANNER,
    ADD_BANNER_SUCCESS,
    ADD_BANNER_FAILURE,
    EDIT_BANNER,
    EDIT_BANNER_SUCCESS,
    EDIT_BANNER_FAILURE,
    DELETE_BANNER_SUCCESS,
    DELETE_BANNER_FAILURE
        } from '../actionTypes';
import axios from 'axios';
import { fetchToken, fetchRefreshToken } from "../token/action";
import history from "../../history";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const URL = `${process.env.REACT_APP_BASE_URL}/banner/list`;
const EditURL = `${process.env.REACT_APP_BASE_URL}/banner/`;
const AddURL = `${process.env.REACT_APP_BASE_URL}/banner/create`;
const URL_TAG = `${process.env.REACT_APP_BASE_URL}/berita/list-tag`;

export function fetchTagBerita(token) {
    return (dispatch) => {
        axios(URL_TAG, {
            method: 'GET',
            headers: {
                "pp-token": `${token}`,
                "Content-type": "application/json"
            }
        })
            .then(res => {
                dispatch(getTagSuccess(res.data.data));
            })
            .catch(err => {
                console.log(err)
                dispatch(getTagFailure(err));
            });
    };
};
export function fetchBanner(token) {
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
            dispatch(getBannerSuccess(res.data.data));
        })
        .catch(err => {
            if(err.response.status === 401){
                toast.error("Unauthorized")
                dispatch(fetchRefreshToken(token))
                localStorage.removeItem("token");
                history.push('/login')
            }
            dispatch(getBannerFailure(err));
        });
    };
};

export function fetchEditBanner(token, id, titles, sub, titContent, titleLeft, titleRight, deepLeft, deepRight, newThumb, desc, tag) {
    return (dispatch) => {
        dispatch(editBanner())
        axios(EditURL+`${id}`, {
            method: 'PUT',
            data: {
                tag: tag,
                title: titles,
                sub_title: sub,
                title_content: titContent,
                deeplink_left: deepLeft,
                title_button_left: titleLeft == "" ? null : titleLeft,
                deeplink_right: deepRight,
                title_button_right: titleRight == "" ? null : titleRight,
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
                dispatch(editBannerSuccess(res));
                history.push("/banner");
            }, 2000);
        })
        .catch(err => {
            if(err.response.status === 401){
                toast.error("Unauthorized")
                dispatch(fetchRefreshToken(token))
                localStorage.removeItem("token");
                history.push('/login')
            }
            dispatch(editBannerFailure(err));
        });
    };
};

export function fetchAddBanner(token, titles, sub, titContent, titleLeft, titleRight, deepLeft, deepRight, newThumb, desc, tag) {
    return (dispatch) => {
        dispatch(addBanner())
        axios(AddURL, {
            method: 'POST',
            data: {
                tag: tag,
                title: titles,
                sub_title: sub,
                title_content: titContent,
                deeplink_left: deepLeft,
                title_button_left: titleLeft == "" ? null : titleLeft,
                deeplink_right: deepRight,
                title_button_right: titleRight == "" ? null : titleRight,
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
                dispatch(addBannerSuccess(res));
                history.push("/banner");
            }, 2000);
        })
        .catch(err => {
            if(err.response.status === 401){
                toast.error("Unauthorized")
                dispatch(fetchRefreshToken(token))
                localStorage.removeItem("token");
                history.push('/login')
            }
            dispatch(addBannerFailure(err));
        });
    };
};

export function fetchDeleteBanner(token, id) {
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
                dispatch(deleteBannerSuccess(res));
                history.push("/banner");
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
            dispatch(deleteBannerFailure(err));
        });
    };
};

// GET TAG
const getTagSuccess = (payload) => ({
    type: GET_TAG_SUCCESS,
    payload
});
const getTagFailure = () => ({
    type: GET_TAG_FAILURE
});
// Get Banner
const getBannerSuccess = (payload) => ({
    type: GET_BANNER_SUCCESS,
    payload
});

const getBannerFailure = () => ({
    type: GET_BANNER_FAILURE
});

const getBanner = () => ({
    type: GET_BANNER
});

// Edit Banner
const editBanner = () => ({
    type: EDIT_BANNER
});

const editBannerSuccess = (payload) => ({
    type: EDIT_BANNER_SUCCESS,
    payload
});

const editBannerFailure = () => ({
    type: EDIT_BANNER_FAILURE
});

// Add Banner
const addBanner = () => ({
    type: ADD_BANNER
});

const addBannerSuccess = (payload) => ({
    type: ADD_BANNER_SUCCESS,
    payload
});

const addBannerFailure = () => ({
    type: ADD_BANNER_FAILURE
});

// Delete Banner
const deleteBannerSuccess = (payload) => ({
    type: DELETE_BANNER_SUCCESS,
    payload
});

const deleteBannerFailure = () => ({
    type: DELETE_BANNER_FAILURE
});