import React, { Fragment, useState, useEffect } from 'react';
import Breadcrumb from '../../components/common/breadcrumb';
import useForm from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { fetchEditPaket } from "../../redux/paket/action";
import { uploadImage, toIsoString } from "../../helper/index";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import moment from 'moment/moment.js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { fetchDonasiKategori } from '../../redux/donasiKategori/action'
import {
    EditorState,
    ContentState,
    convertToRaw,
} from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { fetchQris } from "../../redux/qris/action";
import { Form} from "react-bootstrap";

const EditDonasi = (props) => {

    const { data } = props.location.state;
    console.log(data)
    useEffect(() => {
        dispatch(fetchDonasiKategori(token))
        dispatch(fetchQris(token))
    },[])

    const [ id, setId] = useState(data.id);
    const [ titles, setTitles] = useState(data.title);
    const [ sub, setSub] = useState(data.sub_title);
    const [ tag, setTag] = useState(data.tag);
    const [ thumb, setThumb] = useState(data.thumbnail_image_url);
    const [ desc, setDesc] = useState(data.description);
    const [ img, setImg] = useState('');
    const [ benefit, setBenefit] = useState(data.benefit);
    const [ donasiType, setDonasiType] = useState(data.id_kategori);
    const [ show, setShow] = useState(data.is_show);
    const [tipebayar, setTipeBayar] = useState(data.id_pp_cp_master_qris + '_' + data.qris_image_url);
    const [qrisimage, setQrisimage] = useState(data.qris_image_url);

    const qrisData = useSelector((state) => state.qrisReducer.qris);
    const categories = useSelector((state) => state.donasiKategoriReducer.donasiKategori);
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
    
    const onSubmit = data => {

        let str = tipebayar 
        const id_pp_cp_master_qris = str.split("_")
        const qris_image_url = str.split("_")

        if (data !== '') {
            if (img !== '') {
                uploadImage(img).then(message => {
                    const newThumb = message.response.data.url;
                    dispatch(fetchEditPaket(id, token, titles, sub, tag, donasiType, benefit, newThumb, desc, newContent, show,  id_pp_cp_master_qris[0], qris_image_url[1]))
                })
                .catch(error => {
                    toast.error("Upload Image Failed !");
                })
            } else {
                const newThumb = thumb;
                dispatch(fetchEditPaket(id, token, titles, sub, tag, donasiType, benefit, newThumb, desc, newContent, show, id_pp_cp_master_qris[0], qris_image_url[1]))
            }
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
                                                {/* <input className="form-control" name="description" type="text" placeholder="Description" value={desc} onChange={(e) => setDesc(e.target.value)} /> */}
                                                <textarea className="form-control" name="desc" rows="5" cols="5" placeholder="Default textarea" value={desc} onChange={(e) => setDesc(e.target.value)}></textarea>
                                                <span>{errors.description && 'Description is required'}</span>
                                                <div className="valid-feedback">{"Looks good!"}</div>
                                            </div>
                                            <div className="col-md-12 mb-3">
                                                <label>{"Benefit"}</label>
                                                <input className="form-control" name="benefit" type="text" placeholder="Benefit" value={benefit} onChange={(e) => setBenefit(e.target.value)} />
                                                <span>{errors.benefit && 'Benefit is required'}</span>
                                                <div className="valid-feedback">{"Looks good!"}</div>
                                            </div>
                                            <div className="col-md-12 mb-3">
                                                <label>Donation Type</label>
                                                {/* <select className="form-control digits" id="donasiType" defaultValue={data.id_kategori} onChange={(e) => setDonasiType(e.target.value)}>                                                    
                                                    {categories.map((cat, index) => 
                                                        <option key={index} value={cat.id}>{cat.kategori_name}</option>
                                                    )}
                                                </select> */}
                                                <Form.Group controlId="formDonasiType">                                                
                                                <Form.Control
                                                    required
                                                    as="select"
                                                    type="select"
                                                    onChange={(e) => setDonasiType(e.target.value)}      
                                                    >
                                                    <option value="">Pilih Tipe Donasi</option>                                                        
                                                    {categories.map((cat, index) => (
                                                    
                                                        cat.id == donasiType ? (
                                                        <option key={index} value={cat.id} selected>{cat.kategori_name}</option>
                                                        ):(
                                                        <option key={index} value={cat.id} >{cat.kategori_name}</option>
                                                        )
                                                        
                                                        ))}
                                                </Form.Control>                                                                                                                                                
                                                </Form.Group>
                                            </div>
                                             <div className="col-md-12 mb-3">
                                                <label>{"Pilih QRIS"}</label>
                                                <Form.Group controlId="formTipeBayar">                                                
                                                <Form.Control
                                                    required
                                                    as="select"
                                                    type="select"
                                                    onChange={(e) => setTipeBayar(e.target.value)}      
                                                    >
                                                    <option value="">Pilih QRIS</option>                                                        
                                                    {qrisData.map((qris, index) => (
                                                    
                                                        qris.id == tipebayar.split("_")[0] ? (
                                                        <option key={index} value={qris.id + '_' + qris.thumbnail_image_url } selected>{qris.description}</option>
                                                        ):(
                                                        <option key={index} value={qris.id + '_' + qris.thumbnail_image_url } >{qris.description}</option>
                                                        )
                                                        
                                                        ))}
                                                </Form.Control>                                                                                                
                                                </Form.Group>
                                                <img src={qrisimage} alt={qrisimage} style={{width: 100}}/>                                                                                         
                                            </div>  
                                            <div className="col-md-12 mb-3">
                                                <label>Showing</label>
                                                <select className="form-control" name="show" defaultValue={data.is_show} ref={register({ required: true })} onChange={(e) => setShow(e.target.value)}>
                                                    <option value={false}>Unshow</option>
                                                    <option value={true}>Show</option>
                                                </select>
                                                <span style={{color:"#ff5370"}}>{errors.show && 'Show is required'}</span>
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

export default EditDonasi