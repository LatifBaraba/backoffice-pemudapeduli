import React, { Fragment, useState } from 'react';
import Breadcrumb from '../../components/common/breadcrumb';
import useForm from "react-hook-form";
import { useDispatch } from 'react-redux';
import { fetchEditTeam } from "../../redux/team/action";
import uploadImage from "../../helper/index";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditTeam = (props) => {
    const { data } = props.location.state;

    const [ id, setId] = useState(data.id);
    const [ name, setName] = useState(data.name);
    const [ role, setRole] = useState(data.role);
    const [ facebook, setFacebook] = useState(data.facebook_link);
    const [ google, setGoogle] = useState(data.google_link);
    const [ instagram, setInstagram] = useState(data.instagram_link);
    const [ linkedin, setLinkedin] = useState(data.linkedin_link);
    const [ thumb, setThumb] = useState(data.thumbnail_image_url);
    const [ img, setImg] = useState();

    const dispatch = useDispatch();
    let token = localStorage.getItem('token');
    const { register, handleSubmit, errors } = useForm();

    const onSubmit = data => {
        if (data !== '') {
            uploadImage(img).then(message => {
                const newThumb = message.response.data.url;
                dispatch(fetchEditTeam(token, id, name, role, facebook, google, instagram, linkedin, newThumb))
            })
            .catch(error => {
                toast.error("Upload Image Failed !");
            })
        } else {
            errors.showMessages();
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
                                                <input className="form-control" name="name" type="text" value={name} placeholder="Name" ref={register({ required: true })} onChange={(e) => setName(e.target.value)}/>
                                                <span>{errors.name && 'Name is required'}</span>
                                                <div className="valid-feedback">{"Looks good!"}</div>
                                            </div>
                                            <div className="col-md-12 mb-3">
                                                <label>{"Role"}</label>
                                                <input className="form-control" name="role" type="text" value={role} placeholder="Role" ref={register({ required: true })} onChange={(e) => setRole(e.target.value)}/>
                                                <span>{errors.role && 'Role is required'}</span>
                                                <div className="valid-feedback">{"Looks good!"}</div>
                                            </div>
                                            <div className="col-md-12 mb-3">
                                                <label>{"Facebook Link"}</label>
                                                <input className="form-control" name="facebook" type="text" value={facebook} placeholder="Link" ref={register({ required: true })} onChange={(e) => setFacebook(e.target.value)}/>
                                                <span>{errors.facebook && 'Facebook Link is required'}</span>
                                                <div className="valid-feedback">{"Looks good!"}</div>
                                            </div>
                                            <div className="col-md-12 mb-3">
                                                <label>{"Google Link"}</label>
                                                <input className="form-control" name="google" type="text" value={google} placeholder="Link" ref={register({ required: true })} onChange={(e) => setGoogle(e.target.value)}/>
                                                <span>{errors.google && 'Google Link is required'}</span>
                                                <div className="valid-feedback">{"Looks good!"}</div>
                                            </div>
                                            <div className="col-md-12 mb-3">
                                                <label>{"Instagram Link"}</label>
                                                <input className="form-control" name="instagram" type="text" value={instagram} placeholder="Link" ref={register({ required: true })} onChange={(e) => setInstagram(e.target.value)}/>
                                                <span>{errors.instagram && 'Instagram Link is required'}</span>
                                                <div className="valid-feedback">{"Looks good!"}</div>
                                            </div>
                                            <div className="col-md-12 mb-3">
                                                <label>{"Linkedin Link"}</label>
                                                <input className="form-control" name="linkedin" type="text" value={linkedin} placeholder="Link" ref={register({ required: true })} onChange={(e) => setLinkedin(e.target.value)}/>
                                                <span>{errors.linkedin && 'Linkedin Link is required'}</span>
                                                <div className="valid-feedback">{"Looks good!"}</div>
                                            </div>
                                            <div className="col-md-12 mb-3">
                                                <label>{"UploadFile"}</label>
                                                <input className="form-control" type="file" accept="image/*" onChange={(e) => setImg(e.target.files[0])}/>
                                            </div>
                                        </div>
                                        <button className="btn btn-pill btn-primary btn-block mt-3 mb-3" type="submit">{"Submit"}</button>
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