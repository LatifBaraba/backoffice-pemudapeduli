import React, { Fragment, useState } from 'react';
import Breadcrumb from '../../components/common/breadcrumb';
import useForm from "react-hook-form";
import { useDispatch } from 'react-redux';
import { fetchEditBanner } from "../../redux/banner/action";
import uploadImage from "../../helper/index";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import {
    EditorState,
    ContentState,
    convertToRaw,
} from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

const EditBanner = (props) => {

    const { data } = props.location.state;
    console.log(data)
    const [ id, setId] = useState(data.id);
    const [ titles, setTitles] = useState(data.title);
    const [ sub, setSub] = useState(data.sub_title);
    const [ titContent, setTitContent] = useState(data.title_content);
    const [ thumb, setThumb] = useState(data.thumbnail_image_url);
    const [ img, setImg] = useState();

    const dispatch = useDispatch();
    let token = localStorage.getItem('token');
    const { register, handleSubmit, errors } = useForm();

    const blocksFromHtml = htmlToDraft(data.description);
    const { contentBlocks, entityMap } = blocksFromHtml;
    const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
    const existing = EditorState.createWithContent(contentState);

    let initialState = EditorState.createEmpty();
    const [editorState, setEditorState] = useState(contentState ? existing : initialState)
    const desc = draftToHtml(convertToRaw(editorState.getCurrentContent()))
    
    const SubmitEdit = () => {
        uploadImage(img).then(message => {
            const newThumb = message.response.data.url;
            dispatch(fetchEditBanner(token, id, titles, sub, titContent, newThumb, desc))
        })
        .catch(error => {
            toast.error("Upload Image Failed !");
        })
    }

    return (
        <Fragment>
            <Breadcrumb title="Banner Page" parent="Dashboard" />
            <div className="container-fluid">
            <div className="row">
                <div className="col-sm-12">
                    <div className="card">
                        <div className="card-header">
                            <h5>Edit Banner</h5>    
                        </div>
                        <div className="card-body">
                            {/* content form */}
                            {/* <form className="needs-validation" noValidate="" onSubmit={handleSubmit(onSubmit)}> */}
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
                                                <label>{"Sub-title"}</label>
                                                <input className="form-control" name="sub_title" type="text" placeholder="Sub-title" value={sub} ref={register({ required: true })} onChange={(e) => setSub(e.target.value)} />
                                                <span>{errors.sub_title && 'Sub-title is required'}</span>
                                                <div className="valid-feedback">{"Looks good!"}</div>
                                            </div>
                                            <div className="col-md-12 mb-3">
                                                <label>{"Title-content"}</label>
                                                <input className="form-control" name="title_content" type="text" placeholder="Title-content" value={titContent} ref={register({ required: true, maxLength: 6 })} onChange={(e) => setTitContent(e.target.value)} />
                                                <span>{errors.title_content && 'Title Content is required & Min 6 Character'}</span>
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
                                            <div className="col-md-12 mb-3">
                                                <Editor
                                                    editorState={editorState}
                                                    toolbarClassName="toolbarClassName"
                                                    wrapperClassName="wrapperClassName"
                                                    editorClassName="editorClassName"
                                                    onEditorStateChange={setEditorState}
                                                />
                                            </div>
                                        </div>
                                        <button className="btn btn-pill btn-primary btn-block mt-3 mb-3" onClick={() => {SubmitEdit()}}>{"Submit"}</button>
                                    </div>
                                </div>
                            {/* </form> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Fragment>
    );
}

export default EditBanner