import { GET_DONASI_KATEGORI,
    GET_DONASI_KATEGORI_SUCCESS,
    GET_DONASI_KATEGORI_FAILURE,
    ADD_DONASI_KATEGORI,
    ADD_DONASI_KATEGORI_SUCCESS,
    ADD_DONASI_KATEGORI_FAILURE,
    EDIT_DONASI_KATEGORI,
    EDIT_DONASI_KATEGORI_SUCCESS,
    EDIT_DONASI_KATEGORI_FAILURE,
    DELETE_DONASI_KATEGORI_SUCCESS,
    DELETE_DONASI_KATEGORI_FAILURE,
    GET_DONASI_PAKET_LIST_SUCCESS,
    GET_DONASI_PAKET_LIST_FAILURE,

    GET_ONETIME_DONASI_KATEGORI,
    GET_ONETIME_DONASI_KATEGORI_SUCCESS,
    GET_ONETIME_DONASI_KATEGORI_FAILURE,
    ADD_ONETIME_DONASI_KATEGORI,
    ADD_ONETIME_DONASI_KATEGORI_SUCCESS,
    ADD_ONETIME_DONASI_KATEGORI_FAILURE,
    EDIT_ONETIME_DONASI_KATEGORI,
    EDIT_ONETIME_DONASI_KATEGORI_SUCCESS,
    EDIT_ONETIME_DONASI_KATEGORI_FAILURE,
    DELETE_ONETIME_DONASI_KATEGORI_SUCCESS,
    DELETE_ONETIME_DONASI_KATEGORI_FAILURE,
        } from '../actionTypes';
import axios from 'axios';
import { fetchToken, fetchRefreshToken } from "../token/action";
import history from "../../history";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const URL = `${process.env.REACT_APP_BASE_URL}/kategori/program-donasi-rutin/list`;
const EditURL = `${process.env.REACT_APP_BASE_URL}/kategori/program-donasi-rutin/`;
const AddURL = `${process.env.REACT_APP_BASE_URL}/kategori/program-donasi-rutin/create`;
const ListPaketURL = `${process.env.REACT_APP_BASE_URL}/program-donasi-rutin/paket/list`;

const URL_ONETIMEKATEGORI = `${process.env.REACT_APP_BASE_URL}/kategori-program-donasi/list`;
const Edit_ONETIMEKATEGORI = `${process.env.REACT_APP_BASE_URL}/kategori-program-donasi/`;
const Add_ONETIMEKATEGORI = `${process.env.REACT_APP_BASE_URL}/kategori-program-donasi/create`;

export function fetchDonasiKategori(token) {
    return (dispatch) => {
        axios(URL, {
            method: 'POST',
            data: {
                limit: "100",
                offset: "0",
                filters: [
                ],
                order: "id",
                sort: "ASC",
                // created_at_from: "",
                // created_at_to: "",
                // publish_at_from: "",
                // publish_at_to: ""
            },
            headers: {
                "pp-token": `${token}`,
                "Content-type": "application/json"
            }
        })
        .then(res => {
            dispatch(getDonasiKategoriSuccess(res.data.data));
        })
        .catch(err => {
            if(err.response.status === 401){
                toast.error("Harap Login Terlebih Dahulu")
                dispatch(fetchRefreshToken(token))
                localStorage.removeItem("token");
                history.push('/login')
            }
            dispatch(getDonasiKategoriFailure(err));
        });
    };
};

export function fetchEditDonasiKategori(token, id, kategori) {
    return (dispatch) => {
        dispatch(editDonasiKategori())
        axios(EditURL+`${id}`, {
            method: 'PUT',
            data: {
                kategori_name: kategori,
            },
            headers: {
                "pp-token": `${token}`,
                "Content-type": "application/json"
            }
        })
        .then(res => { 
            setTimeout(() => {
                toast.success("Edit Success !");
                dispatch(editDonasiKategoriSuccess(res));
                history.push("/donasi-kategori");
            }, 2000);
        })
        .catch(err => {
            if(err.response.status === 401){
                toast.error("Harap Login Terlebih Dahulu")
                dispatch(fetchRefreshToken(token))
                localStorage.removeItem("token");
                history.push('/login')
            }
            dispatch(editDonasiKategoriFailure(err));
        });
    };
};

