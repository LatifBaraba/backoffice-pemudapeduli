import React, { Fragment, useEffect } from 'react';
import Breadcrumb from '../../components/common/breadcrumb';
import { Edit, Trash} from 'react-feather';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchKontak, fetchDeleteKontak } from "../../redux/kontak/action";

const Kontak = () => {

    const dispatch = useDispatch();

    let token = localStorage.getItem('token');
    
    useEffect(() => {
        dispatch(fetchKontak(token))
    },[])

    const kontakData = useSelector((state) => state.kontakReducer.kontak);

    const kontakDatas = kontakData.map((data, index) => {
        return (
            <tr key={index}>
                <td scope="row">{index+1}</td>
                <td><img src={data.sk_legalitas} alt={data.sk_legalitas} style={{width: 100}}/></td>
                <td>{data.address}</td>
                <td>
                    <Link to={{
                            pathname: "/edit-kontak",
                            state: { data: data }
                        }} className="mr-2">
                        <Edit className="edit-kontak" style={{cursor:"pointer"}}/>
                    </Link>
                    <Trash className="delete-kontak" style={{cursor:"pointer"}} onClick={() => dispatch(fetchDeleteKontak(token, data.id))}/>
                </td>
            </tr>
        )
    })

    return (
        <Fragment>
            <Breadcrumb title="Kontak Page" parent="Dashboard" />
            <div className="container-fluid">
            <div className="row">
            <div className="col-sm-12">
                <div className="card">
                <div className="card-header">
                    <div className="row justify-content-between">
                        <div className="col-md-3 col-sm-12">
                            <h5>Kontak</h5>
                        </div>
                        <div className="col-md-3 col-sm-12">
                            <Link to="/add-kontak" className="btn btn-success float-right">
                                Add Kontak
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
                                    <th scope="col">{"SK-Legalitas"}</th>
                                    <th scope="col">{"Address"}</th>
                                    <th scope="col">{"Action"}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {kontakDatas}
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

export default Kontak