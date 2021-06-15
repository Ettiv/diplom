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
import OrganisationsListComponent from './documentPage/organisationsListComponent/organisationsListComponent';
import OrganisationComponent from './documentPage/organisationComponent/organisationComponent';
import PostsListComponent from './documentPage/postsListComponent/postsListComponent';
import PostComponent from './documentPage/postComponent/postComponent';
import UnitsListComponent from './documentPage/unitsListComponent/unitsListComponent';
import UnitComponent from './documentPage/unitConponent/unitComponent';
import TypesListComponent from './documentPage/typesListComponent/typesListComponent';
import TypeComponent from './documentPage/typeComponent/typeComponent';
import VidsListComponent from './documentPage/vidsListComponent/vidsListComponent';
import VidComponent from './documentPage/vidComponent/vidComponent';


import DocumentDataService from '../../api/documet/documentDataService.js';
import UserDataService from '../../api/user/userDataService.js';
import OrganisationsDataService from '../../api/organisations/organisationsDataService.js';
import PostsDataService from '../../api/posts/posts.js';
import UnitsDataService from '../../api/units/units.js';
import TypesDataService from '../../api/types/types.js';
import VidsDataService from '../../api/vids/vids.js';
class TodoApp extends Component {

    constructor(){
        super();
        this.state ={
            documents:[],
            users:[],
            organisations:[],
            posts:[],
            units:[],
            types:[],
            vids:[],
            selectedTab: ''
        }    
        this.refreshDocuments = this.refreshDocuments.bind(this);
        this.refreshUsers = this.refreshUsers.bind(this);
        this.refreshOrganisations = this.refreshOrganisations.bind(this);
        this.refreshPosts = this.refreshPosts.bind(this);
        this.refreshUnits = this.refreshUnits.bind(this);
        this.refreshTypes = this.refreshTypes.bind(this);
        this.refreshVids = this.refreshVids.bind(this);
        this.serarchByParametr = this.serarchByParametr.bind(this);
    }

    refreshDocuments(searchParametr='') {
        this.setState({
            selectedTab:'documents'
        });
        if(searchParametr === ''){
            DocumentDataService.retriveAllReadyDocuments()
            .then((response) => {
                this.setState({
                    documents: response.data._embedded.docs
                });
            });
        } else {
            DocumentDataService.retriveSearchDocuments(searchParametr)
            .then((response) => {
                this.setState({
                    documents: response.data._embedded.docs
                });
            });
        }
    }

    refreshUsers(searchParametr=''){
        this.setState({
            selectedTab:'users'
        });
        if(searchParametr === ''){
            UserDataService.retriveAllReadyUsers()
            .then((response)=>{
                this.setState({
                    users: response.data._embedded.employees
                });
            });
        } else {
            UserDataService.retriveSearchUsersByFio(searchParametr)
            .then((response)=>{
                this.setState({
                    users: response.data._embedded.employees
                });
            });
        }
        
    }

    refreshOrganisations(searchParametr=''){
        this.setState({
            selectedTab:'organisations'
        });
        if(searchParametr === ''){
            OrganisationsDataService.retriveAllOrganisations()
            .then((response)=>{
                this.setState({
                    organisations: response.data._embedded.orgs
                });
            });
        } else {
            OrganisationsDataService.retriveSearchOrganisationByName(searchParametr)
            .then((response)=>{
                this.setState({
                    organisations: response.data._embedded.orgs
                });
            });
        }
        
    }

    refreshPosts(searchParametr=''){
        this.setState({
            selectedTab:'posts'
        });
        if(searchParametr === ''){
            PostsDataService.retriveAllPosts()
            .then((response)=>{
                this.setState({
                    posts: response.data._embedded.posts
                });
            });
        } else {
            PostsDataService.retriveSearchPostsByName(searchParametr)
            .then((response)=>{
                this.setState({
                    posts: response.data._embedded.posts
                });
            });
        }
    }

    refreshUnits(searchParametr=''){
        this.setState({
            selectedTab:'units'
        });
        if(searchParametr === ''){
            UnitsDataService.retriveAllUnits()
            .then((response)=>{
                this.setState({
                    units: response.data._embedded.units
                });
            });
        } else {
            UnitsDataService.retriveSearchUnitsByName(searchParametr)
            .then((response)=>{
                this.setState({
                    units: response.data._embedded.units
                });
            });
        }
    }

