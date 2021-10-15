import React, { Fragment, useState } from 'react';
import Breadcrumb from '../../components/common/breadcrumb';
import useForm from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { fetchEditProgram, fetchDetailProgram, fetchEditIncidential } from "../../redux/program/action";
import { uploadImage } from "../../helper/index";
import { toast } from 'react-toastify';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { EditorState, ContentState, convertToRaw } from 'draft-js';
import {
    Form,
    FormGroup,
    Label,
    Input,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Row,
    Col,
    Button,
    Card,
    Modal,
} from 'reactstrap';

const EditProgram = (props) => {

    const { data, flag } = props.location.state;

    const dispatch = useDispatch();
    let token = localStorage.getItem('token');

    const loadingStatus = useSelector((state) => state.programReducer.loading);
    const [isOpen, setIsOpen] = useState(false)
    const [id, setId] = useState(data.id);
    const [titles, setTitles] = useState(data.title);
    const [sub, setSub] = useState(data.sub_title);
    const [tag, setTag] = useState(data.tag);
    const [thumb, setThumb] = useState(data.thumbnail_image_url);
    const [desc, setDesc] = useState(data.description);
    const [achievment, setAchievment] = useState(data.achievements);
    const [img, setImg] = useState('');

    const { register, handleSubmit, errors } = useForm();

    const blocksFromHtml = htmlToDraft(data.content);
    const { contentBlocks, entityMap } = blocksFromHtml;
    const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
    const existing = EditorState.createWithContent(contentState);

    let initialState = EditorState.createEmpty();
    const [editorState, setEditorState] = useState(contentState ? existing : initialState)
    const newContent = draftToHtml(convertToRaw(editorState.getCurrentContent()))
   
    const toggle = () => {
        setIsOpen(!isOpen);
    }
    const onChangeNameSetting = (e, index) => {
        var setname = e.target.value
        achievment[index].name = setname
    }

    const onChangeValueSetting = (e, index) => {
        var setvalue = e.target.value
        achievment[index].value = setvalue
    }
    const addSetting = () => {
        var totaldata = achievment.length + 1;
        let setObj = { name: "achievment " + totaldata, value: "" }
        let arrSet = achievment.concat(setObj)
        setAchievment(arrSet)
    }
    const saveSetting = () => {
        if (achievment.length === 0) {
            toast("warning", "Value tidak boleh kosong", "", "")
        } else {
            for (var i = 0; i < achievment.length; i += 1) {
                if (achievment[i].name === '') {
                    toast("warning", "Maaf name tidak boleh kosong", "", "")
                    return false
                }
                if (achievment[i].value === '') {
                    toast("warning ", "Maaf value tidak boleh kosong", "", "")
                    return false
                }
            }
            setAchievment([...achievment])
            setIsOpen(!isOpen);

        }
    }
    const deleteSetting = (e) => {
        var tes = e.target.value
        var setting = achievment
        if (tes > -1) {
            setting.splice(tes, 1);
            setAchievment([...achievment])

        }
    }
    const updateAchievment = () => {
        return (
            <>
                <Card>
                    <Form className="fgjg">
                        <FormGroup>
                            <Row className="justify-content-between">
                                <Col md="3">
                                    <Button className="btn" color="secondary" onClick={addSetting.bind()}>Add Achievment</Button>
                                </Col>
                                <Col md="3" className="text-right">
                                    <Button className="btn btn-submit" onClick={saveSetting.bind()}>Save Achievment</Button>
                                </Col>
                            </Row>
                        </FormGroup>
                    </Form>
                    <hr />
                    <Form className="fgjg" style={{ overflowX: 'hidden', overflowY: 'auto', height: '400px' }}>
                        {achievment && achievment.map((setting, index) => {
                            return (
                                <Row key={setting.name}>
                                    <Col md="6">
                                        <Row>
                                            <Col md="2">
                                                <FormGroup>
                                                    <Label></Label>
                                                    <Button className="btn" color="danger" value={index} onClick={deleteSetting.bind()}>x</Button>
                                                </FormGroup>
                                            </Col>
                                            <Col md="10">
                                                <FormGroup>
                                                    <Label>Name </Label>
                                                    <Input type="text" placeholder="Key Here" defaultValue={setting.label} onChange={(e) => onChangeNameSetting(e, index)} />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col md="6">
                                        <FormGroup>
                                            <Label>Value </Label>
                                            <Input type="text" placeholder="Value Here" defaultValue={setting.value} onChange={(e) => onChangeValueSetting(e, index)} />
                                        </FormGroup>
                                    </Col>
                                </Row>
                            )
                        })}
                    </Form>
                </Card>

            </>
        )
    }
    const onSubmit = data => {
        if (flag === "utama") {
            if (data !== '') {
                if (img == 'undefined') {
                    uploadImage(img).then(message => {
                        const newThumb = message.response.data.url;
                        dispatch(fetchEditProgram(token, id, titles, sub, tag, newContent, newThumb, desc, achievment))
                    })
                        .catch(error => {
                            toast.error("Upload Image Failed !");
                        })
                } else {
                    const newThumb = thumb;
                    dispatch(fetchEditProgram(token, id, titles, sub, tag, newContent, newThumb, desc, achievment))
                }
            } else {
                errors.showMessages();
            }
        }
        if (flag === "incidental") {
            if (data !== '') {
                if (img == 'undefined') {
                    uploadImage(img).then(message => {
                        const newThumb = message.response.data.url;
                        dispatch(fetchEditProgram(token, id, titles, sub, tag, newContent, newThumb, desc))
                    })
                        .catch(error => {
                            toast.error("Upload Image Failed !");
                        })
                } else {
                    const newThumb = thumb;
                    dispatch(fetchEditIncidential(token, id, titles, sub, tag, newContent, newThumb, desc))
                }
            } else {
                errors.showMessages();
            }
        }

    }

    const submitButton = () => {
        if (loadingStatus === false) {
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
            <Breadcrumb title="Program Page" parent="Dashboard" />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="card">
                            <div className="card-header">
                                <h5>Edit Program</h5>
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
                                                    <textarea className="form-control" name="desc" rows="5" cols="5" placeholder="Description" value={desc} onChange={(e) => setDesc(e.target.value)}></textarea>
                                                    <span>{errors.description && 'Description is required'}</span>
                                                    <div className="valid-feedback">{"Looks good!"}</div>
                                                </div>
                                                <div className="col-md-12 mb-3">
                                                    <span className="btn btn-pill btn-primary btn-block mt-3 mb-3" onClick={toggle.bind(null)}>{"Edit Achievment"}</span>
                                                </div>
                                                <div className="col-md-12 mb-3">
                                                    <label>{"UploadFile"}</label>
                                                    <input className="form-control" type="file" accept="image/*" onChange={(e) => setImg(e.target.files[0])} />
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
            <Modal
                isOpen={isOpen}
                toggle={toggle}
                size="lg"
            >
                <ModalHeader toggle={toggle}>Edit Achievment</ModalHeader>
                <ModalBody>
                    {updateAchievment()}
                </ModalBody>
                {/* <ModalFooter>
                    <Button onClick={onSubmit} className="btn-submit">

                    </Button>
                    <Button color="secondary" onClick={toggle.bind(null)}>
                        Cancel
                    </Button>
                </ModalFooter> */}
            </Modal>
        </Fragment>
    );
}

export default EditProgram