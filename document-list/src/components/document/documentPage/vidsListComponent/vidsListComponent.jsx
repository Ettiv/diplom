import React, { Component } from 'react';

import VidsDataService from '../../../../api/vids/vids.js';
import '../../../../bootatrap.css';

export default class VidsListComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: null
        }
        this.deleteVidClicked = this.deleteVidClicked.bind(this);
        this.updateVidClicked = this.updateVidClicked.bind(this);
        this.addVidClicked = this.addVidClicked.bind(this);
    }

    componentDidMount() {
        this.props.refreshVids();
    }

    deleteVidClicked(id) {
        VidsDataService.deleteVid(id)
            .then(
                response => {
                    this.setState({
                        message: `Delete of Vid ${id} is sucsessful`
                    });
                    this.props.refreshVids();
                }
            )
    }

    updateVidClicked(id) {
        this.props.history.push(`/vids/${id}`);
    }

    addVidClicked() {
        this.props.history.push(`/vids/-1`);
    }

    render() {

        const vieu =
        <div className='row'>
                <div className='col-4' />
                <div className='col-4' >
                    <div>
                        <h1>Виды</h1>
                        {this.state.message ? <div className='alert alert-success'>{this.state.message}</div> : null}
                        <div className='container'>

                            <table className='table'>
                                <thead>
                                    <tr>
                                        <th>Название вида</th>
                                        <th>Изменить</th>
                                        <th>Удалить</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.props.vids.map(vid => {
                                        return (
                                            <tr key={vid.id}>
                                                <td>{vid.name}</td>                                              
                                                <td><button
                                                    className='btn btn-warning'
                                                    onClick={() => this.updateVidClicked(vid.id)}>
                                                    Изменить
                                                </button>
                                                </td>
                                                <td><button
                                                    className='btn btn-danger'
                                                    onClick={() => this.deleteVidClicked(vid.id)}>
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
                <div className='col-4' >
                    <div className='container'>
                        <br /><br /><br /><br /><br />
                        <button
                            className='btn btn-success'
                            onClick={this.addVidClicked}>
                            Добавить
                            </button>
                    </div>
                </div>
            </div>

            const nothing =
            <div>
                Ничего не найдено
            </div>

        return (
            this.props.vids.length ? vieu : nothing
        )
    }
}