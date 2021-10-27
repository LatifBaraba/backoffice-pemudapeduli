import React, { Fragment, useState, useEffect } from 'react';
import Breadcrumb from '../../components/common/breadcrumb';
import PropTypes from "prop-types";
import { Edit, Trash} from 'react-feather';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchKabarTerbaruRutin, fetchDeleteKabarTerbaruRutin } from "../../redux/kabarterbaru/action";
import { addCommas } from "../../helper/index"
// import ToggleButton from 'react-bootstrap/ToggleButton'
// import Switch from "react-switch";
// import { ButtonGroup } from "react-bootstrap";

const KabarTerbaruRutin = (props) => {

    const dispatch = useDispatch();

    // const [checked, setChecked] = useState(false);

    let token = localStorage.getItem('token');
    useEffect(() => {
        dispatch(fetchKabarTerbaruRutin(token))
    },[])

    // const handleChange = (nextChecked) => {
    //     // console.log(nextChecked)
    //     // dispatch(fetchVerifiedPenggalang(token, id))
    //     setChecked(nextChecked);
    //   };

    const kabarterbarurutinData = useSelector((state) => state.kabarterbaruReducer.kabarterbarurutin);
    
    const kabarterbarurutinDatas = kabarterbarurutinData.map((kabarterbarurutin, index) => {
        return (
            <tr key={index}>
                <th scope="row">{index+1}</th>
                <td>{kabarterbarurutin.id_pp_cp_program_donasi_rutin}</td>
                <td>{kabarterbarurutin.title}</td>
                <td>Rp. {addCommas(kabarterbarurutin.disbursement_balance)} </td>
                <td>{kabarterbarurutin.disbursement_account}</td>
                <td>{kabarterbarurutin.disbursement_bank_name}</td>
                <td>{kabarterbarurutin.disbursement_name}</td>
                <td>{kabarterbarurutin.disbursement_description}</td>                
                <td>
                    <Link to={{
                            pathname: "/edit-kabar-terbaru-rutin",
                            state: { data: kabarterbarurutin }
                        }} className="mr-2">
                        <Edit className="edit-kabar-terbaru-rutin" style={{cursor:"pointer"}}/>
                    </Link>
                    <Trash className="delete-kabarterbarurutin" style={{cursor:"pointer"}} 
                    onClick={() => dispatch(fetchDeleteKabarTerbaruRutin(token, kabarterbarurutin.id))}
                    />
                </td>
            </tr>
        )
    })

    return (
        <Fragment>
            <Breadcrumb title="Kabar Terbaru Rutin" parent="Dashboard" />
            <div className="container-fluid">
            <div className="row">
            <div className="col-sm-12">
                <div className="card">
                <div className="card-header">
                    <div className="row justify-content-between">
                        <div className="col-md-3 col-sm-12">
                        <h5>Kabar Terbaru Rutin</h5>
                        </div>
                        <div className="col-md-3 col-sm-12">
                            <Link to="/add-kabar-terbaru-rutin" className="btn btn-success float-right">
                                Add Kabar Terbaru Rutin
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
                                {kabarterbarurutinDatas}
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

export default KabarTerbaruRutin