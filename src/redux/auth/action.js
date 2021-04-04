import { 
    LOGIN,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGOUT,
    LOGOUT_SUCCESS,
    LOGOUT_FAILURE
        } from '../actionTypes';
import axios from 'axios';
import history from "../../history";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LOGINURL = `${process.env.REACT_APP_BASE_URL}/auth/admin/login`;
const LOGOUTURL = `${process.env.REACT_APP_BASE_URL}/auth/admin/logout`;

export function fetchLogin(token, username, password) {
    return (dispatch) => {
        axios(LOGINURL, {
            method: 'POST',
            data: {
                username: username,
                password: password
            },
            headers: {
                "pp-token": `${token}`,
                "Content-type": "application/json"
            }
        })
        .then(res => {
            dispatch(loginSuccess(res));
            toast.success("Login Success !")
            localStorage.setItem("token", token)
            history.push("/dashboard")
            console.log(res)
        })
        .catch(err => {
            if (err.response.status === 400) {
                alert("incorrect username or password !")
            }
            dispatch(loginFailure(err));
        });
    };
};

export function fetchLogout(token) {
    return (dispatch) => {
        axios(LOGOUTURL, {
            method: 'POST',
            headers: {
                "pp-token": `${token}`,
                "Content-type": "application/json"
            }
        })
        .then(res => {
            dispatch(logoutSuccess(res));
            console.log(res)
        })
        .catch(err => {
            console.log(err)
            localStorage.removeItem("token");
            history.push("/login")
            dispatch(logoutFailure(err));
        });
    };
};

// Login
const login = () => ({
    type: LOGIN
});

const loginSuccess = (payload) => ({
    type: LOGIN_SUCCESS,
    payload
});

const loginFailure = () => ({
    type: LOGIN_FAILURE
});

// Logout
const logout = () => ({
    type: LOGOUT
});

const logoutSuccess = (payload) => ({
    type: LOGOUT_SUCCESS,
    payload
});

const logoutFailure = () => ({
    type: LOGOUT_FAILURE
});