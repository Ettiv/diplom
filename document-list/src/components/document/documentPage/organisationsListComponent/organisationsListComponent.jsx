import React, { Component } from 'react';

import OrganisationsDataService from '../../../../api/organisations/organisationsDataService.js';
import '../../../../bootatrap.css';

export default class ListDocumentComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: null
        }
        this.deleteOrganisationClicked = this.deleteOrganisationClicked.bind(this);
        this.updateOrganisationClicked = this.updateOrganisationClicked.bind(this);
        this.addOrgnisationClicked = this.addOrgnisationClicked.bind(this);
    }

    componentDidMount() {
        this.props.refreshOrganisations();
    }

    deleteOrganisationClicked(id) {
        OrganisationsDataService.deleteOrganisation(id)
            .then(
                response => {
                    this.setState({
                        message: `Delete of Organistion ${id} is sucsessful`
                    });
                    this.props.refreshOrganisations();
                }
            )
    }

    updateOrganisationClicked(id) {
        this.props.history.push(`/organisations/${id}`);
    }

    addOrgnisationClicked() {
        this.props.history.push(`/organisations/-1`);
    }

    render() {

        const vieu =
        <div>
                <div>
                    <div>
                        <h1>Организации</h1>
                        {this.state.message ? <div className='alert alert-success'>{this.state.message}</div> : null}
                        <div className='container'>

                            <table className='table'>
                                <thead>
                                    <tr>
                                        <th>Название организации</th>
                                        <th>Адрес организации</th>
                                        <th>Телефон организации</th>
                                        <th>Email организации</th>
                                        <th>Изменить</th>
                                        <th>Удалить</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.props.organisations.map(organisation => {
                                        return (
                                            <tr key={organisation.id}>
                                                <td>{organisation.name}</td>
                                                <td>{organisation.address}</td>
                                                <td>{organisation.phone}</td>
                                                <td>{organisation.email}</td>                                               
                                                <td><button
                                                    className='btn btn-warning'
                                                    onClick={() => this.updateOrganisationClicked(organisation.id)}>
                                                    Изменить
                                                </button>
                                                </td>
                                                <td><button
                                                    className='btn btn-danger'
                                                    onClick={() => this.deleteOrganisationClicked(organisation.id)}>
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
                <div className='col-2'/>
                <div className='col-8'>
                    {this.props.organisations.length ? vieu : nothing}
                </div>
                <div className='col-2' >
                    <div className='container'>
                        <br /><br /><br /><br /><br />
                        <button
                            className='btn btn-success'
                            onClick={this.addOrgnisationClicked}>
                            Добавить
                            </button>
                    </div>
                </div>
            </div>
            
        )
    }
}