import React, { Component } from 'react';

import UserDataService from '../../../../api/user/userDataService.js';
import '../../../../bootatrap.css';

export default class ListDocumentComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: null
        }
        this.deleteUserClicked = this.deleteUserClicked.bind(this);
        this.updateUserClicked = this.updateUserClicked.bind(this);
        this.addUserClicked = this.addUserClicked.bind(this);
    }

    componentDidMount() {
        this.props.refreshUsers();
    }

    deleteUserClicked(id) {
        UserDataService.deleteUser(id)
            .then(
                response => {
                    this.setState({
                        message: `Delete of User ${id} is sucsessful`
                    });
                    this.props.refreshUsers();
                }
            )
    }

    updateUserClicked(id) {
        this.props.history.push(`/users/${id}`);
    }

    addUserClicked() {
        this.props.history.push(`/users/-1`);
    }

    render() {

        const vieu = 
        <div className='row'>
                <div className='col-2' />
                <div className='col-8' >
                    <div>
                        <h1>Работники</h1>
                        {this.state.message ? <div className='alert alert-success'>{this.state.message}</div> : null}
                        <div className='container'>

                            <table className='table'>
                                <thead>
                                    <tr>
                                        <th>ФИО работника</th>
                                        <th>Пост работника</th>
                                        <th>Должность работника</th>
                                        <th>Телефон работника</th>
                                        <th>Адрес работника</th>
                                        <th>Изменить</th>
                                        <th>Удалить</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.props.users.map(user => {
                                        return (
                                            <tr key={user.id}>
                                                <td>{user.fio}</td>
                                                <td>{user.post.name}</td>
                                                <td>{user.unit.name}</td>
                                                <td>{user.phone}</td>
                                                <td>{user.address}</td>                                                
                                                <td><button
                                                    className='btn btn-warning'
                                                    onClick={() => this.updateUserClicked(user.id)}>
                                                    Изменить
                                                </button>
                                                </td>
                                                <td><button
                                                    className='btn btn-danger'
                                                    onClick={() => this.deleteUserClicked(user.id)}>
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
                            onClick={this.addUserClicked}>
                            Добавить
                            </button>
                    </div>
                </div>
            </div>
        
        const nothing = <div>
            Ничего не найдено
        </div>

        return (
            this.props.users.length ? vieu : nothing
        )
    }
}