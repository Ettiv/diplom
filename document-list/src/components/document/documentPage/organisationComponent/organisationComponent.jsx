import React, { Component } from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';

import '../../../../bootatrap.css';
import '../../../../App.css';

import OrganisationsDataService from '../../../../api/organisations/organisationsDataService.js';
// import Spiner from '../../uiComponents/spiner/spiner';

export default class OrgnisationsComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            id: +this.props.match.params.id,
            name: '',
            address: '',
            phone: '',
            email: ''
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.validate = this.validate.bind(this);
    }

    componentDidMount() {

        if (this.state.id === -1) {
            this.setState({
                loading: false
            })
            return
        }

        OrganisationsDataService.retriveOrganisation(this.state.id)
            .then(response => {
                this.setState({
                    name: response.data.name,
                    address: response.data.address,
                    phone: response.data.phone,
                    email: response.data.email
                })
            });

        this.setState({
            loading: false
        })
    }

    onSubmit(values) {

        let organistion = {
            "id": this.state.id,
            "name": values.name,
            "address": values.address,
            "phone": values.phone,
            "email": values.email
        }

        let newOrganistion = {
            "name": values.name,
            "address": values.address,
            "phone": values.phone,
            "email": values.email
        }

        if (this.state.id === -1) {
            OrganisationsDataService.createOrganisation(newOrganistion).then(() => {
                this.props.history.push('/organisations');
            });
        } else {
            OrganisationsDataService.updateOrganisation(this.state.id, organistion)
                .then(() => {
                    this.props.history.push('/organisations');
                });
        }
    }


    validate(values) { // должен возвращать ошибку
        let errors = {};
        if (!values.name) {
            errors.name = 'Введите название организации';
        }

        if (!values.address) {
            errors.address = 'Введите адрес организации'
        }

        if (!values.phone) {
            errors.phone = 'Введите телефонный оранизации'
        }

        if (!values.email) {
            errors.email = 'Введите email организации'
        }

        return errors;
    }

    render() {

        return (
            <div>
                <h1>Организация</h1>
                <div className='container'>
                    <Formik initialValues={
                        {
                            name: this.state.name,
                            address: this.state.address,
                            phone: this.state.phone,
                            email: this.state.email
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
                                        <label>Название организации</label>
                                        <Field className='form-control'
                                            type='text'
                                            name='name' />
                                    </fieldset>

                                    <ErrorMessage
                                        name='name'
                                        component='div'
                                        className='alert alert-danger' />

                                    <fieldset className='form-group'>
                                        <label>Адрес организации</label>
                                        <Field className='form-control'
                                            type='text'
                                            name='address' />
                                    </fieldset>

                                    <ErrorMessage
                                        name='address'
                                        component='div'
                                        className='alert alert-danger' />

                                    <fieldset className='form-group'>
                                        <label>Телефон организации</label>
                                        <Field className='form-control'
                                            type='text'
                                            name='phone' />
                                    </fieldset>

                                    <ErrorMessage
                                        name='phone'
                                        component='div'
                                        className='alert alert-danger' />

                                    <fieldset className='form-group'>
                                        <label>Email организации</label>
                                        <Field className='form-control'
                                            type='text'
                                            name='email' />
                                    </fieldset>

                                    <ErrorMessage
                                        name='email'
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

