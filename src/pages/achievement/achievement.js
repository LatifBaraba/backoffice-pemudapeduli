import React, { Fragment, useEffect } from 'react';
import Breadcrumb from '../../components/common/breadcrumb';
import { Edit, Trash} from 'react-feather';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAchievement, fetchDeleteAchievement } from "../../redux/achievement/action";

const Achievement = () => {

    const dispatch = useDispatch();

    let token = localStorage.getItem('token');
    useEffect(() => {
        dispatch(fetchAchievement(token))
    },[])

    const achievementData = useSelector((state) => state.achievementReducer.achievement);
    console.log(achievementData)
    const achievementDatas = achievementData.map((achievement, index) => {
        return (
            <tr key={index}>
                <th scope="row">{index+1}</th>
                <td>{achievement.achievement_name}</td>
                <td>{achievement.achievement_total}</td>
                <td>
                    <Link to={{
                            pathname: "/edit-achievement",
                            state: { data: achievement }
                        }} className="mr-2">
                        <Edit className="edit-achievement" style={{cursor:"pointer"}}/>
                    </Link>
                    <Trash className="delete-achievement" style={{cursor:"pointer"}} onClick={() => dispatch(fetchDeleteAchievement(token, achievement.id))}/>
                </td>
            </tr>
        )
    })

    return (
        <Fragment>
            <Breadcrumb title="Achievement Page" parent="Dashboard" />
            <div className="container-fluid">
            <div className="row">
            <div className="col-sm-12">
                <div className="card">
                <div className="card-header">
                    <div className="row justify-content-between">
                        <div className="col-md-3 col-sm-12">
                        <h5>Achievement</h5>
                        </div>
                        <div className="col-md-3 col-sm-12">
                            <Link to="/add-achievement" className="btn btn-success float-right">
                                Add Achievement
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
                                    <th scope="col">{"Total"}</th>
                                    <th scope="col">{"Action"}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {achievementDatas}
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

export default Achievement