import React, { Fragment, useState, useEffect } from 'react';
import Breadcrumb from '../../components/common/breadcrumb';
import useForm from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { fetchAddPaket } from "../../redux/paket/action";
import { uploadImage, toIsoString } from "../../helper/index";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';
import { EditorState, ContentState, convertToRaw, convertFromRaw } from 'draft-js';
import { fetchDonasiKategori } from '../../redux/donasiKategori/action'

const AddDonasi = () => {

    const { register, handleSubmit, errors } = useForm();
    const dispatch = useDispatch();
    
    let token = localStorage.getItem('token');

    useEffect(() => {
        dispatch(fetchDonasiKategori(token))
    },[])

    const [ titles, setTitles] = useState("");
    const [ sub, setSub] = useState("");
    const [ tag, setTag] = useState("");
    const [ desc, setDesc] = useState("");
    const [ img, setImg] = useState();
    const [ benefit, setBenefit] = useState("");
    const [ donasiType, setDonasiType] = useState();

    const categories = useSelector((state) => state.donasiKategoriReducer.donasiKategori);
    const loadingStatus = useSelector((state) => state.donasiReducer.loading);

    let _contentState = EditorState.createEmpty("");
    const [editorState, setEditorState] = useState(_contentState)
    const content = draftToHtml(convertToRaw(editorState.getCurrentContent()))

    const onSubmit = data => {
        console.log(data)
        // if (data !== '') {
        //     uploadImage(img).then(message => {
        //         const newThumb = message.response.data.url;
        //         dispatch(fetchAddPaket(token, titles, sub, tag, donasiType, benefit, newThumb, desc, content))
        //     })
        //     .catch(error => {
        //         toast.error("Upload Image Failed !");
        //     })
        // } else {
        //     errors.showMessages();
        // }
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
                                                <input className="form-control" name="tag" type="text" placeholder="Tag" ref={register({ required: true })} onChange={(e) => setTag(e.target.value)} />
                                                <span>{errors.tag && 'Tag is required & Min 6 Character'}</span>
                                                <div className="valid-feedback">{"Looks good!"}</div>
                                            </div>
                                            <div className="col-md-12 mb-3">
                                                <label>{"Benefit"}</label>
                                                <input className="form-control" name="benefit" type="text" placeholder="Benefit" onChange={(e) => setBenefit(e.target.value)} />
                                                <span>{errors.benefit && 'Benefit is required'}</span>
                                                <div className="valid-feedback">{"Looks good!"}</div>
                                            </div>
                                            <div className="col-md-12 mb-3">
                                                <label>{"Description"}</label>
                                                {/* <input className="form-control" name="desc" type="text" placeholder="Description" onChange={(e) => setDesc(e.target.value)} /> */}
                                                <textarea className="form-control" name="desc" rows="5" cols="5" placeholder="Default textarea" onChange={(e) => setDesc(e.target.value)}></textarea>
                                                {/* <span>{errors.description && 'Description is required'}</span> */}
                                                <div className="valid-feedback">{"Looks good!"}</div>
                                            </div>
                                            <div className="col-md-12 mb-3">
                                                <label>Donation Type</label>
                                                <select className="form-control" name="type" id="donasiType" ref={register({ required: true })} onChange={(e) => setDonasiType(e.target.value)}>
                                                    {/* {donasiTypes} */}
                                                    <option value={""}> --- </option>
                                                    {categories.map((cat, index) => <option key={index} value={cat.id}>{cat.kategori_name}</option>)}
                                                </select>
                                                <span style={{color:"#ff5370"}}>{errors.type && 'Type is required'}</span>
                                                <div className="valid-feedback">{"Looks good!"}</div>
                                            </div>
                                                
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

export default AddDonasi