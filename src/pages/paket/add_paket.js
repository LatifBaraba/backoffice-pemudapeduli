import React, { Fragment, useState, useEffect } from "react";
import Breadcrumb from "../../components/common/breadcrumb";
import useForm from "react-hook-form";
import { Row, Col, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchAddPaket, fetchAddPaketRutin } from "../../redux/paket/action";
import { uploadImage, toIsoString } from "../../helper/index";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
import {
  EditorState,
  ContentState,
  convertToRaw,
  convertFromRaw,
} from "draft-js";
import { fetchDonasiKategori } from "../../redux/donasiKategori/action";
import { Form } from "react-bootstrap";
import { fetchQris } from "../../redux/qris/action";
import { Edit, Trash } from "react-feather";

const AddDonasi = () => {
  const { register, handleSubmit, errors } = useForm();
  const dispatch = useDispatch();

  let token = localStorage.getItem("token");

  useEffect(() => {
    dispatch(fetchDonasiKategori(token));
    dispatch(fetchQris(token));
  }, []);

  const [titles, setTitles] = useState("");
  const [sub, setSub] = useState("");
  const [tag, setTag] = useState("");
  const [desc, setDesc] = useState("");
  const [img, setImg] = useState();

  const [benefit, setBenefit] = useState();
  const [nominal, setNominal] = useState();
  const [paketimage, setPaketImage] = useState();
  const [inputList, setInputList] = useState([{ benefit: "", nominal: "" }]);

  const [inputFile, setInputFile] = useState([{ paketimage: "" }]);

  const [donasiType, setDonasiType] = useState();
  const [show, setShow] = useState();
  const [tipebayar, setTipeBayar] = useState("");
  const [qrisimage, setQrisimage] = useState("");

  const categories = useSelector(
    (state) => state.donasiKategoriReducer.donasiKategori
  );
  const loadingStatus = useSelector((state) => state.donasiReducer.loading);

  let _contentState = EditorState.createEmpty("");
  const [editorState, setEditorState] = useState(_contentState);
  const content = draftToHtml(convertToRaw(editorState.getCurrentContent()));
  const qrisData = useSelector((state) => state.qrisReducer.qris);

  const onSubmit = (data) => {
    // console.log(data)

    let str = tipebayar;
    const id_pp_cp_master_qris = str.split("_");
    const qris_image_url = str.split("_");

    if (data !== "") {
      let arr = {};
      let arrobj = [];
      for (let index = 0; index < inputList.length; index++) {
        uploadImage(inputFile[index].paketimage)
          .then((message) => {
            const newThumb = message.response.data.url;
            let pakets = {
              paketimage: newThumb,
            };
            arr = Object.assign(inputList[index], pakets);
            arrobj.push(arr);
          })
          .catch((error) => {
            toast.error("Upload Image Failed !");
          });
      }
      let paket = {
        paket: arrobj,
      };      
      uploadImage(img)
        .then((message) => {
          const newThumb = message.response.data.url;
          dispatch(
            fetchAddPaket(
              token,
              titles,
              sub,
              tag,
              // donasiType,
              benefit,
              newThumb,
              desc,
              content,
              id_pp_cp_master_qris[0],
              qris_image_url[1],
              arrobj
            )
          );
          // dispatch(
          //   fetchAddPaketRutin(
          //     token,
          //     donasiType,
          //     arrobj
          //   )
          // );
        })
        .catch((error) => {
          toast.error("Upload Image Failed !");
        });
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

  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value, files } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    console.log(list);
    setInputList(list);
  };

  // handle click event of the Remove button
  const handleRemoveClick = (index) => {
    const list = [...inputList];
    const lists = [...inputFile];
    list.splice(index, 1);
    lists.splice(index, 1);
    setInputList(list);
    setInputFile(lists);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setInputList([...inputList, { nama_paket: "", benefit: "", nominal: "" }]);
    setInputFile([...inputFile, { paketimage: "" }]);
  };

  //FIles
  // handle input change
  const handleInputFileChange = (e, index) => {
    const { name, file } = e;
    const list = [...inputFile];
    list[index]["paketimage"] = e;
    console.log(list);
    setInputFile(list);
  };

  // // handle click event of the Remove button
  // const handleRemoveFileClick = (index) => {
  //   const list = [...inputFile];
  //   list.splice(index, 1);
  //   setInputFile(list);
  // };

  // // handle click event of the Add button
  // const handleAddFileClick = () => {
  //   setInputFile([...inputFile, { paketimage: "" }]);
  // };

  return (
    <Fragment>
      <Breadcrumb title="Donasi Page" parent="Dashboard" />
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <div className="card">
              <div className="card-header">
                <h5>Add Donasi</h5>
              </div>
              <div className="card-body">
                {/* content form */}
                <form
                  className="needs-validation"
                  noValidate=""
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div className="row justify-content-center">
                    <div className="col-md-12 col-sm-12">
                      <div className="form-row">
                        <div className="col-md-12 mb-3">
                          <label>{"Title"}</label>
                          <input
                            className="form-control"
                            name="title"
                            type="text"
                            placeholder="Title"
                            ref={register({ required: true })}
                            onChange={(e) => setTitles(e.target.value)}
                          />
                          <span>{errors.title && "Title is required"}</span>
                          <div className="valid-feedback">{"Looks good!"}</div>
                        </div>
                        <div className="col-md-12 mb-3">
                          <label>{"Sub-title"}</label>
                          <input
                            className="form-control"
                            name="sub_title"
                            type="text"
                            placeholder="Sub-title"
                            ref={register({ required: true })}
                            onChange={(e) => setSub(e.target.value)}
                          />
                          <span>
                            {errors.sub_title && "Sub-title is required"}
                          </span>
                          <div className="valid-feedback">{"Looks good!"}</div>
                        </div>
                        <div className="col-md-12 mb-3">
                          <label>{"Tag"}</label>
                          <input
                            className="form-control"
                            name="tag"
                            type="text"
                            placeholder="Tag"
                            ref={register({ required: true })}
                            onChange={(e) => setTag(e.target.value)}
                          />
                          <span>
                            {errors.tag && "Tag is required & Min 6 Character"}
                          </span>
                          <div className="valid-feedback">{"Looks good!"}</div>
                        </div>

                        <div className="col-md-12 mb-3">
                          <label>{"Description"}</label>
                          {/* <input className="form-control" name="desc" type="text" placeholder="Description" onChange={(e) => setDesc(e.target.value)} /> */}
                          <textarea
                            className="form-control"
                            name="desc"
                            rows="5"
                            cols="5"
                            placeholder="Default textarea"
                            onChange={(e) => setDesc(e.target.value)}
                          ></textarea>
                          {/* <span>{errors.description && 'Description is required'}</span> */}
                          <div className="valid-feedback">{"Looks good!"}</div>
                        </div>
                        {/* <div className="col-md-12 mb-3">
                          <label>Program Donasi</label>
                          <select
                            className="form-control"
                            name="type"
                            id="donasiType"
                            ref={register({ required: true })}
                            onChange={(e) => setDonasiType(e.target.value)}
                          >
                            
                            <option value={""}> --- </option>
                            {categories.map((cat, index) => (
                              <option key={index} value={cat.id}>
                                {cat.kategori_name}
                              </option>
                            ))}
                          </select>
                          <span style={{ color: "#ff5370" }}>
                            {errors.type && "Type is required"}
                          </span>
                          <div className="valid-feedback">{"Looks good!"}</div>
                        </div> */}
                        <div className="col-md-12 mb-3">
                          <label>{"Pilih QRIS"}</label>
                          <Form.Group controlId="formTipeBayar">
                            <Form.Control
                              required
                              as="select"
                              type="select"
                              onChange={(e) => setTipeBayar(e.target.value)}
                              // {...register("tipebayar", {
                              //   required: true,
                              // })}
                            >
                              <option value="">Pilih QRIS</option>
                              {/* <option value="mandiri">Rekening Mandiri</option>
                                                    <option value="qris">QRIS</option> */}
                              {qrisData.map((qris, index) => (
                                <option
                                  key={index}
                                  value={
                                    qris.id + "_" + qris.thumbnail_image_url
                                  }
                                >
                                  {qris.description}
                                </option>
                              ))}
                            </Form.Control>
                          </Form.Group>
                        </div>
                        {/* <div className="col-md-12 mb-3">
                                                <label>Showing</label>
                                                <select className="form-control" name="show" defaultValue="0" ref={register({ required: true })} onChange={(e) => setShow(e.target.value)}>
                                                    <option value={0}>Unshow</option>
                                                    <option value={1}>Show</option>
                                                </select>
                                                <span style={{color:"#ff5370"}}>{errors.show && 'Show is required'}</span>
                                                <div className="valid-feedback">{"Looks good!"}</div>
                                            </div> */}

                        <div className="col-md-12 mb-3">
                          <label>{"UploadFile"}</label>
                          <input
                            className="form-control"
                            type="file"
                            accept="image/*"
                            onChange={(e) => setImg(e.target.files[0])}
                          />
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

                        {/* Tambah Paket */}
                        {/* <div className="col-md-12 mb-3">
                          <label>{"Benefit"}</label>
                          <input
                            className="form-control"
                            name="benefit"
                            type="text"
                            placeholder="Benefit"
                            onChange={(e) => setBenefit(e.target.value)}
                          />
                          <span>{errors.benefit && "Benefit is required"}</span>
                          <div className="valid-feedback">{"Looks good!"}</div>
                        </div>
                        <div className="col-md-12 mb-3">
                          <label>{"Nominal"}</label>
                          <input
                            className="form-control"
                            name="benefit"
                            type="text"
                            placeholder="Nominal"
                            onChange={(e) => setNominal(e.target.value)}
                          />
                          <span>{errors.benefit && "Benefit is required"}</span>
                          <div className="valid-feedback">{"Looks good!"}</div>
                        </div>
                        <div className="col-md-12 mb-3">
                          <label>{"Upload Paket Image"}</label>
                          <input
                            className="form-control"
                            type="file"
                            accept="image/*"
                            onChange={(e) => setImg(e.target.files[0])}
                          />
                        </div> */}
                        <Container>
                          <Row>
                            <Col sm={8}>
                              <Row>
                                {inputList.map((x, i) => {
                                  return (
                                    <>
                                      <div className="col-md-4 mb-3">
                                        <input
                                          className="form-control"
                                          name="nama_paket"
                                          placeholder="Nama Paket"
                                          value={x.nama_paket}
                                          onChange={(e) =>
                                            handleInputChange(e, i)
                                          }
                                        />
                                      </div>
                                      <div className="col-md-4 mb-3">
                                        <input
                                          className="form-control"
                                          name="benefit"
                                          placeholder="Benefit"
                                          value={x.benefit}
                                          onChange={(e) =>
                                            handleInputChange(e, i)
                                          }
                                        />
                                      </div>
                                      <div className="col-md-4 mb-3">
                                        <input
                                          className="form-control"
                                          name="nominal"
                                          placeholder="Nominal"
                                          value={x.nominal}
                                          onChange={(e) =>
                                            handleInputChange(e, i)
                                          }
                                        />
                                      </div>
                                    </>
                                  );
                                })}
                              </Row>
                            </Col>
                            <Col sm={4}>
                              <Row>
                                {inputFile.map((x, i) => {
                                  return (
                                    <>
                                      <div className="col-md-10">
                                        <input
                                          className="form-control"
                                          type="file"
                                          accept="image/*"
                                          name="paketimage"
                                          onChange={(e) =>
                                            handleInputFileChange(
                                              e.target.files[0],
                                              i
                                            )
                                          }
                                        />
                                      </div>                                     
                                      <div className="col-md-2">
                                        {inputList.length !== 1 && (
                                          <Trash
                                            style={{
                                              cursor: "pointer",
                                              color: "red",
                                            }}
                                            onClick={() => handleRemoveClick(i)}
                                          >
                                            Remove
                                          </Trash>
                                        )}
                                      </div>
                                      <div className="col-md-12 mb-3">
                                        {inputList.length - 1 === i && (
                                          <button
                                            onClick={handleAddClick}
                                            className="btn btn-primary mt-3 mb-3 pull-right"
                                          >
                                            Add
                                          </button>
                                        )}
                                      </div>
                                    </>
                                  );
                                })}
                              </Row>
                            </Col>
                          </Row>
                        </Container>
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
};

export default AddDonasi;
