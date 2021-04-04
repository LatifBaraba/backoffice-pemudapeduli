import React, { Fragment, useEffect } from 'react';
import Breadcrumb from '../../components/common/breadcrumb';
import { Edit, Trash} from 'react-feather';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTestimoni, fetchDeleteTestimoni } from "../../redux/testimoni/action";

const Testimoni = (props) => {

    const dispatch = useDispatch();

    let token = localStorage.getItem('token');
    useEffect(() => {
        dispatch(fetchTestimoni(token))
    },[])

    const testimoniData = useSelector((state) => state.testimoniReducer.testimoni);
    console.log(testimoniData, "data")
    const testimoniDatas = testimoniData.map((testimoni, index) => {
        console.log(testimoni, "data testimoni")
        return (
            <tr key={index}>
                <th scope="row">{index+1}</th>
                <td>{testimoni.name}</td>
                <td>{testimoni.role}</td>
                <td>{testimoni.message}</td>
                <td className="text-center"><img src={testimoni.thumbnail_photo_url} alt={testimoni.thumbnail_photo_url} style={{width: 100}}/></td>
                <td>
                    <Link to={{
                            pathname: "/edit-testimoni",
                            state: { data: testimoni }
                        }} className="mr-2">
                        <Edit className="edit-testimoni" style={{cursor:"pointer"}}/>
                    </Link>
                    <Trash className="delete-testimoni" style={{cursor:"pointer"}} onClick={() => dispatch(fetchDeleteTestimoni(token, testimoni.id))}/>
                </td>
            </tr>
        )
    })

    return (
        <Fragment>
            <Breadcrumb title="Testimoni Page" parent="Dashboard" />
            <div className="container-fluid">
            <div className="row">
            <div className="col-sm-12">
                <div className="card">
                <div className="card-header">
                    <div className="row justify-content-between">
                        <div className="col-md-3 col-sm-12">
                        <h5>Testimoni</h5>
                        </div>
                        <div className="col-md-3 col-sm-12">
                            <Link to="/add-testimoni" className="btn btn-success float-right">
                                Add Testimoni
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
                                    <th scope="col">{"Role"}</th>
                                    <th scope="col">{"Message"}</th>
                                    <th scope="col">{"Action"}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {testimoniDatas}
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

export default Testimoni