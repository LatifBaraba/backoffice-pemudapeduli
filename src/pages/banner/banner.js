import React, { Fragment, useEffect } from 'react';
import Breadcrumb from '../../components/common/breadcrumb';
import PropTypes from "prop-types";
import { Edit, Trash} from 'react-feather';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBanner, fetchDeleteBanner } from "../../redux/banner/action";

const Banner = (props) => {

    const dispatch = useDispatch();

    let token = localStorage.getItem('token');
    
    useEffect(() => {
        dispatch(fetchBanner(token))
    },[])

    const bannerData = useSelector((state) => state.bannerReducer.banner);

    const bannerDatas = bannerData.map((banner, index) => {
        return (
            <tr key={index}>
                <th scope="row">{index+1}</th>
                {/* <td>{user.id}</td> */}
                <td>{banner.title}</td>
                <td>{banner.sub_title}</td>
                <td>{banner.title_content}</td>
                <td className="text-center"><img src={banner.thumbnail_image_url} alt={banner.thumbnail_image_url} style={{width: 100}}/></td>
                <td>
                    <Link to={{
                            pathname: "/edit-banner",
                            state: { data: banner }
                        }} className="mr-2">
                        <Edit className="edit-banner" style={{cursor:"pointer"}}/>
                    </Link>
                    <Trash className="delete-banner" style={{cursor:"pointer"}} onClick={() => dispatch(fetchDeleteBanner(token, banner.id))}/>
                </td>
            </tr>
        )
    })

    return (
        <Fragment>
            <Breadcrumb title="Banner Page" parent="Dashboard" />
            <div className="container-fluid">
            <div className="row">
            <div className="col-sm-12">
                <div className="card">
                <div className="card-header">
                    <div className="row justify-content-between">
                        <div className="col-md-3 col-sm-12">
                            <h5>Banner</h5>
                        </div>
                        <div className="col-md-3 col-sm-12">
                            <Link to="/add-banner" className="btn btn-success float-right">
                                Add Banner
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
                                {bannerDatas}
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

Banner.propTypes = {
    bannerData: PropTypes.array
};
  
Banner.defaultProps = {
    bannerData: [
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

export default Banner