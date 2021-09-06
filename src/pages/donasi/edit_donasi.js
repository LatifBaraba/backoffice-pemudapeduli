import React, { Fragment, useState, useEffect } from 'react';
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
import { addCommas, removeNonNumeric} from '../../helper/index'
import { fetchQris } from "../../redux/qris/action";
import { Form} from "react-bootstrap";
import { fetchPenggalang } from "../../redux/penggalang/action";

const EditDonasi = (props) => {

    const { data } = props.location.state;
    // console.log(data)
    
    let token = localStorage.getItem('token');
    useEffect(() => {
        setTarget(target && addCommas(target))
        dispatch(fetchQris(token))
        dispatch(fetchPenggalang(token))
    }, [])

    console.log(data)
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
    const [ show, setShow] = useState(data.is_show);
    const [ ayoBantu, setAyoBantu] = useState(data.ayobantu_link);
    const [ kitaBisa, setKitaBisa] = useState(data.kitabisa_link);
    const [tipebayar, setTipeBayar] = useState(data.id_pp_cp_master_qris + '_' + data.qris_image_url);
    const [qrisimage, setQrisimage] = useState(data.qris_image_url);
    const [penggalang, setPenggalang] = useState(data.id_pp_cp_penggalang_dana);
 
    const loadingStatus = useSelector((state) => state.donasiReducer.loading);

    const dispatch = useDispatch();
    const qrisData = useSelector((state) => state.qrisReducer.qris);
    const penggalangData = useSelector((state) => state.penggalangReducer.penggalang);
    const { register, handleSubmit, errors } = useForm();

    console.log(penggalangData)
    
    
    const blocksFromHtml = htmlToDraft(data.content);
    const { contentBlocks, entityMap } = blocksFromHtml;
    const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
    const existing = EditorState.createWithContent(contentState);

    let initialState = EditorState.createEmpty();
    const [editorState, setEditorState] = useState(contentState ? existing : initialState)
    const newContent = draftToHtml(convertToRaw(editorState.getCurrentContent()))

    
    // console.log(moment(validFrom).format('YYYY-MM-DDTHH:mm:ss'))
    // console.log(target, 'targetnya')
    // console.log(qrisData)
   
    const onSubmit = data => {
        
        let startDate = toIsoString(new Date(validFrom))
        let endDate = toIsoString(new Date(validTo))

        let str = tipebayar 
        const id_pp_cp_master_qris = str.split("_")
        const qris_image_url = str.split("_")        

        if (data !== '') {
            if (img !== '') {
                uploadImage(img).then(message => {
                    const newThumb = message.response.data.url;
                    dispatch(fetchEditDonasi(token, id, titles, sub, tag, startDate, endDate, removeNonNumeric(target), 
                        // donasiType, 
                        newThumb, desc, newContent, show, ayoBantu, kitaBisa, id_pp_cp_master_qris[0], qris_image_url[1], penggalang))
                })
                .catch(error => {
                    toast.error("Upload Image Failed !");
                })
            } else {
                const newThumb = thumb;
                dispatch(fetchEditDonasi(token, id, titles, sub, tag, startDate, endDate, removeNonNumeric(target), 
                    // donasiType, 
                    newThumb, desc, newContent, show, ayoBantu, kitaBisa, id_pp_cp_master_qris[0], qris_image_url[1], penggalang))
            }
        } else {
            errors.showMessages();
        }
    }

    const handleChange = e => {
        setTarget(addCommas(removeNonNumeric(e.target.value)));
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
                                                <textarea className="form-control" name="desc" rows="5" cols="5" placeholder="Description" onChange={(e) => setDesc(e.target.value)}>{desc}</textarea>
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
                                                <input className="form-control" name="target" type="text" placeholder="Target Total Donasi" value={target} ref={register({ required: true })} 
                                                onInput={handleChange} />
                                                <span>{errors.target && 'Target is required'}</span>
                                                <div className="valid-feedback">{"Looks good!"}</div>
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
                                                <label>{"AyoBantu Link"}</label>
                                                <input className="form-control" name="ayobantu" type="url" value={ayoBantu} onChange={(e) => setAyoBantu(e.target.value)}/>
                                                <span>{errors.ayobantu && 'Link is required'}</span>
                                                <div className="valid-feedback">{"Looks good!"}</div>
                                            </div>
                                            <div className="col-md-12 mb-3">
                                                <label>{"KitaBisa Link"}</label>
                                                <input className="form-control" name="kitabisa" type="url" value={kitaBisa} onChange={(e) => setKitaBisa(e.target.value)}/>
                                                <span>{errors.kitabisa && 'Link is required'}</span>
                                                <div className="valid-feedback">{"Looks good!"}</div>
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
                                           
                                            <div className="col-md-12 mb-3">
                                                <label>{"Pilih Penggalang Dana"}</label>
                                                
                                                <Form.Group controlId="formPenggalangDana">                                                
                                                <Form.Control
                                                    required
                                                    as="select"
                                                    type="select"
                                                    onChange={(e) => setPenggalang(e.target.value)}   
                                                    >
                                                    <option value="">Pilih Penggalang Dana</option>                                                        
                                                    {penggalangData.map((penggalangs, index) => (                                                        
                                                            
                                                            penggalangs.IDPPCPPenggalangDana == penggalang ? (
                                                        <option key={index} value={penggalangs.IDPPCPPenggalangDana} selected>{penggalangs.Name}</option>
                                                        ):(
                                                        <option key={index} value={penggalangs.IDPPCPPenggalangDana} >{penggalangs.Name}</option>
                                                        )                                                    
                                                    ))}
                                                        
                                                </Form.Control>                                                                                                
                                                </Form.Group>
                                                {/* <img src={qrisimage} alt={qrisimage} style={{width: 100}}/>                                             */}
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