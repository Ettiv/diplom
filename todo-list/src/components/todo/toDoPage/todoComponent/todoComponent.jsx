import React, { Component } from 'react';
import moment from 'moment';
import { ErrorMessage, Field, Form, Formik } from 'formik';

import '../../../../bootatrap.css';

import todoDataService from '../../../../api/todo/todoDataService.js';
import AuthentificationService from '../../../../services/authentication.js';

export default class TodoComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            id: this.props.match.params.id,
            description: '',
            targetDate: moment(new Date()).format('YYYY-MM-DD')
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.validate = this.validate.bind(this);
    }

    componentDidMount() {

        if (this.state.id === -1) {
            return
        }

        let userName = AuthentificationService.getLoggedInUserName();
        todoDataService.retriveTodo(userName, this.state.id)
            .then(response => {
                this.setState({
                    description: response.data.description,
                    targetDate: moment(response.data.targetDate).format('YYYY-MM-DD')
                });
            });
    }

    onSubmit(values) {

        let userName = AuthentificationService.getLoggedInUserName();
            let todo = {
                id: this.state.id,
                description: values.description,
                targetDate: values.targetDate
            }

        if (this.state.id === -1) {
            todoDataService.createTodo(userName, todo ).then(() => {
                this.props.history.push('/todos');
            });
        } else {
            todoDataService.updateTodo(userName, this.state.id, todo)
            .then(() => {
                this.props.history.push('/todos');
            });
        }
    }

    validate(values) { // должен возвращать ошибку
        let errors = {};
        if (!values.description) {
            errors.description = 'Enter description';
        } else if (values.description.length < 5) {
            errors.description = 'Enter atleast 5 characters in descriptin';
        }

        if (!moment(values.targetDate).isValid()) {
            errors.targetDate = 'Enter a valid target date';
        }

        return errors;
    }

    render() {
        let description = this.state.description;
        let targetDate = this.state.targetDate;



        return (
            <div>
                <h1>Todo</h1>
                <div className='container'>
                    <Formik initialValues={
                        {
                            description,
                            targetDate
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
                                    <ErrorMessage
                                        name='description'
                                        component='div'
                                        className='alert alert-warning' />
                                    <ErrorMessage
                                        name='targetDate'
                                        component='div'
                                        className='alert alert-warning' />
                                    <fieldset className='form-group'>
                                        <label>Description</label>
                                        <Field className='form-control' type='text' name='description' />
                                    </fieldset>
                                    <fieldset className='form-group'>
                                        <label>Target date</label>
                                        <Field className='form-control' type='date' name='targetDate' />
                                    </fieldset>
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