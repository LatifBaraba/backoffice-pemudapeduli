import React, { Fragment } from 'react';
import Breadcrumb from '../../common/breadcrumb';
import { Redirect } from 'react-router-dom';
import {
    Home,
    // Anchor,
    // Headphones,
    Users,
    Image,
    DollarSign,
    AtSign,
    Award,
    // BookOpen,
    Columns,
    FileText,
    Bookmark,
    ExternalLink,
    Hash,
    CheckCircle,
    UserCheck,
    CreditCard,
    Shuffle,
    Book
} from 'react-feather';

const Default = () => {

    let isToken = localStorage.getItem('token');

    return (
        <>
           { !isToken ? (
                <Redirect to={{ pathname: "/login"}} />
            ) : (
                <Fragment>
                <Breadcrumb parent="Dashboard" title="Default" />
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <h5>Welcome to Pemuda Peduli - Back Office</h5>
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-md-4">
                            <div class="card">
                                <div class="card-body ecommerce-icons text-center">
                                    <Home />
                                    <div>
                                        <span>Total Web Visitor</span>
                                    </div>
                                    <h4 class="font-primary mb-0">
                                        <span class="counter">65</span>
                                    </h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                </Fragment>
            )
            }
        </>
    );
};

export default Default;