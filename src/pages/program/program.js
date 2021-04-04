import React, { Fragment, useEffect } from 'react';
import Breadcrumb from '../../components/common/breadcrumb';
import { Edit, Trash} from 'react-feather';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProgram, fetchDeleteProgram } from "../../redux/program/action";

const Program = (props) => {

    const dispatch = useDispatch();

    let token = localStorage.getItem('token');
    
    useEffect(() => {
        dispatch(fetchProgram(token))
    },[])

    const programData = useSelector((state) => state.programReducer.program);

    const programDatas = programData.map((program, index) => {
        return (
            <tr key={index}>
                <th scope="row">{index+1}</th>
                {/* <td>{user.id}</td> */}
                <td>{program.title}</td>
                <td>{program.sub_title}</td>
                <td>{program.tag}</td>
                <td className="text-center"><img src={program.thumbnail_image_url} alt={program.thumbnail_image_url} style={{width: 100}}/></td>
                <td>
                    <Link to={{
                            pathname: "/edit-program",
                            state: { data: program }
                        }} className="mr-2">
                        <Edit className="edit-program" style={{cursor:"pointer"}}/>
                    </Link>
                    <Trash className="delete-program" style={{cursor:"pointer"}} onClick={() => dispatch(fetchDeleteProgram(token, program.id))}/>
                </td>
            </tr>
        )
    })

    return (
        <Fragment>
            <Breadcrumb title="Program Page" parent="Dashboard" />
            <div className="container-fluid">
            <div className="row">
            <div className="col-sm-12">
                <div className="card">
                <div className="card-header">
                    <div className="row justify-content-between">
                        <div className="col-md-3 col-sm-12">
                            <h5>Program</h5>
                        </div>
                        <div className="col-md-3 col-sm-12">
                            <Link to="/add-program" className="btn btn-success float-right">
                                Add Program
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
                                    <th scope="col">{"Thumbnail-image"}</th>
                                    <th scope="col">{"Action"}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {programDatas}
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

export default Program