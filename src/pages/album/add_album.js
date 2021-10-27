import React, { Fragment, useEffect, useState } from 'react';
import Breadcrumb from '../../components/common/breadcrumb';
import useForm from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { fetchAddAlbum } from "../../redux/album/action";
import { fetchTagBerita } from "../../redux/banner/action";
import { uploadImage } from "../../helper/index";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddAlbum = () => {
    const { register, handleSubmit, errors } = useForm();
    const dispatch = useDispatch();

    let token = localStorage.getItem('token');

    const [titles, setTitles] = useState("");
    const [sub, setSub] = useState("");
    const [tag, setTag] = useState("");

    const [img, setImg] = useState();

    useEffect(() => {
        dispatch(fetchTagBerita(token))
    }, [token, dispatch])

    const loadingStatus = useSelector((state) => state.albumReducer.loading);
    const tagBanner = useSelector((state) => state.bannerReducer.tag);

    const onSubmit = data => {
        if (data !== '') {
            uploadImage(img).then(message => {
                const newThumb = message.response.data.url;
                dispatch(fetchAddAlbum(token, titles, sub, tag, newThumb))
            })
                .catch(error => {
                    toast.error("Upload Image Failed !");
                })
        } else {
            errors.showMessages();
        }
    }

    const submitButton = () => {
        if (loadingStatus == false) {
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
            <Breadcrumb title="Album Page" parent="Dashboard" />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="card">
                            <div className="card-header">
                                <h5>Add Album</h5>
                            </div>
                            <div className="card-body">
                                {/* content form */}
                                <form className="needs-validation" noValidate="" onSubmit={handleSubmit(onSubmit)}>
                                    <div className="row justify-content-center">
                                        <div className="col-md-6 col-sm-12">
                                            <div className="form-row">
                                                <div className="col-md-12 mb-3">
                                                    <label>{"Title"}</label>
                                                    <input className="form-control" name="title" type="text" placeholder="Title" ref={register({ required: true })} onChange={(e) => setTitles(e.target.value)} />
                                                    <span>{errors.title && 'Title is required'}</span>
                                                    <div className="valid-feedback">{"Looks good!"}</div>
                                                </div>
                                                <div className="col-md-12 mb-3">
                                                    <label>{"Sub-title"}</label>
                                                    <input className="form-control" name="sub_title" type="text" placeholder="Sub-title" ref={register({ required: true })} onChange={(e) => setSub(e.target.value)} />
                                                    <span>{errors.sub_title && 'Sub-title is required'}</span>
                                                    <div className="valid-feedback">{"Looks good!"}</div>
                                                </div>
                                                <div className="col-md-12 mb-3">
                                                    <label>{"Tag Banner"}</label>
                                                    <select className="form-control" name="tag" type="select" placeholder="Tag Banner" ref={register({ required: true })} onChange={(e) => setTag(e.target.value)} >
                                                        <option disabled selected>-Pilih-</option>
                                                        {tagBanner.map((tag) => (
                                                            <option value={tag.Tag}>{tag.Tag}</option>
                                                        ))}
                                                    </select>
                                                    <span>{errors.tag && 'Level is required'}</span>
                                                    <div className="valid-feedback">{"Looks good!"}</div>
                                                </div>
                                                <div className="col-md-12 mb-3">
                                                    <label>{"UploadFile"}</label>
                                                    <input className="form-control" type="file" accept="image/*" onChange={(e) => setImg(e.target.files[0])} />
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

export default AddAlbum