export function fetchAddDonasiKategori(token, kategori) {
    return (dispatch) => {
        dispatch(addDonasiKategori())
        axios(AddURL, {
            method: 'POST',
            data: {
                kategori_name: kategori,
            },
            headers: {
                "pp-token": `${token}`,
                "Content-type": "application/json"
            }
        })
        .then(res => {
            setTimeout(() => {
                toast.success("Add Success !");
                dispatch(addDonasiKategoriSuccess(res));
                history.push("/donasi-kategori");
            }, 2000);
        })
        .catch(err => {
            if(err.response.status === 401){
                toast.error("Harap Login Terlebih Dahulu")
                dispatch(fetchRefreshToken(token))
                localStorage.removeItem("token");
                history.push('/login')
            }
            dispatch(addDonasiKategoriFailure(err));
        });
    };
};

export function fetchDeleteDonasiKategori(token, id) {
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
                dispatch(deleteDonasiKategoriSuccess(res));
                history.push("/donasi-kategori");
                window.location.reload();
            }, 2000);
        })
        .catch(err => {
            if(err.response.status === 401){
                toast.error("Harap Login Terlebih Dahulu")
                dispatch(fetchRefreshToken(token))
                localStorage.removeItem("token");
                history.push('/login')
            }
            dispatch(deleteDonasiKategoriFailure(err));
        });
    };
};

export function fetchPaketList(token, id) {
    return (dispatch) => {
        axios(ListPaketURL, {
            method: 'POST',
            data: {
                limit: "25",
                offset: "0",
                filters: [
                    {
                        field: "is_deleted",
                        keyword: "false"
                    },
                    {
                        field:"id_pp_cp_program_donasi_rutin",
                        keyword:`${id}`
                    }
                ],
                order: "created_at",
                sort: "DESC",
                created_at_from: "",
                created_at_to: "",
                // publish_at_from: "",
                // publish_at_to: ""
            },
            headers: {
                "pp-token": `${token}`,
                "Content-type": "application/json"
            }
        })
        .then(res => {
            dispatch(getDonasiPaketListSuccess(res.data.data));
        })
        .catch(err => {
            if(err.response.status === 401){
                toast.error("Harap Login Terlebih Dahulu")
                dispatch(fetchRefreshToken(token))
                localStorage.removeItem("token");
                history.push('/login')
            }
            dispatch(getDonasiPaketListFailure(err));
        });
    };
};



export function fetchDonasiOneTimeKategori(token) {
    return (dispatch) => {
        axios(URL_ONETIMEKATEGORI, {
            method: 'POST',
            data: {
                limit: "10",
                offset: "1",
                filters: [
                    {
                        field: "id",
                        keyword: ""
                    }
                ],
                order: "created_at",
                sort: "ASC",                
            },
            headers: {
                "pp-token": `${token}`,
                "Content-type": "application/json"
            }
        })
        .then(res => {
            console.log(res)
            dispatch(getDonasiOnetimeKategoriSuccess(res.data.data));
        })
        .catch(err => {
            if(err.response.status === 401){
                toast.error("Harap Login Terlebih Dahulu")
                dispatch(fetchRefreshToken(token))
                localStorage.removeItem("token");
                history.push('/login')
            }
            dispatch(getDonasiOneTimeKategoriFailure(err));
        });
    };
};

export function fetchAddDonasiOneTimeKategori(token, name) {
    return (dispatch) => {
        dispatch(addDonasiKategori())
        axios(Add_ONETIMEKATEGORI, {
            method: 'POST',
            data: {
                name: name,
            },
            headers: {
                "pp-token": `${token}`,
                "Content-type": "application/json"
            }
        })
        .then(res => {
            setTimeout(() => {
                toast.success("Add Success !");
                dispatch(addDonasiOneTimeKategoriSuccess(res));
                history.push("/onetime-kategori");
            }, 2000);
        })
        .catch(err => {
            if(err.response.status === 401){
                toast.error("Harap Login Terlebih Dahulu")
                dispatch(fetchRefreshToken(token))
                localStorage.removeItem("token");
                history.push('/login')
            }
            dispatch(addDonasiOneTimeKategoriFailure(err));
        });
    };
};

export function fetchEditDonasiOneTimeKategori(token, id, name) {
    return (dispatch) => {
        // dispatch(editDonasiKategori())
        axios(Edit_ONETIMEKATEGORI+`${id}`, {
            method: 'PUT',
            data: {
                name: name,
            },
            headers: {
                "pp-token": `${token}`,
                "Content-type": "application/json"
            }
        })
        .then(res => { 
            setTimeout(() => {
                toast.success("Edit Success !");
                dispatch(editDonasiOneTimeKategoriSuccess(res));
                history.push("/onetime-kategori");
            }, 2000);
        })
        .catch(err => {
            if(err.response.status === 401){
                toast.error("Harap Login Terlebih Dahulu")
                dispatch(fetchRefreshToken(token))
                localStorage.removeItem("token");
                history.push('/login')
            }
            dispatch(editDonasiOneTimeKategoriFailure(err));
        });
    };
};


