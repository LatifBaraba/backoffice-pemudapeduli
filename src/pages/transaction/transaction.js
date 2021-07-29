import React, { Fragment, useState, useEffect } from 'react';
import Breadcrumb from '../../components/common/breadcrumb';
import PropTypes from "prop-types";
import { Edit, Trash} from 'react-feather';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTransaction } from "../../redux/transaction/action";

const Transaction = (props) => {

    const dispatch = useDispatch();

    let token = localStorage.getItem('token');
    useEffect(() => {
        dispatch(fetchTransaction(token))
    },[])

    const transactionData = useSelector((state) => state.transactionReducer.transaction);

    const transactionDatas = transactionData.map((transaction, index) => {
        return (
            <tr key={index}>
                <th scope="row">{'index+1'}</th>
                <td>{'transaction.title'}</td>
                <td>{'transaction.description'}</td>
                <td>{'transaction.description'}</td>
                <td>{'transaction.description'}</td>
                <td>{'transaction.description'}</td>
                <td>{'transaction.description'}</td>
                {/* <td><img src={transaction.thumbnail_image_url} alt={transaction.thumbnail_image_url} style={{width: 100}}/></td> */}
                <td>
                    <Link to={{
                            pathname: "/edit-transaction",
                            state: { data: transaction }
                        }} className="mr-2">
                        <Edit className="edit-transaction" style={{cursor:"pointer"}}/>
                    </Link>
                    {/* <Trash className="delete-transaction" style={{cursor:"pointer"}} onClick={() => dispatch(fetchDeleteTransaction(token, transaction.id))}/> */}
                </td>
            </tr>
        )
    })

    return (
        <Fragment>
            <Breadcrumb title="Transaction Page" parent="Dashboard" />
            <div className="container-fluid">
            <div className="row">
            <div className="col-sm-12">
                <div className="card">
                {/* <div className="card-header">
                    <div className="row justify-content-between">
                        <div className="col-md-3 col-sm-12">
                        <h5>Transaction</h5>
                        </div>
                        <div className="col-md-3 col-sm-12">
                            <Link to="/add-transaction" className="btn btn-success float-right">
                                Add Transaction
                            </Link>
                        </div>
                    </div>
                </div> */}
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">{"#"}</th>
                                    <th scope="col">{"User"}</th>
                                    <th scope="col">{"Campaign"}</th>
                                    <th scope="col">{"Donasi Type"}</th>
                                    <th scope="col">{"Bukti Bayar"}</th>
                                    <th scope="col">{"Jumlah Donasi"}</th>
                                    <th scope="col">{"Action"}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {transactionDatas}
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

Transaction.propTypes = {
    transactionData: PropTypes.array
};
  
Transaction.defaultProps = {
    transactionData: [
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
  
// export default connect(mapStateToProps, null)(Transaction)

export default Transaction