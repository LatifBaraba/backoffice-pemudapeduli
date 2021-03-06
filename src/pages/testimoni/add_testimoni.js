import React, { Fragment, useState } from 'react';
import Breadcrumb from '../../components/common/breadcrumb';
import useForm from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { fetchAddTestimoni } from "../../redux/testimoni/action";
import { uploadImage } from "../../helper/index";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddTestimoni = () => {
    const { register, handleSubmit, errors } = useForm();
    const dispatch = useDispatch();
    
    let token = localStorage.getItem('token');

    const [ name, setName] = useState()
    const [ role, setRole] = useState()
    const [ thumb, setThumb] = useState()
    const [ messages, setMessages] = useState()

    const [ img, setImg] = useState();

    const loadingStatus = useSelector((state) => state.testimoniReducer.loading);

    const onSubmit = data => {
        if (data !== '') {
            uploadImage(img).then(message => {
                const newThumb = message.response.data.url;
                dispatch(fetchAddTestimoni(token, name, role, messages, newThumb))
            })
            .catch(error => {
                toast.error("Upload Image Failed !");
            })
        } else {
            errors.showMessages();
        }
        // if (data !== '') {
        //     dispatch(fetchAddTestimoni(token, name, role, messages))
        // } else {
        //     errors.showMessages();
        // }
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
            <Breadcrumb title="Testimoni Page" parent="Dashboard" />
            <div className="container-fluid">
            <div className="row">
                <div className="col-sm-12">
                    <div className="card">
                        <div className="card-header">
                            <h5>Add Testimoni</h5>    
                        </div>
                        <div className="card-body">
                            {/* content form */}
                            <form className="needs-validation" noValidate="" onSubmit={handleSubmit(onSubmit)}>
                                <div className="row justify-content-center">
                                    <div className="col-md-6 col-sm-12">
                                        <div className="form-row">
                                            <div className="col-md-12 mb-3">
                                                <label>{"Name"}</label>
                                                <input className="form-control" name="name" type="text" placeholder="Name" ref={register({ required: true })} onChange={(e) => setName(e.target.value)}/>
                                                <span>{errors.name && 'Name is required'}</span>
                                                <div className="valid-feedback">{"Looks good!"}</div>
                                            </div>
                                            <div className="col-md-12 mb-3">
                                                <label>{"Role"}</label>
                                                <input className="form-control" name="role" type="text" placeholder="Role" ref={register({ required: true })} onChange={(e) => setRole(e.target.value)}/>
                                                <span>{errors.role && 'Role is required'}</span>
                                                <div className="valid-feedback">{"Looks good!"}</div>
                                            </div>
                                            {/* <div className="col-md-12 mb-3">
                                                <label>{"Message"}</label>
                                                <input className="form-control" name="messages" type="text" placeholder="Message" ref={register({ required: true })} onChange={(e) => setMessages(e.target.value)}/>
                                                <span>{errors.messages && 'Message is required'}</span>
                                                <div className="valid-feedback">{"Looks good!"}</div>
                                            </div> */}
                                            <div className="col-md-12 mb-3">
                                                <label>{"Message"}</label>
                                                {/* <input className="form-control" name="messages" type="text" placeholder="Message" ref={register({ required: true })} onChange={(e) => setMessages(e.target.value)}/> */}
                                                <textarea className="form-control" name="messages" rows="5" cols="5" placeholder="Default textarea" onChange={(e) => setMessages(e.target.value)}></textarea>
                                                <span>{errors.messages && 'Message is required'}</span>
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

export default AddTestimoni