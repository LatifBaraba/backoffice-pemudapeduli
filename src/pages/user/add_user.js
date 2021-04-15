import React, { Fragment, useState, useEffect } from 'react';
import Breadcrumb from '../../components/common/breadcrumb';
import useForm from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { fetchAddUser, fetchRole } from "../../redux/user/action";
import uploadImage from "../../helper/index";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddUser = () => {
    const { register, handleSubmit, errors } = useForm();
    const dispatch = useDispatch();
    
    let token = localStorage.getItem('token');

    const roleData = useSelector((state) => state.userReducer.role);

    const [ username, setUsername] = useState()
    const [ fullname, setFullname] = useState()
    const [ email, setEmail] = useState()
    const [ address, setAddress] = useState()
    const [ password, setPassword] = useState()
    const [ cpassword, setCpassword] = useState()
    const [ role, setRole] = useState()

    useEffect(() => {
        dispatch(fetchRole(token))
    }, [])

    const onSubmit = data => {
        if (data !== '') {
            dispatch(fetchAddUser(token, username, fullname, email, address, password, cpassword, role))
            // console.log(token, username, fullname, email, address, password, cpassword, role)
        } else {
            errors.showMessages();
        }
    }

    return (
        <Fragment>
            <Breadcrumb title="User Page" parent="Dashboard" />
            <div className="container-fluid">
            <div className="row">
                <div className="col-sm-12">
                    <div className="card">
                        <div className="card-header">
                            <h5>Add User</h5>    
                        </div>
                        <div className="card-body">
                            {/* content form */}
                            <form className="needs-validation" noValidate="" onSubmit={handleSubmit(onSubmit)}>
                                <div className="row justify-content-center">
                                    <div className="col-md-6 col-sm-12">
                                        <div className="form-row">
                                            <div className="col-md-12 mb-3">
                                                <label>{"Username"}</label>
                                                <input className="form-control" name="username" type="text" placeholder="Name" ref={register({ required: true })} onChange={(e) => setUsername(e.target.value)}/>
                                                <span>{errors.username && 'Username is required'}</span>
                                                <div className="valid-feedback">{"Looks good!"}</div>
                                            </div>
                                            <div className="col-md-12 mb-3">
                                                <label>{"Fullname"}</label>
                                                <input className="form-control" name="fullname" type="text" placeholder="Fullname" ref={register({ required: true })} onChange={(e) => setFullname(e.target.value)}/>
                                                <span>{errors.fullname && 'Fullname is required'}</span>
                                                <div className="valid-feedback">{"Looks good!"}</div>
                                            </div>
                                            <div className="col-md-12 mb-3">
                                                <label>{"Email"}</label>
                                                <input className="form-control" name="email" type="email" placeholder="Email" ref={register({ required: true })} onChange={(e) => setEmail(e.target.value)}/>
                                                <span>{errors.email && 'Email is required'}</span>
                                                <div className="valid-feedback">{"Looks good!"}</div>
                                            </div>
                                            <div className="col-md-12 mb-3">
                                                <label>{"Address"}</label>
                                                <input className="form-control" name="address" type="text" placeholder="Address" ref={register({ required: true })} onChange={(e) => setAddress(e.target.value)}/>
                                                <span>{errors.address && 'Address is required'}</span>
                                                <div className="valid-feedback">{"Looks good!"}</div>
                                            </div>
                                            <div className="col-md-12 mb-3">
                                                <label>{"Password"}</label>
                                                <input className="form-control" name="password" type="password" placeholder="Password" ref={register({ required: true, minLength: 8 })} onChange={(e) => setPassword(e.target.value)}/>
                                                <span>{errors.password && 'Password is required & min 8'}</span>
                                                <div className="valid-feedback">{"Looks good!"}</div>
                                            </div>
                                            <div className="col-md-12 mb-3">
                                                <label>{"Confirm Password"}</label>
                                                <input className="form-control" name="cpassword" type="password" placeholder="Confirm Password" ref={register({ required: true, minLength: 8 })} onChange={(e) => setCpassword(e.target.value)}/>
                                                <span>{errors.cpassword && 'Confrim Password is required & min 8'}</span>
                                                <div className="valid-feedback">{"Looks good!"}</div>
                                            </div>
                                            <div className="col-md-12 mb-3">
                                                <label>{"Role"}</label>
                                                <select className="custom-select" required="" ref={register({ required: true })} onChange={(e) => setRole(e.target.value)}>
                                                    <option value="">{"Open this select menu"}</option>
                                                    {roleData.map((role, index) => <option key={index} value={role.id} >{role.role_type}</option>)}
                                                    {/* <option value="1">{"One"}</option>
                                                    <option value="2">{"Two"}</option>
                                                    <option value="3">{"Three"}</option> */}
                                                </select>
                                            </div>
                                        </div>
                                        <button className="btn btn-pill btn-primary btn-block mt-3 mb-3" type="submit">{"Submit"}</button>   
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

export default AddUser