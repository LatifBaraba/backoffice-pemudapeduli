import React, { Fragment, useState } from 'react';
import Breadcrumb from '../../components/common/breadcrumb';
import useForm from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { fetchChangePassword } from "../../redux/user/action";

const Password = () => {
    
    const [ oldPass, setOldPass] = useState();
    const [ newPass, setNewPass] = useState();
    const [ confirmPass, setConfirmPass] = useState();

    const dispatch = useDispatch();
    let token = localStorage.getItem('token');
    const { register, handleSubmit, watch, errors } = useForm();

    const loadingStatus = useSelector((state) => state.testimoniReducer.loading);

    const onSubmit = data => {
        if (data !== '') {
            dispatch(fetchChangePassword(token, oldPass, newPass, confirmPass))
        } else {
            errors.showMessages();
        }
    }

    const submitButton = () => {
        if(loadingStatus == false) {
          return (
            <button className="btn btn-pill btn-primary btn-block mt-3 mb-3" type="submit">{"Submit"}</button>
          )
        } else {
          return (
            <button className="btn btn-pill btn-block mt-3 mb-3" type="submit" disabled>{"Loading"}</button>
          )
        }
    }

    return (
        <Fragment>
            <Breadcrumb title="Profile Page" parent="Dashboard" />
            <div className="container-fluid">
            <div className="row">
                <div className="col-sm-12">
                    <div className="card">
                        <div className="card-header">
                            <h5>Change Password</h5>
                        </div>
                        <div className="card-body">
                            {/* content form */}
                            <form className="needs-validation" noValidate="" onSubmit={handleSubmit(onSubmit)}>
                                <div className="row justify-content-center">
                                    <div className="col-md-6 col-sm-12">
                                        <div className="form-row">
                                            {/* Password */}
                                            <div className="col-md-12 mb-3">
                                                <label htmlFor="validationCustom01">{"Old Password"}</label>
                                                <input className="form-control" name="oldpassword" type="password" placeholder="Old Password" ref={register({ required: true, minLength: 6 })} onChange={(e) => setOldPass(e.target.value)} />
                                                <span>{errors.oldpassword && 'Old Password is required & Min 6 Character'}</span>
                                                <div className="valid-feedback">{"Looks good!"}</div>
                                            </div>
                                            <div className="col-md-12 mb-3">
                                                <label htmlFor="validationCustom01">{"New Password"}</label>
                                                <input className="form-control" name="newpassword" type="password" placeholder="New Password" ref={register({ required: true, minLength: 6 })} onChange={(e) => setNewPass(e.target.value)} />
                                                <span>{errors.newpassword && 'New Password is required & Min 6 Character'}</span>
                                                <div className="valid-feedback">{"Looks good!"}</div>
                                            </div>
                                            <div className="col-md-12 mb-3">
                                                <label htmlFor="validationCustom01">{"Confirm Password"}</label>
                                                <input className="form-control" name="confirmPassword" type="password" placeholder="Confirm Password" ref={register({ required: true, minLength: 6 })} onChange={(e) => setConfirmPass(e.target.value)}/>
                                                <span>{errors.confirmPassword && 'Password is required & Min 6 Character'}</span>
                                                <div className="valid-feedback">{"Looks good!"}</div>
                                            </div>
                                            {/* End Password */}
                                        </div>
                                        {/* <button className="btn btn-pill btn-primary btn-block mt-3 mb-3" type="submit">{"Submit"}</button>    */}
                                        {submitButton()}
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Fragment>
    );
}

export default Password