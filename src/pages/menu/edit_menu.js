import React, { Fragment, useState } from 'react';
import Breadcrumb from '../../components/common/breadcrumb';
import useForm from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { fetchEditMenu } from "../../redux/menu/action";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditMenu = (props) => {

    const { data } = props.location.state;
    const [ id, setId] = useState(data.id);
    const [ title, setTitle] = useState(data.title);
    const [ link, setLink] = useState(data.link);

    const loadingStatus = useSelector((state) => state.menuReducer.loading);

    const dispatch = useDispatch();
    let token = localStorage.getItem('token');
    const { register, handleSubmit, errors } = useForm();

    const onSubmit = data => {
        if (data !== '') {
            dispatch(fetchEditMenu(token, id, title, link))
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
            <Breadcrumb title="Menu Page" parent="Dashboard" />
            <div className="container-fluid">
            <div className="row">
                <div className="col-sm-12">
                    <div className="card">
                        <div className="card-header">
                            <h5>Add Menu</h5>    
                        </div>
                        <div className="card-body">
                            {/* content form */}
                            <form className="needs-validation" noValidate="" onSubmit={handleSubmit(onSubmit)}>
                                <div className="row justify-content-center">
                                    <div className="col-md-6 col-sm-12">
                                        <div className="form-row">
                                        <div className="col-md-12 mb-3">
                                                <label>{"Title"}</label>
                                                <input className="form-control" name="title" type="text" placeholder="Name" value={title} ref={register({ required: true })} onChange={(e) => setTitle(e.target.value)} />
                                                <span>{errors.title && 'Name is required'}</span>
                                                <div className="valid-feedback">{"Looks good!"}</div>
                                            </div>
                                            <div className="col-md-12 mb-3">
                                                <label>{"Link"}</label>
                                                <input className="form-control" name="link" type="text" placeholder="Total" value={link} ref={register({ required: true })} onChange={(e) => setLink(e.target.value)} />
                                                <span>{errors.link && 'Link is required & Min 6 Character'}</span>
                                                <div className="valid-feedback">{"Looks good!"}</div>
                                            </div>
                                        </div>
                                        {/* <button className="btn btn-pill btn-primary btn-block mt-3 mb-3" type="submit">{"Submit"}</button> */}
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

export default EditMenu