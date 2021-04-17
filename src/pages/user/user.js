import React, { Fragment, useEffect } from 'react';
import Breadcrumb from '../../components/common/breadcrumb';
import { Edit, Trash} from 'react-feather';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser, fetchDeleteUser } from "../../redux/user/action";

const User = (props) => {

    const dispatch = useDispatch();

    let token = localStorage.getItem('token');
    useEffect(() => {
        dispatch(fetchUser(token))
    },[])

    const userData = useSelector((state) => state.userReducer.user);
    // console.log(userData, "data")
    const userDatas = userData.map((user, index) => {
        console.log(user, "data user")
        return (
            <tr key={index}>
                <th scope="row">{index+1}</th>
                <td>{user.username}</td>
                <td>{user.nama_lengkap}</td>
                <td>{user.email}</td>
                <td>
                    {/* <Link to={{
                            pathname: "/edit-user",
                            state: { data: user }
                        }} className="mr-2">
                        <Edit className="edit-user" style={{cursor:"pointer"}}/>
                    </Link> */}
                    <Trash className="delete-user" style={{cursor:"pointer"}} onClick={() => dispatch(fetchDeleteUser(token, user.id))}/>
                </td>
            </tr>
        )
    })

    return (
        <Fragment>
            <Breadcrumb title="User Page" parent="Dashboard" />
            <div className="container-fluid">
            <div className="row">
            <div className="col-sm-12">
                <div className="card">
                <div className="card-header">
                    <div className="row justify-content-between">
                        <div className="col-md-3 col-sm-12">
                        <h5>User</h5>
                        </div>
                        <div className="col-md-3 col-sm-12">
                            <Link to="/add-user" className="btn btn-success float-right">
                                Add User
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
                                    <th scope="col">{"Username"}</th>
                                    <th scope="col">{"Fullname"}</th>
                                    <th scope="col">{"Email"}</th>
                                    <th scope="col">{"Action"}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {userDatas}
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

export default User