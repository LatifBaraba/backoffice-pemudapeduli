import React, { Fragment, useEffect } from 'react';
import Breadcrumb from '../../components/common/breadcrumb';
import { Edit, Trash} from 'react-feather';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPaket, fetchDeletePaket } from "../../redux/paket/action";

const Paket = (props) => {

    const {data} = props.location.state;

    const dispatch = useDispatch();
    let token = localStorage.getItem('token');
    
    useEffect(() => {
        dispatch(fetchPaket(token, data.id))
    },[])

    const paketData = useSelector((state) => state.paketReducer.paket);

    const paketDatas = paketData.map((paket, index) => {
        return (
            <tr key={index}>
                <th scope="row">{index+1}</th>
                {/* <td>{user.id}</td> */}
                <td>{paket.title}</td>
                <td>{paket.sub_title}</td>
                <td>{paket.tag}</td>
                {/* <td>{paket.paket_type}</td> */}
                <td className="text-center"><img src={paket.thumbnail_image_url} alt={paket.thumbnail_image_url} style={{width: 100}}/></td>
                <td>
                    <Link to={{
                            pathname: "/edit-paket-onetime",
                            state: { data: paket }
                        }} className="mr-2">
                        <Edit className="edit-paket-onetime" style={{cursor:"pointer"}}/>
                    </Link>
                    <Trash className="delete-paket" style={{cursor:"pointer"}} onClick={() => dispatch(fetchDeletePaket(token, paket.id))}/>
                </td>
            </tr>
        )
    })

    return (
        <Fragment>
            <Breadcrumb title="Paket Page" parent="Dashboard" />
            <div className="container-fluid">
            <div className="row">
            <div className="col-sm-12">
                <div className="card">
                <div className="card-header">
                    <div className="row justify-content-between">
                        <div className="col-md-3 col-sm-12">
                            <h5>Kategori "{data.kategori_name}"</h5>
                        </div>
                        <div className="col-md-3 col-sm-12">
                            <Link to="/add-paket" className="btn btn-success float-right">
                                Add Paket
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
                                    {/* <th scope="col">{"Paket-Type"}</th> */}
                                    <th scope="col">{"Thumbnail-image"}</th>
                                    <th scope="col">{"Action"}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paketDatas}
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

export default Paket