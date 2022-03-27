import React, { Fragment, useEffect } from 'react';
import Breadcrumb from '../../components/common/breadcrumb';
import PropTypes from "prop-types";
import { Edit, Trash} from 'react-feather';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDeleteUploadPdf, fetchUploadPdf } from '../../redux/uploadpdf/action';

const UploadPdf = (props) => {

    const dispatch = useDispatch();

    let token = localStorage.getItem('token');
    
    useEffect(() => {
        dispatch(fetchUploadPdf(token))
    },[])

    const uploadData = useSelector((state) => state.uploadReducer.uploadpdf);

    const uploadDatas = uploadData.map((uploadpdf, index) => {
        return (
            <tr key={index}>
                <th scope="row">{index+1}</th>
                {/* <td>{user.id}</td> */}
                <td>{uploadpdf.document[0].title}</td>               
                <td>{uploadpdf.document[0].link_url}</td>               
                {/* <td className="text-center"><img src={uploadpdf.thumbnail_image_url} alt={uploadpdf.thumbnail_image_url} style={{width: 100}}/></td> */}
                <td>
                    <Link to={{
                            pathname: "/edit-upload",
                            state: { data: uploadpdf }
                        }} className="mr-2">
                        <Edit className="edit-upload" style={{cursor:"pointer"}}/>
                    </Link>
                    <Trash className="delete-upload" style={{cursor:"pointer"}} onClick={() => dispatch(fetchDeleteUploadPdf(token, uploadpdf.id))}/>
                </td>
            </tr>
        )
    })

    return (
        <Fragment>
            <Breadcrumb title="Upload PDF Page" parent="Dashboard" />
            <div className="container-fluid">
            <div className="row">
            <div className="col-sm-12">
                <div className="card">
                <div className="card-header">
                    <div className="row justify-content-between">
                        <div className="col-md-3 col-sm-12">
                            <h5>Upload PDF</h5>
                        </div>
                        <div className="col-md-3 col-sm-12">
                            <Link to="/add-upload" className="btn btn-success float-right">
                                Add PDF
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">{"#"}</th>
                                    <th scope="col">{"Tittle"}</th>
                                    <th scope="col">{"Link"}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {uploadDatas}
                            </tbody>
                        </table>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
    </Fragment>
    );
}

UploadPdf.propTypes = {
    uploadData: PropTypes.array
};
  
UploadPdf.defaultProps = {
    uploadData: [
        {
            title:"banner1",
            sub_title:"coba banner1",
            title_content:"title1",
            thumbnail_image_url:"http://gambar,png",
            deeplink_right:"view",
            deeplink_left:"button",
            description:"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempora, iure!"
        },
        {
            title:"banner2",
            sub_title:"coba banner2",
            title_content:"title1",
            thumbnail_image_url:"http://gambar,png",
            deeplink_right:"view",
            deeplink_left:"button",
            description:"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempora, iure!"
        },
        {
            title:"banner3",
            sub_title:"coba banner3",
            title_content:"title3",
            thumbnail_image_url:"http://gambar,png",
            deeplink_right:"view",
            deeplink_left:"button",
            description:"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempora, iure!"
        },
    ]
};

export default UploadPdf