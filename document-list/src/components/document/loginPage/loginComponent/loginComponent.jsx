import React, { Component } from 'react';

import ShowValidCredentials from '../showValidCredentials/showValidCredentials';
import AuthenticationService from '../../../../services/authentication.js';

export default class LoginComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            password: '',
            hasLoginFailed: false,
            showSucsessMessage: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.loginClicked = this.loginClicked.bind(this);
    }



    handleChange(event) {
        this.setState({
            [event.target.name]://ключ - переменная []
                event.target.value
        });
    }

    loginClicked() {
        AuthenticationService
            .executeJwtAuthentificationService(this.state.userName, this.state.password)
            .then((response) => {
                AuthenticationService
                .registerSuccessfulLoginForJwt(this.state.userName, response.data.token, response.data.roles);
                this.props.history.push(`/welcome/${this.state.userName}`);
            }).catch((e) => {
                console.error(e);
                this.setState({ showSuccessMessage: false });
                this.setState({ hasLoginFailed: true });
            });
    }

    render() {
        return (
            <div>
                <h1>Login</h1>
                <div className='container'></div>
                <ShowValidCredentials hasLoginFailed={this.state.hasLoginFailed} />
                User name: <input
                    type='text'
                    name='userName'
                    value={this.state.userName}
                    onChange={this.handleChange}
                />
                Password: <input
                    type='password'
                    name='password'
                    value={this.state.password}
                    onChange={this.handleChange}
                />
                <button className='btn btn-success' onClick={this.loginClicked}>Loggin</button>
            </div>
        );
    }
}