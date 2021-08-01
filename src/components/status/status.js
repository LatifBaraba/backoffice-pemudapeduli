import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Button } from "react-bootstrap";
import { Edit, Trash, Check, X} from 'react-feather';
import { fetchTransaction , fetchDeclineTransaction, fetchApproveTransaction} from "../../redux/transaction/action";
import { addCommas } from "../../helper/index"
import { useDispatch, useSelector } from 'react-redux';

const Status = (props) => {    
    const [colour, setColour] = useState("")
    const dispatch = useDispatch();
    let token = localStorage.getItem('token');
    useEffect(() => {
        if (props.status === 'Unpaid') {
            setColour('danger')
        } if (props.status === 'Cancel') {
            setColour('info')
        } if (props.status === 'Paid') {
            setColour('success')
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
            <td>{props.email}</td>
            <td>{props.donasi_title}</td>
            <td>{props.status_donasi}</td>
            <td>{<img src={props.image_payment_url} alt={props.image_payment_url} style={{width: 100}}/>}</td>
            <td>{props.paid_at}</td>
            <td><badge className={`badge badge-${colour}`}>{props.status}</badge></td>
            <td>Rp. {addCommas(props.amount)}</td>                
            <td>
                <Check className="edit-transaction" style={{cursor:"pointer"}} onClick={() => dispatch(fetchApproveTransaction(token, props.id))}/>
                <X className="delete-props" style={{cursor:"pointer"}} onClick={() => dispatch(fetchDeclineTransaction(token, props.id))}/>
            </td>

        </tr>
        
    )
}

export default Status