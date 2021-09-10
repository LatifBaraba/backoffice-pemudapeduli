import { 
    GET_HISTORY,
    GET_HISTORY_SUCCESS,
    GET_HISTORY_FAILURE    
        } from '../actionTypes';

import axios from 'axios';
import { fetchToken, fetchRefreshToken } from "../token/action";
import history from "../../history";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const URL = `${process.env.REACT_APP_BASE_URL}/history/list`;
const EditURL = `${process.env.REACT_APP_BASE_URL}/history/`;
const AddURL = `${process.env.REACT_APP_BASE_URL}/history/create`;

export function fetchHistory(token) {
    return (dispatch) => {
        // axios(URL, {
        //     method: 'POST',
        //     data: {
        //         limit: "100",
        //         offset: "0",
        //         filters: [
        //             {
        //                 field: "status",
        //                 keyword: "created"
        //             }
        //         ],
        //         order: "created_at",
        //         sort: "ASC",
        //         created_at_from: "",
        //         created_at_to: ""
        //         // publish_at_from: "",
        //         // publish_at_to: ""
        //     },
        //     headers: {
        //         "pp-token": `${token}`,
        //         "Content-type": "application/json"
        //     }
        // })
        // .then(res => {
        //     dispatch(getHistorySuccess(res.data.data));
        //     console.log(res.data.data)
        // })
        // .catch(err => {
        //     if(err.response.status == 401){
        //         toast.error("Unauthorized")
        //         dispatch(fetchRefreshToken(token))
        //         localStorage.removeItem("token");
        //         history.push('/login')
        //     }
        //     dispatch(getHistoryFailure(err));
        // });
    };
};

// export function fetchAddQris(token, title, description, newIcon) {
//     return (dispatch) => {        
//         dispatch(addQris())
//         axios(AddURL, {
//             method: 'POST',
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
//                 toast.success("Add Success !");
//                 dispatch(addQrisSuccess(res));
//                 history.push("/qris");
//             }, 2000);
//         })
//         .catch(err => {
//             console.log(err)
//             if(err.response.status == 401){
//                 toast.error("Unauthorized")
//                 dispatch(fetchRefreshToken(token))
//                 localStorage.removeItem("token");
//                 history.push('/login')
//             }
//             dispatch(addQrisFailure(err));
//         });
//     };
// };

// export function fetchEditQris(token, id, title, description, newIcon) {
//     return (dispatch) => {
//         dispatch(editQris())
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
//                 dispatch(editQrisSuccess(res));
//                 history.push("/qris");
//             }, 2000);
//         })
//         .catch(err => {
//             console.log(err)
//             if(err.response.status == 401){
//                 toast.error("Unauthorized")
//                 dispatch(fetchRefreshToken(token))
//                 localStorage.removeItem("token");
//                 history.push('/login')
//             }
//             dispatch(editQrisFailure(err));
//         });
//     };
// };

export function fetchDetailHistory(token, id) {
    return (dispatch) => {
        axios(EditURL+`${id}`, {
            method: 'POST',
            headers: {
                "pp-token": `${token}`,
                "Content-type": "application/json"
            }
        })
        .then(res => {
            setTimeout(() => {
                toast.success("Delete Success !")
                dispatch(getHistorySuccess(res));
                history.push("/qris");
                window.location.reload();
            }, 2000);
        })
        .catch(err => {
            if(err.response.status == 401){
                toast.error("Unauthorized")
                dispatch(fetchRefreshToken(token))
                localStorage.removeItem("token");
                history.push('/login')
            }
            dispatch(getHistoryFailure(err));
        });
    };
};

// Get History
const getHistorySuccess = (payload) => ({
    type: GET_HISTORY_SUCCESS,
    payload
});

const getHistoryFailure = () => ({
    type: GET_HISTORY_FAILURE
});

// // Edit Qris
// const editQris = () => ({
//     type: EDIT_QRIS
// });

// const editQrisSuccess = (payload) => ({
//     type: EDIT_QRIS_SUCCESS,
//     payload
// });

// const editQrisFailure = () => ({
//     type: EDIT_QRIS_FAILURE
// });