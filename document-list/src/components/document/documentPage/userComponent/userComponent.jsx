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
            unitId: '',
            postId: '',
            fio: '',
            address: '',
            phone: '',
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
                response.data._embedded.units.forEach(unit => {
                    units.push({
                        "value": unit.id,
                        "label": unit.name
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
                response.data._embedded.posts.forEach(post => {
                    posts.push({
                        "value": post.id,
                        "label": post.name
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
                    unitId: response.data.unitId,
                    postId: response.data.postId,
                    fio: response.data.fio,
                    address: response.data.address,
                    phone: response.data.phone
                })
            });

        this.setState({
            loading: false
        })
    }

    onSubmit(values) {

        let user = {
            "id": this.state.id,
            "unitId": values.units,
            "postId": values.posts,
            "fio": values.fio,
            "address": values.address,
            "phone": values.phone
        }

        let newUser = {
            "unitId": values.units,
            "postId": values.posts,
            "fio": values.fio,
            "address": values.address,
            "phone": values.phone
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
        if (!values.fio) {
            errors.fio = 'Введите ФИО работника';
        }

        if (!values.address) {
            errors.address = 'Введите адрес работника'
        }

        if (!values.phone) {
            errors.phone = 'Введите телефонный номер работника'
        }

        if(!values.units){
            errors.units = 'Введите должность работника'
        }

        if(!values.posts){
            errors.posts = 'Введите пост работника'
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
                            units: this.state.unitId,
                            posts: this.state.postId,
                            fio: this.state.fio,
                            address: this.state.address,
                            phone: this.state.phone
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
                                        <label>ФИО работника</label>
                                        <Field className='form-control'
                                            type='text'
                                            name='fio' />
                                    </fieldset>

                                    <ErrorMessage
                                        name='fio'
                                        component='div'
                                        className='alert alert-danger' />

                                    <fieldset className='form-group'>
                                        <label>Адрес работника</label>
                                        <Field className='form-control'
                                            type='text'
                                            name='address' />
                                    </fieldset>

                                    <ErrorMessage
                                        name='address'
                                        component='div'
                                        className='alert alert-danger' />

                                    <fieldset className='form-group'>
                                        <label>Телефон работника</label>
                                        <Field className='form-control'
                                            type='text'
                                            name='phone' />
                                    </fieldset>

                                    <ErrorMessage
                                        name='phone'
                                        component='div'
                                        className='alert alert-danger' />

                                    <fieldset className='form-group'>
                                        <label>Должность работника</label>
                                        <CustomSelect
                                            options={this.state.units}
                                            name='units'
                                        />
                                    </fieldset>

                                    <ErrorMessage
                                        name='units'
                                        component='div'
                                        className='alert alert-danger' />

                                    <fieldset className='form-group'>
                                        <label>Пост работника</label>
                                        <CustomSelect
                                            options={this.state.posts}
                                            name='posts'
                                        />
                                    </fieldset>

                                    <ErrorMessage
                                        name='posts'
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

