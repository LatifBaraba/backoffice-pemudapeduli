import React, { Fragment, useEffect } from 'react';
import Breadcrumb from '../../components/common/breadcrumb';
import { Edit, Trash} from 'react-feather';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBeneficaries, fetchDeleteBeneficaries } from "../../redux/beneficaries/action";

const Beneficaries = (props) => {

    const dispatch = useDispatch();

    let token = localStorage.getItem('token');
    
    useEffect(() => {
        dispatch(fetchBeneficaries(token))
    },[])

    const beneficariesData = useSelector((state) => state.beneficariesReducer.beneficaries);
    // console.log(beneficariesData)
    const beneficariesDatas = beneficariesData.map((beneficaries, index) => {
        return (
            <tr key={index}>
                <th scope="row">{index+1}</th>
                {/* <td>{user.id}</td> */}
                <td className="text-center"><img src={beneficaries.thumbnail_image_url} alt={beneficaries.thumbnail_image_url} style={{width: 100}}/></td>
                <td>
                    <Link to={{
                            pathname: "/edit-beneficaries",
                            state: { data: beneficaries }
                        }} className="mr-2">
                        <Edit className="edit-beneficaries" style={{cursor:"pointer"}}/>
                    </Link>
                    <Trash className="delete-beneficaries" style={{cursor:"pointer"}} onClick={() => dispatch(fetchDeleteBeneficaries(token, beneficaries.id))}/>
                </td>
            </tr>
        )
    })

    return (
        <Fragment>
            <Breadcrumb title="Beneficaries Page" parent="Dashboard" />
            <div className="container-fluid">
            <div className="row">
            <div className="col-sm-12">
                <div className="card">
                <div className="card-header">
                    <div className="row justify-content-between">
                        <div className="col-md-3 col-sm-12">
                            <h5>Beneficaries</h5>
                        </div>
                        <div className="col-md-3 col-sm-12">
                            <Link to="/add-beneficaries" className="btn btn-success float-right">
                                Add Beneficaries
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
                                    <th scope="col" style={{textAlign:"center"}}>{"Thumbnail-image"}</th>
                                    <th scope="col">{"Action"}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {beneficariesDatas}
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

export default Beneficaries