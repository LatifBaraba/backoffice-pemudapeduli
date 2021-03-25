import React, { Fragment } from 'react';
import Breadcrumb from '../../components/common/breadcrumb';
import useForm from "react-hook-form";

const AddUser = () => {
    const { register, handleSubmit, watch, errors } = useForm();
    const onSubmit = data => console.log(data);

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
                                                <label htmlFor="validationCustom01">{"Username"}</label>
                                                <input className="form-control" name="username" type="text" placeholder="Username" ref={register({ required: true })} />
                                                <span>{errors.username && 'Name is required'}</span>
                                                <div className="valid-feedback">{"Looks good!"}</div>
                                            </div>
                                            <div className="col-md-12 mb-3">
                                                <label htmlFor="validationCustom01">{"Fullname"}</label>
                                                <input className="form-control" name="fullname" type="text" placeholder="Fullname" ref={register({ required: true })} />
                                                <span>{errors.fullname && 'Fullname is required'}</span>
                                                <div className="valid-feedback">{"Looks good!"}</div>
                                            </div>
                                            <div className="col-md-12 mb-3">
                                                <label htmlFor="validationCustom01">{"Password"}</label>
                                                <input className="form-control" name="password" type="password" placeholder="Password" ref={register({ required: true, minLength: 6 })} />
                                                <span>{errors.password && 'Password is required & Min 6 Character'}</span>
                                                <div className="valid-feedback">{"Looks good!"}</div>
                                            </div>
                                            <div className="col-md-12 mb-3">
                                                <label htmlFor="validationCustom01">{"Confirm Password"}</label>
                                                <input className="form-control" name="confirmPassword" type="password" placeholder="Confirm Password" ref={register({ required: true, minLength: 6 })} />
                                                <span>{errors.confirmPassword && 'Password is required & Min 6 Character'}</span>
                                                <div className="valid-feedback">{"Looks good!"}</div>
                                            </div>
                                            <div className="col-md-12 mb-3">
                                                <label htmlFor="validationCustom01">{"Email"}</label>
                                                <input className="form-control" name="email" type="email" placeholder="Email" ref={register({ required: true })} />
                                                <span>{errors.email && 'Email is required'}</span>
                                                <div className="valid-feedback">{"Looks good!"}</div>
                                            </div>
                                            <div className="col-md-12 mb-3">
                                                <label htmlFor="validationCustom01">{"Address"}</label>
                                                <input className="form-control" name="alamat" type="text" placeholder="Address" ref={register({ required: true })} />
                                                <span>{errors.alamat && 'Address is required'}</span>
                                                <div className="valid-feedback">{"Looks good!"}</div>
                                            </div>
                                            <div className="col-md-12 mb-3">
                                                <div className="form-group">
                                                    <label htmlFor="role">{"Role"}</label>
                                                    <select className="form-control digits" id="role" defaultValue="1">
                                                    <option>{"1"}</option>
                                                    <option>{"2"}</option>
                                                    </select>
                                                </div>
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