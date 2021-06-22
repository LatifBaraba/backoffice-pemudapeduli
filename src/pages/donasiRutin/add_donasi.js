import React, { Fragment, useState } from 'react';
import Breadcrumb from '../../components/common/breadcrumb';
import useForm from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { fetchAddDonasi } from "../../redux/donasi/action";
import { uploadImage, toIsoString } from "../../helper/index";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { Editor } from 'react-draft-wysiwyg';
// import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
// import draftToHtml from 'draftjs-to-html';
// import { EditorState, ContentState, convertToRaw, convertFromRaw } from 'draft-js';

const AddDonasiRutin = () => {

    const { register, handleSubmit, errors } = useForm();
    const dispatch = useDispatch();
    
    let token = localStorage.getItem('token');

    const [ titles, setTitles] = useState("");
    const [ sub, setSub] = useState("");
    const [ tag, setTag] = useState("");
    const [ desc, setDesc] = useState("");
    const [ img, setImg] = useState();
    const [ validFrom, setValidFrom] = useState();
    const [ validTo, setValidTo] = useState();
    const [ target, setTarget] = useState();
    const [ donasiType, setDonasiType] = useState("Rutin");

    const loadingStatus = useSelector((state) => state.donasiReducer.loading);
    console.log(donasiType, 'tipe lama')

    // let _contentState = EditorState.createEmpty("");
    // const [editorState, setEditorState] = useState(_contentState)
    // const desc = draftToHtml(convertToRaw(editorState.getCurrentContent()))

    const onSubmit = data => {
        const startDate = toIsoString(new Date(validFrom))
        const endDate = toIsoString(new Date(validTo))

        if (data !== '') {
            uploadImage(img).then(message => {
                const newThumb = message.response.data.url;
                dispatch(fetchAddDonasi(token, titles, sub, tag, startDate, endDate, target, donasiType, newThumb, desc))
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
            <Breadcrumb title="Donasi Page" parent="Dashboard" />
            <div className="container-fluid">
            <div className="row">
                <div className="col-sm-12">
                    <div className="card">
                        <div className="card-header">
                            <h5>Add Donasi</h5>    
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
                                                <label>{"Tag"}</label>
                                                <input className="form-control" name="tag" type="text" placeholder="Tag" ref={register({ required: true, maxLength: 6 })} onChange={(e) => setTag(e.target.value)} />
                                                <span>{errors.tag && 'Tag is required & Min 6 Character'}</span>
                                                <div className="valid-feedback">{"Looks good!"}</div>
                                            </div>
                                            <div className="col-md-12 mb-3">
                                                <label>{"Description"}</label>
                                                <input className="form-control" name="desc" type="text" placeholder="Description" onChange={(e) => setDesc(e.target.value)} />
                                                {/* <span>{errors.description && 'Description is required'}</span> */}
                                                <div className="valid-feedback">{"Looks good!"}</div>
                                            </div>
                                            <div className="col-md-12 mb-3">
                                                <label>{"Valid-From"}</label>
                                                <input className="form-control" name="validfrom" type="datetime-local" placeholder="Start Date" ref={register({ required: true })} onChange={(e) => setValidFrom(e.target.value)} />
                                                <span>{errors.validfrom && 'Valid-From is required'}</span>
                                                <div className="valid-feedback">{"Looks good!"}</div>
                                            </div>
                                            <div className="col-md-12 mb-3">
                                                <label>{"Valid-To"}</label>
                                                <input className="form-control" name="validto" type="datetime-local" placeholder="End Date" ref={register({ required: true })} onChange={(e) => setValidTo(e.target.value)} />
                                                <span>{errors.validto && 'Valid-To is required'}</span>
                                                <div className="valid-feedback">{"Looks good!"}</div>
                                            </div>
                                            <div className="col-md-12 mb-3">
                                                <label>{"Target"}</label>
                                                <input className="form-control" name="target" type="number" placeholder="Target Total Donasi" ref={register({ required: true })} onChange={(e) => setTarget(e.target.value)} />
                                                <span>{errors.target && 'Target is required'}</span>
                                                <div className="valid-feedback">{"Looks good!"}</div>
                                            </div>
                                            <div className="col-md-12 mb-3">
                                                <label for="donasiType">Donation Type</label>
                                                <select class="form-control digits" id="donasiType" onChange={(e) => setDonasiType(e.target.value)}>
                                                    <option selected value="Rutin">Rutin</option>
                                                    <option value="One Time">One Time</option>
                                                </select>
                                            </div>
                                                
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

export default AddDonasiRutin