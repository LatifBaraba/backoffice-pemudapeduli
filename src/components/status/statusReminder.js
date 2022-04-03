import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Button } from "react-bootstrap";
import { Edit, Trash, Check, X} from 'react-feather';
import { fetchTransaction , fetchDeclineTransaction, fetchApproveTransaction} from "../../redux/transaction/action";
import { addCommas } from "../../helper/index"
import { useDispatch, useSelector } from 'react-redux';
import moment from "moment";

const StatusReminder = (props) => {    
    const [colour, setColour] = useState("")
    const [hidden, setHidden] = useState(false)
    const dispatch = useDispatch();
    let token = localStorage.getItem('token');
    useEffect(() => {
        if (props.status === 'Unpaid') {
            setColour('danger')
        } if (props.status === 'Cancel') {
            setColour('info')
        } if (props.status === 'Paid') {
            setColour('success')
            setHidden(true)
        }  if (props.status === 'Decline') {
            setColour('dark')
        } if (props.status === 'Need Approval') {
            setColour('warning')
        }

    }, [props.status])

    return (
        
        <tr>
            <td>
                {props.index +1}
            </td>            
            <td>{props.username}</td>
            <td>{props.nama_lengkap}</td>
            <td>{props.email}</td>
            <td>{props.donasi_title}</td>
            <td>{props.status_donasi}</td>
            <td>{<img src={props.image_payment_url} alt={props.image_payment_url} style={{width: 100}}/>}</td>
            <td>{moment(props.paid_at).format("YYYY-MM-DD HH:mm:ss")}</td>
            {/* <td><badge className={`badge badge-${colour}`}>{props.status}</badge></td> */}
            <td>Rp. {addCommas(props.amount)}</td>                
            {/* <td>
                <Check className="edit-transaction" hidden={hidden} style={{cursor:"pointer"}} onClick={() => dispatch(fetchApproveTransaction(token, props.id))}/>
                <X className="delete-props" hidden={hidden} style={{cursor:"pointer"}} onClick={() => dispatch(fetchDeclineTransaction(token, props.id))}/>
            </td> */}

        </tr>
        
    )
}

export default StatusReminder