import React, { Fragment } from 'react';
import man from '../../../assets/images/dashboard/user.png';
import { 
    // User, Mail, Lock, Settings, 
    LogOut, User } from 'react-feather';
import { fetchLogout } from "../../../redux/auth/action";
import { useDispatch } from 'react-redux';

const UserMenu = () => {
    const dispatch = useDispatch();
    const token = localStorage.getItem('token')
    const logout = () => {
        // history.push(`${process.env.PUBLIC_URL}/dashboard`);
        console.log(token)
        dispatch(fetchLogout(token))
    }

    return (
        <Fragment>
            <li className="onhover-dropdown">
                <div className="media align-items-center">
                    {/* <img className="align-self-center pull-right img-50 rounded-circle blur-up lazyloaded" src={man} alt="header-user" /> */}
                    {/* <div className="dotted-animation">
                        <span className="animate-circle"></span>
                        <span className="main-circle"></span>
                    </div> */}
                    <User/>
                </div>
                <ul className="profile-dropdown onhover-show-div p-20 profile-dropdown-hover">
                    {/* <li><a href="#javascript"><User />Edit Profile</a></li>
                    <li><a href="#javascript"><Mail />Inbox</a></li>
                    <li><a href="#javascript"><Lock />Lock Screen</a></li>
                    <li><a href="#javascript"><Settings />Settings</a></li> */}
                    <li><a onClick={() => {logout()}}><LogOut /> Log out</a></li>
                </ul>
            </li>
        </Fragment>
    );
};


export default UserMenu;