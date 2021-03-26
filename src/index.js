import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
// import { Redirect } from "react-router-dom";
import './index.scss';

import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ScrollContext } from 'react-router-scroll-4';
import * as serviceWorker from './serviceWorker';
import { Router } from 'react-router'

import history from './history';

// ** Import custom components for redux**
import { Provider } from 'react-redux';
import store from './store/index';
import App from "./components/app";

// Import custom Components 
import Default from './components/dashboard/defaultCompo/default';
// import Ecommerce from './components/dashboard/ecommerce';
// import University from './components/dashboard/university';
// import CryptoComponent from './components/dashboard/crypto/cryptoComponent';
// import Project from './components/dashboard/project/project';
import Login from './pages/login';
import User from './pages/user/user';
import AddUser from './pages/user/add_user';
import EditUser from './pages/user/edit_user';
import Banner from './pages/banner/banner';
import AddBanner from './pages/banner/add_banner';
import EditBanner from './pages/banner/edit_banner';
import AboutUs from './pages/aboutus/aboutus';
import AddAboutUs from './pages/aboutus/add_aboutus';
import EditAboutUs from './pages/aboutus/edit_aboutus';
import Album from './pages/album/album';
import AddAlbum from './pages/album/add_album';
import EditAlbum from './pages/album/edit_album';
import News from './pages/news/news';
import AddNews from './pages/news/add_news';
import EditNews from './pages/news/edit_news';
import Donasi from './pages/donasi/donasi';
import AddDonasi from './pages/donasi/add_donasi';
import EditDonasi from './pages/donasi/edit_donasi';
import Program from './pages/program/program';
import AddProgram from './pages/program/add_program';
import EditProgram from './pages/program/edit_program';

// sample page
// import SupportTicket from './components/support-ticket/supportTicket';

//firebase Auth
function Root() {
    const [authenticated,setAuthenticated] = useState(false)

    useEffect(() => {
        const layout = localStorage.getItem('layout_version')
        const color = localStorage.getItem('color')
        document.body.classList.add(layout);
        document.getElementById("color").setAttribute("href", `${process.env.PUBLIC_URL}/assets/css/${color}.css`);
    }, []);

    return (
        <div className="App">
            <Provider store={store}>
                <Router history={history}>
                    <ScrollContext>
                        <Switch>
                            {/* <Fragment> */}
                                    <Route path={`${process.env.PUBLIC_URL}/login`} component={Login} />
                                    {/* {authenticated !== null ? */}
                                        <App>
                                            <Route exact path={`${process.env.PUBLIC_URL}/dashboard`} component={Default} />
                                            <Route path={`${process.env.PUBLIC_URL}/user`} component={User} />
                                            <Route path={`${process.env.PUBLIC_URL}/add-user`} component={AddUser} />
                                            <Route path={`${process.env.PUBLIC_URL}/edit-user`} component={EditUser} />
                                            <Route path={`${process.env.PUBLIC_URL}/banner`} component={Banner} />
                                            <Route path={`${process.env.PUBLIC_URL}/add-banner`} component={AddBanner} />
                                            <Route path={`${process.env.PUBLIC_URL}/edit-banner`} component={EditBanner} />
                                            <Route path={`${process.env.PUBLIC_URL}/aboutus`} component={AboutUs} />
                                            <Route path={`${process.env.PUBLIC_URL}/add-aboutus`} component={AddAboutUs} />
                                            <Route path={`${process.env.PUBLIC_URL}/edit-aboutus`} component={EditAboutUs} />
                                            <Route path={`${process.env.PUBLIC_URL}/album`} component={Album} />
                                            <Route path={`${process.env.PUBLIC_URL}/add-album`} component={AddAlbum} />
                                            <Route path={`${process.env.PUBLIC_URL}/edit-album`} component={EditAlbum} />
                                            <Route path={`${process.env.PUBLIC_URL}/news`} component={News} />
                                            <Route path={`${process.env.PUBLIC_URL}/add-news`} component={AddNews} />
                                            <Route path={`${process.env.PUBLIC_URL}/edit-news`} component={EditNews} />
                                            <Route path={`${process.env.PUBLIC_URL}/donasi`} component={Donasi} />
                                            <Route path={`${process.env.PUBLIC_URL}/add-donasi`} component={AddDonasi} />
                                            <Route path={`${process.env.PUBLIC_URL}/edit-donasi`} component={EditDonasi} />
                                            <Route path={`${process.env.PUBLIC_URL}/program`} component={Program} />
                                            <Route path={`${process.env.PUBLIC_URL}/add-program`} component={AddProgram} />
                                            <Route path={`${process.env.PUBLIC_URL}/edit-program`} component={EditProgram} />
                                            {/* <Route exact path={`${process.env.PUBLIC_URL}/dashboard/default`} component={Default} />
                                            <Route path={`${process.env.PUBLIC_URL}/dashboard/ecommerce`} component={Ecommerce} />
                                            <Route path={`${process.env.PUBLIC_URL}/dashboard/university`} component={University} />
                                            <Route path={`${process.env.PUBLIC_URL}/dashboard/crypto`} component={CryptoComponent} />
                                            <Route path={`${process.env.PUBLIC_URL}/dashboard/project`} component={Project} />
                                            */}
                                            {/* Pricing */}
                                            {/* <Route path={`${process.env.PUBLIC_URL}/support-ticket/supportTicket`} component={SupportTicket} /> */}
                                        </App>
                                    {/* :
                                        <Redirect to={`${process.env.PUBLIC_URL}/login`} />
                                    }  */}
                            {/* </Fragment> */}
                        </Switch>
                    </ScrollContext>
                </Router>
            </Provider>
        </div>
    );
}

ReactDOM.render(<Root />, document.getElementById('root'));

serviceWorker.unregister();