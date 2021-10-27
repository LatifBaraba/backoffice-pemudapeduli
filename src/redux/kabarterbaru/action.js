import { 
    GET_KABAR_TERBARU_OT,
    GET_KABAR_TERBARU_OT_SUCCESS,
    GET_KABAR_TERBARU_OT_FAILURE,
    ADD_KABAR_TERBARU_OT,
    ADD_KABAR_TERBARU_OT_SUCCESS,
    ADD_KABAR_TERBARU_OT_FAILURE,
    EDIT_KABAR_TERBARU_OT,
    EDIT_KABAR_TERBARU_OT_SUCCESS,
    EDIT_KABAR_TERBARU_OT_FAILURE,
    DELETE_KABAR_TERBARU_OT,
    DELETE_KABAR_TERBARU_OT_SUCCESS,
    DELETE_KABAR_TERBARU_OT_FAILURE,    
    GET_KABAR_TERBARU_RUTIN,
    GET_KABAR_TERBARU_RUTIN_SUCCESS,
    GET_KABAR_TERBARU_RUTIN_FAILURE,
    ADD_KABAR_TERBARU_RUTIN,
    ADD_KABAR_TERBARU_RUTIN_SUCCESS,
    ADD_KABAR_TERBARU_RUTIN_FAILURE,
    EDIT_KABAR_TERBARU_RUTIN,
    EDIT_KABAR_TERBARU_RUTIN_SUCCESS,
    EDIT_KABAR_TERBARU_RUTIN_FAILURE,
    DELETE_KABAR_TERBARU_RUTIN,
    DELETE_KABAR_TERBARU_RUTIN_SUCCESS,
    DELETE_KABAR_TERBARU_RUTIN_FAILURE
        } from '../actionTypes';

import axios from 'axios';
import { fetchToken, fetchRefreshToken } from "../token/action";
import history from "../../history";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const URLOT = `${process.env.REACT_APP_BASE_URL}/program-donasi/kabar-terbaru/list`;
const EditURLOt = `${process.env.REACT_APP_BASE_URL}/program-donasi/kabar-terbaru/`;
const AddURLOt = `${process.env.REACT_APP_BASE_URL}/program-donasi/kabar-terbaru/create`;

const URLRUTIN = `${process.env.REACT_APP_BASE_URL}/program-donasi-rutin/kabar-terbaru/list`;
const EditURLRutin = `${process.env.REACT_APP_BASE_URL}/program-donasi-rutin/kabar-terbaru/`;
const AddURLRutin = `${process.env.REACT_APP_BASE_URL}/program-donasi-rutin/kabar-terbaru/create`;

const now = new Date();

export function fetchKabarTerbaruOt(token) {
    return (dispatch) => {
        // console.log('masuk redux')
        axios(URLOT, {
            method: 'POST',
            data: {
                limit: "10",
                offset: "1",
                filters: [
                    {
                        field: "is_deleted",
                        keyword: "false"
                    }
                ],
                order: "created_at",
                sort: "DESC",
                created_at_from: "",
                created_at_to: ""
            },
            headers: {
                "pp-token": `${token}`,
                "Content-type": "application/json"
            }
        })
        .then(res => {
            dispatch(getKabarTerbaruOtSuccess(res.data.data));
        })
        .catch(err => {
            if(err.response.status == 401){
                toast.error("Unauthorized")
                dispatch(fetchRefreshToken(token))
                localStorage.removeItem("token");
                history.push('/login')
            }
            dispatch(getKabarTerbaruOtFailure(err));
        });
    };
};

export function fetchAddKabarTerbaruOt(token, id_pp_cp_program_donasi, title, disbursement_balance, disbursement_account, disbursement_bank_name, disbursement_name, disbursement_description) {
    return (dispatch) => {               
        dispatch(addKabarTerbaruOt())
        axios(AddURLOt, {
            method: 'POST',
            data: {
                id_pp_cp_program_donasi:id_pp_cp_program_donasi,
                title:title,
                submit_at:now.toISOString(),
                disbursement_balance:parseInt(disbursement_balance),
                disbursement_account:disbursement_account,
                disbursement_bank_name:disbursement_bank_name,
                disbursement_name:disbursement_name,
                disbursement_description:disbursement_description
            },
            headers: {
                "pp-token": `${token}`,
                "Content-type": "application/json"
            }
        })
        .then(res => {
            setTimeout(() => {
                toast.success("Add Success !");
                dispatch(addKabarTerbaruOtSuccess(res));
                history.push("/kabar-terbaru-ot");
            }, 2000);
        })
        .catch(err => {
            if(err.response.status == 401){
                toast.error("Unauthorized")
                dispatch(fetchRefreshToken(token))
                localStorage.removeItem("token");
                history.push('/login')
            }
            dispatch(addKabarTerbaruOtFailure(err));
        });
    };
};

