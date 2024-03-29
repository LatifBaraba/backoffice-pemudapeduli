import React, { Fragment, useState, useEffect } from "react";
import Breadcrumb from "../../components/common/breadcrumb";
import useForm from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { fetchEditBerita, fetchDetailBerita } from "../../redux/berita/action";
import { uploadImage } from "../../helper/index";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import {
  EditorState,
  ContentState,
  convertToRaw,
  convertFromRaw,
} from "draft-js";

const EditBerita = (props) => {
  const { data } = props.location.state;
  const dispatch = useDispatch();
  let token = localStorage.getItem("token");

  const [id, setId] = useState(data.id);
  const [titles, setTitles] = useState(data.title);
  const [sub, setSub] = useState(data.sub_title);
  const [tag, setTag] = useState(data.tag);
  const [is_headline, setIsheadline] = useState(data.is_headline);
  const [thumb, setThumb] = useState(data.thumbnail_image_url);
  const [desc, setDesc] = useState(data.description);
  const [img, setImg] = useState("");

  const loadingStatus = useSelector((state) => state.beritaReducer.loading);

  const { register, handleSubmit, errors } = useForm();

  const blocksFromHtml = htmlToDraft(data.content);
  const { contentBlocks, entityMap } = blocksFromHtml;
  const contentState = ContentState.createFromBlockArray(
    contentBlocks,
    entityMap
  );
  const existing = EditorState.createWithContent(contentState);

  let initialState = EditorState.createEmpty();
  const [editorState, setEditorState] = useState(
    contentState ? existing : initialState
  );
  const newContent = draftToHtml(convertToRaw(editorState.getCurrentContent()));

  const onSubmit = (data) => {
    if (data !== "") {
      if (img !== "") {
        uploadImage(img)
          .then((message) => {
            const newThumb = message.response.data.url;
            dispatch(
              fetchEditBerita(
                token,
                id,
                titles,
                sub,
                tag,
                is_headline,
                newContent,
                newThumb,
                desc
              )
            );
          })
          .catch((error) => {
            toast.error("Upload Image Failed !");
          });
      } else {
        const newThumb = thumb;
        dispatch(
          fetchEditBerita(
            token,
            id,
            titles,
            sub,
            tag,
            is_headline,
            newContent,
            newThumb,
            desc
          )
        );
      }
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

  return (
    <Fragment>
      <Breadcrumb title="Berita Page" parent="Dashboard" />
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <div className="card">
              <div className="card-header">
                <h5>Add Berita</h5>
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
                            value={titles}
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
                            value={sub}
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
                            value={tag}
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
                            defaultValue={data.is_headline}
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
                          {/* <input className="form-control" name="description" type="text" placeholder="Description" value={desc} ref={register({ required: true })} onChange={(e) => setDesc(e.target.value)} /> */}
                          <textarea
                            className="form-control"
                            name="desc"
                            rows="5"
                            cols="5"
                            placeholder="Description"
                            value={desc}
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

export default EditBerita;
