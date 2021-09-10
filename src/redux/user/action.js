import { GET_USER, 
        GET_USER_SUCCESS, 
        GET_USER_FAILURE,
        EDIT_USER,
        EDIT_USER_SUCCESS, 
        EDIT_USER_FAILURE,
        ADD_USER,
        ADD_USER_SUCCESS,
        ADD_USER_FAILURE,
        DELETE_USER_FAILURE,
        DELETE_USER_SUCCESS,
        GET_ROLE,
        GET_ROLE_SUCCESS,
        GET_ROLE_FAILURE,
        GET_PROFILE,
        GET_PROFILE_SUCCESS,
        GET_PROFILE_FAILURE,
        EDIT_PROFILE,
        EDIT_PROFILE_SUCCESS,
        EDIT_PROFILE_FAILURE,
        CHANGE_PASSWORD,
        CHANGE_PASSWORD_FAILURE,
        CHANGE_PASSWORD_SUCCESS,
        RESET_PASSWORD,
        RESET_PASSWORD_SUCCESS,
        RESET_PASSWORD_FAILURE,
        ROLE_TYPE
        } from '../actionTypes';
import axios from 'axios';
import { fetchToken, fetchRefreshToken } from "../token/action";
import history from "../../history";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const URL = `${process.env.REACT_APP_BASE_URL}/admin/list`;
const EditURL = `${process.env.REACT_APP_BASE_URL}/admin/`;
const AddURL = `${process.env.REACT_APP_BASE_URL}/admin/create`;
const RoleURL = `${process.env.REACT_APP_BASE_URL}/role/list`;
const ProfileURL = `${process.env.REACT_APP_BASE_URL}/admin`;
const PasswordURL = `${process.env.REACT_APP_BASE_URL}/admin/change-password`;
const ResetPasswordURL = `${process.env.REACT_APP_BASE_URL}/admin/reset-password`;

export function fetchUser(token) {
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
            dispatch(getUserSuccess(res.data.data));
        })
        .catch(err => {
            if(err.response.status === 401){
                toast.error("Unauthorized")
                dispatch(fetchRefreshToken(token))
                localStorage.removeItem("token");
                history.push('/login')
            }
            dispatch(getUserFailure(err));
        });
    };
};

export function fetchRole(token) {
    return (dispatch) => {
        axios(RoleURL, {
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
                created_at_from: "",
                created_at_to: ""
            },
            headers: {
                "pp-token": `${token}`,
                "Content-type": "application/json"
            }
        })
        .then(res => {
            dispatch(getRoleSuccess(res.data.data));
        })
        .catch(err => {
            dispatch(getRoleFailure(err));
        });
    };
};

export function fetchProfile(token) {
    return (dispatch) => {
        axios(ProfileURL, {
            method: 'GET',
            headers: {
                "pp-token": `${token}`,
                "Content-type": "application/json"
            }
        })
        .then(res => {
            dispatch(getProfileSuccess(res.data.data));
            dispatch(getRoleType(res.data.data.role.role_type));
        })
        .catch(err => {
            dispatch(getProfileFailure(err));
        });
    };
};

export function fetchEditProfile(token, username, fullname, email, address) {
    return (dispatch) => {
        dispatch(editUser())
        axios(ProfileURL, {
            method: 'PUT',
            data: {
                username: username,
                email: email,
                nama_lengkap: fullname,
                alamat: address
            },
            headers: {
                "pp-token": `${token}`,
                "Content-type": "application/json"
            }
        })
        .then(res => {
            setTimeout(() => {
                toast.success("Edit Success !");
                dispatch(editUserSuccess(res));
                history.push("/user");
            }, 2000);
        })
        .catch(err => {
            if(err.response.status === 401){
                toast.error("Unauthorized")
                dispatch(fetchRefreshToken(token))
                localStorage.removeItem("token");
                history.push('/login')
            }
            dispatch(editUserFailure(err));
        });
    };
};

export function fetchChangePassword(token, oldPass, newPass, confirmPass) {
    return (dispatch) => {
        dispatch(changePassword())
        axios(PasswordURL, {
            method: 'PUT',
            data: {
                old_password: oldPass,
                new_password: newPass,
                confirm_new_password: confirmPass
            },
            headers: {
                "pp-token": `${token}`,
                "Content-type": "application/json"
            }
        })
        .then(res => {
            setTimeout(() => {
                toast.success("Change Success !");
                dispatch(changePasswordSuccess(res.data.data));
                history.push("/dashboard");
            }, 2000);
        })
        .catch(err => {
            if(err.response.status === 401){
                toast.error("Unauthorized")
                dispatch(fetchRefreshToken(token))
                localStorage.removeItem("token");
                history.push('/login')
            }
            dispatch(changePasswordFailure(err));
        });
    };
};

