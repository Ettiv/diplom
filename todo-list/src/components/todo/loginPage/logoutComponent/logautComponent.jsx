import React, {Component} from 'react';

import '../../../../bootatrap.css';

export default class LogoutComponent extends Component{
    render(){
        return(
            <>
                <h1>You are logged out</h1>
                <div className='container'>
                    Thank you for using our application
                </div>
            </>
        );
    }
}