import React, { useState, useEffect } from 'react';
import logo from '../assets/images/endless-logo.png';
import { withRouter } from "react-router";
import { Login,LOGIN,YourName,Password,RememberMe } from '../constant';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLogin } from "../redux/auth/action";
import { fetchToken } from '../redux/token/action';
import { Redirect } from 'react-router-dom';
import useForm from "react-hook-form";

const Logins = ({history}) => {
    const dispatch = useDispatch();
    const isToken = localStorage.getItem('token')
    const { register, handleSubmit, errors } = useForm();

    // const loginAuth = () => {
    //     history.push(`${process.env.PUBLIC_URL}/dashboard`);
    // }

    const [ username, setUsername] = useState();
    const [ password, setPassword] = useState();

    useEffect(() => {
        dispatch(fetchToken())
    }, [])

    const tokenData = useSelector((state) => state.tokenReducer.token);
    // console.log(tokenData.token)
    const token = tokenData.token;
    const onSubmit = () => {
        dispatch(fetchLogin(token, username, password))
    }
    return (
        <React.Fragment>
            { isToken ? (
                <Redirect to={{ pathname: "/dashboard"}} />
              ) : (
                <div>
                    <div className="page-wrapper">
                        <div className="container-fluid p-0">
                            {/* <!-- login page start--> */}
                            <div className="authentication-main">
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="auth-innerright">
                                            <div className="authentication-box">
                                                <div className="text-center"><img src={logo} alt="" /></div>
                                                <div className="card mt-4">
                                                    <div className="card-body">
                                                        <div className="text-center">
                                                            <h4>{LOGIN}</h4>
                                                            <h6>{"Enter your Username and Password"} </h6>
                                                        </div>
                                                        <form className="theme-form" onSubmit={handleSubmit(onSubmit)}>
                                                            <div className="form-group">
                                                                <label className="col-form-label pt-0">{YourName}</label>
                                                                <input className="form-control" type="text" required autoFocus onChange={(e) => setUsername(e.target.value)}/>
                                                            </div>
                                                            <div className="form-group">
                                                                <label className="col-form-label">{Password}</label>
                                                                <input className="form-control" type="password" required onChange={(e) => setPassword(e.target.value)}/>
                                                            </div>
                                                            <div className="checkbox p-0">
                                                                <input id="checkbox1" type="checkbox" />
                                                                <label htmlFor="checkbox1">{RememberMe}</label>
                                                            </div>
                                                            <div className="form-group form-row mt-3 mb-0">
                                                                {/* <button className="btn btn-primary btn-block" type="button" onClick={() => loginAuth()}>{Login}</button> */}
                                                                <button className="btn btn-primary btn-block" type="submit">{Login}</button>
                                                            </div>
                                                            {/* <div className="login-divider"></div>
                                                            <div className="social mt-3">
                                                                <div className="form-group btn-showcase d-flex">
                                                                    <button className="btn social-btn btn-fb d-inline-block"> <i className="fa fa-facebook"></i></button>
                                                                    <button className="btn social-btn btn-twitter d-inline-block"><i className="fa fa-google"></i></button>
                                                                    <button className="btn social-btn btn-google d-inline-block"><i className="fa fa-twitter"></i></button>
                                                                    <button className="btn social-btn btn-github d-inline-block"><i className="fa fa-github"></i></button>
                                                                </div>
                                                            </div> */}
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* <!-- login page end--> */}
                        </div>
                    </div>
                </div>
            )}

        </React.Fragment>
    );
};

export default withRouter(Logins);