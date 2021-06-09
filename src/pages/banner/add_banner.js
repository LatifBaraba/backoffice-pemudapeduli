import React, { Fragment, useState } from 'react';
import Breadcrumb from '../../components/common/breadcrumb';
import useForm from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { fetchAddBanner } from "../../redux/banner/action";
import { uploadImage } from "../../helper/index";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { Editor } from 'react-draft-wysiwyg';
// import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
// import draftToHtml from 'draftjs-to-html';
// import { EditorState, ContentState, convertToRaw, convertFromRaw } from 'draft-js';

const AddBanner = () => {

    const { register, handleSubmit, errors } = useForm();
    const dispatch = useDispatch();
    
    let token = localStorage.getItem('token');

    const [ titles, setTitles] = useState("");
    const [ sub, setSub] = useState("");
    const [ titContent, setTitContent] = useState("");
    const [ desc, setDesc] = useState("");
    const [ titleLeft, setTitleLeft] = useState("");
    const [ titleRight, setTitleRight] = useState("");
    const [ deepLeft, setDeepLeft] = useState("");
    const [ deepRight, setDeepRight] = useState("");
    const [ img, setImg] = useState();

    const loadingStatus = useSelector((state) => state.bannerReducer.loading);

    // let _contentState = EditorState.createEmpty("");
    // const [editorState, setEditorState] = useState(_contentState)
    // const desc = draftToHtml(convertToRaw(editorState.getCurrentContent()))

    const onSubmit = data => {
        if (data !== '') {
            uploadImage(img).then(message => {
                const newThumb = message.response.data.url;
                dispatch(fetchAddBanner(token, titles, sub, titContent, titleLeft, titleRight, deepLeft, deepRight, newThumb, desc))
            })
            .catch(error => {
                toast.error("Upload Image Failed !");
            })
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
                                                <label>{"Title-content"}</label>
                                                <input className="form-control" name="title_content" type="text" placeholder="Title-content" ref={register({ required: true, maxLength: 6 })} onChange={(e) => setTitContent(e.target.value)} />
                                                <span>{errors.title_content && 'Password is required & Min 6 Character'}</span>
                                                <div className="valid-feedback">{"Looks good!"}</div>
                                            </div>
                                            {/* </div> */}
                                            <div className="col-md-12 mb-3">
                                                <label>{"Description"}</label>
                                                <input className="form-control" name="desc" type="text" placeholder="Description" ref={register({ required: true })} onChange={(e) => setDesc(e.target.value)} />
                                                <span>{errors.description && 'Description is required'}</span>
                                                <div className="valid-feedback">{"Looks good!"}</div>
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <label>{"Title Button Left"}</label>
                                                <input className="form-control" name="titleBtnLeft" type="text" placeholder="Title Left" ref={register({ required: true })} onChange={(e) => setTitleLeft(e.target.value)} />
                                                <span>{errors.titleBtnLeft && 'Title Button Left is required'}</span>
                                                <div className="valid-feedback">{"Looks good!"}</div>
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <label>{"Link Button Left"}</label>
                                                <input className="form-control" name="deepLinkLeft" type="text" placeholder="Link Left" ref={register({ required: true })} onChange={(e) => setDeepLeft(e.target.value)} />
                                                <span>{errors.deepLinkLeft && 'Link Button Left is required'}</span>
                                                <div className="valid-feedback">{"Looks good!"}</div>
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <label>{"Title Button Right"}</label>
                                                <input className="form-control" name="titleBtnRight" type="text" placeholder="Title Right" ref={register({ required: true })} onChange={(e) => setTitleRight(e.target.value)} />
                                                <span>{errors.titleBtnRight && 'Title Button Right is required'}</span>
                                                <div className="valid-feedback">{"Looks good!"}</div>
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <label>{"Link Button Right"}</label>
                                                <input className="form-control" name="deepLinkRight" type="text" placeholder="Link Right" ref={register({ required: true })} onChange={(e) => setDeepRight(e.target.value)} />
                                                <span>{errors.deepLinkRight && 'Link Button Right is required'}</span>
                                                <div className="valid-feedback">{"Looks good!"}</div>
                                            </div>
                                            {/* <div className="col-md-12 mb-3">
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
                                            </div> */}
                                            <div className="col-md-12 mb-3">
                                                <label>{"UploadFile"}</label>
                                                <input className="form-control" type="file" accept="image/*" onChange={(e) => setImg(e.target.files[0])}/>
                                            </div>
                                            {/* <div className="col-md-12 mb-3">
                                                <Editor
                                                    editorState={editorState}
                                                    toolbarClassName="toolbarClassName"
                                                    wrapperClassName="wrapperClassName"
                                                    editorClassName="editorClassName"
                                                    onEditorStateChange={setEditorState}
                                                />
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

export default AddBanner