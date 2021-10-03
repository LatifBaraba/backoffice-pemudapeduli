import React, { Fragment, useState, useEffect } from 'react';
import Breadcrumb from '../../components/common/breadcrumb';
import PropTypes from "prop-types";
import { Edit, Trash} from 'react-feather';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNominal, fetchDeleteNominal } from "../../redux/nominal/action";

const Nominal = (props) => {

    const dispatch = useDispatch();

    let token = localStorage.getItem('token');
    useEffect(() => {
        dispatch(fetchNominal(token))
    },[])

    const nominalData = useSelector((state) => state.nominalReducer.nominal);

    const nominalDatas = nominalData.map((nominal, index) => {
        return (
            <tr key={index}>
                <th scope="row">{index+1}</th>
                <td>{nominal.title}</td>
                <td>{nominal.description}</td>
                <td><img src={nominal.thumbnail_image_url} alt={nominal.thumbnail_image_url} style={{width: 100}}/></td>
                <td>
                    {/* <Link to="/edit-nominal" className="mr-2"> */}
                    {/* <Link to={{
                            pathname: "/edit-nominal",
                            state: { data: nominal }
                        }} className="mr-2">
                        <Edit className="edit-nominal" style={{cursor:"pointer"}}/>
                    </Link> */}
                    <Trash className="delete-nominal" style={{cursor:"pointer"}} onClick={() => dispatch(fetchDeleteNominal(token, nominal.id))}/>
                </td>
            </tr>
        )
    })

    return (
        <Fragment>
            <Breadcrumb title="Nominal Page" parent="Dashboard" />
            <div className="container-fluid">
            <div className="row">
            <div className="col-sm-12">
                <div className="card">
                <div className="card-header">
                    <div className="row justify-content-between">
                        <div className="col-md-3 col-sm-12">
                        <h5>Nominal</h5>
                        </div>
                        <div className="col-md-3 col-sm-12">
                            <Link to="/add-nominal" className="btn btn-success float-right">
                                Add Nominal
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
                                    <th scope="col">{"Description"}</th>
                                    <th scope="col">{"Nominal"}</th>
                                    <th scope="col">{"Action"}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {nominalDatas}
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

Nominal.propTypes = {
    nominalData: PropTypes.array
};
  
Nominal.defaultProps = {
    nominalData: [
        {
            title:"banner1",
            sub_title:"coba banner1",
            title_content:"title1",
            thumbnail_image_url:"http://gambar,png",
            deeplink_right:"view",
            deeplink_left:"button",
            description:"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempora, iure!"
        },
        {
            title:"banner2",
            sub_title:"coba banner2",
            title_content:"title1",
            thumbnail_image_url:"http://gambar,png",
            deeplink_right:"view",
            deeplink_left:"button",
            description:"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempora, iure!"
        },
        {
            title:"banner3",
            sub_title:"coba banner3",
            title_content:"title3",
            thumbnail_image_url:"http://gambar,png",
            deeplink_right:"view",
            deeplink_left:"button",
            description:"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempora, iure!"
        },
    ]
};

// const mapStateToProps = state => {
//     return {
//         // fetchToken: () => dispatch(fetchToken()) 
//         tokens: state.tokenReducer.token
//     }
// }
  
// export default connect(mapStateToProps, null)(Nominal)

export default Nominal