export function fetchDeleteDonasiOneTimeKategori(token, id) {
    return (dispatch) => {
        axios(Edit_ONETIMEKATEGORI+`${id}`, {
            method: 'DELETE',
            headers: {
                "pp-token": `${token}`,
                "Content-type": "application/json"
            }
        })
        .then(res => {
            setTimeout(() => {
                toast.success("Delete Success !")
                dispatch(deleteDonasiOneTimeKategoriSuccess(res));
                history.push("/onetime-kategori");
                window.location.reload();
            }, 2000);
        })
        .catch(err => {
            if(err.response.status === 401){
                toast.error("Harap Login Terlebih Dahulu")
                dispatch(fetchRefreshToken(token))
                localStorage.removeItem("token");
                history.push('/login')
            }
            dispatch(deleteDonasiOneTimeKategoriFailure(err));
        });
    };
};

// Get DonasiKategori
const getDonasiKategoriSuccess = (payload) => ({
    type: GET_DONASI_KATEGORI_SUCCESS,
    payload
});

const getDonasiKategoriFailure = () => ({
    type: GET_DONASI_KATEGORI_FAILURE
});

const getDonasiKategori = () => ({
    type: GET_DONASI_KATEGORI
});

// Edit DonasiKategori
const editDonasiKategori = () => ({
    type: EDIT_DONASI_KATEGORI
});

const editDonasiKategoriSuccess = (payload) => ({
    type: EDIT_DONASI_KATEGORI_SUCCESS,
    payload
});

const editDonasiKategoriFailure = () => ({
    type: EDIT_DONASI_KATEGORI_FAILURE
});

// Add DonasiKategori
const addDonasiKategori = () => ({
    type: ADD_DONASI_KATEGORI
});

const addDonasiKategoriSuccess = (payload) => ({
    type: ADD_DONASI_KATEGORI_SUCCESS,
    payload
});

const addDonasiKategoriFailure = () => ({
    type: ADD_DONASI_KATEGORI_FAILURE
});

// Delete DonasiKategori
const deleteDonasiKategoriSuccess = (payload) => ({
    type: DELETE_DONASI_KATEGORI_SUCCESS,
    payload
});

const deleteDonasiKategoriFailure = () => ({
    type: DELETE_DONASI_KATEGORI_FAILURE
});

// Get Paket
const getDonasiPaketListSuccess = (payload) => ({
    type: GET_DONASI_PAKET_LIST_SUCCESS,
    payload
});

const getDonasiPaketListFailure = () => ({
    type: GET_DONASI_PAKET_LIST_FAILURE
});


// Get DonasiKategori
const getDonasiOnetimeKategoriSuccess = (payload) => ({
    type: GET_ONETIME_DONASI_KATEGORI_SUCCESS,
    payload
});

const getDonasiOneTimeKategoriFailure = () => ({
    type: GET_ONETIME_DONASI_KATEGORI_FAILURE
});

const getDonasiOneTimeKategori = () => ({
    type: GET_ONETIME_DONASI_KATEGORI
});

// Edit DonasiOneTimeKategori
const editDonasiOneTimeKategori = () => ({
    type: EDIT_ONETIME_DONASI_KATEGORI
});

const editDonasiOneTimeKategoriSuccess = (payload) => ({
    type: EDIT_ONETIME_DONASI_KATEGORI_SUCCESS,
    payload
});

const editDonasiOneTimeKategoriFailure = () => ({
    type: EDIT_ONETIME_DONASI_KATEGORI_FAILURE
});

// Add DonasiOneTimeKategori
const addDonasiOneTimeKategori = () => ({
    type: ADD_ONETIME_DONASI_KATEGORI
});

const addDonasiOneTimeKategoriSuccess = (payload) => ({
    type: ADD_ONETIME_DONASI_KATEGORI_SUCCESS,
    payload
});

const addDonasiOneTimeKategoriFailure = () => ({
    type: ADD_ONETIME_DONASI_KATEGORI_FAILURE
});

// Delete DonasiOneTimeKategori
const deleteDonasiOneTimeKategoriSuccess = (payload) => ({
    type: DELETE_ONETIME_DONASI_KATEGORI_SUCCESS,
    payload
});

const deleteDonasiOneTimeKategoriFailure = () => ({
    type: DELETE_ONETIME_DONASI_KATEGORI_FAILURE
});
