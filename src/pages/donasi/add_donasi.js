import React, { Fragment, useState, useEffect } from 'react';
import Breadcrumb from '../../components/common/breadcrumb';
import useForm from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { fetchAddDonasi } from "../../redux/donasi/action";
import { uploadImage, toIsoString } from "../../helper/index";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';
import { EditorState, ContentState, convertToRaw, convertFromRaw } from 'draft-js';
import { addCommas, removeNonNumeric} from '../../helper/index'
import { Form} from "react-bootstrap";
import { fetchQris } from "../../redux/qris/action";

const AddDonasi = () => {

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
    const [ target, setTarget] = useState("");
    const [ ayoBantu, setAyoBantu] = useState("");
    const [ kitaBisa, setKitaBisa] = useState("");
    // const [ donasiType, setDonasiType] = useState("Rutin");
    const [tipebayar, setTipeBayar] = useState("");
    const [qrisimage, setQrisimage] = useState("");

    const loadingStatus = useSelector((state) => state.donasiReducer.loading);
    const qrisData = useSelector((state) => state.qrisReducer.qris);

    let _contentState = EditorState.createEmpty("");
    const [editorState, setEditorState] = useState(_contentState)
    const content = draftToHtml(convertToRaw(editorState.getCurrentContent()))

    useEffect(() => {
        dispatch(fetchQris(token))
    }, [])

    const onSubmit = data => {
        const startDate = toIsoString(new Date(validFrom))
        const endDate = toIsoString(new Date(validTo))        

        let str = tipebayar 
        const id_pp_cp_master_qris = str.split("_")
        const qris_image_url = str.split("_")

        if (data !== '') {
            uploadImage(img).then(message => {
                const newThumb = message.response.data.url
                const newTarget = target.split('.').join("")
                dispatch(fetchAddDonasi(token, titles, sub, tag, startDate, endDate, newTarget, 
                    // donasiType, 
                    newThumb, desc, content, ayoBantu, kitaBisa, id_pp_cp_master_qris[0], qris_image_url[1]))
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
    
    const handleChange = e => {
        setTarget(addCommas(removeNonNumeric(e.target.value)));
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
                                                <input className="form-control" name="tag" type="text" placeholder="Tag" ref={register({ required: true, minLength: 6 })} onChange={(e) => setTag(e.target.value)} />
                                                <span>{errors.tag && 'Tag is required & Min 6 Character'}</span>
                                                <div className="valid-feedback">{"Looks good!"}</div>
                                            </div>
                                            <div className="col-md-12 mb-3">
                                                <label>{"Description"}</label>
                                                {/* <input className="form-control" name="desc" type="text" placeholder="Description" onChange={(e) => setDesc(e.target.value)} /> */}
                                                <textarea className="form-control" name="desc" rows="5" cols="5" placeholder="Description" onChange={(e) => setDesc(e.target.value)}></textarea>
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
                                            {/* <div className="col-md-12 mb-3">
                                                <label>{"Target"}</label>
                                                <input className="form-control" name="target" type="number" placeholder="Target Total Donasi" ref={register({ required: true })} 
                                                onKeyUp={(e) => targetRp(e.target.value)} onChange={(e) => setTarget(e.target.value)} />
                                                <span>{errors.target && 'Target is required'}</span>
                                                <div className="valid-feedback">{"Looks good!"}</div>
                                            </div> */}
                                            <div className="col-md-12 mb-3">
                                                <label>{"Target"}</label>
                                                <input className="form-control" name="target" type="text" value={target} placeholder="Target Total Donasi" ref={register({ required: true })} 
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
                                                    // {...register("tipebayar", {
                                                    //   required: true,
                                                    // })}          
                                                    
                                                >
                                                    <option value="">Pilih QRIS</option>
                                                    {/* <option value="mandiri">Rekening Mandiri</option>
                                                    <option value="qris">QRIS</option> */}
                                                    {qrisData.map((qris, index) => 
                                                        <option key={index} value={qris.id + '_' + qris.thumbnail_image_url } >{qris.description}</option>)}
                                                </Form.Control>                                            
                                            </Form.Group>
                                            </div>                                            
                                            {/* <div className="col-md-12 mb-3">
                                                <label>Donation Type</label>
                                                <select className="form-control digits" id="donasiType" defaultValue="Rutin" onChange={(e) => setDonasiType(e.target.value)}>
                                                    <option value="Rutin">Rutin</option>
                                                    <option value="One Time">One Time</option>
                                                </select>
                                            </div> */}
                                            <div className="col-md-12 mb-3">
                                                <label>{"AyoBantu Link"}</label>
                                                <input className="form-control" name="ayobantu" type="url" placeholder="https://ayobantu.com/xxx" onChange={(e) => setAyoBantu(e.target.value)}/>
                                                <span>{errors.ayobantu && 'Link is required'}</span>
                                                <div className="valid-feedback">{"Looks good!"}</div>
                                            </div>
                                            <div className="col-md-12 mb-3">
                                                <label>{"KitaBisa Link"}</label>
                                                <input className="form-control" name="kitabisa" type="url" placeholder="https://kitabisa.com/xxx" onChange={(e) => setKitaBisa(e.target.value)}/>
                                                <span>{errors.kitabisa && 'Facebook Link is required'}</span>
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