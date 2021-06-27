import React, { Fragment, useState } from 'react';
import Breadcrumb from '../../components/common/breadcrumb';
import useForm from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { fetchEditDonasiKategori } from "../../redux/donasiKategori/action";

const EditDonasiKategori = (props) => {

    const { data } = props.location.state;

    const [ id, setId] = useState(data.id);
    const [ kategori, setKategori] = useState(data.kategori_name);
 
    const loadingStatus = useSelector((state) => state.donasiKategoriReducer.loading);

    const dispatch = useDispatch();
    let token = localStorage.getItem('token');
    const { register, handleSubmit, errors } = useForm();

    const onSubmit = data => {
        if (data !== '') {
            dispatch(fetchEditDonasiKategori(token, id, kategori))
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
            <Breadcrumb title="Donasi Page" parent="Dashboard" />
            <div className="container-fluid">
            <div className="row">
                <div className="col-sm-12">
                    <div className="card">
                        <div className="card-header">
                            <h5>Edit Donasi</h5>    
                        </div>
                        <div className="card-body">
                            {/* content form */}
                            <form className="needs-validation" noValidate="" onSubmit={handleSubmit(onSubmit)}>
                                <div className="row justify-content-center">
                                    <div className="col-md-6 col-sm-12">
                                    <div className="form-row">
                                            <div className="col-md-12 mb-3">
                                                <label>{"Kategori"}</label>
                                                <input className="form-control" name="kategori" type="text" value={kategori} placeholder="Nama Kategori" ref={register({ required: true })} onChange={(e) => setKategori(e.target.value)} />
                                                <span>{errors.kategori && 'Kategori is required'}</span>
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

export default EditDonasiKategori