import React, { Fragment, useEffect, useState } from 'react';
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
import { fetchTagBerita } from '../../redux/banner/action';
import { fetchUploadPdf } from '../../redux/uploadpdf/action';

const EditProgram = (props) => {

    const { data, flag } = props.location.state;

    const dispatch = useDispatch();
    let token = localStorage.getItem('token');

    const loadingStatus = useSelector((state) => state.programReducer.loading);
    const [isOpen, setIsOpen] = useState(false)
    const [dokumenisOpen, setIsDokumenOpen] = useState(false)
    const [id, setId] = useState(data.id);
    const [titles, setTitles] = useState(data.title);
    const [sub, setSub] = useState(data.sub_title);
    const [tag, setTag] = useState(data.tag);
    const [thumb, setThumb] = useState(data.thumbnail_image_url);
    const [desc, setDesc] = useState(data.description);
    const [achievment, setAchievment] = useState(data.achievements);
    const [img, setImg] = useState(data.thumbnail_image_url);
    const [imgBeneficaries, setImgBeneficaries] = useState();
    const [arrBeneficaries, setArrBeneficaries] = useState(data.beneficaries_image_url)
    const [dokumen, setDokumen] = useState(data.document)

    const { register, handleSubmit, errors } = useForm();

    const blocksFromHtml = htmlToDraft(data.content);
    const { contentBlocks, entityMap } = blocksFromHtml;
    const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
    const existing = EditorState.createWithContent(contentState);

    let initialState = EditorState.createEmpty();
    const [editorState, setEditorState] = useState(contentState ? existing : initialState)
    const newContent = draftToHtml(convertToRaw(editorState.getCurrentContent()))
    useEffect(() => {
        dispatch(fetchTagBerita(token))
        dispatch(fetchUploadPdf(token))
    }, [token, dispatch])
    const tagBanner = useSelector((state) => state.bannerReducer.tag);
    const uploadData = useSelector((state) => state.uploadReducer.uploadpdf);
    const toggle = () => {
        setIsOpen(!isOpen);
    }
    const onChangeNameSetting = (e, index) => {
        var setlabel = e.target.value
        achievment[index].label = setlabel
    }

    const onChangeValueSetting = (e, index) => {
        var setvalue = e.target.value
        achievment[index].value = setvalue
    }
    const addSetting = () => {
        var totaldata = achievment.length + 1;
        let setObj = { label: "achievment " + totaldata, value: "" }
        let arrSet = achievment.concat(setObj)
        setAchievment(arrSet)
    }
    const saveSetting = () => {
        if (achievment.length === 0) {
            toast("warning", "Value tidak boleh kosong", "", "")
        } else {
            for (var i = 0; i < achievment.length; i += 1) {
                if (achievment[i].label === '') {
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

    const toggleDokumen = () => {
        setIsDokumenOpen(!dokumenisOpen);
    }
    const onChangeTitleDokumen = (e, index) => {
        var settitle = e.target.value
        dokumen[index].title = settitle
    }

    const onChangeLinkDokumen = (e, index) => {
        var setlinkurl = e.target.value
        dokumen[index].link_url = setlinkurl
    }
    const addDokumen = () => {
        var totaldata = dokumen.length + 1;
        let setObj = { title: "dokumen " + totaldata, link_url: "" }
        let arrSet = dokumen.concat(setObj)
        setDokumen(arrSet)
    }
    const saveDokumen = () => {
        if (dokumen.length === 0) {
            toast("warning", "Link tidak boleh kosong", "", "")
        } else {
            for (var i = 0; i < dokumen.length; i += 1) {
                if (dokumen[i].title === '') {
                    toast("warning", "Maaf Title tidak boleh kosong", "", "")
                    return false
                }
                if (dokumen[i].link_url === '') {
                    toast("warning ", "Maaf Link tidak boleh kosong", "", "")
                    return false
                }
            }
            setDokumen([...dokumen])
            setIsDokumenOpen(!dokumenisOpen);

        }
    }
    const deleteDokumen = (e) => {
        var tes = e.target.value
        var setting = dokumen
        if (tes > -1) {
            setting.splice(tes, 1);
            setDokumen([...dokumen])

        }
    }
    const updateDokumen = () => {
        return (
            <>
            
                <Card>
                    <Form className="fgjg">
                        <FormGroup>
                            <Row className="justify-content-between">
                                <Col md="3">
                                    <Button className="btn" color="secondary" onClick={addDokumen.bind()}>Add Dokumen</Button>
                                </Col>
                                <Col md="3" className="text-right">
                                    <Button className="btn btn-submit" onClick={saveDokumen.bind()}>Save Dokumen</Button>
                                </Col>
                            </Row>
                        </FormGroup>
                    </Form>
                    <hr />
                    <Form className="fgjg" style={{ overflowX: 'hidden', overflowY: 'auto', height: '400px' }}>
                        {dokumen && dokumen.map((dokumen, index) => {
                            return (
                                <Row key={dokumen.name}>
                                    <Col md="6">
                                        <Row>
                                            <Col md="2">
                                                <FormGroup>
                                                    <Label></Label>
                                                    <Button className="btn" color="danger" value={index} onClick={deleteDokumen.bind()}>x</Button>
                                                </FormGroup>
                                            </Col>
                                            <Col md="10">
                                                <FormGroup>
                                                    <Label>Title </Label>
                                                    <Input type="text" placeholder="Key Here" defaultValue={dokumen.title} onChange={(e) => onChangeTitleDokumen(e, index)} />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col md="6">
                                        <FormGroup>
                                            <Label>Link </Label>
                                            <Input type="text" placeholder="Value Here" defaultValue={dokumen.link_url} onChange={(e) => onChangeLinkDokumen(e, index)} />
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


    const onClickUploadBene = () => {
        uploadImage(imgBeneficaries).then(message => {
            const BeneficariesThumb = message.response.data.url
            setArrBeneficaries([...arrBeneficaries, BeneficariesThumb])
        })
    }
    const deleteImage = (e) => {
        console.log(e.target.value, 'masuk')
        if (e.target.value > -1) {
            arrBeneficaries.splice(e.target.value, 1);
            setArrBeneficaries([...arrBeneficaries])
        }
    }
    const onSubmit = data => {
        if (flag === "utama") {
            if (data !== '') {
                if (img == 'undefined') {
                    uploadImage(img).then(message => {
                        const newThumb = message.response.data.url;
                        dispatch(fetchEditProgram(token, id, titles, sub, tag, newContent, newThumb, desc, achievment, arrBeneficaries, dokumen))
                    })
                        .catch(error => {
                            toast.error("Upload Image Failed !");
                        })
                } else {
                    const newThumb = thumb;
                    dispatch(fetchEditProgram(token, id, titles, sub, tag, newContent, newThumb, desc, achievment, arrBeneficaries, dokumen))
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

    console.log(data)

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
                                                    <label>{"Tag Banner"}</label>
                                                    <select className="form-control" name="tag" type="select" placeholder="Tag Banner" ref={register({ required: true })} value={tag} onChange={(e) => setTag(e.target.value)} >
                                                        <option disabled selected>-Pilih-</option>
                                                        {tagBanner.map((tag) => (
                                                            <option value={tag.Tag}>{tag.Tag}</option>
                                                        ))}
                                                    </select>
                                                    <span>{errors.tag && 'Level is required'}</span>
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
                                                <div className="col-md-12 mb-3" >
                                                    <label>{"Upload Beneficaries"}</label>
                                                    <div className="input-group mb-3">
                                                        <input type="file" class="form-control" id="inputGroupFile02" onChange={(e) => setImgBeneficaries(e.target.files[0])} />
                                                        <a className="btn btn-outline-secondary" type="button" id="inputGroupFileAddon04" onClick={onClickUploadBene}>Upload</a>
                                                    </div>
                                                    <div>
                                                        {arrBeneficaries.map((item, index) => {
                                                            console.log(index, 'index')
                                                            return (
                                                                <>
                                                                    <img src={item} width="100px" className="mr-0" />
                                                                    <button className="btn mr-2 pl-0 pr-0" value={index} onClick={deleteImage.bind()}>x</button>
                                                                </>
                                                            )
                                                        })}
                                                    </div>
                                                </div>
                                                <div className="col-md-12 mb-3">
                                                    <span className="btn btn-pill btn-primary btn-block mt-3 mb-3" onClick={toggleDokumen.bind(null)}>{"Edit Dokumen"}</span>
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
            <Modal
                isOpen={dokumenisOpen}
                toggle={toggleDokumen}
                size="lg"
            >
                <ModalHeader toggle={toggleDokumen}>Edit Dokumen</ModalHeader>
                <ModalBody>
                    {updateDokumen()}
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