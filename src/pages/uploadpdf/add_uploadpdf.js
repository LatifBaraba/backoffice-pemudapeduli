import React, { Fragment, useEffect, useState } from 'react';
import Breadcrumb from '../../components/common/breadcrumb';
import useForm from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { fetchAddBanner, fetchTagBerita } from "../../redux/banner/action";
import { uploadFile, uploadImage } from "../../helper/index";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddUploadPdf = () => {
    const dispatch = useDispatch()
    const { register, handleSubmit, errors } = useForm();

    let token = localStorage.getItem('token');

    const [titles, setTitles] = useState("");
    const [sub, setSub] = useState("");
    const [titContent, setTitContent] = useState("");
    const [desc, setDesc] = useState("");
    const [titleLeft, setTitleLeft] = useState("");
    const [titleRight, setTitleRight] = useState("");
    const [deepLeft, setDeepLeft] = useState("");
    const [deepRight, setDeepRight] = useState("");
    const [pdf, setPdf] = useState();
    const [tag, setTag] = useState()

    useEffect(() => {
        dispatch(fetchTagBerita(token))
    }, [token, dispatch])
    const loadingStatus = useSelector((state) => state.bannerReducer.loading);
    const tagBanner = useSelector((state) => state.bannerReducer.tag);

    // let _contentState = EditorState.createEmpty("");
    // const [editorState, setEditorState] = useState(_contentState)
    // const desc = draftToHtml(convertToRaw(editorState.getCurrentContent()))

    const onSubmit = data => {
        if (data !== '') {
            uploadFile(pdf).then(message => {
                console.log(message)
                toast.success("Upload File Success !");
                // const newThumb = message.response.data.url;
                // dispatch(fetchAddAlbum(token, titles, sub, tag, newThumb))
            })
                .catch(error => {
                    toast.error("Upload File Failed !");
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
            <Breadcrumb title="File Page" parent="Dashboard" />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="card">
                            <div className="card-header">
                                <h5>Add File</h5>
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
                                                    <label>{"UploadFile"}</label>
                                                    <input className="form-control" type="file" accept="pdf/*" onChange={(e) => setPdf(e.target.files[0])} />
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

export default AddUploadPdf