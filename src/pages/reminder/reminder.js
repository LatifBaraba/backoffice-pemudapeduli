import React, { Fragment, useState, useEffect } from 'react';
import Breadcrumb from '../../components/common/breadcrumb';
import PropTypes from "prop-types";
import { Edit, Trash, Check, X} from 'react-feather';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReminder , fetchDeclineReminder, fetchApproveReminder} from "../../redux/reminder/action";
import { addCommas } from "../../helper/index"
import Status from '../../components/status/status';

const Reminder = (props) => {
    const [colour, setColour] = useState("")
    const dispatch = useDispatch();

    let token = localStorage.getItem('token');
    useEffect(() => {
        dispatch(fetchReminder(token))
    },[])

    const reminderData = useSelector((state) => state.reminderReducer.reminder);

    const reminderDatas = reminderData.map((reminder, index) => {
        let status_donasi = ""      
        if(reminder.is_rutin === false){
            status_donasi = "One Time"
        } else {
            status_donasi = "Rutin"
        }
        
        return (
            <Status
                index={index}
                username={reminder.username}
                email={reminder.email}
                donasi_title={reminder.donasi_title}
                status_donasi={status_donasi}
                image_payment_url={reminder.image_payment_url}
                paid_at={reminder.paid_at}
                amount={reminder.amount}
                id={reminder.id}
            />      
        //     <tr key={index}>
        //         <th scope="row">{index+1}</th>
        //         <td>{reminder.email}</td>
        //         <td>{reminder.donasi_title}</td>
        //         <td>{status}</td>
        //         <td>{<img src={reminder.image_payment_url} alt={reminder.image_payment_url} style={{width: 100}}/>}</td>
        //         <td>{reminder.paid_at}</td>
        //         <td><badge className={`badge badge-${colour}`}>{reminder.status}</badge></td>
        //         <td>Rp. {addCommas(reminder.amount)}</td>                
        //         <td>
        //             {/* <Link to={{
        //                     pathname: "/edit-reminder",
        //                     state: { data: reminder }
        //                 }} className="mr-2"> */}
        //             <Check className="edit-reminder" style={{cursor:"pointer"}} onClick={() => dispatch(fetchApproveReminder(token, reminder.id))}/>
        //             {/* </Link> */}
        //             <X className="delete-reminder" style={{cursor:"pointer"}} onClick={() => dispatch(fetchDeclineReminder(token, reminder.id))}/>
        //         </td>
        //     </tr>
        )
    })

    return (
        <Fragment>
            <Breadcrumb title="Reminder Page" parent="Dashboard" />
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
                                    <th scope="col">{"User"}</th>
                                    <th scope="col">{"Nama Lengkap"}</th>
                                    <th scope="col">{"Email"}</th>
                                    <th scope="col">{"No HP"}</th>
                                    <th scope="col">{"Read Status"}</th>
                                    <th scope="col">{"Reminder Status"}</th>
                                    <th scope="col">{"Action"}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {reminderDatas}
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

Reminder.propTypes = {
    reminderData: PropTypes.array
};
  
Reminder.defaultProps = {
    reminderData: [
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
  
// export default connect(mapStateToProps, null)(Reminder)

export default Reminder