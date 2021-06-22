import React, { Fragment, useState } from 'react';
import Breadcrumb from '../../components/common/breadcrumb';
import useForm from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { fetchEditKontak } from "../../redux/kontak/action";
import { uploadImage } from "../../helper/index";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditKontak = (props) => {

    const { data } = props.location.state;

    const [ id, setId] = useState(data.id);
    const [ sk, setSk] = useState(data.sk_legalitas);
    const [ address, setAddress] = useState(data.address);
    // const [ img, setImg] = useState('');
    const loadingStatus = useSelector((state) => state.kontakReducer.loading);

    const dispatch = useDispatch();
    let token = localStorage.getItem('token');
    const { register, handleSubmit, errors } = useForm();

    const onSubmit = data => {
        if (data !== '') {
            dispatch(fetchEditKontak(token, id, sk, address))
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
            <Breadcrumb title="Kontak Page" parent="Dashboard" />
            <div className="container-fluid">
            <div className="row">
                <div className="col-sm-12">
                    <div className="card">
                        <div className="card-header">
                            <h5>Edit Kontak</h5>    
                        </div>
                        <div className="card-body">
                            {/* content form */}
                            <form className="needs-validation" noValidate="" onSubmit={handleSubmit(onSubmit)}>
                                <div className="row justify-content-center">
                                    <div className="col-md-6 col-sm-12">
                                    <div className="form-row">
                                            <div className="col-md-12 mb-3">
                                                <label>{"Sk Legalitas"}</label>
                                                <input className="form-control" name="sk" type="text" placeholder="Sk Legalitas" value={sk} ref={register({ required: true })} onChange={(e) => setSk(e.target.value)} />
                                                <span>{errors.sk && 'Sk Legalitas is required'}</span>
                                                <div className="valid-feedback">{"Looks good!"}</div>
                                            </div>
                                            <div className="col-md-12 mb-3">
                                                <label>{"Address"}</label>
                                                <input className="form-control" name="address" type="text" placeholder="Title" value={address} ref={register({ required: true })} onChange={(e) => setAddress(e.target.value)} />
                                                <span>{errors.address && 'Address is required'}</span>
                                                <div className="valid-feedback">{"Looks good!"}</div>
                                            </div>
                                            {/* <div className="col-md-12 mb-3">
                                                <label>{"UploadFile"}</label>
                                                <input className="form-control" type="file" accept="image/*" onChange={(e) => setImg(e.target.files[0])}/>
                                            </div> */}
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

export default EditKontak