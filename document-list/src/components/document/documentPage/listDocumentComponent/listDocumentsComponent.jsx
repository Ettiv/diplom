import React, { Component } from 'react';
import moment from 'moment';

import DocumentDataService from '../../../../api/documet/documentDataService.js';
import '../../../../bootatrap.css';

export default class ListDocumentComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: null,
            types: [
                {
                    "id":0,
                    "name":null
                }
            ]
        }
        this.deleteDocumentClicked = this.deleteDocumentClicked.bind(this);
        this.updateDocumentClicked = this.updateDocumentClicked.bind(this);
        this.watchDocumentClicked = this.watchDocumentClicked.bind(this);
        this.addDocumentClicked = this.addDocumentClicked.bind(this);
    }


    componentDidMount() {
        this.props.refreshDocuments();
        DocumentDataService.retriveAllTypes()
            .then(response => {
                let types = [];
                response.data._embedded.types.forEach(type => {
                    types.push({
                        "id": type.id,
                        "name": type.name
                    })
                });
                this.setState({
                    types
                })
            });
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
        const vieu = 
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
                                        <th>Просмотреть</th>
                                        <th>Обновить</th>
                                        <th>Удалить</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {this.props.documents.map(document => {
                                                
                                        return (
                                            <tr key={document.id}>
                                                <td>{document.regNum}</td>
                                                <td>{document.name}</td>
                                                <td>
                                                    {document.typeDoc.name}
                                                </td>
                                                <td>{moment(document.reg).format('YYYY-MM-DD')}</td>
                                                <td><button
                                                    className='btn btn-success'
                                                    onClick={() => this.watchDocumentClicked(document.id)}>
                                                    Просмотреть
                                                </button>
                                                </td>
                                                <td><button
                                                    className='btn btn-warning'
                                                    onClick={() => this.updateDocumentClicked(document.id)}>
                                                    Обновить
                                                </button>
                                                </td>
                                                <td><button
                                                    className='btn btn-danger'
                                                    onClick={() => this.deleteDocumentClicked(document.id)}>
                                                    Удалить
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
                            Добавить
                            </button>
                    </div>
                </div>
            </div>
        
        const nothing = <div>
            Ничего не найдено
        </div>
            
        
        return (
            this.props.documents.length ? vieu : nothing
        )
    }
}