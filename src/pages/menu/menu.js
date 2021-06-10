import React, { Fragment, useEffect } from 'react';
import Breadcrumb from '../../components/common/breadcrumb';
import { Edit, Trash} from 'react-feather';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMenu, fetchDeleteMenu } from "../../redux/menu/action";

const Menu = () => {

    const dispatch = useDispatch();

    let token = localStorage.getItem('token');
    useEffect(() => {
        dispatch(fetchMenu(token))
    },[])

    const menuData = useSelector((state) => state.menuReducer.menu);

    const menuDatas = menuData.map((data, index) => {
        return (
            <tr key={index}>
                <th scope="row">{index+1}</th>
                <td>{data.title}</td>
                <td>{data.link}</td>
                <td>
                    <Link to={{
                            pathname: "/edit-menu",
                            state: { data: data }
                        }} className="mr-2">
                        <Edit className="edit-menu" style={{cursor:"pointer"}}/>
                    </Link>
                    <Trash className="delete-menu" style={{cursor:"pointer"}} onClick={() => dispatch(fetchDeleteMenu(token, data.id))}/>
                </td>
            </tr>
        )
    })

    return (
        <Fragment>
            <Breadcrumb title="Menu Page" parent="Dashboard" />
            <div className="container-fluid">
            <div className="row">
            <div className="col-sm-12">
                <div className="card">
                <div className="card-header">
                    <div className="row justify-content-between">
                        <div className="col-md-3 col-sm-12">
                        <h5>Menu</h5>
                        </div>
                        <div className="col-md-3 col-sm-12">
                            <Link to="/add-menu" className="btn btn-success float-right">
                                Add Menu
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
                                    <th scope="col">{"Title"}</th>
                                    <th scope="col">{"Link"}</th>
                                    <th scope="col">{"Action"}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {menuDatas}
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

export default Menu