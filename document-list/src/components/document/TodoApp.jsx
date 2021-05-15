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
import DocumentWatch from './documentPage/documentWatch/documentWatch';
import UserListComponent from './documentPage/userListComponent/userListComponent';
import UserComponent from './documentPage/userComponent/userComponent';

import DocumentDataService from '../../api/documet/documentDataService.js';
import UserDataService from '../../api/user/userDataService.js';


class TodoApp extends Component {

    constructor(){
        super();
        this.state ={
            documents:[],
            users:[]
        }    
        this.refreshDocuments = this.refreshDocuments.bind(this);
        this.refreshUsers = this.refreshUsers.bind(this);
    }

    refreshDocuments() {
        DocumentDataService.retriveAllDocuments()
            .then((response) => {
                this.setState({
                    documents: response.data
                });
            });
    }

    refreshUsers(){
        UserDataService.retriveAllUsers()
            .then((response)=>{
                this.setState({
                    users: response.data
                });
            });
    }

    render() {
        return (
            <div className='TodoApp'>
                <Router>
                    <>
                        <HeaderComponent refreshDocuments={this.refreshDocuments}/>
                        <Switch>
                            <Route path='/' exact component={LoginComponent} />
                            <Route path='/login' component={LoginComponent} />
                            <AutfinticatedRoute role = 'ROLE_USER' path='/welcome/:name' component={WelcomeComponent} />
                            <AutfinticatedRoute exact role = 'ROLE_ADMIN' path='/users' render={(props) =>(
                                <UserListComponent {...props} users={this.state.users} refreshUsers={this.refreshUsers}/>
                            ) }/>
                            <AutfinticatedRoute role = 'ROLE_USER' exact path='/documents/:id' component={DocumentComponent} />
                            <AutfinticatedRoute role = 'ROLE_ADMIN' exact path='/users/:id' component={UserComponent} />
                            <AutfinticatedRoute role = 'ROLE_USER' path='/documents/watch/:id' component={DocumentWatch} />
                            <AutfinticatedRoute role = 'ROLE_USER' path='/documents' render={(props) => 
                                (<ListDocumentComponent {...props} documents={this.state.documents}
                                                            refreshDocuments={this.refreshDocuments} />)} />
                            <AutfinticatedRoute role = 'ROLE_USER' path='/logout' component={LogoutComponent} />
                            <Route component={ErrorComponent} />
                        </Switch>
                    </>
                </Router>
            </div>
        )
    }
}

export default TodoApp;