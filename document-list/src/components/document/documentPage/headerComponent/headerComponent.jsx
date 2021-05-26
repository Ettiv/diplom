import React, { Component } from "react";
import { Link, withRouter } from 'react-router-dom';

import '../../../../bootatrap.css';

import AuthenticationService from '../../../../services/authentication.js'

class HeaderComponent extends Component {

    constructor(props){
        super(props);

        this.state ={
            searchParametr: ''
        }

        this.onChangeSearchParametr = this.onChangeSearchParametr.bind(this);
    }

    onChangeSearchParametr(event){
        this.setState({
            searchParametr: event.target.value
        })     
    }

    render() {

        const isUserloggedIn = AuthenticationService.isUserloggedIn();
        const isUserAdmin = AuthenticationService.isUserAdmin();

        return (
            <header>
                <nav className='navbar navbar-expand-md navbar-dark bg-dark'>
                    <div className='navbar-brand'>Document List</div>
                    <ul className='navbar-nav'>
                        {isUserloggedIn && <li><Link className='nav-link' to='/welcome/UserName'>Главная</Link></li>}
                        {isUserloggedIn && <li><Link className='nav-link' to='/documents'>Документы</Link></li>}
                        {isUserAdmin && <li><Link className='nav-link' to='/users'>Работники</Link></li>}
                        {isUserAdmin && <li><Link className='nav-link' to='/organisations'>Организации</Link></li>}
                        {isUserAdmin && <li><Link className='nav-link' to='/posts'>Посты</Link></li>}
                        {isUserAdmin && <li><Link className='nav-link' to='/units'>Должности</Link></li>}
                        {isUserAdmin && <li><Link className='nav-link' to='/types'>Типы документов</Link></li>}
                        {isUserAdmin && <li><Link className='nav-link' to='/vids'>Виды документов</Link></li>}
                    </ul>


                    <ul className='navbar-nav navbar-collapse justify-content-end' >
                        {!isUserloggedIn && <li><Link className='nav-link' to='/login'>Login</Link></li>}
                        {isUserloggedIn &&
                            <>
                                <li>
                                    <form className="form-inline my-2 my-lg-0 navbar-collapse justify-content-end">
                                        <input className="form-control mr-sm-2" type="search" 
                                            placeholder="Поиск" 
                                            aria-label="Search" 
                                            onChange={this.onChangeSearchParametr}/>
                                        <button className="btn btn-outline-success my-2 my-sm-0" 
                                            type="button" 
                                            onSubmit={() => this.props.refreshDocuments(this.setState.searchParametr)}>Поиск</button>
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