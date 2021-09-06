import React, { Fragment, useState, useEffect } from 'react';
import Breadcrumb from '../../components/common/breadcrumb';
import PropTypes from "prop-types";
import { Edit, Trash} from 'react-feather';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPenggalang, fetchDeletePenggalang , fetchVerifiedPenggalang} from "../../redux/penggalang/action";
import ToggleButton from 'react-bootstrap/ToggleButton'
import Switch from "react-switch";
import { ButtonGroup } from "react-bootstrap";

const Penggalang = (props) => {

    const dispatch = useDispatch();

    const [checked, setChecked] = useState(false);

    let token = localStorage.getItem('token');
    useEffect(() => {
        dispatch(fetchPenggalang(token))
    },[])

    const handleChange = (nextChecked) => {
        console.log(nextChecked)
        // dispatch(fetchVerifiedPenggalang(token, id))
        setChecked(nextChecked);
      };

    const penggalangData = useSelector((state) => state.penggalangReducer.penggalang);
    
    const penggalangDatas = penggalangData.map((penggalang, index) => {
        return (
            <tr key={index}>
                <th scope="row">{index+1}</th>
                <td>{penggalang.Name}</td>
                <td>{penggalang.Description}</td>
                <td><img src={penggalang.ThumbnailImageURL} alt={penggalang.ThumbnailImageURL} style={{width: 100}}/></td>
                <td>
                    
                    <Switch 
                        onChange={() => dispatch(fetchVerifiedPenggalang(token, penggalang.IDPPCPPenggalangDana))} 
                        checked={penggalang.IsVerified ? true : checked} 
                    />
                    {penggalang.IsVerified ? "Verified" : "Not Verified"}
                   
                    </td>
                <td>
                    {/* <Link to="/edit-penggalang" className="mr-2"> */}
                    <Link to={{
                            pathname: "/edit-penggalang",
                            state: { data: penggalang }
                        }} className="mr-2">
                        <Edit className="edit-penggalang" style={{cursor:"pointer"}}/>
                    </Link>
                    <Trash className="delete-penggalang" style={{cursor:"pointer"}} onClick={() => dispatch(fetchDeletePenggalang(token, penggalang.id))}/>
                </td>
            </tr>
        )
    })

    return (
        <Fragment>
            <Breadcrumb title="Penggalang Page" parent="Dashboard" />
            <div className="container-fluid">
            <div className="row">
            <div className="col-sm-12">
                <div className="card">
                <div className="card-header">
                    <div className="row justify-content-between">
                        <div className="col-md-3 col-sm-12">
                        <h5>Penggalang</h5>
                        </div>
                        <div className="col-md-3 col-sm-12">
                            <Link to="/add-penggalang" className="btn btn-success float-right">
                                Add Penggalang
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
                                    <th scope="col">{"Description"}</th>
                                    <th scope="col">{"Image"}</th>
                                    <th scope="col">{"Status"}</th>
                                    <th scope="col">{"Action"}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {penggalangDatas}
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

Penggalang.propTypes = {
    penggalangData: PropTypes.array
};
  
Penggalang.defaultProps = {
    penggalangData: [
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
  
// export default connect(mapStateToProps, null)(Penggalang)

export default Penggalang