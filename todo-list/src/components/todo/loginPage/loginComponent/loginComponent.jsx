import React, {Component} from 'react';

import ShowValidCredentials from '../showValidCredentials/showValidCredentials'

export default class LoginComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userName: 'UserName',
            password: 'Password',
            hasLoginFaild: false,
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
        if (this.state.userName === 'UserName' && this.state.password === 'Password') {
            this.props.history.push(`/welcome/${this.state.userName}`);
        } else {
            console.log('failed');
            this.setState({ hasLoginFaild: true });
        }
    }

    render() {
        return (
            <div>
                <ShowValidCredentials hasLoginFaild={this.state.hasLoginFaild} />
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
                <button onClick={this.loginClicked}>Loggin</button>
            </div>
        );
    }
}