import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { Redirect } from "react-router-dom";
import './index.scss';

import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ScrollContext } from 'react-router-scroll-4';
import * as serviceWorker from './serviceWorker';

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
import User from './pages/user';

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
                <BrowserRouter basename={'/'}>
                    <ScrollContext>
                        <Switch>
                            {/* <Fragment> */}
                                    <Route path={`${process.env.PUBLIC_URL}/login`} component={Login} />
                                    {authenticated !== null ?
                                        <App>
                                            <Route exact path={`${process.env.PUBLIC_URL}/dashboard`} component={Default} />
                                            <Route path={`${process.env.PUBLIC_URL}/user`} component={User} />
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
                </BrowserRouter>
            </Provider>
        </div>
    );
}

ReactDOM.render(<Root />, document.getElementById('root'));

serviceWorker.unregister();