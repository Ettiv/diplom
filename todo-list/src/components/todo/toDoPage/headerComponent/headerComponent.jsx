import React, { Component } from "react";
import {Link} from 'react-router-dom';

import '../../../../bootatrap.css';

export default class HeaderComponent extends Component{
    render(){
        return(
            <header className='navbar navbar-expand-md navbar-dark bg-dark'>
                <nav>
                    <a href='http://www.in28minutes.com' className='navbar-brand'>UserName</a>
                    <ul className='navbar-nav'>
                        <li><Link className='nav-link' to='/welcome/UserName'>Home</Link></li>
                        <li><Link className='nav-link' to='/todos'>Todos</Link></li>
                    </ul>
                    <ul className='navbar-nav' >
                        <li className='navbar-collapse justify-content-end'><Link className='nav-link' to='/login'>Login</Link></li>
                        <li><Link className='nav-link' to='/logout'>Logout</Link></li>
                    </ul>
                </nav>
            </header>
        );
    }
}