import { 
    GET_TRANSACTION,
    GET_TRANSACTION_SUCCESS,
    GET_TRANSACTION_FAILURE,
    EDIT_TRANSACTION,
    EDIT_TRANSACTION_SUCCESS,
    EDIT_TRANSACTION_FAILURE
   
        } from '../actionTypes';

import axios from 'axios';
import { fetchToken, fetchRefreshToken } from "../token/action";
import history from "../../history";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const URL = `${process.env.REACT_APP_BASE_URL}/transaction/list`;
const EditURL = `${process.env.REACT_APP_BASE_URL}/transaction/`;
// const AddURL = `${process.env.REACT_APP_BASE_URL}/qris/create`;

export function fetchTransaction(token) {
    return (dispatch) => {
        console.log('masuk redux')
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
        //     dispatch(getTransactionSuccess(res.data.data));
        //     console.log(res.data.data)
        // })
        // .catch(err => {
        //     if(err.response.status == 401){
        //         toast.error("Unauthorized")
        //         dispatch(fetchRefreshToken(token))
        //         localStorage.removeItem("token");
        //         history.push('/transaction')
        //     }
        //     dispatch(getTransactionFailure(err));
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

export function fetchEditTransaction(token, id, user, campaign, pengirim, email, tanggalbayar, jumlah, banktujuan, norekening) {
    return (dispatch) => {
        // dispatch(editTransaction())            
        console.log(id, user, campaign, pengirim, email, tanggalbayar, jumlah, banktujuan, norekening)
        // axios(EditURL+`${id}`, {
        //     method: 'PUT',
        //     data: {
        //         user: user,
        //         campaign: campaign,
        //         pengirim: pengirim,
        //         email: email,
        //         tanggalbayar: tanggalbayar,
        //         jumlah: jumlah,
        //         banktujuan: banktujuan,
        //         norekening: norekening
        //     },
        //     headers: {
        //         "pp-token": `${token}`,
        //         "Content-type": "application/json"
        //     }
        // })
        // .then(res => { 
        //     setTimeout(() => {
        //         toast.success("Edit Success !");
        //         dispatch(editTransactionSuccess(res));
        //         history.push("/transaction");
        //     }, 2000);
        // })
        // .catch(err => {
        //     console.log(err)
        //     if(err.response.status == 401){
        //         toast.error("Unauthorized")
        //         dispatch(fetchRefreshToken(token))
        //         localStorage.removeItem("token");
        //         history.push('/transaction')
        //     }
        //     dispatch(editTransactionFailure(err));
        // });
    };
};

// export function fetchDeleteQris(token, id) {
//     return (dispatch) => {
//         axios(EditURL+`${id}`, {
//             method: 'DELETE',
//             headers: {
//                 "pp-token": `${token}`,
//                 "Content-type": "application/json"
//             }
//         })
//         .then(res => {
//             setTimeout(() => {
//                 toast.success("Delete Success !")
//                 dispatch(deleteQrisSuccess(res));
//                 history.push("/qris");
//                 window.location.reload();
//             }, 2000);
//         })
//         .catch(err => {
//             if(err.response.status == 401){
//                 toast.error("Unauthorized")
//                 dispatch(fetchRefreshToken(token))
//                 localStorage.removeItem("token");
//                 history.push('/login')
//             }
//             dispatch(deleteQrisFailure(err));
//         });
//     };
// };

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

// // Delete Qris
// const deleteQrisSuccess = (payload) => ({
//     type: DELETE_QRIS_SUCCESS,
//     payload
// });

// const deleteQrisFailure = () => ({
//     type: DELETE_QRIS_FAILURE
// });