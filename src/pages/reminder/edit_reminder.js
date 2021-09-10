import React, { Fragment, useState, useEffect } from 'react';
import Breadcrumb from '../../components/common/breadcrumb';
import useForm from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { fetchEditTransaction } from "../../redux/transaction/action";
import { uploadImage } from "../../helper/index";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditTransaction = (props) => {
    const { data } = props.location.state;

    const [ id, setId] = useState(data.id);
    const [ user, setUser] = useState(data.title);
    const [ campaign, setCampaign] = useState(data.description);
    const [ pengirim, setPengirim] = useState('');
    const [ email, setEmail] = useState('');
    const [ tanggalbayar, setTanggalbayar] = useState('');
    const [ jumlah, setJumlah] = useState('');
    const [ banktujuan, setBanktujuan] = useState('');
    const [ norekening, setNorekening] = useState('');
    const [ bukti, setBukti] = useState(data.thumbnail_image_url);

    const loadingStatus = useSelector((state) => state.transactionReducer.loading);

    const dispatch = useDispatch();
    let token = localStorage.getItem('token');
    const { register, handleSubmit, errors } = useForm();
    
    const onSubmit = data => {
        if (data !== '') {
            // if (img !== '') {
            //     uploadImage(img).then(message => {
            //         const bukti = message.response.data.url;
            //         dispatch(fetchEditTransaction(token, id, user, campaign, pengirim, email, tanggalbayar, jumlah, banktujuan, norekening))
            //     })
            //     .catch(error => {
            //         console.log(error)
            //         toast.error("Upload Image Failed !");
            //     })
            // } else {
            //     const bukti = icon;
                dispatch(fetchEditTransaction(token, id, user, campaign, pengirim, email, tanggalbayar, jumlah, banktujuan, norekening))
            // }
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
            <Breadcrumb title="Transaction Page" parent="Dashboard" />
            <div className="container-fluid">
            <div className="row">
                <div className="col-sm-12">
                    <div className="card">
                        <div className="card-header">
                            <h5>Edit Transaction</h5>    
                        </div>
                        <div className="card-body">
                            {/* content form */}
                            <form className="needs-validation" noValidate="" onSubmit={handleSubmit(onSubmit)}>
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
                                                <label>{"Campaign"}</label>
                                                <input className="form-control" name="campaign" type="text" value={campaign} ref={register({ required: true })} onChange={(e) => setCampaign(e.target.value)} />
                                                <span>{errors.campaign && 'Campaign is required'}</span>
                                                <div className="valid-feedback">{"Looks good!"}</div>
                                            </div>
                                            <div className="col-md-12 mb-3">
                                                <label>{"Pengirim"}</label>
                                                <input className="form-control" name="pengirim" type="text" value={pengirim} ref={register({ required: true })} onChange={(e) => setPengirim(e.target.value)} />
                                                <span>{errors.pengirim && 'Pengirim is required'}</span> 
                                                <div className="valid-feedback">{"Looks good!"}</div>
                                            </div>
                                            <div className="col-md-12 mb-3">
                                                <label>{"Email"}</label>
                                                <input className="form-control" name="email" type="text" value={email} ref={register({ required: true })} onChange={(e) => setEmail(e.target.value)} />
                                                <span>{errors.email && 'Email is required'}</span> 
                                                <div className="valid-feedback">{"Looks good!"}</div>
                                            </div>
                                            <div className="col-md-12 mb-3">
                                                <label>{"Tanggal Bayar"}</label>
                                                <input className="form-control" name="tanggalbayar" type="text" value={tanggalbayar} ref={register({ required: true })} onChange={(e) => setTanggalbayar(e.target.value)} />
                                                <span>{errors.tanggalbayar && 'Tanggal Bayar is required'}</span>
                                                <div className="valid-feedback">{"Looks good!"}</div>
                                            </div>
                                            <div className="col-md-12 mb-3">
                                                <label>{"Jumlah"}</label>
                                                <input className="form-control" name="jumlah" type="text" value={jumlah} ref={register({ required: true })} onChange={(e) => setJumlah(e.target.value)} />
                                                <span>{errors.jumlah && 'Jumlah is required'}</span> 
                                                <div className="valid-feedback">{"Looks good!"}</div>
                                            </div>
                                            <div className="col-md-12 mb-3">
                                                <label>{"Bank Tujuan"}</label>
                                                <input className="form-control" name="banktujuan" type="text" value={banktujuan} ref={register({ required: true })} onChange={(e) => setBanktujuan(e.target.value)} />
                                                <span>{errors.banktujuan && 'Bank Tujuan is required'}</span>
                                                <div className="valid-feedback">{"Looks good!"}</div>
                                            </div>
                                            <div className="col-md-12 mb-3">
                                                <label>{"No Rekening"}</label>
                                                <input className="form-control" name="norekening" type="text" value={norekening} ref={register({ required: true })} onChange={(e) => setNorekening(e.target.value)} />
                                                <span>{errors.norekening && 'No Rekening is required'}</span> 
                                                <div className="valid-feedback">{"Looks good!"}</div>
                                            </div>
                                            {/* <div className="col-md-12 mb-3">
                                                <label>{"Bukti"}</label>
                                                <input className="form-control" type="file" accept="image/*" onChange={(e) => setBukti(e.target.files[0])}/>
                                                <img src={qris.thumbnail_image_url} alt={qris.thumbnail_image_url} style={{width: 100}}/>
                                            </div> */}
                                        {/* <button className="btn btn-pill btn-primary btn-block mt-3 mb-3" type="submit">{"Submit"}</button>    */}
                                        {submitButton()}
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    </Fragment>
    );
}

export default EditTransaction