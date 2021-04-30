import React, { Component } from "react";
import { Link, withRouter } from 'react-router-dom';

import '../../../../bootatrap.css';

import AuthenticationService from '../../../../services/authentication.js'

class HeaderComponent extends Component {



    render() {

        const isUserloggedIn = AuthenticationService.isUserloggedIn();

        return (
            <header>
                <nav className='navbar navbar-expand-md navbar-dark bg-dark'>
                    <a href='http://www.in28minutes.com' className='navbar-brand'>UserName</a>
                    <ul className='navbar-nav'>
                        {isUserloggedIn && <li><Link className='nav-link' to='/welcome/UserName'>Home</Link></li>}
                        {isUserloggedIn && <li><Link className='nav-link' to='/documents'>Todos</Link></li>}
                    </ul>
                    <ul className='navbar-nav navbar-collapse justify-content-end' >
                        {!isUserloggedIn && <li><Link className='nav-link' to='/login'>Login</Link></li>}
                        {isUserloggedIn && 
                        <li>
                            <Link
                                className='nav-link'
                                to='/logout'
                                onClick={AuthenticationService.logout}>
                                    Logout
                            </Link>
                        </li>}
                    </ul>
                </nav>
            </header>
        );
    }
}

export default withRouter(HeaderComponent);