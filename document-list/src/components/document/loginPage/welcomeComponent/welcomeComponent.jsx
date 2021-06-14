import React, { Component } from 'react';
import { Link } from 'react-router-dom';
class WelcomeComponent extends Component {

    render() {
        return (
            <>
                <h1>Welcome!</h1>
                <div className='container'>
                    <div>Добро пожаловать, {this.props.match.params.name}</div>
                    <div>Вы можете работать с документами <Link to='/documents'>здесь</Link></div>
                </div>
            </>

        );
    }
}

export default WelcomeComponent;