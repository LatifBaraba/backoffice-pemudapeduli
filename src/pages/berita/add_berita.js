import React, { Fragment, useState } from "react";
import Breadcrumb from "../../components/common/breadcrumb";
import useForm from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { fetchAddBerita } from "../../redux/berita/action";
import { uploadImage } from "../../helper/index";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
import { EditorState, convertToRaw } from "draft-js";

const AddBerita = () => {
  const { register, handleSubmit, errors } = useForm();
  const dispatch = useDispatch();

  let token = localStorage.getItem("token");

  const [titles, setTitles] = useState("");
  const [sub, setSub] = useState("");
  const [tag, setTag] = useState("");
  const [is_headline, setIsheadline] = useState("");
  const [desc, setDesc] = useState("");
  const [img, setImg] = useState();

  const loadingStatus = useSelector((state) => state.beritaReducer.loading);

  let _contentState = EditorState.createEmpty("");
  const [editorState, setEditorState] = useState(_contentState);
  const content = draftToHtml(convertToRaw(editorState.getCurrentContent()));

  const onSubmit = (data) => {
    if (data !== "") {
      uploadImage(img)
        .then((message) => {
          const newThumb = message.response.data.url;
          dispatch(
            fetchAddBerita(
              token,
              titles,
              sub,
              tag,
              is_headline,
              content,
              newThumb,
              desc
            )
          );
        })
        .catch((error) => {
          toast.error("Upload Image Failed !");
        });
    } else {
      errors.showMessages();
    }
  };

  const submitButton = () => {
    if (loadingStatus === false) {
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

  return (
    <Fragment>
      <Breadcrumb title="News Page" parent="Dashboard" />
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <div className="card">
              <div className="card-header">
                <h5>Add News</h5>
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
                          <label>Headline</label>
                          <select
                            className="form-control"
                            name="is_headline"                            
                            ref={register({ required: true })}
                            onChange={(e) => setIsheadline(e.target.value)}
                          >
                            <option value={false}>Tidak Aktif</option>
                            <option value={true}>Aktif</option>
                          </select>
                          <span style={{ color: "#ff5370" }}>
                            {errors.is_headline && "Show is required"}
                          </span>
                          <div className="valid-feedback">{"Looks good!"}</div>
                        </div>
                        <div className="col-md-12 mb-3">
                          <label>{"Description"}</label>
                          {/* <input className="form-control" name="desc" type="text" placeholder="Description" ref={register({ required: true })} onChange={(e) => setDesc(e.target.value)} /> */}
                          <textarea
                            className="form-control"
                            name="desc"
                            rows="5"
                            cols="5"
                            placeholder="Description"
                            ref={register({ required: true })}
                            onChange={(e) => setDesc(e.target.value)}
                          ></textarea>
                          <span>
                            {errors.description && "Description is required"}
                          </span>
                          <div className="valid-feedback">{"Looks good!"}</div>
                        </div>
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

export default AddBerita;
