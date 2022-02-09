import React, { Fragment, useEffect, useState } from 'react';
import Breadcrumb from '../../components/common/breadcrumb';
import useForm from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { fetchAddIncidental, fetchAddProgram } from "../../redux/program/action";
import { fetchTagBerita } from "../../redux/banner/action";
import { uploadImage } from "../../helper/index";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';
import { EditorState, convertToRaw } from 'draft-js';
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
const AddProgramIncidental = (props) => {
    const dataState = props.location.state;

    const { register, handleSubmit, errors } = useForm();
    const dispatch = useDispatch();

    let token = localStorage.getItem('token');

    const [isOpen, setIsOpen] = useState(false)
    const [modal, setModal] = useState({ isActive: false, id: "" });
    const [titles, setTitles] = useState("");
    const [sub, setSub] = useState("");
    const [tag, setTag] = useState("");
    const [desc, setDesc] = useState("");
    const [achievment, setAchievment] = useState([]);

    const [img, setImg] = useState();
    const [imgBeneficaries, setImgBeneficaries] = useState();
    const [arrBeneficaries, setArrBeneficaries] = useState([])
    const [tes, setTes] = useState()

    console.log(imgBeneficaries, 'img bene')
    useEffect(() => {
        dispatch(fetchTagBerita(token))
    }, [token, dispatch])
    const loadingStatus = useSelector((state) => state.programReducer.loading);
    const tagBanner = useSelector((state) => state.bannerReducer.tag);

    let _contentState = EditorState.createEmpty("");
    const [editorState, setEditorState] = useState(_contentState)
    const content = draftToHtml(convertToRaw(editorState.getCurrentContent()))

    // useEffect(() => {
    //     setArrBeneficaries([...arrBeneficaries,{imgBeneficaries}])
    // },[imgBeneficaries])

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
                    toast("warning", "Maaf label tidak boleh kosong", "", "")
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
                                                    <Input type="text" placeholder="Key Here" defaultValue={setting.name} onChange={(e) => onChangeNameSetting(e, index)} />
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
        if (dataState === "utama") {
            if (data !== '') {
                uploadImage(img).then(message => {
                    const newThumb = message.response.data.url;
                    dispatch(fetchAddProgram(token, titles, sub, tag, content, newThumb, desc, achievment, arrBeneficaries))

                    // dispatch(fetchAddProgram(token, titles, sub, tag, content, newThumb, desc, achievment))
                })

                    .catch(error => {
                        toast.error("Upload Image Failed !");
                    })
            } else {
                errors.showMessages();
            }
        } if (dataState === 'incidental') {
            console.log('masuk 2')
            if (data !== '') {
                uploadImage(img).then(message => {
                    const newThumb = message.response.data.url;
                    dispatch(fetchAddIncidental(token, titles, sub, tag, content, newThumb, desc))
                })
                    .catch(error => {
                        toast.error("Upload Image Failed !");
                    })
            } else {
                errors.showMessages();
            }
        }


    }
    console.log(achievment, 'achievment')
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
    console.log(arrBeneficaries, 'array')
    return (
        <Fragment>
            <Breadcrumb title="Program Page" parent="Dashboard" />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="card">
                            <div className="card-header">
                                <h5>Add Program Incidental</h5>
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
                                                    <label>{"Tag Banner"}</label>
                                                    <select className="form-control" name="tag" type="select" placeholder="Tag Banner" ref={register({ required: true })} onChange={(e) => setTag(e.target.value)} >
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
                                                    {/* <input className="form-control" name="desc" type="text" placeholder="Description" onChange={(e) => setDesc(e.target.value)} /> */}
                                                    <textarea className="form-control" name="desc" rows="5" cols="5" placeholder="Description" onChange={(e) => setDesc(e.target.value)}></textarea>
                                                    <span>{errors.description && 'Description is required'}</span>
                                                    <div className="valid-feedback">{"Looks good!"}</div>
                                                </div>
                                                {/* <div className="col-md-12 mb-3">
                                                    <span className="btn btn-pill btn-primary btn-block mt-3 mb-3" onClick={toggle.bind(null)}>{"Add Achievment"}</span>
                                                </div> */}
                                                <div className="col-md-12 mb-3">
                                                    <label>{"UploadFile"}</label>
                                                    <input className="form-control" type="file" accept="image/*" onChange={(e) => setImg(e.target.files[0])} />
                                                </div>
                                                {/* <div className="col-md-12 mb-3" >
                                                    <label>{"Upload Beneficaries"}</label>
                                                    <div className="input-group mb-3">
                                                        <input type="file" class="form-control" id="inputGroupFile02" onChange={(e) => setImgBeneficaries(e.target.files[0])} />
                                                        <button className="btn btn-outline-secondary" type="button" id="inputGroupFileAddon04" onClick={onClickUploadBene}>Upload</button>
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
                                                </div> */}
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
                <ModalHeader toggle={toggle}>Add Achievment</ModalHeader>
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

export default AddProgramIncidental