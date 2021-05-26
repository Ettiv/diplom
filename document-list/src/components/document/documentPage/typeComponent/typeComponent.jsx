import React, { Component } from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';

import '../../../../bootatrap.css';
import '../../../../App.css';

import TypesDataService from '../../../../api/types/types.js';
// import Spiner from '../../uiComponents/spiner/spiner';

export default class TypeComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            id: +this.props.match.params.id,
            name: ''
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

        TypesDataService.retriveType(this.state.id)
            .then(response => {
                this.setState({
                    name: response.data.name
                })
            });

        this.setState({
            loading: false
        })
    }

    onSubmit(values) {

        let type = {
            "id": this.state.id,
            "name": values.name
        }

        let newType = {
            "name": values.name
        }

        if (this.state.id === -1) {
            TypesDataService.createType(newType).then(() => {
                this.props.history.push('/types');
            });
        } else {
            TypesDataService.updateType(this.state.id, type)
                .then(() => {
                    this.props.history.push('/types');
                });
        }
    }


    validate(values) { // должен возвращать ошибку
        let errors = {};
        if (!values.name) {
            errors.name = 'Введите тип';
        }

        return errors;
    }

    render() {

        return (
            <div>
                <h1>Тип</h1>
                <div className='container'>
                    <Formik initialValues={
                        {
                            name: this.state.name
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
                                        <label>Название типа</label>
                                        <Field className='form-control'
                                            type='text'
                                            name='name' />
                                    </fieldset>

                                    <ErrorMessage
                                        name='name'
                                        component='div'
                                        className='alert alert-danger' />

                                    <button type='submit' className='btn btn-success'>Сохранить</button>
                                </Form>
                            )
                        }
                    </Formik>
                </div>
            </div>
        );
    }
}

