import React, { Fragment, useState, useEffect } from 'react';
import Breadcrumb from '../../components/common/breadcrumb';
import PropTypes from "prop-types";
import { Edit, Trash} from 'react-feather';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchHubungi, fetchDeleteHubungi } from "../../redux/hubungi/action";

const Hubungi = (props) => {

    const dispatch = useDispatch();

    let token = localStorage.getItem('token');
    useEffect(() => {
        dispatch(fetchHubungi(token))
    },[])

    const hubungiData = useSelector((state) => state.hubungiReducer.hubungi);

    const hubungiDatas = hubungiData.map((hubungi, index) => {
        return (
            <tr key={index}>
                <th scope="row">{index+1}</th>
                <td>{hubungi.title}</td>
                <td><img src={hubungi.icon} alt={hubungi.icon} style={{width: 100}}/></td>
                <td>
                    {/* <Link to="/edit-hubungi" className="mr-2"> */}
                    <Link to={{
                            pathname: "/edit-hubungi",
                            state: { data: hubungi }
                        }} className="mr-2">
                        <Edit className="edit-hubungi" style={{cursor:"pointer"}}/>
                    </Link>
                    <Trash className="delete-hubungi" style={{cursor:"pointer"}} onClick={() => dispatch(fetchDeleteHubungi(token, hubungi.id))}/>
                </td>
            </tr>
        )
    })

    return (
        <Fragment>
            <Breadcrumb title="Hubungi Page" parent="Dashboard" />
            <div className="container-fluid">
            <div className="row">
            <div className="col-sm-12">
                <div className="card">
                <div className="card-header">
                    <div className="row justify-content-between">
                        <div className="col-md-3 col-sm-12">
                        <h5>Hubungi</h5>
                        </div>
                        <div className="col-md-3 col-sm-12">
                            <Link to="/add-hubungi" className="btn btn-success float-right">
                                Add Hubungi
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
                                    <th scope="col">{"Icon"}</th>
                                    <th scope="col">{"Action"}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {hubungiDatas}
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

Hubungi.propTypes = {
    hubungiData: PropTypes.array
};
  
Hubungi.defaultProps = {
    hubungiData: [
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

// const mapStateToProps = state => {
//     return {
//         // fetchToken: () => dispatch(fetchToken()) 
//         tokens: state.tokenReducer.token
//     }
// }
  
// export default connect(mapStateToProps, null)(Hubungi)

export default Hubungi