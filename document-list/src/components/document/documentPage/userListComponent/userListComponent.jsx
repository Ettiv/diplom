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
        this.watchUserClicked = this.watchUserClicked.bind(this);
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

    watchUserClicked(id) {
        this.props.history.push(`/users/watch/${id}`);
    }

    addUserClicked() {
        this.props.history.push(`/users/-1`);
    }

    render() {

        return (
            <div className='row'>
                <div className='col-1' />
                <div className='col-10' >
                    <div>
                        <h1>Пользователи</h1>
                        {this.state.message ? <div className='alert alert-success'>{this.state.message}</div> : null}
                        <div className='container'>

                            <table className='table'>
                                <thead>
                                    <tr>
                                        <th>Имя пользователя</th>
                                        <th>Пост пользователя</th>
                                        <th>Телефон пользователя</th>
                                        <th>Адрес пользователя</th>
                                        <th>Watch</th>
                                        <th>Delete</th>
                                        <th>Update</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.props.users.map(user => {
                                        return (
                                            <tr key={user.id}>
                                                <td>{user.fio_emp}</td>
                                                <td>{user.id_pos}</td>
                                                <td>{user.phone_emp}</td>
                                                <td>{user.adress_emp}</td>
                                                <td><button
                                                    className='btn btn-success'
                                                    onClick={() => this.watchUserClicked(user.id)}>
                                                    Watch
                                                </button>
                                                </td>
                                                <td><button
                                                    className='btn btn-warning'
                                                    onClick={() => this.updateUserClicked(user.id)}>
                                                    Update
                                                </button>
                                                </td>
                                                <td><button
                                                    className='btn btn-danger'
                                                    onClick={() => this.deleteUserClicked(user.id)}>
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
                <div className='col-1' >
                    <div className='container'>
                        <br /><br /><br /><br /><br />
                        <button
                            className='btn btn-success'
                            onClick={this.addUserClicked}>
                            Add
                            </button>
                    </div>
                </div>
            </div>



        )
    }
}