export function fetchResetPassword(token, id) {
    return (dispatch) => {
        dispatch(resetPassword())
        axios(ResetPasswordURL, {
            method: 'PUT',
            data: {
                id: id
            },
            headers: {
                "pp-token": `${token}`,
                "Content-type": "application/json"
            }
        })
        .then(res => {
            // console.log(res, "respon")
            setTimeout(() => {
                toast.success('Reset Success, New Password is : '+ `${res.data.data.new_password}`, {
                    position: "top-right",
                    autoClose: false,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: false,
                    progress: undefined,
                });
                dispatch(resetPasswordSuccess(res.data.data));
                // history.push("/dashboard");
            }, 2000);
        })
        .catch(err => {
            if(err.response.status === 401){
                toast.error("Unauthorized")
                dispatch(fetchRefreshToken(token))
                localStorage.removeItem("token");
                history.push('/login')
            }
            dispatch(resetPasswordFailure(err));
        });
    };
};

export function fetchEditUser(token, id, username, fullname, email, address) {
    return (dispatch) => {
        dispatch(editUser())
        axios(EditURL+`${id}`, {
            method: 'PUT',
            data: {
                username: username,
                email: email,
                nama_lengkap: fullname,
                alamat: address
            },
            headers: {
                "pp-token": `${token}`,
                "Content-type": "application/json"
            }
        })
        .then(res => {
            setTimeout(() => {
                toast.success("Add Success !");
                dispatch(editUserSuccess(res));
                history.push("/user");
            }, 2000);
        })
        .catch(err => {
            if(err.response.status === 401){
                toast.error("Unauthorized")
                dispatch(fetchRefreshToken(token))
                localStorage.removeItem("token");
                history.push('/login')
            }
            dispatch(editUserFailure(err));
        });
    };
};

export function fetchAddUser(token, username, fullname, email, address, password, cpassword, role) {
    return (dispatch) => {
        dispatch(addUser())
        axios(AddURL, {
            method: 'POST',
            data: {
                username: username,
                password: password,
                confirm_password: cpassword,
                email: email,
                nama_lengkap: fullname,
                alamat: address,
                role: role
            },
            headers: {
                "pp-token": `${token}`,
                "Content-type": "application/json"
            }
        })
        .then(res => {
            setTimeout(() => {
                toast.success("Add Success !");
                dispatch(addUserSuccess(res));
                history.push("/user");
            }, 2000);
        })
        .catch(err => {
            // toast.error(err.response.data.message)
            toast.error("Username, Email or Password not match !")
            if(err.response.status === 401){
                toast.error("Unauthorized")
                dispatch(fetchRefreshToken(token))
                localStorage.removeItem("token");
                history.push('/login')
            }
            dispatch(addUserFailure(err));
        });
    };
};

export function fetchDeleteUser(token, id) {
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
                dispatch(deleteUserSuccess(res));
                history.push("/user");
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
            dispatch(deleteUserFailure(err));
        });
    };
};

// Get User
const getUserSuccess = (payload) => ({
    type: GET_USER_SUCCESS,
    payload
});

const getUserFailure = () => ({
    type: GET_USER_FAILURE
});

const getUser = () => ({
    type: GET_USER
});

// Get Role
const getRoleSuccess = (payload) => ({
    type: GET_ROLE_SUCCESS,
    payload
});

const getRoleFailure = () => ({
    type: GET_ROLE_FAILURE
});

const getRole = () => ({
    type: GET_ROLE
});

// Edit User
const editUser = () => ({
    type: EDIT_USER
});

const editUserSuccess = (payload) => ({
    type: EDIT_USER_SUCCESS,
    payload
});

const editUserFailure = () => ({
    type: EDIT_USER_FAILURE
});

// Add User
const addUser = () => ({
    type: ADD_USER
});

const addUserSuccess = (payload) => ({
    type: ADD_USER_SUCCESS,
    payload
});

const addUserFailure = () => ({
    type: ADD_USER_FAILURE
});

// Delete User
const deleteUserSuccess = (payload) => ({
    type: DELETE_USER_SUCCESS,
    payload
});

const deleteUserFailure = () => ({
    type: DELETE_USER_FAILURE
});

// Get Profile
const getProfileSuccess = (payload) => ({
    type: GET_PROFILE_SUCCESS,
    payload
});

const getProfileFailure = () => ({
    type: GET_PROFILE_FAILURE
});

const getProfile = () => ({
    type: GET_PROFILE
});

// Edit Profile
const editProfileSuccess = (payload) => ({
    type: EDIT_PROFILE_SUCCESS,
    payload
});

const editProfileFailure = () => ({
    type: EDIT_PROFILE_FAILURE
});

const editProfile = () => ({
    type: EDIT_PROFILE
});

// Change Password
const changePasswordSuccess = (payload) => ({
    type: CHANGE_PASSWORD_SUCCESS,
    payload
});

const changePasswordFailure = () => ({
    type: CHANGE_PASSWORD_FAILURE
});

const changePassword = () => ({
    type: CHANGE_PASSWORD
});

// Reset Password
const resetPasswordSuccess = (payload) => ({
    type: RESET_PASSWORD_SUCCESS,
    payload
});

const resetPasswordFailure = () => ({
    type: RESET_PASSWORD_FAILURE
});

const resetPassword = () => ({
    type: RESET_PASSWORD
});

const getRoleType = (payload) => ({
    type: ROLE_TYPE,
    payload
});