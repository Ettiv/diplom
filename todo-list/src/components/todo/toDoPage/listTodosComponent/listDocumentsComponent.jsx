import React, { Component } from 'react';

import TodoDataService from '../../../../api/documet/documentDataService.js';
import '../../../../bootatrap.css';

export default class ListTodosComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            documents: [],
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
        TodoDataService.deleteTodo(id)
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
        this.props.history.push(`/documents/${id}`);
    }

    addTodoClicked() {
        this.props.history.push(`/documents/-1`);
    }

    refreshTodos(){
        TodoDataService.retriveAllDocuments()
            .then((response) => {
                this.setState({
                    documents: response.data
                });
            })
    }

    render() {

        return (
            <div>
                <h1>Документы</h1>
                {this.state.message ? <div className='alert alert-success'>{this.state.message}</div> : null}
                <div className='container'>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th>Код документа</th>
                                <th>Название документа</th>
                                <th>Тип документа</th>
                                <th>Дата создания</th>
                                <th>Delete</th>
                                <th>Update</th>

                            </tr>
                        </thead>
                        <tbody>
                            {this.state.documents.map(document => {
                                return (
                                    <tr key={document.id}>
                                        <td>{document.doc_number}</td>
                                        <td>{document.doc_name}</td>
                                        <td>{document.id_typ}</td>
                                        <td>{document.doc_register_date}</td>
                                        <td><button 
                                            className='btn btn-success' 
                                            onClick={ () => this.updateTodoClicked(document.id)}>
                                                Update
                                            </button>
                                        </td>
                                        {/* <td>{moment(document.doc_register_date).format('YYYY-MM-DD')}</td>    */}
                                        
                                        <td><button 
                                            className='btn btn-warning' 
                                            onClick={ () => this.deleteTodoClicked(document.id)}>
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