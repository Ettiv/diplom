import React, { Component } from 'react';

import DocumentDataService from '../../../../api/documet/documentDataService.js';
import '../../../../bootatrap.css';

export default class ListDocumentComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: null
        }
        this.deleteDocumentClicked = this.deleteDocumentClicked.bind(this);
        this.updateDocumentClicked = this.updateDocumentClicked.bind(this);
        this.watchDocumentClicked = this.watchDocumentClicked.bind(this);
        this.addDocumentClicked = this.addDocumentClicked.bind(this);
    }

    componentDidMount() {
        this.props.refreshDocuments();
    }

    deleteDocumentClicked(id) {
        DocumentDataService.deleteTodo(id)
            .then(
                response => {
                    this.setState({
                        message: `Delete of todo ${id} is sucsessful`
                    });
                    this.props.refreshDocuments();
                }
            )
    }

    updateDocumentClicked(id) {
        this.props.history.push(`/documents/${id}`);
    }

    watchDocumentClicked(id) {
        this.props.history.push(`/documents/watch/${id}`);
    }

    addDocumentClicked() {
        this.props.history.push(`/documents/-1`);
    }

    render() {

        return (
            <div className='row'>
                <div className='col-2' />
                <div className='col-8' >
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
                                        <th>Watch</th>
                                        <th>Delete</th>
                                        <th>Update</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {this.props.documents.map(document => {
                                        return (
                                            <tr key={document.id}>
                                                <td>{document.regNum}</td>
                                                <td>{document.name}</td>
                                                <td>{document.typeDocId}</td>
                                                <td>{document.reg}</td>
                                                <td><button
                                                    className='btn btn-success'
                                                    onClick={() => this.watchDocumentClicked(document.id)}>
                                                    Watch
                                                </button>
                                                </td>
                                                <td><button
                                                    className='btn btn-warning'
                                                    onClick={() => this.updateDocumentClicked(document.id)}>
                                                    Update
                                                </button>
                                                </td>
                                                <td><button
                                                    className='btn btn-danger'
                                                    onClick={() => this.deleteDocumentClicked(document.id)}>
                                                    Delete
                                                </button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className='col-2' >
                    <div className='container'>
                        <br /><br /><br /><br /><br />
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