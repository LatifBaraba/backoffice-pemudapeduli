import React, { Fragment, useEffect } from 'react';
import Breadcrumb from '../../components/common/breadcrumb';
import { Edit, Trash} from 'react-feather';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDonasiKategori, fetchDeleteDonasiKategori, fetchDonasiOneTimeKategori, fetchDeleteDonasiOneTimeKategori } from "../../redux/donasiKategori/action";
import { Button } from 'reactstrap';

const DonasiKategori = () => {

    const dispatch = useDispatch();

    let token = localStorage.getItem('token');
    
    useEffect(() => {
        dispatch(fetchDonasiOneTimeKategori(token))
    },[])

    const donasiKategoriData = useSelector((state) => state.donasiKategoriReducer.donasionetimeKategori);

    const donasiKategoriDatas = donasiKategoriData.map((donasi, index) => {
        return (
            <tr key={index}>
                <th scope="row">{index+1}</th>
                <td>{donasi.name}</td>                
                <td>
                    <Link to={{
                            pathname: "/edit-onetime-kategori",
                            state: { data: donasi }
                        }} className="mr-2">
                        <Edit className="edit-donasi-kategori" style={{cursor:"pointer"}}/>
                    </Link>                    
                    <Trash className="delete-donasi-kategori" style={{cursor:"pointer"}} onClick={() => dispatch(fetchDeleteDonasiOneTimeKategori(token, donasi.id))}/>
                </td>
            </tr>
        )
    })

    return (
        <Fragment>
            <Breadcrumb title="Kategori Page" parent="Dashboard" />
            <div className="container-fluid">
            <div className="row">
            <div className="col-sm-12">
                <div className="card">
                <div className="card-header">
                    <div className="row justify-content-between">
                        <div className="col-md-3 col-sm-12">
                            <h5>Kategori</h5>
                        </div>
                        <div className="col-md-3 col-sm-12">
                            <Link to="/add-onetime-kategori" className="btn btn-success float-right">
                                Add Kategori Donasi
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
                                    <th scope="col">{"Program Donasi"}</th>
                                    <th scope="col">{"Action"}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {donasiKategoriDatas}
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

export default DonasiKategori