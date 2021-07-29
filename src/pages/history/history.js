import React, { Fragment, useState, useEffect } from 'react';
import Breadcrumb from '../../components/common/breadcrumb';
import PropTypes from "prop-types";
import { Edit, Trash} from 'react-feather';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchHistory, fetchDetailHistory } from "../../redux/history/action";

const History = (props) => {

    const dispatch = useDispatch();

    let token = localStorage.getItem('token');
    useEffect(() => {
        dispatch(fetchHistory(token))
    },[])

    const historyData = useSelector((state) => state.historyReducer.history);

    const historyDatas = historyData.map((history, index) => {
        return (
            <tr key={index}>
                <th scope="row">{index+1}</th>
                <td>{history.title}</td>
                <td>{history.description}</td>
                <td><img src={history.thumbnail_image_url} alt={history.thumbnail_image_url} style={{width: 100}}/></td>
                <td><img src={history.thumbnail_image_url} alt={history.thumbnail_image_url} style={{width: 100}}/></td>
                <td>                
                    <Link to={{
                            pathname: "/detail-history",
                            state: { data: history }
                        }} className="mr-2">
                        <Edit className="edit-history" style={{cursor:"pointer"}}/>
                    </Link>
                    <Trash className="delete-history" style={{cursor:"pointer"}} onClick={() => dispatch(fetchDetailHistory(token, history.id))}/>
                </td>
            </tr>
        )
    })

    return (
        <Fragment>
            <Breadcrumb title="History Page" parent="Dashboard" />
            <div className="container-fluid">
            <div className="row">
            <div className="col-sm-12">
                <div className="card">
                <div className="card-header">
                    <div className="row justify-content-between">
                        <div className="col-md-3 col-sm-12">
                        <h5>History</h5>
                        </div>
                        {/* <div className="col-md-3 col-sm-12">
                            <Link to="/add-qris" className="btn btn-success float-right">
                                Add Qris
                            </Link>
                        </div> */}
                    </div>
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">{"#"}</th>
                                    <th scope="col">{"User"}</th>
                                    <th scope="col">{"Amount"}</th>
                                    <th scope="col">{"Donasi Type"}</th>
                                    <th scope="col">{"Date"}</th>
                                    <th scope="col">{"Action"}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {historyDatas}
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

History.propTypes = {
    historyData: PropTypes.array
};
  
History.defaultProps = {
    historyData: [
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
  
// export default connect(mapStateToProps, null)(Qris)

export default History