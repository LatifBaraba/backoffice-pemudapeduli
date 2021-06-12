import React, { Fragment, useState, useEffect } from 'react';
import Breadcrumb from '../../components/common/breadcrumb';
import useForm from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { fetchEditHubungi } from "../../redux/hubungi/action";
import { uploadImage } from "../../helper/index";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditHubungi = (props) => {
    const { data } = props.location.state;

    const [ id, setId] = useState(data.id);
    const [ title, setTitle] = useState(data.title);
    const [ link, setLink] = useState(data.link);
    const [ icon, setThumb] = useState(data.icon);
    const [ img, setImg] = useState('');

    const loadingStatus = useSelector((state) => state.hubungiReducer.loading);

    const dispatch = useDispatch();
    let token = localStorage.getItem('token');
    const { register, handleSubmit, errors } = useForm();
    
    const onSubmit = data => {
        if (data !== '') {
            if (img !== '') {
                uploadImage(img).then(message => {
                    const newIcon = message.response.data.url;
                    dispatch(fetchEditHubungi(token, id, title, link, newIcon))
                })
                .catch(error => {
                    console.log(error)
                    toast.error("Upload Image Failed !");
                })
            } else {
                const newIcon = icon;
                dispatch(fetchEditHubungi(token, id, title, link, newIcon))
            }
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
            <Breadcrumb title="Hubungi Page" parent="Dashboard" />
            <div className="container-fluid">
            <div className="row">
                <div className="col-sm-12">
                    <div className="card">
                        <div className="card-header">
                            <h5>Edit Hubungi</h5>    
                        </div>
                        <div className="card-body">
                            {/* content form */}
                            <form className="needs-validation" noValidate="" onSubmit={handleSubmit(onSubmit)}>
                                <div className="row justify-content-center">
                                    <div className="col-md-6 col-sm-12">
                                        <div className="form-row">
                                            <div className="col-md-12 mb-3">
                                                <label>{"Title"}</label>
                                                <input className="form-control" name="title" type="text" value={title} ref={register({ required: true })} onChange={(e) => setTitle(e.target.value)} />
                                                <span>{errors.title && 'Title is required'}</span> 
                                                <div className="valid-feedback">{"Looks good!"}</div>
                                            </div>
                                            <div className="col-md-12 mb-3">
                                                <label>{"Link"}</label>
                                                <input className="form-control" name="link" type="text" value={link} ref={register({ required: true })} onChange={(e) => setLink(e.target.value)} />
                                                <span>{errors.link && 'Link is required'}</span>
                                                <div className="valid-feedback">{"Looks good!"}</div>
                                            </div>
                                            <div className="col-md-12 mb-3">
                                                <label>{"UploadFile"}</label>
                                                <input className="form-control" type="file" accept="image/*" onChange={(e) => setImg(e.target.files[0])}/>
                                            </div>
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

export default EditHubungi