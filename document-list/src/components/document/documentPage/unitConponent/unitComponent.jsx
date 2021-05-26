import React, { Component } from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';

import '../../../../bootatrap.css';
import '../../../../App.css';

import UnitsDataService from '../../../../api/units/units.js';
// import Spiner from '../../uiComponents/spiner/spiner';

export default class UnitComponent extends Component {

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

        UnitsDataService.retriveUnit(this.state.id)
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

        let unit = {
            "id": this.state.id,
            "name": values.name
        }

        let newUnit = {
            "name": values.name
        }

        if (this.state.id === -1) {
            UnitsDataService.createUnit(newUnit).then(() => {
                this.props.history.push('/units');
            });
        } else {
            UnitsDataService.updateUnit(this.state.id, unit)
                .then(() => {
                    this.props.history.push('/units');
                });
        }
    }


    validate(values) { // должен возвращать ошибку
        let errors = {};
        if (!values.name) {
            errors.name = 'Введите название должности';
        }

        return errors;
    }

    render() {

        return (
            <div>
                <h1>Должность</h1>
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
                                        <label>Название должности</label>
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

