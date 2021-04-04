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
import Tentang from './pages/tentang/tentang';
import AddTentangKami from './pages/tentang/add_tentang';
import EditTentangKami from './pages/tentang/edit_tentang';
import Album from './pages/album/album';
import AddAlbum from './pages/album/add_album';
import EditAlbum from './pages/album/edit_album';
import Berita from './pages/berita/berita';
import AddBerita from './pages/berita/add_berita';
import EditBerita from './pages/berita/edit_berita';
import Donasi from './pages/donasi/donasi';
import AddDonasi from './pages/donasi/add_donasi';
import EditDonasi from './pages/donasi/edit_donasi';
import Program from './pages/program/program';
import AddProgram from './pages/program/add_program';
import EditProgram from './pages/program/edit_program';
import Partner from './pages/partner/partner';
import AddPartner from './pages/partner/add_partner';
import EditPartner from './pages/partner/edit_partner';
import Team from './pages/team/team';
import AddTeam from './pages/team/add_team';
import EditTeam from './pages/team/edit_team';
import Testimoni from './pages/testimoni/testimoni';
import AddTestimoni from './pages/testimoni/add_testimoni';
import EditTestimoni from './pages/testimoni/edit_testimoni';
import { Redirect } from 'react-router-dom';
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
        let isToken = localStorage.getItem('token');
        if(isToken){
            setAuthenticated(true)
        }
    }, []);

    return (
        <div className="App">
            <Provider store={store}>
                <Router history={history} forceRefresh={true}>
                    <ScrollContext>
                        <Switch>
                            {/* <Fragment> */}
                                    <Route path={`${process.env.PUBLIC_URL}/login`} component={Login} />
                                    {/* <Redirect from="/" to="/dashboard"/> */}
                                    <Route exact path="/">
                                        {authenticated ? <Redirect to="/dashboard" /> : <Redirect to="/login" />}
                                    </Route>
                                    {authenticated !== null ?
                                        <App>
                                            <Route exact path={`${process.env.PUBLIC_URL}/dashboard`} component={Default} />
                                            <Route path={`${process.env.PUBLIC_URL}/user`} component={User} />
                                            <Route path={`${process.env.PUBLIC_URL}/add-user`} component={AddUser} />
                                            <Route path={`${process.env.PUBLIC_URL}/edit-user`} component={EditUser} />
                                            <Route path={`${process.env.PUBLIC_URL}/banner`} component={Banner} />
                                            <Route path={`${process.env.PUBLIC_URL}/add-banner`} component={AddBanner} />
                                            <Route path={`${process.env.PUBLIC_URL}/edit-banner`} component={EditBanner} />
                                            <Route path={`${process.env.PUBLIC_URL}/tentang-kami`} component={Tentang} />
                                            <Route path={`${process.env.PUBLIC_URL}/add-tentangkami`} component={AddTentangKami} />
                                            <Route path={`${process.env.PUBLIC_URL}/edit-tentangkami`} component={EditTentangKami} />
                                            <Route path={`${process.env.PUBLIC_URL}/album`} component={Album} />
                                            <Route path={`${process.env.PUBLIC_URL}/add-album`} component={AddAlbum} />
                                            <Route path={`${process.env.PUBLIC_URL}/edit-album`} component={EditAlbum} />
                                            <Route path={`${process.env.PUBLIC_URL}/berita`} component={Berita} />
                                            <Route path={`${process.env.PUBLIC_URL}/add-berita`} component={AddBerita} />
                                            <Route path={`${process.env.PUBLIC_URL}/edit-berita`} component={EditBerita} />
                                            <Route path={`${process.env.PUBLIC_URL}/donasi`} component={Donasi} />
                                            <Route path={`${process.env.PUBLIC_URL}/add-donasi`} component={AddDonasi} />
                                            <Route path={`${process.env.PUBLIC_URL}/edit-donasi`} component={EditDonasi} />
                                            <Route path={`${process.env.PUBLIC_URL}/program`} component={Program} />
                                            <Route path={`${process.env.PUBLIC_URL}/add-program`} component={AddProgram} />
                                            <Route path={`${process.env.PUBLIC_URL}/edit-program`} component={EditProgram} />
                                            <Route path={`${process.env.PUBLIC_URL}/partner`} component={Partner} />
                                            <Route path={`${process.env.PUBLIC_URL}/add-partner`} component={AddPartner} />
                                            <Route path={`${process.env.PUBLIC_URL}/edit-partner`} component={EditPartner} />
                                            <Route path={`${process.env.PUBLIC_URL}/team`} component={Team} />
                                            <Route path={`${process.env.PUBLIC_URL}/add-team`} component={AddTeam} />
                                            <Route path={`${process.env.PUBLIC_URL}/edit-team`} component={EditTeam} />
                                            <Route path={`${process.env.PUBLIC_URL}/testimoni`} component={Testimoni} />
                                            <Route path={`${process.env.PUBLIC_URL}/add-testimoni`} component={AddTestimoni} />
                                            <Route path={`${process.env.PUBLIC_URL}/edit-testimoni`} component={EditTestimoni} />
                                            {/* <Route exact path={`${process.env.PUBLIC_URL}/dashboard/default`} component={Default} />
                                            <Route path={`${process.env.PUBLIC_URL}/dashboard/ecommerce`} component={Ecommerce} />
                                            <Route path={`${process.env.PUBLIC_URL}/dashboard/university`} component={University} />
                                            <Route path={`${process.env.PUBLIC_URL}/dashboard/crypto`} component={CryptoComponent} />
                                            <Route path={`${process.env.PUBLIC_URL}/dashboard/project`} component={Project} />
                                            */}
                                            {/* Pricing */}
                                            {/* <Route path={`${process.env.PUBLIC_URL}/support-ticket/supportTicket`} component={SupportTicket} /> */}
                                        </App>
                                     :
                                        <Redirect to={`${process.env.PUBLIC_URL}/login`} />
                                    } 
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