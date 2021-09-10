import { 
    GET_REMINDER,
    GET_REMINDER_SUCCESS,
    GET_REMINDER_FAILURE,
    EDIT_REMINDER,
    EDIT_REMINDER_SUCCESS,
    EDIT_REMINDER_FAILURE,
    DELETE_REMINDER,
    DELETE_REMINDER_SUCCESS,
    DELETE_REMINDER_FAILURE
   
        } from '../actionTypes';

import axios from 'axios';
import { fetchToken, fetchRefreshToken } from "../token/action";
import history from "../../history";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const URL = `${process.env.REACT_APP_BASE_URL}/transaction/list`;
const DeclineURL = `${process.env.REACT_APP_BASE_URL}/transaction/decline/`;
const ApproveURL = `${process.env.REACT_APP_BASE_URL}/transaction/applied/`;

export function fetchReminder(token) {
    return (dispatch) => {
        console.log('masuk redux')
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
            dispatch(getReminderSuccess(res.data.data));
            console.log(res.data.data)
        })
        .catch(err => {
            if(err.response.status == 401){
                toast.error("Unauthorized")
                dispatch(fetchRefreshToken(token))
                localStorage.removeItem("token");
                history.push('/reminder')
            }
            dispatch(getReminderFailure(err));
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

export function fetchApproveReminder(token, id) {
    return (dispatch) => {
        dispatch(editReminder())            
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
                dispatch(editReminderSuccess(res));
                history.push("/reminder");                
            }, 2000);
            window.location.reload();
        })
        .catch(err => {
            console.log(err)
            if(err.response.status == 401){
                toast.error("Unauthorized")
                dispatch(fetchRefreshToken(token))
                localStorage.removeItem("token");
                history.push('/reminder')
            }
            dispatch(editReminderFailure(err));
        });
    };
};

export function fetchDeclineReminder(token, id) {
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
                dispatch(deleteReminderSuccess(res));
                history.push("/reminder");
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
            dispatch(deleteReminderFailure(err));
        });
    };
};

// Get Reminder
const getReminderSuccess = (payload) => ({
    type: GET_REMINDER_SUCCESS,
    payload
});

const getReminderFailure = () => ({
    type: GET_REMINDER_FAILURE
});

// Edit Qris
const editReminder = () => ({
    type: EDIT_REMINDER
});

const editReminderSuccess = (payload) => ({
    type: EDIT_REMINDER_SUCCESS,
    payload
});

const editReminderFailure = () => ({
    type: EDIT_REMINDER_FAILURE
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
const deleteReminderSuccess = (payload) => ({
    type: DELETE_REMINDER_SUCCESS,
    payload
});

const deleteReminderFailure = () => ({
    type: DELETE_REMINDER_FAILURE
});