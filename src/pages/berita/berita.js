import React, { Fragment, useEffect } from 'react';
import Breadcrumb from '../../components/common/breadcrumb';
import PropTypes from "prop-types";
import { Edit, Trash} from 'react-feather';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBerita, fetchDeleteBerita } from "../../redux/berita/action";

const Berita = (props) => {

    const dispatch = useDispatch();

    let token = localStorage.getItem('token');
    
    useEffect(() => {
        dispatch(fetchBerita(token))
    },[])

    const beritaData = useSelector((state) => state.beritaReducer.berita);

    const beritaDatas = beritaData.map((berita, index) => {
        return (
            <tr key={index}>
                <th scope="row">{index+1}</th>
                {/* <td>{user.id}</td> */}
                <td>{berita.title}</td>
                <td>{berita.sub_title}</td>
                <td>{berita.tag}</td>
                <td className="text-center"><img src={berita.thumbnail_image_url} alt={berita.thumbnail_image_url} style={{width: 100}}/></td>
                <td>
                    <Link to={{
                            pathname: "/edit-berita",
                            state: { data: berita }
                        }} className="mr-2">
                        <Edit className="edit-berita" style={{cursor:"pointer"}}/>
                    </Link>
                    <Trash className="delete-berita" style={{cursor:"pointer"}} onClick={() => dispatch(fetchDeleteBerita(token, berita.id))}/>
                </td>
            </tr>
        )
    })

    return (
        <Fragment>
            <Breadcrumb title="Berita Page" parent="Dashboard" />
            <div className="container-fluid">
            <div className="row">
            <div className="col-sm-12">
                <div className="card">
                <div className="card-header">
                    <div className="row justify-content-between">
                        <div className="col-md-3 col-sm-12">
                            <h5>Berita</h5>
                        </div>
                        <div className="col-md-3 col-sm-12">
                            <Link to="/add-berita" className="btn btn-success float-right">
                                Add Berita
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
                                    <th scope="col">{"Thumbnail-image"}</th>
                                    <th scope="col">{"Action"}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {beritaDatas}
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

Berita.propTypes = {
    newsData: PropTypes.array
};
  
Berita.defaultProps = {
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

export default Berita