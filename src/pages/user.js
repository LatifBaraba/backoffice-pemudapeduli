import React, { Fragment, useState } from 'react';
import Breadcrumb from '../components/common/breadcrumb';
import PropTypes from "prop-types";
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Edit, Trash} from 'react-feather';
import useForm from "react-hook-form";

const User = (props) => {
    const [modalEdit, setModalEdit] = useState();
    const [modalAdd, setModalAdd] = useState();
    const { register, handleSubmit, errors } = useForm();

    const onSubmit = data => console.log(data);

    const toggle = () => {
        setModalEdit(!modalEdit)
    }
    const toggle2 = () => {
        setModalAdd(!modalAdd)
    }

    const userDatas = props.userData.map((user, index) => {
        return (
            <tr key={index}>
                <th scope="row">{index+1}</th>
                {/* <td>{user.id}</td> */}
                <td>{user.name}</td>
                <td>
                    <button className="btn btn-primary" onClick={toggle}>
                        <Edit className="edit-user" />
                    </button>
                    <button className="btn btn-danger" onClick={() => alert("delete")}>
                        <Trash className="delete-user" />
                    </button>
                </td>
            </tr>
        )
    })

    // const modal1 = () => {
    //     return (
    //         <Modal isOpen={modalAdd} toggle={toggle2} className="modal-body" centered={true}>
    //             <ModalHeader toggle={toggle2}>{"Add User"}</ModalHeader>
    //             <ModalBody>
    //                 <form className="needs-validation" noValidate="" onSubmit={handleSubmit(onSubmit)}>
    //                     <div className="form-row">
    //                         <div className="col-md-12 mb-3">
    //                             <label htmlFor="validationCustom01">{"Name"}</label>
    //                             <input className="form-control" name="name" type="text" placeholder="Name" ref={register({ required: true })} />
    //                             <span>{errors.firstName && 'Name is required'}</span>
    //                             <div className="valid-feedback">{"Looks good!"}</div>
    //                         </div>
    //                         <div className="col-md-12 mb-3">
    //                             <label htmlFor="validationCustom01">{"Password"}</label>
    //                             <input className="form-control" name="password" type="password" placeholder="Password" ref={register({ required: true, maxLength: 6 })} />
    //                             <span>{errors.password && 'Password is required & Min 6 Character'}</span>
    //                             <div className="valid-feedback">{"Looks good!"}</div>
    //                         </div>
    //                         <div className="col-md-12 mb-3">
    //                             <label htmlFor="validationCustom01">{"Confirm Password"}</label>
    //                             <input className="form-control" name="confirmPassword" type="password" placeholder="Confirm Password" ref={register({ required: true, maxLength: 6 })} />
    //                             <span>{errors.confirmPassword && 'Password is required & Min 6 Character'}</span>
    //                             <div className="valid-feedback">{"Looks good!"}</div>
    //                         </div>
    //                     </div>
    //                     <button className="btn btn-pill btn-primary btn-block mt-3 mb-3" type="submit">{"Submit"}</button>   
    //                 </form>
    //             </ModalBody>
    //             {/* <ModalFooter>
    //                 <Button color="primary">{"SaveChanges"}</Button>
    //                 <Button color="secondary" onClick={toggle2}>{"Cancel"}</Button>
    //             </ModalFooter> */}
    //         </Modal>
    //     )
    // }

    // const modal2 = () => {
    //     return (
            // <Modal isOpen={modalEdit} toggle={toggle} className="modal-body" centered={true}>
            //     <ModalHeader toggle={toggle}>{"Edit User"}</ModalHeader>
            //     <ModalBody>
            //         <form className="needs-validation" noValidate="" onSubmit={handleSubmit(onSubmit)}>
            //             <div className="form-row">
            //                 <div className="col-md-12 mb-3">
            //                     <label htmlFor="validationCustom01">{"Name"}</label>
            //                     <input className="form-control" name="name" type="text" placeholder="Name" ref={register({ required: true })} />
            //                     <span>{errors.firstName && 'Name is required'}</span>
            //                     <div className="valid-feedback">{"Looks good!"}</div>
            //                 </div>
            //                 <div className="col-md-12 mb-3">
            //                     <label htmlFor="validationCustom01">{"Password"}</label>
            //                     <input className="form-control" name="password" type="password" placeholder="Password" ref={register({ required: true, maxLength: 6 })} />
            //                     <span>{errors.password && 'Password is required & Min 6 Character'}</span>
            //                     <div className="valid-feedback">{"Looks good!"}</div>
            //                 </div>
            //                 <div className="col-md-12 mb-3">
            //                     <label htmlFor="validationCustom01">{"Confirm Password"}</label>
            //                     <input className="form-control" name="confirmPassword" type="password" placeholder="Confirm Password" ref={register({ required: true, maxLength: 6 })} />
            //                     <span>{errors.confirmPassword && 'Password is required & Min 6 Character'}</span>
            //                     <div className="valid-feedback">{"Looks good!"}</div>
            //                 </div>
            //             </div>
            //             <button className="btn btn-pill btn-primary btn-block mt-3 mb-3" type="submit">{"Submit"}</button>   
            //         </form>
            //     </ModalBody>
            //     {/* <ModalFooter>
            //         <Button color="primary">{"SaveChanges"}</Button>
            //         <Button color="secondary" onClick={toggle2}>{"Cancel"}</Button>
            //     </ModalFooter> */}
            // </Modal>
    //     )
    // }
    return (
        <Fragment>
            <Breadcrumb title="User Page" parent="Dashboard" />
            <div className="container-fluid">
            <div className="row">
            <div className="col-sm-12">
                <div className="card">
                <div className="card-header">
                    <div className="row justify-content-between">
                        <div className="col-3">
                            <h5>User</h5>
                        </div>
                        <div className="col-3">
                            <button className="btn btn-success float-right" onClick={toggle2}>
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
                                    <th scope="col">{"Name"}</th>
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
        <Modal isOpen={modalAdd} toggle={toggle2} className="modal-body" centered={true}>
            <ModalHeader toggle={toggle2}>{"Add User"}</ModalHeader>
            <ModalBody>
                <form className="needs-validation" noValidate="" onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-row">
                        <div className="col-md-12 mb-3">
                            <label htmlFor="validationCustom01">{"Name"}</label>
                            <input className="form-control" name="name" type="text" placeholder="Name" ref={register({ required: true })} />
                            <span>{errors.firstName && 'Name is required'}</span>
                            <div className="valid-feedback">{"Looks good!"}</div>
                        </div>
                        <div className="col-md-12 mb-3">
                            <label htmlFor="validationCustom01">{"Password"}</label>
                            <input className="form-control" name="password" type="password" placeholder="Password" ref={register({ required: true, maxLength: 6 })} />
                            <span>{errors.password && 'Password is required & Min 6 Character'}</span>
                            <div className="valid-feedback">{"Looks good!"}</div>
                        </div>
                        <div className="col-md-12 mb-3">
                            <label htmlFor="validationCustom01">{"Confirm Password"}</label>
                            <input className="form-control" name="confirmPassword" type="password" placeholder="Confirm Password" ref={register({ required: true, maxLength: 6 })} />
                            <span>{errors.confirmPassword && 'Password is required & Min 6 Character'}</span>
                            <div className="valid-feedback">{"Looks good!"}</div>
                        </div>
                    </div>
                    <button className="btn btn-pill btn-primary btn-block mt-3 mb-3" type="submit">{"Submit"}</button>   
                </form>
            </ModalBody>
            {/* <ModalFooter>
                <Button color="primary">{"SaveChanges"}</Button>
                <Button color="secondary" onClick={toggle2}>{"Cancel"}</Button>
            </ModalFooter> */}
        </Modal>
        <Modal isOpen={modalEdit} toggle={toggle} className="modal-body" centered={true}>
            <ModalHeader toggle={toggle}>{"Edit User"}</ModalHeader>
            <ModalBody>
                <form className="needs-validation" noValidate="" onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-row">
                        <div className="col-md-12 mb-3">
                            <label htmlFor="validationCustom01">{"Name"}</label>
                            <input className="form-control" name="name" type="text" placeholder="Name" ref={register({ required: true })} />
                            <span>{errors.firstName && 'Name is required'}</span>
                            <div className="valid-feedback">{"Looks good!"}</div>
                        </div>
                        <div className="col-md-12 mb-3">
                            <label htmlFor="validationCustom01">{"Password"}</label>
                            <input className="form-control" name="password" type="password" placeholder="Password" ref={register({ required: true, maxLength: 6 })} />
                            <span>{errors.password && 'Password is required & Min 6 Character'}</span>
                            <div className="valid-feedback">{"Looks good!"}</div>
                        </div>
                        <div className="col-md-12 mb-3">
                            <label htmlFor="validationCustom01">{"Confirm Password"}</label>
                            <input className="form-control" name="confirmPassword" type="password" placeholder="Confirm Password" ref={register({ required: true, maxLength: 6 })} />
                            <span>{errors.confirmPassword && 'Password is required & Min 6 Character'}</span>
                            <div className="valid-feedback">{"Looks good!"}</div>
                        </div>
                    </div>
                    <button className="btn btn-pill btn-primary btn-block mt-3 mb-3" type="submit">{"Submit"}</button>   
                </form>
            </ModalBody>
            {/* <ModalFooter>
                <Button color="primary">{"SaveChanges"}</Button>
                <Button color="secondary" onClick={toggle2}>{"Cancel"}</Button>
            </ModalFooter> */}
        </Modal>
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