import React, { Fragment, useState, useEffect } from "react";
import Breadcrumb from "../../components/common/breadcrumb";
import useForm from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { fetchAddKabarTerbaruOt } from "../../redux/kabarterbaru/action";
import { fetchDonasi } from "../../redux/donasi/action";
import { uploadImage } from "../../helper/index";
import { Form, Row, Col, Container } from "react-bootstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addCommas, removeNonNumeric } from "../../helper/index";

const AddKabarTerbaruOt = () => {
  const { register, handleSubmit, errors } = useForm();
  const dispatch = useDispatch();

  let token = localStorage.getItem("token");

  const [id_pp_cp_program_donasi, setIdProgramDonasi] = useState("");
  const [title, setTitle] = useState("");
  const [disbursement_balance, setBalance] = useState("");
  const [disbursement_account, setAccount] = useState("");
  const [disbursement_bank_name, setBankName] = useState("");
  const [disbursement_name, setName] = useState("");
  const [disbursement_description, setDescription] = useState("");

  const loadingStatus = useSelector(
    (state) => state.kabarterbaruReducer.loading
  );

  useEffect(() => {
    dispatch(fetchDonasi(token));
  }, []);

  const donasiData = useSelector((state) => state.donasiReducer.donasi);

  const onSubmit = (data) => {
    if (data !== "") {
      const balance = disbursement_balance.split(".").join("");
      
      //   // uploadImage(img).then(message => {
      //   //     const newIcon = message.response.data.url;
        dispatch(
          fetchAddKabarTerbaruOt(
            token,
            id_pp_cp_program_donasi,
            title,
            balance,
            disbursement_account,
            disbursement_bank_name,
            disbursement_name,
            disbursement_description
          )
        );
      //   // })
      //   // .catch(error => {
      //   //     toast.error("Upload Image Failed !");
      //   // })
    } else {
      errors.showMessages();
    }
  };

  const submitButton = () => {
    if (loadingStatus == false) {
      return (
        <button
          className="btn btn-pill btn-primary btn-block mt-3 mb-3"
          type="submit"
        >
          {"Submit"}
        </button>
      );
    } else {
      return (
        <button
          className="btn btn-pill btn-block mt-3 mb-3"
          type="submit"
          disabled
        >
          {"Loading"}
        </button>
      );
    }
  };

  const handleChange = (e) => {
    setBalance(addCommas(removeNonNumeric(e.target.value)));
  };

  return (
    <Fragment>
      <Breadcrumb title="Kabar Terbaru One Time Page" parent="Dashboard" />
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <div className="card">
              <div className="card-header">
                <h5>Add Kabar Terbaru One Time</h5>
              </div>
              <div className="card-body">
                {/* content form */}
                <form
                  className="needs-validation"
                  noValidate=""
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div className="row justify-content-center">
                    <div className="col-md-6 col-sm-12">
                      <div className="form-row">
                        <div className="col-md-12 mb-3">
                          <label>{"Pilih Donasi One Time"}</label>
                          <Form.Group controlId="formPenggalangDana">
                            <Form.Control
                              required
                              as="select"
                              type="select"
                              onChange={(e) =>
                                setIdProgramDonasi(e.target.value)
                              }
                              // {...register("tipebayar", {
                              //   required: true,
                              // })}
                            >
                              <option value="">
                                ---Pilih Donasi One Time---
                              </option>
                              {/* <option value="mandiri">Rekening Mandiri</option>
                                                    <option value="qris">QRIS</option> */}
                              {donasiData.map((donasi, index) => (
                                <option key={index} value={donasi.id}>
                                  {donasi.title}
                                </option>
                              ))}
                            </Form.Control>
                          </Form.Group>
                          <span>{errors.name && "ID Donasi is required"}</span>
                          <div className="valid-feedback">{"Looks good!"}</div>
                        </div>
                        <div className="col-md-12 mb-3">
                          <label>{"Title"}</label>
                          <input
                            className="form-control"
                            name="title"
                            type="text"
                            ref={register({ required: true })}
                            onChange={(e) => setTitle(e.target.value)}
                          />
                          <span>{errors.title && "Title is required"}</span>
                          <div className="valid-feedback">{"Looks good!"}</div>
                        </div>
                        <div className="col-md-12 mb-3">
                          <label>{"Balance"}</label>
                          <input
                            className="form-control"
                            name="disbursement_balance"
                            type="text"
                            value={disbursement_balance}
                            placeholder="Balance"
                            ref={register({ required: true })}
                            onInput={handleChange}
                          />
                          <span>
                            {errors.disbursement_balance &&
                              "Balance is required"}
                          </span>
                          <div className="valid-feedback">{"Looks good!"}</div>
                        </div>
                        <div className="col-md-12 mb-3">
                          <label>{"Account"}</label>
                          <input
                            className="form-control"
                            name="disbursement_account"
                            type="text"
                            ref={register({ required: true })}
                            onChange={(e) => setAccount(e.target.value)}
                          />
                          <span>{errors.disbursement_account && "Account is required"}</span>
                          <div className="valid-feedback">{"Looks good!"}</div>
                        </div>                        
                        <div className="col-md-12 mb-3">
                          <label>{"Bank Name"}</label>
                          <input
                            className="form-control"
                            name="disbursement_bank_name"
                            type="text"
                            ref={register({ required: true })}
                            onChange={(e) => setBankName(e.target.value)}
                          />
                          <span>{errors.disbursement_bank_name && "Bank Name is required"}</span>
                          <div className="valid-feedback">{"Looks good!"}</div>
                        </div>                        
                        <div className="col-md-12 mb-3">
                          <label>{"Name"}</label>
                          <input
                            className="form-control"
                            name="disbursement_name"
                            type="text"
                            ref={register({ required: true })}
                            onChange={(e) => setName(e.target.value)}
                          />
                          <span>{errors.disbursement_name && "Name is required"}</span>
                          <div className="valid-feedback">{"Looks good!"}</div>
                        </div>                        
                        <div className="col-md-12 mb-3">
                          <label>{"Description"}</label>
                          <input
                            className="form-control"
                            name="disbursement_description"
                            type="text"
                            ref={register({ required: true })}
                            onChange={(e) => setDescription(e.target.value)}
                          />
                          <span>{errors.disbursement_description && "Description is required"}</span>
                          <div className="valid-feedback">{"Looks good!"}</div>
                        </div>                        
                      </div>
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
    </Fragment>
  );
};

export default AddKabarTerbaruOt;
