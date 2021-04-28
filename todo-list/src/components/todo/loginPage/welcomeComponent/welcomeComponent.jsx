import React, { Component } from 'react';
import { Link } from 'react-router-dom';
class WelcomeComponent extends Component {

    render() {
        return (
            <>
                <h1>Welcome!</h1>
                <div className='container'>
                    <div>Welcome to the welcome page, {this.props.match.params.name}</div>
                    <div>You can manage your todos <Link to='/todos'>here</Link></div>
                </div>
                <div className='container'>
                    <div>Welcome to the welcome page, {this.props.match.params.name}</div>
                </div>
            </>

        );
    }
}

export default WelcomeComponent;