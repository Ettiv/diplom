import React, { Component } from 'react';

import UnitsDataService from '../../../../api/units/units.js';
import '../../../../bootatrap.css';

export default class UnitsListComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: null
        }
        this.deleteUnitClicked = this.deleteUnitClicked.bind(this);
        this.updateUnitClicked = this.updateUnitClicked.bind(this);
        this.addUnitClicked = this.addUnitClicked.bind(this);
    }

    componentDidMount() {
        this.props.refreshUnits();
    }

    deleteUnitClicked(id) {
        UnitsDataService.deleteUnit(id)
            .then(
                response => {
                    this.setState({
                        message: `Delete of Unit ${id} is sucsessful`
                    });
                    this.props.refreshUnits();
                }
            )
    }

    updateUnitClicked(id) {
        this.props.history.push(`/units/${id}`);
    }

    addUnitClicked() {
        this.props.history.push(`/units/-1`);
    }

    render() {

        const vieu = 
        <div>
                <div>
                    <div>
                        <h1>Должности</h1>
                        {this.state.message ? <div className='alert alert-success'>{this.state.message}</div> : null}
                        <div className='container'>

                            <table className='table'>
                                <thead>
                                    <tr>
                                        <th>Название должности</th>
                                        <th>Изменить</th>
                                        <th>Удалить</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.props.units.map(unit => {
                                        return (
                                            <tr key={unit.id}>
                                                <td>{unit.name}</td>                                              
                                                <td><button
                                                    className='btn btn-warning'
                                                    onClick={() => this.updateUnitClicked(unit.id)}>
                                                    Изменить
                                                </button>
                                                </td>
                                                <td><button
                                                    className='btn btn-danger'
                                                    onClick={() => this.deleteUnitClicked(unit.id)}>
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
            <div className='row'>
                <div className='col-4' />
                <div  className='col-4' >
                    {this.props.units.length ? vieu : nothing}
                </div>
                <div className='col-4' >
                    <div className='container'>
                        <br /><br /><br /><br /><br />
                        <button
                            className='btn btn-success'
                            onClick={this.addUnitClicked}>
                            Добавить
                            </button>
                    </div>
                </div>
            </div> 
        )
    }
}