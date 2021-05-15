import React, { Component } from "react";
import { Link, withRouter } from 'react-router-dom';

import '../../../../bootatrap.css';

import AuthenticationService from '../../../../services/authentication.js'

class HeaderComponent extends Component {

    render() {

        const isUserloggedIn = AuthenticationService.isUserloggedIn();
        const isUserAdmin = AuthenticationService.isUserAdmin();

        return (
            <header>
                <nav className='navbar navbar-expand-md navbar-dark bg-dark'>
                    <div className='navbar-brand'>Document List</div>
                    <ul className='navbar-nav'>
                        {isUserloggedIn && <li><Link className='nav-link' to='/welcome/UserName'>Home</Link></li>}
                        {isUserloggedIn && <li><Link className='nav-link' to='/documents'>Documents</Link></li>}
                        {isUserAdmin && <li><Link className='nav-link' to='/users'>Users</Link></li>}
                    </ul>


                    <ul className='navbar-nav navbar-collapse justify-content-end' >
                        {!isUserloggedIn && <li><Link className='nav-link' to='/login'>Login</Link></li>}
                        {isUserloggedIn &&
                            <>
                                <li>
                                    <form className="form-inline my-2 my-lg-0 navbar-collapse justify-content-end">
                                        <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                                        <button className="btn btn-outline-success my-2 my-sm-0" type="submit" onSubmit={this.props.refreshDocuments}>Search</button>
                                    </form>
                                </li>
                                <li>
                                    <Link
                                        className='nav-link'
                                        to='/logout'
                                        onClick={AuthenticationService.logout}>
                                        Logout
                                    </Link>
                                </li>
                            </>
                        }
                    </ul>
                </nav>
            </header>
        );
    }
}

export default withRouter(HeaderComponent);