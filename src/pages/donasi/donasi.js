import React, { Fragment, useEffect } from 'react';
import Breadcrumb from '../../components/common/breadcrumb';
import PropTypes from "prop-types";
import { Edit, Trash} from 'react-feather';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDonasi, fetchDeleteDonasi } from "../../redux/donasi/action";

const Donasi = () => {

    const dispatch = useDispatch();

    let token = localStorage.getItem('token');
    
    useEffect(() => {
        dispatch(fetchDonasi(token))
    },[])

    const donasiData = useSelector((state) => state.donasiReducer.donasi);

    const donasiDatas = donasiData.map((donasi, index) => {
        return (
            <tr key={index}>
                <th scope="row">{index+1}</th>
                {/* <td>{user.id}</td> */}
                <td>{donasi.title}</td>
                <td>{donasi.sub_title}</td>
                <td>{donasi.tag}</td>
                {/* <td>{donasi.donasi_type}</td> */}
                <td className="text-center"><img src={donasi.thumbnail_image_url} alt={donasi.thumbnail_image_url} style={{width: 100}}/></td>
                <td>
                    <Link to={{
                            pathname: "/edit-donasi-onetime",
                            state: { data: donasi }
                        }} className="mr-2">
                        <Edit className="edit-donasi-onetime" style={{cursor:"pointer"}}/>
                    </Link>
                    <Trash className="delete-donasi" style={{cursor:"pointer"}} onClick={() => dispatch(fetchDeleteDonasi(token, donasi.id))}/>
                </td>
            </tr>
        )
    })

    return (
        <Fragment>
            <Breadcrumb title="Donasi Page" parent="Dashboard" />
            <div className="container-fluid">
            <div className="row">
            <div className="col-sm-12">
                <div className="card">
                <div className="card-header">
                    <div className="row justify-content-between">
                        <div className="col-md-3 col-sm-12">
                            <h5>Donasi</h5>
                        </div>
                        <div className="col-md-3 col-sm-12">
                            <Link to="/add-donasi-onetime" className="btn btn-success float-right">
                                Add Donasi
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
                                    <th scope="col">{"Tag"}</th>
                                    {/* <th scope="col">{"Donasi-Type"}</th> */}
                                    <th scope="col">{"Thumbnail-image"}</th>
                                    <th scope="col">{"Action"}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {donasiDatas}
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

Donasi.propTypes = {
    bannerData: PropTypes.array
};
  
Donasi.defaultProps = {
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

export default Donasi