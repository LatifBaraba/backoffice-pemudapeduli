import React, { Fragment, useState, useEffect } from 'react';
import Breadcrumb from '../../components/common/breadcrumb';
import useForm from "react-hook-form";
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEditUser } from "../../redux/user/action";
// import { fetchRole } from '../../redux/user/action';

const EditUser = (props) => {
    
    const { data } = props.location.state;

    const [ id ] = useState(data.id);
    const [ username, setUsername] = useState(data.username);
    const [ fullname, setFullname] = useState(data.nama_lengkap);
    const [ email, setEmail] = useState(data.email);
    const [ address, setAddress] = useState(data.alamat);
    // const [ role, setRole] = useState(data.role.role_type);
    // const [ password, setPassword] = useState();
    // const [ confirmPassword, setConfirmPassword] = useState();

    // const roleData = useSelector((state) => state.userReducer.role);

    // useEffect(() => {
    //     dispatch(fetchRole(token))
    // }, [])

    const dispatch = useDispatch();
    let token = localStorage.getItem('token');
    const { register, handleSubmit, watch, errors } = useForm();

    const loadingStatus = useSelector((state) => state.testimoniReducer.loading);

    const onSubmit = data => {
        if (data !== '') {
            dispatch(fetchEditUser(token, id, username, fullname, email, address))
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
            {!id ? (<Redirect to='/dashboard'/>) : 
                (<>
                <Breadcrumb title="User Page" parent="Dashboard" />
                <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="card">
                            <div className="card-header">
                                <h5>Edit User</h5>    
                            </div>
                            <div className="card-body">
                                {/* content form */}
                                <form className="needs-validation" noValidate="" onSubmit={handleSubmit(onSubmit)}>
                                    <div className="row justify-content-center">
                                        <div className="col-md-6 col-sm-12">
                                            <div className="form-row">
                                                <div className="col-md-12 mb-3">
                                                    <label htmlFor="validationCustom01">{"Username"}</label>
                                                    <input className="form-control" name="username" type="text" value={username} ref={register({ required: true })} onChange={(e) => setUsername(e.target.value)}/>
                                                    <span>{errors.username && 'Name is required'}</span>
                                                    <div className="valid-feedback">{"Looks good!"}</div>
                                                </div>
                                                <div className="col-md-12 mb-3">
                                                    <label htmlFor="validationCustom01">{"Fullname"}</label>
                                                    <input className="form-control" name="fullname" type="text" value={fullname} ref={register({ required: true })} onChange={(e) => setFullname(e.target.value)} />
                                                    <span>{errors.fullname && 'Fullname is required'}</span>
                                                    <div className="valid-feedback">{"Looks good!"}</div>
                                                </div>
                                                {/* Password */}
                                                {/* <div className="col-md-12 mb-3">
                                                    <label htmlFor="validationCustom01">{"Password"}</label>
                                                    <input className="form-control" name="password" type="password" placeholder="Password" ref={register({ required: true, maxLength: 6 })} />
                                                    <span>{errors.password && 'Password is required & Min 6 Character'}</span>
                                                    <div className="valid-feedback">{"Looks good!"}</div>
                                                </div>
                                                <div className="col-md-12 mb-3">
                                                    <label htmlFor="validationCustom01">{"Confirm Password"}</label>
                                                    <input className="form-control" name="confirmPassword" type="password" placeholder="Confirm Password" ref={register({ required: true, maxLength: 6 })} />
                                                    <span>{errors.confirmPassword && 'Password is required & Min 6 Character'}</span>
                                                    <div className="valid-feedback">{"Looks good!"}</div>
                                                </div> */}
                                                {/* End Password */}
                                                <div className="col-md-12 mb-3">
                                                    <label htmlFor="validationCustom01">{"Email"}</label>
                                                    <input className="form-control" name="email" type="email" value={email} placeholder="Email" ref={register({ required: true })} onChange={(e) => setEmail(e.target.value)} />
                                                    <span>{errors.email && 'Email is required'}</span>
                                                    <div className="valid-feedback">{"Looks good!"}</div>
                                                </div>
                                                <div className="col-md-12 mb-3">
                                                    <label htmlFor="validationCustom01">{"Address"}</label>
                                                    <input className="form-control" name="alamat" type="text" value={address} placeholder="Address" ref={register({ required: true })} onChange={(e) => setAddress(e.target.value)} />
                                                    <span>{errors.alamat && 'Address is required'}</span>
                                                    <div className="valid-feedback">{"Looks good!"}</div>
                                                </div>
                                                {/* <div className="col-md-12 mb-3">
                                                    <label>{"Role"}</label>
                                                    <select className="custom-select" required="" ref={register({ required: true })} onChange={(e) => setRole(e.target.value)}>
                                                        <option value={}>{role}</option>
                                                        {roleData.map((role, index) => <option key={index} value={role.id} >{role.role_type}</option>)}
                                                    </select>
                                                </div> */}
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
            </>)
             }
    </Fragment>
    );
}

export default EditUser