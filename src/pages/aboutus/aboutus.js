import React, { Fragment, useState } from 'react';
import Breadcrumb from '../../components/common/breadcrumb';
import PropTypes from "prop-types";
import { Edit, Trash} from 'react-feather';
import { Link } from 'react-router-dom';

const AboutUs = (props) => {

    const aboutUsDatas = props.aboutusData.map((about, index) => {
        return (
            <tr key={index}>
                <th scope="row">{index+1}</th>
                {/* <td>{user.id}</td> */}
                <td>{about.thumbnail_image_url}</td>
                <td>
                    <Link to="/edit-aboutus" className="mr-2">
                        <Edit className="edit-aboutus" style={{cursor:"pointer"}}/>
                    </Link>
                    {/* <button className="btn btn-danger" onClick={() => alert("delete")}> */}
                        <Trash className="delete-aboutus" style={{cursor:"pointer"}} onClick={() => alert("delete")}/>
                    {/* </button> */}
                </td>
            </tr>
        )
    })

    return (
        <Fragment>
            <Breadcrumb title="AboutUs Page" parent="Dashboard" />
            <div className="container-fluid">
            <div className="row">
            <div className="col-sm-12">
                <div className="card">
                <div className="card-header">
                    <div className="row justify-content-between">
                        <div className="col-md-3 col-sm-12">
                            <h5>AboutUs</h5>
                        </div>
                        <div className="col-md-3 col-sm-12">
                            <Link to="/add-aboutus" className="btn btn-success float-right">
                                Add AboutUs
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
                                    <th scope="col">{"Thumbnail-image"}</th>
                                    <th scope="col">{"Action"}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {aboutUsDatas}
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

AboutUs.propTypes = {
    aboutusData: PropTypes.array
};
  
AboutUs.defaultProps = {
    aboutusData: [
        {
            thumbnail_image_url:"http://gambar1",
            description:""
        },
        {
            thumbnail_image_url:"http://gambar2",
            description:""
        },
        {
            thumbnail_image_url:"http://gambar3",
            description:""
        },
    ]
};

export default AboutUs