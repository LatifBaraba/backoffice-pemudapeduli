import React, { useEffect } from 'react';
import Header from './common/header-component/header';
import Sidebar from './common/sidebar-component/sidebar';
import RightSidebar from './common/right-sidebar';
import Footer from './common/footer';
// import ThemeCustomizer from './common/theme-customizer'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from './common/loader';
import { fetchToken } from "../redux/token/action";
import { useDispatch, useSelector } from 'react-redux';

const AppLayout = ({children}) => {
        
        const dispatch = useDispatch();

        useEffect(() => {
            dispatch(fetchToken())
        },[])

        return (
            <div>
                <Loader />
                <div className="page-wrapper">
                    <div className="page-body-wrapper">
                        <Header />
                        <Sidebar />
                        <RightSidebar />
                        <div className="page-body">
                            {children}
                        </div>
                        <Footer />
                        {/* <ThemeCustomizer /> */}
                    </div>
                </div>
                <ToastContainer />
            </div>
        );
}

export default AppLayout;