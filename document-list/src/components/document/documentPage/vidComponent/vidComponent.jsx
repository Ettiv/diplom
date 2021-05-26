import React, { Component } from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';

import '../../../../bootatrap.css';
import '../../../../App.css';

import VidsDataService from '../../../../api/vids/vids.js';
// import Spiner from '../../uiComponents/spiner/spiner';

export default class VidsComponent extends Component {

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

        VidsDataService.retriveVid(this.state.id)
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

        let vid = {
            "id": this.state.id,
            "name": values.name
        }

        let newVid = {
            "name": values.name
        }

        if (this.state.id === -1) {
            VidsDataService.createVid(newVid).then(() => {
                this.props.history.push('/vids');
            });
        } else {
            VidsDataService.updateVid(this.state.id, vid)
                .then(() => {
                    this.props.history.push('/vids');
                });
        }
    }


    validate(values) { // должен возвращать ошибку
        let errors = {};
        if (!values.name) {
            errors.name = 'Введите вид';
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
                                        <label>Название вида</label>
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

