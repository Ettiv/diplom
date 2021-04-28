import moment from 'moment';
import React, { Component } from 'react';

import TodoDataService from '../../../../api/todo/todoDataService.js';
import AuthentificationService from '../../../../services/authentication.js';

export default class ListTodosComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: [],
            message:null
        }
        this.deleteTodoClicked = this.deleteTodoClicked.bind(this);
        this.refreshTodos = this.refreshTodos.bind(this);
        this.updateTodoClicked = this.updateTodoClicked.bind(this);
        this.addTodoClicked = this.addTodoClicked.bind(this);
    }

    componentDidMount() {
        this.refreshTodos();
    }

    deleteTodoClicked(id) {
        let userName = AuthentificationService.getLoggedInUserName();
        TodoDataService.deleteTodo(userName, id)
        .then(
            response => {
                this.setState({
                    message: `Delete of todo ${id} is sucsessful`
                });
                this.refreshTodos();
            }
        )
    }

    updateTodoClicked(id) {
        this.props.history.push(`/todos/${id}`);
    }

    addTodoClicked() {
        this.props.history.push(`/todos/-1`);
    }

    refreshTodos(){
        let userName = AuthentificationService.getLoggedInUserName();
        TodoDataService.retriveAllTodos(userName)
            .then((response) => {
                this.setState({
                    todos: response.data
                });
            })
    }

    render() {

        return (
            <div>
                <h1>List Todos</h1>
                <div className='alert alert-sucsess'>{this.state.message}</div>
                <div className='container'>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th>description</th>
                                <th>Target date</th>
                                <th>Done</th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.todos.map(todo => {
                                return (
                                    <tr key={todo.id}>
                                        <td>{todo.description}</td>
                                        <td>{todo.done.toString()}</td>
                                        <td><button 
                                            className='btn btn-success' 
                                            onClick={ () => this.updateTodoClicked(todo.id)}>
                                                Update
                                            </button>
                                        </td>
                                        <td>{moment(todo.targetDate).format('YYYY-MM-DD')}</td>   
                                        <td><button 
                                            className='btn btn-warning' 
                                            onClick={ () => this.deleteTodoClicked(todo.id)}>
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                    <div className='row'>
                            <button 
                            className='btn btn-success'
                            onClick={this.addTodoClicked}>
                                Add
                            </button>
                    </div>
                </div>
            </div>
        )
    }
}