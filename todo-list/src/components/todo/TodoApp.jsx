import react , {Component} from 'react';

class TodoApp extends Component{
    render(){
        return(
            <div className='TodoApp'>
                <LoginComponent/> 
            </div>
        )
    }
}


class LoginComponent extends Component{

    constructor(props){
        super(props);
        this.state = {
            userName: 'UserName',
            password: 'Password'
        }
        this.handleChange =this.handleChange.bind(this);
    }

    handleChange(event){
        this.setState({
            [event.target.name]://ключ - переменная []
                event.target.value
        }); 
    }


    render(){
        return(
            <div>
                User name: <input 
                                type='text' 
                                name='userName' 
                                value={this.state.userName} 
                                onChange={this.handleChange}
                            />
                Password: <input
                                type='password' 
                                name = 'password' 
                                value={this.state.password}
                                onChange={this.handleChange}
                            />
                <button>Loggin</button>
            </div>
        )
    }
}

export default TodoApp;