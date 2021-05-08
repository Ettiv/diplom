import { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import ErrorComponent from './loginPage/errorComponent/errorComponent';
import WelcomeComponent from './loginPage/welcomeComponent/welcomeComponent';
import LoginComponent from './loginPage/loginComponent/loginComponent';
import ListDocumentComponent from './documentPage/listDocumentComponent/listDocumentsComponent';
import HeaderComponent from './documentPage/headerComponent/headerComponent';
//import FooterComponent from './toDoPage/footerComponent/footerComponent';
import LogoutComponent from './loginPage/logoutComponent/logautComponent';
import AutfinticatedRoute from './loginPage/authenticatedRoute/autfinticatedRoute';
import DocumentComponent from './documentPage/documentComponent/documentComponent';

class TodoApp extends Component {
    render() {
        return (
            <div className='TodoApp'>
                <Router>
                    <>
                        <HeaderComponent/>
                        <Switch>
                            <Route path='/' exact component={LoginComponent} />
                            <Route path='/login' component={LoginComponent} />
                            <AutfinticatedRoute path='/welcome/:name' component={WelcomeComponent} />
                            <AutfinticatedRoute path='/documents/:id' component={DocumentComponent} />
                            <AutfinticatedRoute path='/documents' component={ListDocumentComponent} />
                            <AutfinticatedRoute path='/logout' component={LogoutComponent} />
                            <Route component={ErrorComponent} />
                        </Switch>
                    </>
                </Router>
            </div>
        )
    }
}

export default TodoApp;