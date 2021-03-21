import React, { Fragment } from 'react';
import Breadcrumb from '../../components/common/breadcrumb';
import useForm from "react-hook-form";

const AddBanner = () => {
    const { register, handleSubmit, watch, errors } = useForm();
    const onSubmit = data => console.log(data);

    return (
        <Fragment>
            <Breadcrumb title="Banner Page" parent="Dashboard" />
            <div className="container-fluid">
            <div className="row">
                <div className="col-sm-12">
                    <div className="card">
                        <div className="card-header">
                            <h5>Add Banner</h5>    
                        </div>
                        <div className="card-body">
                            {/* content form */}
                            <form className="needs-validation" noValidate="" onSubmit={handleSubmit(onSubmit)}>
                                <div className="row justify-content-center">
                                    <div className="col-md-6 col-sm-12">
                                        <div className="form-row">
                                            <div className="col-md-12 mb-3">
                                                <label>{"Title"}</label>
                                                <input className="form-control" name="title" type="text" placeholder="Title" ref={register({ required: true })} />
                                                <span>{errors.title && 'Title is required'}</span>
                                                <div className="valid-feedback">{"Looks good!"}</div>
                                            </div>
                                            <div className="col-md-12 mb-3">
                                                <label>{"Sub-title"}</label>
                                                <input className="form-control" name="sub_title" type="text" placeholder="Sub-title" ref={register({ required: true })} />
                                                <span>{errors.sub_title && 'Sub-title is required'}</span>
                                                <div className="valid-feedback">{"Looks good!"}</div>
                                            </div>
                                            <div className="col-md-12 mb-3">
                                                <label>{"Title-content"}</label>
                                                <input className="form-control" name="title_content" type="text" placeholder="Title-content" ref={register({ required: true, maxLength: 6 })} />
                                                <span>{errors.title_content && 'Password is required & Min 6 Character'}</span>
                                                <div className="valid-feedback">{"Looks good!"}</div>
                                            </div>
                                            <div className="col-md-12 mb-3">
                                                <label>{"Deeplink-right"}</label>
                                                <input className="form-control" name="deeplink_right" type="text" placeholder="Deeplink-right" ref={register({ required: true, maxLength: 6 })} />
                                                <span>{errors.deeplink_right && 'Deeplink-right is required & Min 6 Character'}</span>
                                                <div className="valid-feedback">{"Looks good!"}</div>
                                            </div>
                                            <div className="col-md-12 mb-3">
                                                <label>{"Deeplink-left"}</label>
                                                <input className="form-control" name="deeplink_left" type="text" placeholder="Deeplink-left" ref={register({ required: true })} />
                                                <span>{errors.deeplink_left && 'Deeplink-left is required'}</span>
                                                <div className="valid-feedback">{"Looks good!"}</div>
                                            </div>
                                            <div className="col-md-12 mb-3">
                                                <label className="col-sm-3 col-form-label">{"UploadFile"}</label>
                                                <input className="form-control" type="file" accept="image/*" />
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

export default AddBanner