    refreshTypes(searchParametr=''){
        this.setState({
            selectedTab:'types'
        });
        if(searchParametr === ''){
            TypesDataService.retriveAllTypes()
            .then((response)=>{
                this.setState({
                    types: response.data._embedded.types
                });
            });
        } else {
            TypesDataService.retriveSearchTypesByName(searchParametr)
            .then((response)=>{
                this.setState({
                    types: response.data._embedded.types
                });
            });
        }
        
    }

    refreshVids(searchParametr=''){
        this.setState({
            selectedTab:'vids'
        });
        if(searchParametr === ''){
            VidsDataService.retriveAllVids()
            .then((response)=>{
                this.setState({
                    vids: response.data._embedded.vids
                });
            });
        } else {
            VidsDataService.retriveSearchVidsByName(searchParametr)
            .then((response)=>{
                this.setState({
                    vids: response.data._embedded.vids
                });
            });
        }
        
    }

    serarchByParametr(searchParametr , selectedTab){
        if(selectedTab === 'documents'){
            this.refreshDocuments(searchParametr);
        } else if(selectedTab === 'users') {
            this.refreshUsers(searchParametr);
        } else if(selectedTab === 'organisations'){
            this.refreshOrganisations(searchParametr);
        } else if(selectedTab === 'posts') {
            this.refreshPosts(searchParametr);
        } else if(selectedTab === 'units'){
            this.refreshUnits(searchParametr);
        } else if(selectedTab === 'types'){
            this.refreshTypes(searchParametr);
        } else if(selectedTab === 'vids'){
            this.refreshVids(searchParametr);
        }
    }

    render() {
        return (
            <div className='TodoApp'>
                <Router basename={process.env.PUBLIC_URL}>
                    <>
                        <HeaderComponent serarchByParametr={this.serarchByParametr} selectedTab={this.state.selectedTab}/>
                        <Switch>
                            <Route path='/index.html' exact component={LoginComponent} />
                            <Route path='/' exact component={LoginComponent} />
                            <Route path='/login' component={LoginComponent} />
                            <AutfinticatedRoute role = 'ROLE_USER' path='/welcome/:name' component={WelcomeComponent} />
                            <AutfinticatedRoute exact role = 'ROLE_ADMIN' path='/users' render={(props) =>(
                                <UserListComponent {...props} users={this.state.users} refreshUsers={this.refreshUsers}/>
                            ) }/>
                            <AutfinticatedRoute exact role = 'ROLE_ADMIN' path='/organisations' render={(props) =>(
                                <OrganisationsListComponent {...props} organisations={this.state.organisations} 
                                refreshOrganisations={this.refreshOrganisations}/>
                            ) }/>
                            <AutfinticatedRoute exact role = 'ROLE_ADMIN' path='/posts' render={(props) =>(
                                <PostsListComponent {...props} posts={this.state.posts} 
                                refreshPosts={this.refreshPosts}/>
                            ) }/>
                            <AutfinticatedRoute exact role = 'ROLE_ADMIN' path='/units' render={(props) =>(
                                <UnitsListComponent {...props} units={this.state.units} 
                                refreshUnits={this.refreshUnits}/>
                            ) }/>
                            <AutfinticatedRoute exact role = 'ROLE_ADMIN' path='/types' render={(props) =>(
                                <TypesListComponent {...props} types={this.state.types} 
                                refreshTypes={this.refreshTypes}/>
                            ) }/>
                            <AutfinticatedRoute exact role = 'ROLE_ADMIN' path='/vids' render={(props) =>(
                                <VidsListComponent {...props} vids={this.state.vids} 
                                refreshVids={this.refreshVids}/>
                            ) }/>
                            <AutfinticatedRoute role = 'ROLE_ADMIN' exact path='/organisations/:id' component={OrganisationComponent} />
                            <AutfinticatedRoute role = 'ROLE_ADMIN' exact path='/posts/:id' component={PostComponent} />
                            <AutfinticatedRoute role = 'ROLE_ADMIN' exact path='/vids/:id' component={VidComponent} />
                            <AutfinticatedRoute role = 'ROLE_ADMIN' exact path='/units/:id' component={UnitComponent} />
                            <AutfinticatedRoute role = 'ROLE_ADMIN' exact path='/types/:id' component={TypeComponent} />
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