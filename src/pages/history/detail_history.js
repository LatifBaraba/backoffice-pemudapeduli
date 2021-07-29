import React, { Fragment, useState, useEffect } from 'react';
import Breadcrumb from '../../components/common/breadcrumb';
import useForm from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
// import { fetchDetailHistory } from "../../redux/history/action";
// import { uploadImage } from "../../helper/index";
// import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DetailHistory = (props) => {
    const { data } = props.location.state;

    const [ id, setId] = useState(data.id);
    const [ user, setUser] = useState(data.title);
    const [ amount, setAmount] = useState(data.description);
    const [ donasitype, setDonasitype] = useState(data.description);
    const [ date, setDate] = useState(data.thumbnail_image_url);
    const [ img, setImg] = useState('');

    const loadingStatus = useSelector((state) => state.historyReducer.loading);

    const dispatch = useDispatch();
    let token = localStorage.getItem('token');
    const { register, handleSubmit, errors } = useForm();
    
    // const onSubmit = data => {
    //     if (data !== '') {
    //         if (img !== '') {
    //             uploadImage(img).then(message => {
    //                 const thumbnail_image_url = message.response.data.url;
    //                 dispatch(fetchDetailHistory(token, id, title, description, thumbnail_image_url))
    //             })
    //             .catch(error => {
    //                 console.log(error)
    //                 toast.error("Upload Image Failed !");
    //             })
    //         } else {
    //             const thumbnail_image_url = icon;
    //             dispatch(fetchDetailHistory(token, id, title, description, thumbnail_image_url))
    //         }
    //     } else {
    //         errors.showMessages();
    //     }
    // }

    // const submitButton = () => {
    //     if(loadingStatus == false) {
    //       return (
    //         <button className="btn btn-pill btn-primary btn-block mt-3 mb-3" type="submit">{"Submit"}</button>
    //       )
    //     } else {
    //       return (
    //         <button className="btn btn-pill btn-block mt-3 mb-3" type="submit" disabled>{"Loading"}</button>
    //       )
    //     }
    // }

    return (
        <Fragment>
            <Breadcrumb title="History Page" parent="Dashboard" />
            <div className="container-fluid">
            <div className="row">
                <div className="col-sm-12">
                    <div className="card">
                        <div className="card-header">
                            <h5>Detail History</h5>    
                        </div>
                        <div className="card-body">
                            {/* content form */}
                            {/* <form className="needs-validation" noValidate="" onSubmit={handleSubmit(onSubmit)}> */}
                                <div className="row justify-content-center">
                                    <div className="col-md-6 col-sm-12">
                                        <div className="form-row">
                                            <div className="col-md-12 mb-3">
                                                <label>{"User"}</label>
                                                <input className="form-control" name="user" type="text" value={user} ref={register({ required: true })} onChange={(e) => setUser(e.target.value)} />
                                                <span>{errors.user && 'User is required'}</span> 
                                                <div className="valid-feedback">{"Looks good!"}</div>
                                            </div>
                                            <div className="col-md-12 mb-3">
                                                <label>{"Amount"}</label>
                                                <input className="form-control" name="amount" type="text" value={amount} ref={register({ required: true })} onChange={(e) => setAmount(e.target.value)} />
                                                <span>{errors.amount && 'Amount is required'}</span>
                                                <div className="valid-feedback">{"Looks good!"}</div>
                                            </div>
                                            <div className="col-md-12 mb-3">
                                                <label>{"Donasi Type"}</label>
                                                <input className="form-control" name="donasitype" type="text" value={donasitype} ref={register({ required: true })} onChange={(e) => setDonasitype(e.target.value)} />
                                                <span>{errors.donasitype && 'Donasi Type is required'}</span>
                                                <div className="valid-feedback">{"Looks good!"}</div>
                                            </div>
                                            <div className="col-md-12 mb-3">
                                                <label>{"Date"}</label>
                                                <input className="form-control" name="date" type="text" value={date} ref={register({ required: true })} onChange={(e) => setDate(e.target.value)} />
                                                <span>{errors.date && 'Date is required'}</span>
                                                <div className="valid-feedback">{"Looks good!"}</div>
                                            </div>
                                            {/* <div className="col-md-12 mb-3">
                                                <label>{"UploadFile"}</label>
                                                <input className="form-control" type="file" accept="image/*" onChange={(e) => setImg(e.target.files[0])}/>
                                            </div> */}
                                        </div>
                                        {/* <button className="btn btn-pill btn-primary btn-block mt-3 mb-3" type="submit">{"Submit"}</button>    */}
                                        {/* {submitButton()} */}
                                    </div>
                                </div>
                            {/* </form> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Fragment>
    );
}

export default DetailHistory