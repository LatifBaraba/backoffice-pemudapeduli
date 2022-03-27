import React, { Fragment, useEffect, useState } from 'react';
import Breadcrumb from '../../components/common/breadcrumb';
import useForm from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { fetchEditBanner, fetchTagBerita } from "../../redux/banner/action";
import { uploadImage } from "../../helper/index";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchEditUploadPdf } from '../../redux/uploadpdf/action';

const EditUploadPdf = (props) => {
    const { data } = props.location.state;
    // console.log(data)
    const [id, setId] = useState(data.id);
    const [titles, setTitles] = useState(data.document[0].title);
    const [sub, setSub] = useState(data.sub_title);
    const [titContent, setTitContent] = useState(data.title_content);
    const [thumb, setThumb] = useState(data.thumbnail_image_url);
    const [desc, setDesc] = useState(data.description)
    const [titleLeft, setTitleLeft] = useState(data.title_button_left);
    const [titleRight, setTitleRight] = useState(data.title_button_right);
    const [deepLeft, setDeepLeft] = useState(data.deeplink_left);
    const [deepRight, setDeepRight] = useState(data.deeplink_right);
    const [tag, setTag] = useState(data.tag)
    const [img, setImg] = useState('');
    const [link, setLink] = useState(data.document[0].link_url);

    const loadingStatus = useSelector((state) => state.bannerReducer.loading);
    const tagBanner = useSelector((state) => state.bannerReducer.tag);


    const dispatch = useDispatch();
    let token = localStorage.getItem('token');
    const { register, handleSubmit, errors } = useForm();

    // useEffect(() => {
    //     dispatch(fetchTagBerita(token))
    // }, [token, dispatch])
    // const blocksFromHtml = htmlToDraft(data.description);
    // const { contentBlocks, entityMap } = blocksFromHtml;
    // const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
    // const existing = EditorState.createWithContent(contentState);

    // let initialState = EditorState.createEmpty();
    // const [editorState, setEditorState] = useState(contentState ? existing : initialState)
    // const desc = draftToHtml(convertToRaw(editorState.getCurrentContent()))

    const onSubmit = data => {
        if (data !== '') {
            // if (img !== '') {
            //     uploadImage(img).then(message => {
            //         const newThumb = message.response.data.url;
                    dispatch(fetchEditUploadPdf(token, id, titles, link))
                // })
                //     .catch(error => {
                //         toast.error("Upload Image Failed !");
                //     })
            // } else {
            //     const newThumb = thumb;
            //     dispatch(fetchEditBanner(token, id, titles, sub, titContent, titleLeft, titleRight, deepLeft, deepRight, newThumb, desc, tag))
            // }
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
            <Breadcrumb title="Upload PDF Page" parent="Dashboard" />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="card">
                            <div className="card-header">
                                <h5>Edit Upload PDF</h5>
                            </div>
                            <div className="card-body">
                                {/* content form */}
                                <form className="needs-validation" noValidate="" onSubmit={handleSubmit(onSubmit)}>
                                    <div className="row justify-content-center">
                                        <div className="col-md-6 col-sm-12">
                                            <div className="form-row">
                                                <div className="col-md-12 mb-3">
                                                    <label>{"Title"}</label>
                                                    <input className="form-control" name="title" type="text" placeholder="Title" value={titles} ref={register({ required: true })} onChange={(e) => setTitles(e.target.value)} />
                                                    <span>{errors.title && 'Title is required'}</span>
                                                    <div className="valid-feedback">{"Looks good!"}</div>
                                                </div>
                                                <div className="col-md-12 mb-3">
                                                    <label>{"Link"}</label>
                                                    <input className="form-control" name="link" type="text" placeholder="Link" value={link} ref={register({ required: true })} onChange={(e) => setLink(e.target.value)} />
                                                    <span>{errors.link && 'Link is required'}</span>
                                                    <div className="valid-feedback">{"Looks good!"}</div>
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

export default EditUploadPdf