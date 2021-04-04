import React, { Fragment, useEffect } from 'react';
import Breadcrumb from '../../components/common/breadcrumb';
import { Edit, Trash} from 'react-feather';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPartner, fetchDeletePartner } from "../../redux/partner/action";

const Partner = (props) => {

    const dispatch = useDispatch();

    let token = localStorage.getItem('token');
    useEffect(() => {
        dispatch(fetchPartner(token))
    },[])

    const partnerData = useSelector((state) => state.partnerReducer.partner);
    console.log(partnerData)
    const partnerDatas = partnerData.map((partner, index) => {
        return (
            <tr key={index}>
                <th scope="row">{index+1}</th>
                <td>{partner.name}</td>
                <td className="text-center"><img src={partner.thumbnail_image_url} alt={partner.thumbnail_image_url} style={{width: 100}}/></td>
                <td>
                    <Link to={{
                            pathname: "/edit-partner",
                            state: { data: partner }
                        }} className="mr-2">
                        <Edit className="edit-partner" style={{cursor:"pointer"}}/>
                    </Link>
                    <Trash className="delete-partner" style={{cursor:"pointer"}} onClick={() => dispatch(fetchDeletePartner(token, partner.id))}/>
                </td>
            </tr>
        )
    })

    return (
        <Fragment>
            <Breadcrumb title="Partner Page" parent="Dashboard" />
            <div className="container-fluid">
            <div className="row">
            <div className="col-sm-12">
                <div className="card">
                <div className="card-header">
                    <div className="row justify-content-between">
                        <div className="col-md-3 col-sm-12">
                        <h5>Partner</h5>
                        </div>
                        <div className="col-md-3 col-sm-12">
                            <Link to="/add-partner" className="btn btn-success float-right">
                                Add Partner
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
                                    <th scope="col">{"Name"}</th>
                                    <th scope="col">{"Thumbnail-image"}</th>
                                    <th scope="col">{"Action"}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {partnerDatas}
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

export default Partner