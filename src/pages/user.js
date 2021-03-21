import React, { Fragment, useState } from 'react';
import Breadcrumb from '../components/common/breadcrumb';
import PropTypes from "prop-types";
import { Edit, Trash} from 'react-feather';
import { Link } from 'react-router-dom';

const User = (props) => {

    const userDatas = props.userData.map((user, index) => {
        return (
            <tr key={index}>
                <th scope="row">{index+1}</th>
                {/* <td>{user.id}</td> */}
                <td>{user.username}</td>
                <td>{user.fullname}</td>
                <td>{user.email}</td>
                <td>
                    <Link to="/edit-user" className="mr-2">
                        <Edit className="edit-user" style={{cursor:"pointer"}} id={user.id}/>
                    </Link>
                    {/* <button className="btn btn-danger" onClick={() => alert("delete")}> */}
                        <Trash className="delete-user" style={{cursor:"pointer"}} onClick={() => alert("delete")}/>
                    {/* </button> */}
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
                            <button className="btn btn-success float-right">
                                Add User
                            </button>
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">{"#"}</th>
                                    <th scope="col">{"Userame"}</th>
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
  

User.propTypes = {
    userData: PropTypes.array
};
  
User.defaultProps = {
    userData: [
        {
            id: "1",
            username: "alpa",
            fullname: "alpa",
            email: "alpa",
            role: "superrrr"
        },
        {
            id: "2",
            username: "alpa",
            fullname: "alpa",
            email: "alpa",
            role: "superrrr"
        },
        {
            id: "3",
            username: "alpa",
            fullname: "alpa",
            email: "alpa",
            role: "superrrr"
        },
        {
            id: "4",
            username: "alpa",
            fullname: "alpa",
            email: "alpa",
            role: "superrrr"
        }
    ]
};

export default User