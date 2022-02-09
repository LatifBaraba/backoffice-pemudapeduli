import React, { Fragment, useEffect, useState } from 'react';
import Breadcrumb from '../../components/common/breadcrumb';
import useForm from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { fetchEditTeam, fetchFlag } from "../../redux/team/action";
import { uploadImage } from "../../helper/index";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditTeam = (props) => {
    const { data } = props.location.state;

    // console.log(data)

    const [id, setId] = useState(data.id);
    const [name, setName] = useState(data.name);
    const [role, setRole] = useState(data.role);
    const [level, setLevel] = useState(data.flag_id)
    const [facebook, setFacebook] = useState(data.facebook_link);
    const [google, setGoogle] = useState(data.google_link);
    const [instagram, setInstagram] = useState(data.instagram_link);
    const [linkedin, setLinkedin] = useState(data.linkedin_link);
    const [thumb, setThumb] = useState(data.thumbnail_photo_url);
    const [img, setImg] = useState('');

    const loadingStatus = useSelector((state) => state.teamReducer.loading);
    const stateFlag = useSelector((state) => state.teamReducer.flag);


    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchFlag())
    }, [dispatch])
    let token = localStorage.getItem('token');
    const { register, handleSubmit, errors } = useForm();

    const onSubmit = data => {
        if (data !== '') {
            if (img !== '') {
                uploadImage(img).then(message => {
                    const newThumb = message.response.data.url;
                    // console.log("masuk if")
                    dispatch(fetchEditTeam(token, id, name, role, level, facebook, google, instagram, linkedin, newThumb))
                })
                    .catch(error => {
                        toast.error("Upload Image Failed !");
                    })
            } else {
                const newThumb = thumb;
                // console.log("masuk else")
                // console.log(thumb)
                dispatch(fetchEditTeam(token, id, name, role, level, facebook, google, instagram, linkedin, newThumb))
            }
        } else {
            errors.showMessages();
        }
    }

    const submitButton = () => {
        if (loadingStatus == false) {
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
            <Breadcrumb title="Team Page" parent="Dashboard" />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="card">
                            <div className="card-header">
                                <h5>Edit Team</h5>
                            </div>
                            <div className="card-body">
                                {/* content form */}
                                <form className="needs-validation" noValidate="" onSubmit={handleSubmit(onSubmit)}>
                                    <div className="row justify-content-center">
                                        <div className="col-md-6 col-sm-12">
                                            <div className="form-row">
                                                <div className="col-md-12 mb-3">
                                                    <label>{"Name"}</label>
                                                    <input className="form-control" name="name" type="text" value={name} placeholder="Name" ref={register({ required: true })} onChange={(e) => setName(e.target.value)} />
                                                    <span>{errors.name && 'Name is required'}</span>
                                                    <div className="valid-feedback">{"Looks good!"}</div>
                                                </div>
                                                <div className="col-md-12 mb-3">
                                                    <label>{"Role"}</label>
                                                    <input className="form-control" name="role" type="text" value={role} placeholder="Role" ref={register({ required: true })} onChange={(e) => setRole(e.target.value)} />
                                                    <span>{errors.role && 'Role is required'}</span>
                                                    <div className="valid-feedback">{"Looks good!"}</div>
                                                </div>
                                                <div className="col-md-12 mb-3">
                                                    <label>{"Level"}</label>
                                                    <select className="form-control" name="level" type="select" value={level} placeholder="Level" ref={register({ required: true })} onChange={(e) => setLevel(e.target.value)} >
                                                        {stateFlag.map((flag, idx) => {
                                                            return (
                                                                <option key={idx} value={flag.id}>{flag.name}</option>
                                                            )
                                                        })}
                                                    </select>
                                                    <span>{errors.level && 'Level is required'}</span>
                                                    <div className="valid-feedback">{"Looks good!"}</div>
                                                </div>
                                                <div className="col-md-12 mb-3">
                                                    <label>{"Facebook Link"}</label>
                                                    <input className="form-control" name="facebook" type="url" value={facebook} placeholder="Link" ref={register({ required: true })} onChange={(e) => setFacebook(e.target.value)} />
                                                    <span>{errors.facebook && 'Facebook Link is required'}</span>
                                                    <div className="valid-feedback">{"Looks good!"}</div>
                                                </div>
                                                <div className="col-md-12 mb-3">
                                                    <label>{"Google Link"}</label>
                                                    <input className="form-control" name="google" type="url" value={google} placeholder="Link" ref={register({ required: true })} onChange={(e) => setGoogle(e.target.value)} />
                                                    <span>{errors.google && 'Google Link is required'}</span>
                                                    <div className="valid-feedback">{"Looks good!"}</div>
                                                </div>
                                                <div className="col-md-12 mb-3">
                                                    <label>{"Instagram Link"}</label>
                                                    <input className="form-control" name="instagram" type="url" value={instagram} placeholder="Link" ref={register({ required: true })} onChange={(e) => setInstagram(e.target.value)} />
                                                    <span>{errors.instagram && 'Instagram Link is required'}</span>
                                                    <div className="valid-feedback">{"Looks good!"}</div>
                                                </div>
                                                <div className="col-md-12 mb-3">
                                                    <label>{"Linkedin Link"}</label>
                                                    <input className="form-control" name="linkedin" type="url" value={linkedin} placeholder="Link" ref={register({ required: true })} onChange={(e) => setLinkedin(e.target.value)} />
                                                    <span>{errors.linkedin && 'Linkedin Link is required'}</span>
                                                    <div className="valid-feedback">{"Looks good!"}</div>
                                                </div>
                                                <div className="col-md-12 mb-3">
                                                    <label>{"UploadFile"}</label>
                                                    <input className="form-control" type="file" accept="image/*" onChange={(e) => setImg(e.target.files[0])} />
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

export default EditTeam