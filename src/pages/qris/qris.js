import React, { Fragment, useState, useEffect } from 'react';
import Breadcrumb from '../../components/common/breadcrumb';
import PropTypes from "prop-types";
import { Edit, Trash} from 'react-feather';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchQris, fetchDeleteQris } from "../../redux/qris/action";

const Qris = (props) => {

    const dispatch = useDispatch();

    let token = localStorage.getItem('token');
    useEffect(() => {
        dispatch(fetchQris(token))
    },[])

    const qrisData = useSelector((state) => state.qrisReducer.qris);

    const qrisDatas = qrisData.map((qris, index) => {
        return (
            <tr key={index}>
                <th scope="row">{index+1}</th>
                <td>{qris.title}</td>
                <td>{qris.description}</td>
                <td><img src={qris.thumbnail_image_url} alt={qris.thumbnail_image_url} style={{width: 100}}/></td>
                <td>
                    {/* <Link to="/edit-qris" className="mr-2"> */}
                    <Link to={{
                            pathname: "/edit-qris",
                            state: { data: qris }
                        }} className="mr-2">
                        <Edit className="edit-qris" style={{cursor:"pointer"}}/>
                    </Link>
                    <Trash className="delete-qris" style={{cursor:"pointer"}} onClick={() => dispatch(fetchDeleteQris(token, qris.id))}/>
                </td>
            </tr>
        )
    })

    return (
        <Fragment>
            <Breadcrumb title="Qris Page" parent="Dashboard" />
            <div className="container-fluid">
            <div className="row">
            <div className="col-sm-12">
                <div className="card">
                <div className="card-header">
                    <div className="row justify-content-between">
                        <div className="col-md-3 col-sm-12">
                        <h5>Qris</h5>
                        </div>
                        <div className="col-md-3 col-sm-12">
                            <Link to="/add-qris" className="btn btn-success float-right">
                                Add Qris
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
                                    <th scope="col">{"Description"}</th>
                                    <th scope="col">{"QRIS"}</th>
                                    <th scope="col">{"Action"}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {qrisDatas}
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

Qris.propTypes = {
    qrisData: PropTypes.array
};
  
Qris.defaultProps = {
    qrisData: [
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
  
// export default connect(mapStateToProps, null)(Qris)

export default Qris