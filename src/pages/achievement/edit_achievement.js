import React, { Fragment, useState } from 'react';
import Breadcrumb from '../../components/common/breadcrumb';
import useForm from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { fetchEditAchievement } from "../../redux/achievement/action";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditAchievement = (props) => {

    const { data } = props.location.state;
    const [ id, setId] = useState(data.id);
    const [ name, setName] = useState(data.achievement_name);
    const [ total, setTotal] = useState(data.achievement_total);
    const [ desc, setDesc] = useState(data.description);

    const loadingStatus = useSelector((state) => state.achievementReducer.loading);

    const dispatch = useDispatch();
    let token = localStorage.getItem('token');
    const { register, handleSubmit, errors } = useForm();

    const onSubmit = data => {
        if (data !== '') {
            dispatch(fetchEditAchievement(token, id, name, total, desc))
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
            <Breadcrumb title="Achievement Page" parent="Dashboard" />
            <div className="container-fluid">
            <div className="row">
                <div className="col-sm-12">
                    <div className="card">
                        <div className="card-header">
                            <h5>Add Achievement</h5>    
                        </div>
                        <div className="card-body">
                            {/* content form */}
                            <form className="needs-validation" noValidate="" onSubmit={handleSubmit(onSubmit)}>
                                <div className="row justify-content-center">
                                    <div className="col-md-6 col-sm-12">
                                        <div className="form-row">
                                            <div className="col-md-12 mb-3">
                                                <label>{"Name"}</label>
                                                <input className="form-control" name="name" type="text" value={name} ref={register({ required: true })} onChange={(e) => setName(e.target.value)} />
                                                <span>{errors.name && 'Name is required'}</span>
                                                <div className="valid-feedback">{"Looks good!"}</div>
                                            </div>
                                            <div className="col-md-12 mb-3">
                                                <label>{"Total"}</label>
                                                <input className="form-control" name="total" type="text" placeholder="Total" value={total} ref={register({ required: true })} onChange={(e) => setTotal(e.target.value)} />
                                                <span>{errors.total && 'Total is required & Min 6 Character'}</span>
                                                <div className="valid-feedback">{"Looks good!"}</div>
                                            </div>
                                            <div className="col-md-12 mb-3">
                                                <label>{"Description"}</label>
                                                {/* <input className="form-control" name="description" type="text" placeholder="Description" value={desc} ref={register({ required: true })} onChange={(e) => setDesc(e.target.value)} /> */}
                                                <textarea className="form-control" name="desc" rows="5" cols="5" placeholder="Description" value={desc} ref={register({ required: true })} onChange={(e) => setDesc(e.target.value)}></textarea>
                                                <span>{errors.description && 'Description is required'}</span>
                                                <div className="valid-feedback">{"Looks good!"}</div>
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

export default EditAchievement