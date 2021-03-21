import React, { Fragment, useState } from 'react';
import Breadcrumb from '../../components/common/breadcrumb';
import PropTypes from "prop-types";
import { Edit, Trash} from 'react-feather';
import { Link } from 'react-router-dom';

const News = (props) => {

    const newsDatas = props.newsData.map((news, index) => {
        return (
            <tr key={index}>
                <th scope="row">{index+1}</th>
                {/* <td>{user.id}</td> */}
                <td>{news.title}</td>
                <td>{news.sub_title}</td>
                <td>{news.title_content}</td>
                <td>{news.thumbnail_image_url}</td>
                <td>
                    <Link to="/edit-news" className="mr-2">
                        <Edit className="edit-news" style={{cursor:"pointer"}}/>
                    </Link>
                    {/* <button className="btn btn-danger" onClick={() => alert("delete")}> */}
                        <Trash className="delete-news" style={{cursor:"pointer"}} onClick={() => alert("delete")}/>
                    {/* </button> */}
                </td>
            </tr>
        )
    })

    return (
        <Fragment>
            <Breadcrumb title="News Page" parent="Dashboard" />
            <div className="container-fluid">
            <div className="row">
            <div className="col-sm-12">
                <div className="card">
                <div className="card-header">
                    <div className="row justify-content-between">
                        <div className="col-md-3 col-sm-12">
                            <h5>News</h5>
                        </div>
                        <div className="col-md-3 col-sm-12">
                            <Link to="/add-news" className="btn btn-success float-right">
                                Add News
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
                                    <th scope="col">{"Sub-title"}</th>
                                    <th scope="col">{"Title-content"}</th>
                                    <th scope="col">{"Thumbnail-image"}</th>
                                    <th scope="col">{"Action"}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {newsDatas}
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

News.propTypes = {
    newsData: PropTypes.array
};
  
News.defaultProps = {
    newsData: [
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

export default News