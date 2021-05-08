import React, { Component } from 'react';

import TodoDataService from '../../../../api/documet/documentDataService.js';
import '../../../../bootatrap.css';

export default class ListDocumentComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            documents: [],
            message:null
        }
        this.deleteDocumentClicked = this.deleteDocumentClicked.bind(this);
        this.refreshDocuments = this.refreshDocuments.bind(this);
        this.updateDocumentClicked = this.updateDocumentClicked.bind(this);
        this.addDocumentClicked = this.addDocumentClicked.bind(this);
    }

    componentDidMount() {
        this.refreshDocuments();
    }

    deleteDocumentClicked(id) {
        TodoDataService.deleteTodo(id)
        .then(
            response => {
                this.setState({
                    message: `Delete of todo ${id} is sucsessful`
                });
                this.refreshDocuments();
            }
        )
    }

    updateDocumentClicked(id) {
        this.props.history.push(`/documents/${id}`);
    }

    addDocumentClicked() {
        this.props.history.push(`/documents/-1`);
    }

    refreshDocuments(){
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
                                            onClick={ () => this.updateDocumentClicked(document.id)}>
                                                Update
                                            </button>
                                        </td>
                                        {/* <td>{moment(document.doc_register_date).format('YYYY-MM-DD')}</td>    */}
                                        
                                        <td><button 
                                            className='btn btn-warning' 
                                            onClick={ () => this.deleteDocumentClicked(document.id)}>
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
                            onClick={this.addDocumentClicked}>
                                Add
                            </button>
                    </div>
                </div>
            </div>
        )
    }
}