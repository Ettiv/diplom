import React, { Component } from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';

import CustomSelect from '../customSelect/customSelect';

import '../../../../bootatrap.css';
import '../../../../App.css';

import UserDataService from '../../../../api/user/userDataService.js';
// import Spiner from '../../uiComponents/spiner/spiner';

export default class UserComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            id: +this.props.match.params.id,
            id_uni: '',
            id_pos: '',
            fio_emp: '',
            adress_emp: '',
            phone_emp: '',
            roles: [],
            allRoles: [],
            units: [],
            posts: []
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.validate = this.validate.bind(this);
    }

    componentDidMount() {

        UserDataService.retriveAllUnits()
            .then(response => {
                let units = [
                    {
                        "value": null,
                        "label": "..."
                    }
                ];
                response.data.forEach(unit => {
                    units.push({
                        "value": units.id,
                        "label": units.unit_name
                    })
                });
                this.setState({
                    units
                })
            });

        UserDataService.retriveAllPosts()
            .then(response => {
                let posts = [
                    {
                        "value": null,
                        "label": "..."
                    }
                ];
                response.data.forEach(post => {
                    posts.push({
                        "value": post.id,
                        "label": post.post_name
                    })
                });
                this.setState({
                    posts
                })
            });

        if (this.state.id === -1) {
            this.setState({
                loading: false
            })
            return
        }

        UserDataService.retriveUser(this.state.id)
            .then(response => {
                this.setState({
                    id_uni: response.id_uni,
                    id_pos: response.id_pos,
                    fio_emp: response.fio_emp,
                    adress_emp: response.adress_emp,
                    phone_emp: response.phone_emp,
                    roles: response.roles
                })
            });

        this.setState({
            loading: false
        })
    }

    onSubmit(values) {

        let user = {
            "id": this.state.id,
            "id_uni": this.values.id_uni,
            "id_pos": this.values.id_pos,
            "fio_emp": this.values.fio_emp,
            //"adress_emp": this.values.adress_emp,
            //"phone_emp": this.values.phone_emp
        }

        let newUser = {
            "id_uni": this.values.id_uni,
            "id_pos": this.values.id_pos,
            "fio_emp": this.values.fio_emp,
            //"adress_emp": this.values.adress_emp,
            //"phone_emp": this.values.phone_emp
        }

        if (this.state.id === -1) {
            UserDataService.createUser(newUser).then(() => {
                this.props.history.push('/users');
            });
        } else {
            UserDataService.updateUser(this.state.id, user)
                .then(() => {
                    this.props.history.push('/users');
                });
        }
    }


    validate(values) { // должен возвращать ошибку
        let errors = {};
        if (!values.fio_emp) {
            errors.fio_emp = 'Введите ФИО позлователя';
        }

        if (!values.adress_emp) {
            errors.adress_emp = 'Введите адрес пользователя'
        }

        if (!values.phone_emp) {
            errors.phone_emp = 'Введите телефонный номер пользователя'
        }

        return errors;
    }

    render() {

        return (
            <div>
                <h1>Пользователь</h1>
                <div className='container'>
                    <Formik initialValues={
                        {
                            id_uni: this.state.id_uni,
                            id_pos: this.state.id_pos,
                            fio_emp: this.state.fio_emp,
                            adress_emp: this.state.adress_emp,
                            phone_emp: this.state.phone_emp
                        }
                    }
                        validateOnChange={false}
                        validateOnBlur={false}
                        onSubmit={this.onSubmit}
                        validate={this.validate}
                        enableReinitialize={true}>
                        {
                            (props) => (
                                <Form>
                                    <fieldset className='form-group'>
                                        <label>ФИО пользователя</label>
                                        <Field className='form-control'
                                            type='text'
                                            name='fio_emp' />
                                    </fieldset>

                                    <ErrorMessage
                                        name='fio_emp'
                                        component='div'
                                        className='alert alert-danger' />

                                    <fieldset className='form-group'>
                                        <label>Адрес пользователя</label>
                                        <Field className='form-control'
                                            type='text'
                                            name='adress_emp' />
                                    </fieldset>

                                    <ErrorMessage
                                        name='adress_emp'
                                        component='div'
                                        className='alert alert-danger' />

                                    <fieldset className='form-group'>
                                        <label>Телефон Пользователя</label>
                                        <Field className='form-control'
                                            type='text'
                                            name='phone_emp' />
                                    </fieldset>

                                    <ErrorMessage
                                        name='phone_emp'
                                        component='div'
                                        className='alert alert-danger' />


                                    <button type='submit' className='btn btn-success'>Save</button>
                                </Form>
                            )
                        }
                    </Formik>
                </div>
            </div>
        );
    }
}

