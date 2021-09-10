import { 
    GET_TRANSACTION,
    GET_TRANSACTION_SUCCESS,
    GET_TRANSACTION_FAILURE,
    EDIT_TRANSACTION,
    EDIT_TRANSACTION_SUCCESS,
    EDIT_TRANSACTION_FAILURE,
    DELETE_TRANSACTION,
    DELETE_TRANSACTION_SUCCESS,
    DELETE_TRANSACTION_FAILURE
   
        } from '../actionTypes';

import axios from 'axios';
import { fetchToken, fetchRefreshToken } from "../token/action";
import history from "../../history";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const URL = `${process.env.REACT_APP_BASE_URL}/transaction/list`;
const DeclineURL = `${process.env.REACT_APP_BASE_URL}/transaction/decline/`;
const ApproveURL = `${process.env.REACT_APP_BASE_URL}/transaction/applied/`;

export function fetchTransaction(token) {
    return (dispatch) => {
        axios(URL, {
            method: 'POST',
            data: {
                limit: "100",
                offset: "1",
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
                paid_at_from: "",
                paid_at_to: ""
            },
            headers: {
                "pp-token": `${token}`,
                "Content-type": "application/json"
            }
        })
        .then(res => {
            dispatch(getTransactionSuccess(res.data.data));
        })
        .catch(err => {
            if(err.response.status == 401){
                toast.error("Unauthorized")
                dispatch(fetchRefreshToken(token))
                localStorage.removeItem("token");
                history.push('/transaction')
            }
            dispatch(getTransactionFailure(err));
        });
    };
};

// export function fetchAddQris(token, title, description, newIcon) {
//     return (dispatch) => {        
//         dispatch(addQris())
//         axios(ApproveURL, {
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

export function fetchApproveTransaction(token, id) {
    return (dispatch) => {
        dispatch(editTransaction())            
        // console.log(id, user, campaign, pengirim, email, tanggalbayar, jumlah, banktujuan, norekening)
        axios(ApproveURL+`${id}`, {
            method: 'PUT',
            headers: {
                "pp-token": `${token}`,
                "Content-type": "application/json"
            }
        })
        .then(res => { 
            setTimeout(() => {
                toast.success("Status Updated !");
                dispatch(editTransactionSuccess(res));
                history.push("/transaction");                
            }, 2000);
            window.location.reload();
        })
        .catch(err => {
            if(err.response.status == 401){
                toast.error("Unauthorized")
                dispatch(fetchRefreshToken(token))
                localStorage.removeItem("token");
                history.push('/transaction')
            }
            dispatch(editTransactionFailure(err));
        });
    };
};

export function fetchDeclineTransaction(token, id) {
    return (dispatch) => {
        axios(DeclineURL+`${id}`, {
            method: 'PUT',
            headers: {
                "pp-token": `${token}`,
                "Content-type": "application/json"
            }
        })
        .then(res => {
            setTimeout(() => {
                toast.success("Decline Success !")
                dispatch(deleteTransactionSuccess(res));
                history.push("/transaction");
            }, 2000);
            window.location.reload();
        })
        .catch(err => {
            if(err.response.status == 401){
                toast.error("Unauthorized")
                dispatch(fetchRefreshToken(token))
                localStorage.removeItem("token");
                history.push('/login')
            }
            dispatch(deleteTransactionFailure(err));
        });
    };
};

// Get Transaction
const getTransactionSuccess = (payload) => ({
    type: GET_TRANSACTION_SUCCESS,
    payload
});

const getTransactionFailure = () => ({
    type: GET_TRANSACTION_FAILURE
});

// Edit Qris
const editTransaction = () => ({
    type: EDIT_TRANSACTION
});

const editTransactionSuccess = (payload) => ({
    type: EDIT_TRANSACTION_SUCCESS,
    payload
});

const editTransactionFailure = () => ({
    type: EDIT_TRANSACTION_FAILURE
});

// // Add Qris
// const addQris = () => ({
//     type: ADD_QRIS
// });

// const addQrisSuccess = (payload) => ({
//     type: ADD_QRIS_SUCCESS,
//     payload
// });

// const addQrisFailure = () => ({
//     type: ADD_QRIS_FAILURE
// });

// Delete Qris
const deleteTransactionSuccess = (payload) => ({
    type: DELETE_TRANSACTION_SUCCESS,
    payload
});

const deleteTransactionFailure = () => ({
    type: DELETE_TRANSACTION_FAILURE
});