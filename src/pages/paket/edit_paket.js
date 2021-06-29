import React, { Fragment, useState } from 'react';
import Breadcrumb from '../../components/common/breadcrumb';
import useForm from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { fetchEditDonasi } from "../../redux/donasi/action";
import { uploadImage, toIsoString } from "../../helper/index";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import moment from 'moment/moment.js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import {
    EditorState,
    ContentState,
    convertToRaw,
} from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

const EditDonasi = (props) => {

    const { data } = props.location.state;

    const [ id, setId] = useState(data.id);
    const [ titles, setTitles] = useState(data.title);
    const [ sub, setSub] = useState(data.sub_title);
    const [ tag, setTag] = useState(data.tag);
    const [ thumb, setThumb] = useState(data.thumbnail_image_url);
    const [ desc, setDesc] = useState(data.description);
    const [ img, setImg] = useState('');
    const [ validFrom, setValidFrom] = useState(data.valid_from);
    const [ validTo, setValidTo] = useState(data.valid_to);
    const [ target, setTarget] = useState(data.target);
    // const [ donasiType, setDonasiType] = useState(data.donasi_type);
 
    const loadingStatus = useSelector((state) => state.donasiReducer.loading);

    const dispatch = useDispatch();
    let token = localStorage.getItem('token');
    const { register, handleSubmit, errors } = useForm();

    const blocksFromHtml = htmlToDraft(data.content);
    const { contentBlocks, entityMap } = blocksFromHtml;
    const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
    const existing = EditorState.createWithContent(contentState);

    let initialState = EditorState.createEmpty();
    const [editorState, setEditorState] = useState(contentState ? existing : initialState)
    const newContent = draftToHtml(convertToRaw(editorState.getCurrentContent()))
    
    console.log(moment(validFrom).format('YYYY-MM-DDTHH:mm:ss'))

    const onSubmit = data => {
        
        let startDate = toIsoString(new Date(validFrom))
        let endDate = toIsoString(new Date(validTo))

        if (data !== '') {
            if (img !== '') {
                uploadImage(img).then(message => {
                    const newThumb = message.response.data.url;
                    dispatch(fetchEditDonasi(token, id, titles, sub, tag, startDate, endDate, target, 
                        // donasiType, 
                        newThumb, desc, newContent))
                })
                .catch(error => {
                    toast.error("Upload Image Failed !");
                })
            } else {
                const newThumb = thumb;
                dispatch(fetchEditDonasi(token, id, titles, sub, tag, startDate, endDate, target, 
                    // donasiType, 
                    newThumb, desc, newContent))
            }
        } else {
            errors.showMessages();
        }
    }

    // const selectDonasiType = (donasiType) => {
    //     if( donasiType == "Rutin") {
    //         return(
    //             <select class="form-control digits" id="donasiType" onChange={(e) => setDonasiType(e.target.value)}>
    //                 <option selected value="Rutin">Rutin</option>
    //                 <option value="One Time">One Time</option>
    //             </select>
    //         )
    //     }

    //     return(
    //         <select class="form-control digits" id="donasiType" onChange={(e) => setDonasiType(e.target.value)}>
    //             <option value="Rutin">Rutin</option>
    //             <option selected value="One Time">One Time</option>
    //         </select>
    //     )
        
    // }

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
                                                <label>{"Tag"}</label>
                                                <input className="form-control" name="tag" type="text" placeholder="Tag" value={tag} ref={register({ required: true })} onChange={(e) => setTag(e.target.value)} />
                                                <span>{errors.tag && 'Tag Content is required'}</span>
                                                <div className="valid-feedback">{"Looks good!"}</div>
                                            </div>
                                            <div className="col-md-12 mb-3">
                                                <label>{"Description"}</label>
                                                <input className="form-control" name="description" type="text" placeholder="Description" value={desc} onChange={(e) => setDesc(e.target.value)} />
                                                <span>{errors.description && 'Description is required'}</span>
                                                <div className="valid-feedback">{"Looks good!"}</div>
                                            </div>
                                            <div className="col-md-12 mb-3">
                                                <label>{"Valid-From"}</label>
                                                <input className="form-control" name="validfrom" type="datetime-local" placeholder="Start Date" value={moment(validFrom).format('YYYY-MM-DDTHH:mm:ss')} ref={register({ required: true })} onChange={(e) => setValidFrom(e.target.value)} />
                                                <span>{errors.validfrom && 'Valid-From is required'}</span>
                                                <div className="valid-feedback">{"Looks good!"}</div>
                                            </div>
                                            <div className="col-md-12 mb-3">
                                                <label>{"Valid-To"}</label>
                                                <input className="form-control" name="validto" type="datetime-local" placeholder="End Date" value={moment(validTo).format('YYYY-MM-DDTHH:mm:ss')} ref={register({ required: true })} onChange={(e) => setValidTo(e.target.value)} />
                                                <span>{errors.validto && 'Valid-To is required'}</span>
                                                <div className="valid-feedback">{"Looks good!"}</div>
                                            </div>
                                            <div className="col-md-12 mb-3">
                                                <label>{"Target"}</label>
                                                <input className="form-control" name="target" type="number" placeholder="Target Total Donasi" value={target} ref={register({ required: true })} onChange={(e) => setTarget(e.target.value)} />
                                                <span>{errors.target && 'Target is required'}</span>
                                                <div className="valid-feedback">{"Looks good!"}</div>
                                            </div>
                                            {/* <div className="col-md-12 mb-3">
                                                <label for="donasiType">Donation Type</label>
                                                {selectDonasiType(data.donasi_type)}
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

export default EditDonasi