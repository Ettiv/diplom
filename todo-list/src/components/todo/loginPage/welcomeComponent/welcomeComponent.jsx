import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class WelcomeComponent extends Component {
    render() {
        return (
            <>
                <div>Welcome to the welcome page, {this.props.match.params.name}</div>
                <div>You can manage your todos <Link to='/todos'>here</Link></div>
            </>
        );
    }
}

export default WelcomeComponent;