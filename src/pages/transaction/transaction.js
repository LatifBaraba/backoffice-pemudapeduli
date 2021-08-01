import React, { Fragment, useState, useEffect } from 'react';
import Breadcrumb from '../../components/common/breadcrumb';
import PropTypes from "prop-types";
import { Edit, Trash, Check, X} from 'react-feather';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTransaction , fetchDeclineTransaction, fetchApproveTransaction} from "../../redux/transaction/action";
import { addCommas } from "../../helper/index"
import Status from '../../components/status/status';

const Transaction = (props) => {
    const [colour, setColour] = useState("")
    const dispatch = useDispatch();

    let token = localStorage.getItem('token');
    useEffect(() => {
        dispatch(fetchTransaction(token))
    },[])

    const transactionData = useSelector((state) => state.transactionReducer.transaction);

    const transactionDatas = transactionData.map((transaction, index) => {
        let status = ""      
        if(transaction.is_rutin === false){
            status = "One Time"
        } else {
            status = "Rutin"
        }
        
        return (
            <Status
                index={index}
                username={transaction.username}
                email={transaction.email}
                donasi_title={transaction.donasi_title}
                status={status}
                image_payment_url={transaction.image_payment_url}
                paid_at={transaction.paid_at}
                status={transaction.status}
                amount={transaction.amount}
            />      
        //     <tr key={index}>
        //         <th scope="row">{index+1}</th>
        //         <td>{transaction.email}</td>
        //         <td>{transaction.donasi_title}</td>
        //         <td>{status}</td>
        //         <td>{<img src={transaction.image_payment_url} alt={transaction.image_payment_url} style={{width: 100}}/>}</td>
        //         <td>{transaction.paid_at}</td>
        //         <td><badge className={`badge badge-${colour}`}>{transaction.status}</badge></td>
        //         <td>Rp. {addCommas(transaction.amount)}</td>                
        //         <td>
        //             {/* <Link to={{
        //                     pathname: "/edit-transaction",
        //                     state: { data: transaction }
        //                 }} className="mr-2"> */}
        //             <Check className="edit-transaction" style={{cursor:"pointer"}} onClick={() => dispatch(fetchApproveTransaction(token, transaction.id))}/>
        //             {/* </Link> */}
        //             <X className="delete-transaction" style={{cursor:"pointer"}} onClick={() => dispatch(fetchDeclineTransaction(token, transaction.id))}/>
        //         </td>
        //     </tr>
        )
    })

    return (
        <Fragment>
            <Breadcrumb title="Transaction Page" parent="Dashboard" />
            <div className="container-fluid">
            <div className="row">
            <div className="col-sm-12">
                <div className="card">               
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">{"#"}</th>
                                    <th scope="col">{"Email"}</th>
                                    <th scope="col">{"Campaign"}</th>
                                    <th scope="col">{"Donasi Type"}</th>
                                    <th scope="col">{"Bukti Bayar"}</th>
                                    <th scope="col">{"Tanggal"}</th>
                                    <th scope="col">{"Jumlah Donasi"}</th>
                                    <th scope="col">{"Status"}</th>
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