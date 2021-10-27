import React, { Fragment, useState, useEffect } from 'react';
import Breadcrumb from '../../components/common/breadcrumb';
import PropTypes from "prop-types";
import { Edit, Trash} from 'react-feather';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchKabarTerbaruOt, fetchDeleteKabarTerbaruOt} from "../../redux/kabarterbaru/action";
import { addCommas } from "../../helper/index"
// import ToggleButton from 'react-bootstrap/ToggleButton'
// import Switch from "react-switch";
// import { ButtonGroup } from "react-bootstrap";

const KabarTerbaruOt = (props) => {

    const dispatch = useDispatch();

    // const [checked, setChecked] = useState(false);

    let token = localStorage.getItem('token');
    useEffect(() => {
        dispatch(fetchKabarTerbaruOt(token))
    },[])

    // const handleChange = (nextChecked) => {
    //     // console.log(nextChecked)
    //     // dispatch(fetchVerifiedPenggalang(token, id))
    //     setChecked(nextChecked);
    //   };

    const kabarterbaruotData = useSelector((state) => state.kabarterbaruReducer.kabarterbaruot);
    
    const kabarterbaruotDatas = kabarterbaruotData.map((kabarterbaruot, index) => {
        return (
            <tr key={index}>
                <th scope="row">{index+1}</th>
                <td>{kabarterbaruot.id_pp_cp_program_donasi}</td>
                <td>{kabarterbaruot.title}</td>
                <td>Rp. {addCommas(kabarterbaruot.disbursement_balance)} </td>
                <td>{kabarterbaruot.disbursement_account}</td>
                <td>{kabarterbaruot.disbursement_bank_name}</td>
                <td>{kabarterbaruot.disbursement_name}</td>
                <td>{kabarterbaruot.disbursement_description}</td>                
                <td>
                    <Link to={{
                            pathname: "/edit-kabar-terbaru-ot",
                            state: { data: kabarterbaruot }
                        }} className="mr-2">
                        <Edit className="edit-kabar-terbaru-ot" style={{cursor:"pointer"}}/>
                    </Link>
                    <Trash className="delete-kabarterbaruot" style={{cursor:"pointer"}} 
                    onClick={() => dispatch(fetchDeleteKabarTerbaruOt(token, kabarterbaruot.id))}
                    />
                </td>
            </tr>
        )
    })

    return (
        <Fragment>
            <Breadcrumb title="Kabar Terbaru One Time" parent="Dashboard" />
            <div className="container-fluid">
            <div className="row">
            <div className="col-sm-12">
                <div className="card">
                <div className="card-header">
                    <div className="row justify-content-between">
                        <div className="col-md-3 col-sm-12">
                        <h5>Kabar Terbaru OT</h5>
                        </div>
                        <div className="col-md-3 col-sm-12">
                            <Link to="/add-kabar-terbaru-ot" className="btn btn-success float-right">
                                Add Kabar Terbaru OT
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
                                    <th scope="col">{"ID Donasi"}</th>
                                    <th scope="col">{"Title"}</th>
                                    <th scope="col">{"Balance"}</th>
                                    <th scope="col">{"Account"}</th>
                                    <th scope="col">{"Bank Name"}</th>
                                    <th scope="col">{"Name"}</th>
                                    <th scope="col">{"Description"}</th>
                                    <th scope="col">{"Action"}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {kabarterbaruotDatas}
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

// Penggalang.propTypes = {
//     penggalangData: PropTypes.array
// };
  
// Penggalang.defaultProps = {
//     penggalangData: [
//         {
//             title:"banner1",
//             sub_title:"coba banner1",
//             title_content:"title1",
//             thumbnail_image_url:"http://gambar,png",
//             deeplink_right:"view",
//             deeplink_left:"button",
//             description:"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempora, iure!"
//         },
//         {
//             title:"banner2",
//             sub_title:"coba banner2",
//             title_content:"title1",
//             thumbnail_image_url:"http://gambar,png",
//             deeplink_right:"view",
//             deeplink_left:"button",
//             description:"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempora, iure!"
//         },
//         {
//             title:"banner3",
//             sub_title:"coba banner3",
//             title_content:"title3",
//             thumbnail_image_url:"http://gambar,png",
//             deeplink_right:"view",
//             deeplink_left:"button",
//             description:"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempora, iure!"
//         },
//     ]
// };

// const mapStateToProps = state => {
//     return {
//         // fetchToken: () => dispatch(fetchToken()) 
//         tokens: state.tokenReducer.token
//     }
// }
  
// export default connect(mapStateToProps, null)(Penggalang)

export default KabarTerbaruOt