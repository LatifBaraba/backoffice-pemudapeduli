import React, { Fragment, useState, useEffect } from "react";
import Breadcrumb from "../../components/common/breadcrumb";
import useForm from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchEditKabarTerbaruOt } from "../../redux/kabarterbaru/action";
import { Form, Row, Col, Container } from "react-bootstrap";
import { fetchDonasi } from "../../redux/donasi/action";
import { addCommas, removeNonNumeric } from "../../helper/index";

const EditKabarTerbaruOt = (props) => {
  const { data } = props.location.state;
  // console.log(data)
  // const [ id, setId] = useState(data.IDPPCPPenggalangDana);
  // const [ name, setName] = useState(data.Name);
  // const [ description, setDescription] = useState(data.Description);
  // const [ icon, setThumb] = useState(data.ThumbnailImageURL);
  // const [ img, setImg] = useState('');

  const [id, setIdKabarTerbaru] = useState(data.id);
  const [id_pp_cp_program_donasi, setIdProgramDonasi] = useState(data.id_pp_cp_program_donasi);
  const [title, setTitle] = useState(data.title);
  const [disbursement_balance, setBalance] = useState(
    data.disbursement_balance
  );
  const [disbursement_account, setAccount] = useState(
    data.disbursement_account
  );
  const [disbursement_bank_name, setBankName] = useState(
    data.disbursement_bank_name
  );
  const [disbursement_name, setName] = useState(data.disbursement_name);
  const [disbursement_description, setDescription] = useState(
    data.disbursement_description
  );

  const loadingStatus = useSelector(
    (state) => state.kabarterbaruReducer.loading
  );

  const dispatch = useDispatch();
  let token = localStorage.getItem("token");
  const { register, handleSubmit, errors } = useForm();
  
  useEffect(() => {
    dispatch(fetchDonasi(token));
  }, []);

  const donasiData = useSelector((state) => state.donasiReducer.donasi);

  const onSubmit = (data) => {
    if (data !== "") {
      // if (img !== '') {
      //     uploadImage(img).then(message => {
      //         const thumbnail_image_url = message.response.data.url;
      dispatch(
        fetchEditKabarTerbaruOt(
          token,
          id,
          id_pp_cp_program_donasi,
          title,
          removeNonNumeric(disbursement_balance),
          disbursement_account,
          disbursement_bank_name,
          disbursement_name,
          disbursement_description
        )
      );
      //     })
      //     .catch(error => {
      //         // console.log(error)
      //         toast.error("Upload Image Failed !");
      //     })
      // } else {
      //     const thumbnail_image_url = icon;
      //     dispatch(fetchEditPenggalang(token, id, name, description, thumbnail_image_url))
      // }
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
                <h5>Edit Kabar Terbaru One Time</h5>
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
                          <Form.Group controlId="formProgramDonasi">
                            <Form.Control
                              required
                              as="select"
                              type="select"
                              onChange={(e) => setIdProgramDonasi(e.target.value)}
                              disabled
                            >
                              <option value="">---Pilih Donasi One Time---</option>
                              {donasiData.map((donasi, index) =>
                                donasi.id == id_pp_cp_program_donasi ? (
                                  <option
                                    key={index}
                                    defaultValue={donasi.id}
                                    selected
                                  >
                                    {donasi.title}
                                  </option>
                                ) : (
                                  <option
                                    key={index}
                                    defaultValue={donasi.id}
                                  >
                                    {donasi.title}
                                  </option>
                                )
                              )}
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
                            value={title}
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
                            value={disbursement_account}
                            ref={register({ required: true })}
                            onChange={(e) => setAccount(e.target.value)}
                          />
                          <span>
                            {errors.disbursement_account &&
                              "Account is required"}
                          </span>
                          <div className="valid-feedback">{"Looks good!"}</div>
                        </div>
                        <div className="col-md-12 mb-3">
                          <label>{"Bank Name"}</label>
                          <input
                            className="form-control"
                            name="disbursement_bank_name"
                            type="text"
                            value={disbursement_bank_name}
                            ref={register({ required: true })}
                            onChange={(e) => setBankName(e.target.value)}
                          />
                          <span>
                            {errors.disbursement_bank_name &&
                              "Bank Name is required"}
                          </span>
                          <div className="valid-feedback">{"Looks good!"}</div>
                        </div>
                        <div className="col-md-12 mb-3">
                          <label>{"Name"}</label>
                          <input
                            className="form-control"
                            name="disbursement_name"
                            type="text"
                            value={disbursement_name}
                            ref={register({ required: true })}
                            onChange={(e) => setName(e.target.value)}
                          />
                          <span>
                            {errors.disbursement_name && "Name is required"}
                          </span>
                          <div className="valid-feedback">{"Looks good!"}</div>
                        </div>
                        <div className="col-md-12 mb-3">
                          <label>{"Description"}</label>
                          <input
                            className="form-control"
                            name="disbursement_description"
                            type="text"
                            value={disbursement_description}
                            ref={register({ required: true })}
                            onChange={(e) => setDescription(e.target.value)}
                          />
                          <span>
                            {errors.disbursement_description &&
                              "Description is required"}
                          </span>
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

export default EditKabarTerbaruOt;
