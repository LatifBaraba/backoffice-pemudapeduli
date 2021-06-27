import React, { Fragment, useEffect } from 'react';
import Breadcrumb from '../../components/common/breadcrumb';
import { Edit, Trash} from 'react-feather';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDonasiRutin, fetchDeleteDonasiRutin } from "../../redux/donasiRutin/action";

const DonasiRutin = () => {

    const dispatch = useDispatch();

    let token = localStorage.getItem('token');
    
    useEffect(() => {
        dispatch(fetchDonasiRutin(token))
    },[])

    const donasiRutinData = useSelector((state) => state.donasiRutinReducer.donasiRutin);

    const donasiRutinDatas = donasiRutinData.map((donasi, index) => {
        return (
            <tr key={index}>
                <th scope="row">{index+1}</th>
                <td>{donasi.kategori_name}</td>
                <td>
                    <Link to={{
                            pathname: "/edit-donasi-rutin",
                            state: { data: donasi }
                        }} className="mr-2">
                        <Edit className="edit-donasi-rutin" style={{cursor:"pointer"}}/>
                    </Link>
                    <Trash className="delete-donasi-rutin" style={{cursor:"pointer"}} onClick={() => dispatch(fetchDeleteDonasiRutin(token, donasi.id))}/>
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
                            <Link to="/add-donasi-rutin" className="btn btn-success float-right">
                                Add Kategori
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
                                    <th scope="col">{"Kategori"}</th>
                                    <th scope="col">{"Action"}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {donasiRutinDatas}
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

export default DonasiRutin