import React, { Fragment, useState } from 'react';
import Breadcrumb from '../components/common/breadcrumb';
import PropTypes from "prop-types";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Edit, Trash } from 'react-feather';


const User = (props) => {
        const [modal2, setModal2] = useState();

        const toggle2 = () => {
            setModal2(!modal2)
        }

        const userDatas = props.userData.map((user, index) => {
            return (
                <tr key={index}>
                    <th scope="row">{index+1}</th>
                    {/* <td>{user.id}</td> */}
                    <td>{user.name}</td>
                    <td>
                        <Button color="primary" size="sm" onClick={toggle2}>
                            <Edit className="edit-user" />
                        </Button>
                        <Button color="danger" size="sm">
                            <Trash className="delete-user" />
                        </Button>
                        {/* <Button color="primary" onClick={toggle2}>{"VerticallyModal"}</Button> */}
                        <Modal isOpen={modal2} toggle={toggle2} className="modal-body" centered={true}>
                            <ModalHeader toggle={toggle2}>{"Edit User"}</ModalHeader>
                            <ModalBody>
                                {"Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros."}
                            </ModalBody>
                            <ModalFooter>
                                <Button color="primary">{"SaveChanges"}</Button>
                                <Button color="secondary" onClick={toggle2}>{"Cancel"}</Button>
                            </ModalFooter>
                        </Modal>
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
                {/* <div className="card-header">
                    <h5>User</h5><span>{"lorem ipsum dolor sit amet, consectetur adipisicing elit"}</span>
                </div> */}
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">{"#"}</th>
                                    <th scope="col">{"Name"}</th>
                                    <th scope="col">{"Action"}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* <tr>
                                    <th scope="row">{"1"}</th>
                                    <td>{"Alexander"}</td>
                                    <td>{"Orton"}</td>
                                    <td>{"@mdorton"}</td>
                                    <td>{"Admin"}</td>
                                    <td>{"USA"}</td>
                                </tr> */}
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
            name: "alpa"
        },
        {
            id: "2",
            name: "beta"
        },
        {
            id: "1",
            name: "carli"
        },
    ]
};

export default User