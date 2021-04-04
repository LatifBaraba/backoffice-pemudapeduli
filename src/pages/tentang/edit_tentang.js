import React, { Fragment, useState } from 'react';
import Breadcrumb from '../../components/common/breadcrumb';
import useForm from "react-hook-form";
import { useDispatch } from 'react-redux';
import { fetchEditTentang } from "../../redux/tentang/action";
import uploadImage from "../../helper/index";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { EditorState, ContentState, convertToRaw, convertFromRaw } from 'draft-js';

const EditTentang = (props) => {

    const { data } = props.location.state;
    const [ id, setId] = useState(data.id);
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

    const onSubmit = data => {
        if (data !== '') {
            uploadImage(img).then(message => {
                const newThumb = message.response.data.url;
                dispatch(fetchEditTentang(token, id, newThumb, desc))
            })
            .catch(error => {
                toast.error("Upload Image Failed !");
            })
        } else {
            errors.showMessages();
        }
    }

    return (
        <Fragment>
            <Breadcrumb title="Tentang-Kami Page" parent="Dashboard" />
            <div className="container-fluid">
            <div className="row">
                <div className="col-sm-12">
                    <div className="card">
                        <div className="card-header">
                            <h5>Add Tentang-Kami</h5>    
                        </div>
                        <div className="card-body">
                            {/* content form */}
                            <form className="needs-validation" noValidate="" onSubmit={handleSubmit(onSubmit)}>
                                <div className="row justify-content-center">
                                    <div className="col-md-6 col-sm-12">
                                        <div className="form-row">
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
                                        <button className="btn btn-pill btn-primary btn-block mt-3 mb-3" type="submit">{"Submit"}</button>
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

export default EditTentang