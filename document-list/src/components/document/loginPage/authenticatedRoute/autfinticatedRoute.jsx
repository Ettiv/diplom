import React, {Component} from 'react';

import AuthenticationService from '../../../../services/authentication.js';

import {Route, Redirect} from 'react-router-dom';

export default class AutfinticatedRoute extends Component{
    render(){      
            if(AuthenticationService.isUserloggedIn()){
                return <Route {...this.props}/>
            } else {
                return <Redirect to='/login/'/>
            }     
    }
}