export function fetchEditKabarTerbaruOt(token, id, id_pp_cp_program_donasi, title, disbursement_balance, disbursement_account, disbursement_bank_name, disbursement_name, disbursement_description) {
    return (dispatch) => {      
        dispatch(editKabarTerbaruOt())
        axios(EditURLOt+`${id}`, {
            method: 'PUT',
            data: {                
                title:title,
                submit_at:now.toISOString(),
                disbursement_balance:parseInt(disbursement_balance),
                disbursement_account:disbursement_account,
                disbursement_bank_name:disbursement_bank_name,
                disbursement_name:disbursement_name,
                disbursement_description:disbursement_description
            },
            headers: {
                "pp-token": `${token}`,
                "Content-type": "application/json"
            }
        })
        .then(res => { 
            setTimeout(() => {
                toast.success("Edit Success !");
                dispatch(editKabarTerbaruOtSuccess(res));
                history.push("/kabar-terbaru-ot");
            }, 2000);
        })
        .catch(err => {
            if(err.response.status == 401){
                toast.error("Unauthorized")
                dispatch(fetchRefreshToken(token))
                localStorage.removeItem("token");
                history.push('/login')
            }
            dispatch(editKabarTerbaruOtFailure(err));
        });
    };
};

export function fetchDeleteKabarTerbaruOt(token, id) {
    return (dispatch) => {
        axios(EditURLOt+`${id}`, {
            method: 'DELETE',
            headers: {
                "pp-token": `${token}`,
                "Content-type": "application/json"
            }
        })
        .then(res => {
            setTimeout(() => {
                toast.success("Delete Success !")
                dispatch(deleteKabarTerbaruOtSuccess(res));
                history.push("/kabar-terbaru-ot");
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
            dispatch(deleteKabarTerbaruOtFailure(err));
        });
    };
};

//Rutin
export function fetchKabarTerbaruRutin(token) {
    return (dispatch) => {
        // console.log('masuk redux')
        axios(URLRUTIN, {
            method: 'POST',
            data: {
                limit: "10",
                offset: "1",
                filters: [
                    {
                        field: "is_deleted",
                        keyword: "false"
                    }
                ],
                order: "created_at",
                sort: "DESC",
                created_at_from: "",
                created_at_to: ""
            },
            headers: {
                "pp-token": `${token}`,
                "Content-type": "application/json"
            }
        })
        .then(res => {
            dispatch(getKabarTerbaruRutinSuccess(res.data.data));
        })
        .catch(err => {
            if(err.response.status == 401){
                toast.error("Unauthorized")
                dispatch(fetchRefreshToken(token))
                localStorage.removeItem("token");
                history.push('/login')
            }
            dispatch(getKabarTerbaruRutinFailure(err));
        });
    };
};


export function fetchAddKabarTerbaruRutin(token, id_pp_cp_program_donasi_rutin, title, disbursement_balance, disbursement_account, disbursement_bank_name, disbursement_name, disbursement_description) {
    return (dispatch) => {               
        dispatch(addKabarTerbaruRutin())
        axios(AddURLRutin, {
            method: 'POST',
            data: {
                id_pp_cp_program_donasi_rutin:id_pp_cp_program_donasi_rutin,
                title:title,
                submit_at:now.toISOString(),
                disbursement_balance:parseInt(disbursement_balance),
                disbursement_account:disbursement_account,
                disbursement_bank_name:disbursement_bank_name,
                disbursement_name:disbursement_name,
                disbursement_description:disbursement_description
            },
            headers: {
                "pp-token": `${token}`,
                "Content-type": "application/json"
            }
        })
        .then(res => {
            setTimeout(() => {
                toast.success("Add Success !");
                dispatch(addKabarTerbaruRutinSuccess(res));
                history.push("/kabar-terbaru-rutin");
            }, 2000);
        })
        .catch(err => {
            if(err.response.status == 401){
                toast.error("Unauthorized")
                dispatch(fetchRefreshToken(token))
                localStorage.removeItem("token");
                history.push('/login')
            }
            dispatch(addKabarTerbaruRutinFailure(err));
        });
    };
};


export function fetchEditKabarTerbaruRutin(token, id, id_pp_cp_program_donasi_rutin, title, disbursement_balance, disbursement_account, disbursement_bank_name, disbursement_name, disbursement_description) {
    return (dispatch) => {      
        dispatch(editKabarTerbaruRutin())
        axios(EditURLRutin+`${id}`, {
            method: 'PUT',
            data: {                
                title:title,
                submit_at:now.toISOString(),
                disbursement_balance:parseInt(disbursement_balance),
                disbursement_account:disbursement_account,
                disbursement_bank_name:disbursement_bank_name,
                disbursement_name:disbursement_name,
                disbursement_description:disbursement_description
            },
            headers: {
                "pp-token": `${token}`,
                "Content-type": "application/json"
            }
        })
        .then(res => { 
            setTimeout(() => {
                toast.success("Edit Success !");
                dispatch(editKabarTerbaruRutinSuccess(res));
                history.push("/kabar-terbaru-rutin");
            }, 2000);
        })
        .catch(err => {
            if(err.response.status == 401){
                toast.error("Unauthorized")
                dispatch(fetchRefreshToken(token))
                localStorage.removeItem("token");
                history.push('/login')
            }
            dispatch(editKabarTerbaruRutinFailure(err));
        });
    };
};


export function fetchDeleteKabarTerbaruRutin(token, id) {
    return (dispatch) => {
        axios(EditURLRutin+`${id}`, {
            method: 'DELETE',
            headers: {
                "pp-token": `${token}`,
                "Content-type": "application/json"
            }
        })
        .then(res => {
            setTimeout(() => {
                toast.success("Delete Success !")
                dispatch(deleteKabarTerbaruRutinSuccess(res));
                history.push("/kabar-terbaru-rutin");
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
            dispatch(deleteKabarTerbaruRutinFailure(err));
        });
    };
};

// Get KabarTerbaruOt
const getKabarTerbaruOtSuccess = (payload) => ({
    type: GET_KABAR_TERBARU_OT_SUCCESS,
    payload
});

const getKabarTerbaruOtFailure = () => ({
    type: GET_KABAR_TERBARU_OT_FAILURE
});

// Edit Kabar Terbaru One Time
const editKabarTerbaruOt = () => ({
    type: EDIT_KABAR_TERBARU_OT
});

const editKabarTerbaruOtSuccess = (payload) => ({
    type: EDIT_KABAR_TERBARU_OT_SUCCESS,
    payload
});

const editKabarTerbaruOtFailure = () => ({
    type: EDIT_KABAR_TERBARU_OT_FAILURE
});

// Add Kabar Terbaru One Time
const addKabarTerbaruOt = () => ({
    type: ADD_KABAR_TERBARU_OT
});

const addKabarTerbaruOtSuccess = (payload) => ({
    type: ADD_KABAR_TERBARU_OT_SUCCESS,
    payload
});

const addKabarTerbaruOtFailure = () => ({
    type: ADD_KABAR_TERBARU_OT_FAILURE
});

// Delete Kabar Terbaru One Time
const deleteKabarTerbaruOtSuccess = (payload) => ({
    type: DELETE_KABAR_TERBARU_OT_SUCCESS,
    payload
});

const deleteKabarTerbaruOtFailure = () => ({
    type: DELETE_KABAR_TERBARU_OT_FAILURE
});


// Get KabarTerbaru Rutin
const getKabarTerbaruRutinSuccess = (payload) => ({
    type: GET_KABAR_TERBARU_RUTIN_SUCCESS,
    payload
});

const getKabarTerbaruRutinFailure = () => ({
    type: GET_KABAR_TERBARU_RUTIN_FAILURE
});

// Add Kabar Terbaru Rutin
const addKabarTerbaruRutin = () => ({
    type: ADD_KABAR_TERBARU_RUTIN
});

const addKabarTerbaruRutinSuccess = (payload) => ({
    type: ADD_KABAR_TERBARU_RUTIN_SUCCESS,
    payload
});

const addKabarTerbaruRutinFailure = () => ({
    type: ADD_KABAR_TERBARU_RUTIN_FAILURE
});

// Edit Kabar Terbaru Rutin
const editKabarTerbaruRutin = () => ({
    type: EDIT_KABAR_TERBARU_RUTIN
});

const editKabarTerbaruRutinSuccess = (payload) => ({
    type: EDIT_KABAR_TERBARU_RUTIN_SUCCESS,
    payload
});

const editKabarTerbaruRutinFailure = () => ({
    type: EDIT_KABAR_TERBARU_RUTIN_FAILURE
});

// Delete Kabar Terbaru Rutin
const deleteKabarTerbaruRutinSuccess = (payload) => ({
    type: DELETE_KABAR_TERBARU_RUTIN_SUCCESS,
    payload
});

const deleteKabarTerbaruRutinFailure = () => ({
    type: DELETE_KABAR_TERBARU_RUTIN_FAILURE
});
