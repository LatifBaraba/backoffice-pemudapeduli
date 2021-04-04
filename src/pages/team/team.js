import React, { Fragment, useEffect } from 'react';
import Breadcrumb from '../../components/common/breadcrumb';
import { Edit, Trash} from 'react-feather';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTeam, fetchDeleteTeam } from "../../redux/team/action";

const Team = (props) => {

    const dispatch = useDispatch();

    let token = localStorage.getItem('token');
    useEffect(() => {
        dispatch(fetchTeam(token))
    },[])

    const teamData = useSelector((state) => state.teamReducer.team);
    console.log(teamData, "data")
    const teamDatas = teamData.map((team, index) => {
        console.log(team, "data team")
        return (
            <tr key={index}>
                <th scope="row">{index+1}</th>
                <td>{team.name}</td>
                <td>{team.role}</td>
                <td>{team.facebook_link}</td>
                <td>{team.google_link}</td>
                <td>{team.instagram_link}</td>
                <td>{team.linkedin_link}</td>
                <td className="text-center"><img src={team.thumbnail_photo_url} alt={team.thumbnail_photo_url} style={{width: 100}}/></td>
                <td>
                    <Link to={{
                            pathname: "/edit-team",
                            state: { data: team }
                        }} className="mr-2">
                        <Edit className="edit-team" style={{cursor:"pointer"}}/>
                    </Link>
                    <Trash className="delete-team" style={{cursor:"pointer"}} onClick={() => dispatch(fetchDeleteTeam(token, team.id))}/>
                </td>
            </tr>
        )
    })

    return (
        <Fragment>
            <Breadcrumb title="Team Page" parent="Dashboard" />
            <div className="container-fluid">
            <div className="row">
            <div className="col-sm-12">
                <div className="card">
                <div className="card-header">
                    <div className="row justify-content-between">
                        <div className="col-md-3 col-sm-12">
                        <h5>Team</h5>
                        </div>
                        <div className="col-md-3 col-sm-12">
                            <Link to="/add-team" className="btn btn-success float-right">
                                Add Team
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
                                    <th scope="col">{"Facebook-link"}</th>
                                    <th scope="col">{"Google_link"}</th>
                                    <th scope="col">{"Instagram_link"}</th>
                                    <th scope="col">{"Linkedin_link"}</th>
                                    <th scope="col">{"Thumbnail-image"}</th>
                                    <th scope="col">{"Action"}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {teamDatas}
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

export default Team