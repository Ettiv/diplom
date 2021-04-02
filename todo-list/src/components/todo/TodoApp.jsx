import react, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import ErrorComponent from './loginPage/errorComponent/errorComponent';
import WelcomeComponent from './loginPage/welcomeComponent/welcomeComponent';
import LoginComponent from './loginPage/loginComponent/loginComponent';
import ListTodosComponent from './toDoPage/listTodosComponent/listTodosComponent';
import HeaderComponent from './toDoPage/headerComponent/headerComponent';
import FooterComponent from './toDoPage/footerComponent/footerComponent';

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
                            <Route path='/welcome/:name' component={WelcomeComponent} />
                            <Route path='/todos' component={ListTodosComponent} />
                            <Route component={ErrorComponent} />
                        </Switch>
                        <FooterComponent/>
                    </>
                </Router>
            </div>
        )
    }
}

export default TodoApp;