import React, { Component } from 'react';

import TypesDataService from '../../../../api/types/types.js';
import '../../../../bootatrap.css';

export default class TypesListComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: null
        }
        this.deleteTypeClicked = this.deleteTypeClicked.bind(this);
        this.updateTypeClicked = this.updateTypeClicked.bind(this);
        this.addTypeClicked = this.addTypeClicked.bind(this);
    }

    componentDidMount() {
        this.props.refreshTypes();
    }

    deleteTypeClicked(id) {
        TypesDataService.deleteType(id)
            .then(
                response => {
                    this.setState({
                        message: `Delete of Type ${id} is sucsessful`
                    });
                    this.props.refreshTypes();
                }
            )
    }

    updateTypeClicked(id) {
        this.props.history.push(`/types/${id}`);
    }

    addTypeClicked() {
        this.props.history.push(`/types/-1`);
    }

    render() {

        const vieu =
        <div>
                <div>
                    <div>
                        <h1>Типы</h1>
                        {this.state.message ? <div className='alert alert-success'>{this.state.message}</div> : null}
                        <div className='container'>

                            <table className='table'>
                                <thead>
                                    <tr>
                                        <th>Название типа</th>
                                        <th>Изменить</th>
                                        <th>Удалить</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.props.types.map(type => {
                                        return (
                                            <tr key={type.id}>
                                                <td>{type.name}</td>                                              
                                                <td><button
                                                    className='btn btn-warning'
                                                    onClick={() => this.updateTypeClicked(type.id)}>
                                                    Изменить
                                                </button>
                                                </td>
                                                <td><button
                                                    className='btn btn-danger'
                                                    onClick={() => this.deleteTypeClicked(type.id)}>
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
            </div>

            const nothing =
            <div>
                Ничего не найдено
            </div>

        return (
            <div  className='row'>
                <div className='col-4' />
                <div className='col-4' >
                    {this.props.types.length ? vieu : nothing}
                </div>
                <div className='col-4' >
                    <div className='container'>
                        <br /><br /><br /><br /><br />
                        <button
                            className='btn btn-success'
                            onClick={this.addTypeClicked}>
                            Добавить
                            </button>
                    </div>
                </div>
            </div>
            
        )
    }
}