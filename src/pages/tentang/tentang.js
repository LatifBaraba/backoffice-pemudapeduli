import React, { Fragment, useEffect } from 'react';
import Breadcrumb from '../../components/common/breadcrumb';
import { Edit, Trash} from 'react-feather';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTentang, fetchDeleteTentang } from "../../redux/tentang/action";

const Tentang = (props) => {

    const dispatch = useDispatch();

    let token = localStorage.getItem('token');
    
    useEffect(() => {
        dispatch(fetchTentang(token))
    },[])

    const tentangData = useSelector((state) => state.tentangReducer.tentang);
    // console.log(tentangData)
    const tentangDatas = tentangData.map((tentang, index) => {
        return (
            <tr key={index}>
                <th scope="row">{index+1}</th>
                {/* <td>{user.id}</td> */}
                <td className="text-center"><img src={tentang.thumbnail_image_url} alt={tentang.thumbnail_image_url} style={{width: 100}}/></td>
                <td>
                    <Link to={{
                            pathname: "/edit-tentangkami",
                            state: { data: tentang }
                        }} className="mr-2">
                        <Edit className="edit-tentangkami" style={{cursor:"pointer"}}/>
                    </Link>
                    <Trash className="delete-tentangkami" style={{cursor:"pointer"}} onClick={() => dispatch(fetchDeleteTentang(token, tentang.id))}/>
                </td>
            </tr>
        )
    })

    return (
        <Fragment>
            <Breadcrumb title="Tentang-Kami Page" parent="Dashboard" />
            <div className="container-fluid">
            <div className="row">
            <div className="col-sm-12">
                <div className="card">
                <div className="card-header">
                    <div className="row justify-content-between">
                        <div className="col-md-3 col-sm-12">
                            <h5>Tentang-Kami</h5>
                        </div>
                        <div className="col-md-3 col-sm-12">
                            <Link to="/add-tentangkami" className="btn btn-success float-right">
                                Add Tentang-Kami
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
                                {tentangDatas}
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

export default Tentang